import React, { useState, useEffect } from 'react';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { ThemeContext, themes } from "./themeContext";
import ToggleTheme, { ClickCounter } from './hooksExercise';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons"; 

interface StickyNotesProps {
  initialNotes?: Note[]; // Add this to accept the initialNotes prop
}

export const StickyNotes: React.FC<StickyNotesProps> = ({ initialNotes = dummyNotesList }) => {
const initialNote = {
    id: -1,
    title: '',
    content: "",
    label: Label.other,
  }
 
  const [createNote, setCreateNote] = useState(initialNote);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const newNote = {
      ...createNote,
      id: notes.length + 1,
    }

    setNotes([...notes, newNote]);

    setCreateNote(initialNote);
  }

  const deleteNoteHandler = (noteId: number) => {
    setNotes(notes.filter(note => note.id !== noteId));
  }


  const [favorites, setFavorites] = useState<Note[]>([])

  const heart = (note: Note) => {
    if (favorites.includes(note)){
      setFavorites(favorites.filter(fav => fav.id !== note.id))
    }else {
      setFavorites([...favorites, note])
    }
  };

  const isFavorite = (note : Note) => favorites.includes(note);

  const [notes, setNotes] = useState(dummyNotesList); 

  const [selectedNote, setSelectedNote] = useState<Note>(initialNote);

  const selectNoteForEditing = (note: Note) => {
    setSelectedNote(note);
  };

  const updateSelectedNote = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, field: string) => {
    setSelectedNote({
      ...selectedNote,
      [field]: event.target.value
    });
  };

  const saveNoteChanges = () => {
    setNotes(notes.map(note => note.id === selectedNote.id ? selectedNote : note));
    setSelectedNote(initialNote);
  };

  const [theme, setTheme] = useState(themes.light);

  const toggleTheme  = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  }

  return ( 
    <ThemeContext.Provider value={theme}>
      <div className='app-container' style={{ backgroundColor: theme.background, color: theme.foreground }}>
  	<form className="note-form" onSubmit={createNoteHandler} >
    	<div>
      	<input
        	placeholder="Note Title"
          value={createNote.title}
        	onChange={(event) =>
          	setCreateNote({ ...createNote, title: event.target.value })}
        	required>
      	</input>
    	</div>

    	<div>
      	<textarea
          placeholder="Note Content"
          value={createNote.content}
        	onChange={(event) =>
          	setCreateNote({ ...createNote, content: event.target.value })}
        	required>
      	</textarea>
    	</div>

  <div>
     	<select
        value={createNote.label}
       	onChange={(event) =>
         	setCreateNote({ ...createNote, label: event.target.value as Label })}
       	required>
       	<option value={Label.personal}>Personal</option>
       	<option value={Label.study}>Study</option>
       	<option value={Label.work}>Work</option>
       	<option value={Label.other}>Other</option>
     	</select>
   	</div>

    	<div><button type="submit">Create Note</button></div>
  	</form>

  	<div className="notes-grid">
    	{notes.map((note) => (
         <div
           key={note.id}
           className="note-item"
           data-testid={`note-item-${note.id}`}
           style={{ 
            backgroundColor: theme.background, 
            color: theme.foreground, 
            border: `1px solid ${theme.foreground}` 
          }}>
            {selectedNote.id === note.id ? (
            <div>
              <input
                value={selectedNote.title}
                onChange={(event) => updateSelectedNote(event, 'title')}
                style={{ backgroundColor: theme.background, color: theme.foreground }}
              />
              <textarea
                value={selectedNote.content}
                onChange={(event) => updateSelectedNote(event, 'content')}
                style={{ backgroundColor: theme.background, color: theme.foreground }}
              />
              <select
                value={selectedNote.label}
                onChange={(event) => updateSelectedNote(event, 'label')}
                style={{ backgroundColor: theme.background, color: theme.foreground }}
              >
                <option value={Label.personal}>Personal</option>
                <option value={Label.study}>Study</option>
                <option value={Label.work}>Work</option>
                <option value={Label.other}>Other</option>
              </select>
              <button onClick={saveNoteChanges}>Save</button>
              <button onClick={() => setSelectedNote(initialNote)}>Cancel</button>
            </div>
          ) : (
          <div>
           <div className="notes-header">
            <button onClick={() => heart(note)}
              data-testid={`heart-button-${note.id}`}>
                        <FontAwesomeIcon 
                        icon={isFavorite(note) ? fasHeart: farHeart}
                        style={{ color: isFavorite(note) ? 'red' : 'black' }}
                        ></FontAwesomeIcon></button>
             <button onClick={() => deleteNoteHandler(note.id)} data-testid={`delete-button-${note.id}`}>x</button>
           </div>
           <h2> {note.title} </h2>
           <p> {note.content} </p>
           <p> {note.label} </p>
           <button onClick={() => selectNoteForEditing(note)}
            data-testid={`edit-button-${note.id}`}>Edit</button>
            </div>
          )}
        </div>
      ))}
    </div>
   <div>
      <h1>Favorite Notes</h1>
      <ul>{favorites.map((note) => (
        <li key={note.id}>{note.title}</li>))}
        </ul>
    </div>
  </div>
  <button onClick={toggleTheme}>Toggle Theme</button>
  </ThemeContext.Provider>
  );
}