import Note from "../models/Note.js";

export async function getAllNotes( _, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // -1 will sort  in desc. order (newest first)
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const { id } = req.params;
    const oneNote = await Note.findById(id);

    if (!oneNote) return res.status(404).json({ message: "Note not found!" });

    res
      .status(200)
      .json({ message: "Note Successfully Found!", data: oneNote });
  } catch (error) {
    console.log("Error in getNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    // console.log(title, content);
    const newNote = new Note({ title, content });

    const savedNote = await newNote.save();
    res
      .status(201)
      .json({ message: "Note Created Successfully!", data: savedNote });
  } catch (error) {
    console.log("Error in createNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found!" });
    res
      .status(200)
      .json({ message: "Note updated Successfully!", data: updatedNote });
  } catch (error) {
    console.log("Error in updateNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const { id } = req.params;
    // const { title, content } = req.body;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found!" });
    res.status(200).json({ message: "Note Deleted Successfully!" });
  } catch (error) {
    console.log("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
