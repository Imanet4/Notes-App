import axios from "axios";


//Creating a pre-config instance of axios with my base URL
const API = axios.create({
  baseURL: "http://localhost:8000",
});



// === API Functions ===

//Fetching all notes from backend
const fetchNotes = () => API.get("/notes");

//Creating a new note 
const createNote = (note) => API.post("/notes", note);

//Updating an existing note by ID, & sending the updated data
const updateNote = (id, note) => API.put(`/notes/${id}`, note);

//Deleting a note by its ID
const deleteNote = (id) => API.delete(`/notes/${id}`);



export { fetchNotes, createNote, updateNote, deleteNote };