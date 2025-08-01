import React from "react";
import { Card, Badge, Button } from "react-bootstrap";  // UI components
import { FaTrash, FaEdit } from "react-icons/fa";       // Icons for actions





// Component to display a list of notes
const NoteList = ({ notes, onDelete }) => {
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

            {/* Delete button aligned to the right */}
            <div className="d-flex justify-content-end">
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
