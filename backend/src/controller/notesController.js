import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  // res.status(200).send("You just fetched the notes");
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    // console.log(title, content);
    const newNote = new Note({ title, content });

    await newNote.save();
    res.status(201).json({ message: "Note Created Successfully!" });
  } catch (error) {
    console.log("Error in createNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  res.status(201).send("Note updated successfully!");
}

export async function deleteNote(req, res) {
  res.status(201).send("Note deleted successfully!");
}
