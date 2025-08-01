import Note from "../models/Note.js";



// Get all notes sorted by creation date (newest first)
 const getAllNotes = async (_, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error getting notes", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Create a new note
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        //Basic Validation 
        if(!title || !content) {
            return res.status(400).json({message: 'Title and Content are required!'})
        }

        const newNote = new Note({ title, content });
        await newNote.save();
        res.status(201).json({ message: "Note was created successfully" });
    } catch (error) {
        console.error("Error creating a note", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update an existing note
 
const updateNote = async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete a note
 
const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({ message: "Note not found" });

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting the note", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Export all controller functions at the bottom
export {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote
};