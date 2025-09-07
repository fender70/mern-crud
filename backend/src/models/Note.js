import mongoose from "mongoose";

// 1st step: Define the schema
// 2nd step: Create a model based on the schema

const noteSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        content:{
            type: String,
            required: true
        },
    },
    { timestamps: true}
);

const Note = mongoose.model("Note", noteSchema)

export default Note