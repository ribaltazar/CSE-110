import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

jest.mock('./constants', () => ({
  dummyNotesList: [], //mock an empty list for testing
}));

describe("Create StickyNote", () => {
 test("renders create note form", () => {
   render(<StickyNotes />);

   const createNoteButton = screen.getByText("Create Note");
   expect(createNoteButton).toBeInTheDocument();
 });

 test("creates a new note", () => {
   render(<StickyNotes />);

// Please make sure your sticky note has a title and content input field with the following placeholders
   const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
   const createNoteContentTextarea =
     screen.getByPlaceholderText("Note Content");
   const createNoteButton = screen.getByText("Create Note");

   fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
   fireEvent.change(createNoteContentTextarea, {
     target: { value: "Note content" },
   });
   fireEvent.click(createNoteButton);

   const newNoteTitle = screen.getByText("New Note");
   const newNoteContent = screen.getByText("Note content");

   expect(newNoteTitle).toBeInTheDocument();
   expect(newNoteContent).toBeInTheDocument();
 });

 test("displays all created notes", () => {
  render(<StickyNotes />);
  const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
  const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
  const createNoteButton = screen.getByText("Create Note");

  // Create a note
  fireEvent.change(createNoteTitleInput, { target: { value: "Test Note 1" } });
  fireEvent.change(createNoteContentTextarea, { target: { value: "Test Content 1" } });
  fireEvent.click(createNoteButton);

  const noteItem = screen.getByTestId("note-item-1");
  expect(noteItem).toBeInTheDocument();
});

//checks if notes are updated correctly
test("updates a note", () => {
  render(<StickyNotes initialNotes={[]} />);

  //create a new note
  const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
  const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
  const createNoteButton = screen.getByText("Create Note");

  fireEvent.change(createNoteTitleInput, { target: { value: "Test Note" } });
  fireEvent.change(createNoteContentTextarea, { target: { value: "Test Content" } });
  fireEvent.click(createNoteButton);

  //find the edit button for the newly created note
  const editButton = screen.getByTestId("edit-button-1");
  fireEvent.click(editButton);

  //edit the note's title
  const editTitleInput = screen.getByDisplayValue("Test Note");
  fireEvent.change(editTitleInput, { target: { value: "Updated Note Title" } });

  //save the edited note
  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  //check if the updated note's title is displayed
  const updatedNoteTitle = screen.getByText("Updated Note Title");
  expect(updatedNoteTitle).toBeInTheDocument();
});

//checks if notes gets deleted
test("deletes a note", () => {
  render(<StickyNotes initialNotes={[]} />);

  //create a new note
  const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
  const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
  const createNoteButton = screen.getByText("Create Note");

  fireEvent.change(createNoteTitleInput, { target: { value: "Test Note" } });
  fireEvent.change(createNoteContentTextarea, { target: { value: "Test Content" } });
  fireEvent.click(createNoteButton);

  //deleting the note
  const deleteButton = screen.getByTestId("delete-button-1");
  fireEvent.click(deleteButton);

  //check if the note is no longer in the document
  const deletedNote = screen.queryByTestId("note-item-1");
  expect(deletedNote).not.toBeInTheDocument();
});

  //test if app allows notes without a title or content
  test("prevents creating a note without a title or content", () => {
    render(<StickyNotes />);
  
    const createNoteButton = screen.getByText("Create Note");
    
    fireEvent.click(createNoteButton);
  
    //see if note was not created
    expect(screen.queryByText("Note Title")).not.toBeInTheDocument();
  });
});