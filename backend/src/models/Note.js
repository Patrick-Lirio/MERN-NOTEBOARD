import mongoose from "mongoose";

// step 1 - You need to create a schema
// step 2 - You would create a model based off that schema

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // createdAt , updatedAt
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
