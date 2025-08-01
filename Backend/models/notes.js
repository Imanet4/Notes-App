import mongoose from "mongoose";


const noteSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            maxlength: [100, 'Title can not be morethan 100 characters']
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
            trim: true
        },
    },
    { timestamps: true } // createAt, updatedAt fields
);

const Note = mongoose.model("Note", noteSchema);

export default Note;