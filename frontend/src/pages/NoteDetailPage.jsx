import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import RateLimitedUI from "../components/RateLimitedUI";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  // console.log({ id });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/notes/${id}`);
        // console.log(response.data);
        setNote(response.data.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching note:", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
        // navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);
  // console.log(note);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  const handleUpdate = async () => {
    if (!note?.title?.trim() || !note?.content?.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      setSaving(true);
      await api.put(`/notes/${id}`, {
        title: note.title.trim(),
        content: note.content.trim(),
      });
      toast.success("Note updated");
      navigate("/");
    } catch {
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost mb-6">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="size-5" />
              Delete Note
            </button>
          </div>

          {/* {isRateLimited && <RateLimitedUI />} */}
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Update Note</h2>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="card-actions justify-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleUpdate}
                >
                  {saving ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
