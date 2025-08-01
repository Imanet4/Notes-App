import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap"; //Bootstrap button component
import { FaPaperPlane } from "react-icons/fa"; //Paper plane icon
import '../styles/transitions.css'


const NoteForm = ({ onSubmit }) => {
    //Initializing state for note title & content
    const [note, setNote] = useState({ title: "", content: ""});

    //Handling form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(note);   //Passing the note object to the parent component
        setNote({ title: "", content: "" }); //Reseting the form fields
    };

    return(
        <form 
      onSubmit={handleSubmit}                      //Triggers handleSubmit when form is submitted
      className="bg-dark p-4 rounded-3 glow-on-hover"  
    >
      {/* Title input field */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control futuristic-input"     
          placeholder="Note Title"
          value={note.title}                            //Controlled input
          onChange={(e) => setNote({ ...note, title: e.target.value })}  //Updates title in state
        />
      </div>

      {/* Content textarea field */}
      <div className="mb-3">
        <textarea
          className="form-control futuristic-input"     
          placeholder="Your Content..."
          rows="3"
          value={note.content}                          //Controlled textarea
          onChange={(e) => setNote({ ...note, content: e.target.value })} //Updates content in state
        />
      </div>

      {/* Submit button with icon */}
      <Button 
        variant="outline-light" 
        type="submit"
        className="float-end pulse-effect"              
      >
        <FaPaperPlane className="me-2" />               {/* Icon before text */}
        Send
      </Button>
    </form>
    );
};

export default NoteForm;