import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Badge, Button } from "react-bootstrap";  // UI components
import { FaTrash, FaEdit } from "react-icons/fa";
import '../styles/transitions.css'   





// Component to display a list of notes
const NoteList = ({ notes, onDelete, onEdit }) => {
  return (
    <div className="mt-4">
      {notes.map((note) => (
        // Each note is displayed inside a styled Bootstrap Card
        <Card 
          key={note._id} 
          className="mb-3 holographic-card slide-in" // Custom animations
        >
          <Card.Body>
            {/* Note title and "New" badge */}
            <Card.Title>
              {note.title}
              <Badge bg="info" className="ms-2">New</Badge>
            </Card.Title>

            {/* Note content */}
            <Card.Text>{note.content}</Card.Text>



            
            <div className="d-flex justify-content-end">
              {/* Edit button aligned to the right */}
              <Button
                wariant="outline-primary"
                size="sm"
                onClick={() => onEdit(note._id)}
                className="me-2"
              >
                <FaEdit />
              </Button>

              
              {/* Delete button aligned to the right */}
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onDelete(note._id)}  // Call delete function with note ID
                className="me-2"
              >
                <FaTrash />  {/* Trash icon */}
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};


export default NoteList;
