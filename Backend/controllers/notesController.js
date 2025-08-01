import Note from "../models/Note.js";



// Get all notes sorted by creation date (newest first)
 const getAllNotes = async (_, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get Single Note by ID
const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getNoteById controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Create a new note
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });
        await newNote.save();
        res.status(201).json({ message: "Note created successfully" });
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Update an existing note
 * @returns Updated note object or 404 if not found
 */
const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );
        if (!updatedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Delete a note
 * @returns Success message or 404 if not found
 */
const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error in deleteNote controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Export all controller functions at the bottom
export {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
};