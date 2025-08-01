import React, { useState, useEffect } from "react";
import { fetchNotes, createNote, deleteNote, updateNote } from "../services/api";

// Import child components
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

// Main component handling note CRUD logic
function NotesPage() {
  const [notes, setNotes] = useState([]); // State to store all notes

  // Loading notes when the component mounts
  useEffect(() => {
    loadNotes();
  }, []);

  //Fetching notes from backend and updating state
  const loadNotes = async () => {
    const { data } = await fetchNotes();
    setNotes(data);
  };

  //Adding a new note and refreshing the list
  const handleAddNote = async (note) => {
    await createNote(note);
    loadNotes(); // Refreshs list after adding
  };

  //Deleting a note by ID and refreshing the list
  const handleDelete = async (id) => {
    await deleteNote(id);
    loadNotes(); 
  };

  //Editing a note by ID and refreshing the list
  const handleEdit = async (id) => {
    await updateNote(id);
    loadNotes();
  };

  return (
    <div>
      {/* Form to create new notes */}
      <NoteForm onSubmit={handleAddNote} />

      {/* List of existing notes with delete functionality */}
      <NoteList notes={notes} 
      onDelete={handleDelete}
      onEdit={handleEdit} />
    </div>
  );
}

export default NotesPage;
