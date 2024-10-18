import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

jest.mock('./constants', () => ({
  dummyNotesList: [], // Mock an empty list for testing
}));

describe("Create StickyNote", () => {
 test("renders create note form", () => {
   render(<StickyNotes />);

   const createNoteButton = screen.getByText("Create Note");
   expect(createNoteButton).toBeInTheDocument();
 });

 test("creates a new note", () => {
   render(<StickyNotes />);

// Please make sure your sticky note has a title and content input field with the following placeholders.
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

  const noteItem = screen.getByTestId("note-item-1"); // Ensure it matches created note's ID
  expect(noteItem).toBeInTheDocument();
});

test("updates a note", () => {
  render(<StickyNotes initialNotes={[]} />);

  // Create a new note
  const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
  const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
  const createNoteButton = screen.getByText("Create Note");

  fireEvent.change(createNoteTitleInput, { target: { value: "Test Note" } });
  fireEvent.change(createNoteContentTextarea, { target: { value: "Test Content" } });
  fireEvent.click(createNoteButton);

  // Now find the Edit button for the newly created note
  const editButton = screen.getByTestId("edit-button-1");
  fireEvent.click(editButton);

  // Edit the note's title
  const editTitleInput = screen.getByDisplayValue("Test Note");
  fireEvent.change(editTitleInput, { target: { value: "Updated Note Title" } });

  // Save the edited note
  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  // Check if the updated note's title is displayed
  const updatedNoteTitle = screen.getByText("Updated Note Title");
  expect(updatedNoteTitle).toBeInTheDocument();
});

test("deletes a note", () => {
  render(<StickyNotes initialNotes={[]} />);

  // Create a new note
  const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
  const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
  const createNoteButton = screen.getByText("Create Note");

  fireEvent.change(createNoteTitleInput, { target: { value: "Test Note" } });
  fireEvent.change(createNoteContentTextarea, { target: { value: "Test Content" } });
  fireEvent.click(createNoteButton);

  // Now the note should be created, and we can delete it
  const deleteButton = screen.getByTestId("delete-button-1");
  fireEvent.click(deleteButton);

  // Check if the note is no longer in the document
  const deletedNote = screen.queryByTestId("note-item-1");
  expect(deletedNote).not.toBeInTheDocument();
});

  test("prevents creating a note without a title or content", () => {
    render(<StickyNotes />);
  
    const createNoteButton = screen.getByText("Create Note");
    
    fireEvent.click(createNoteButton);
  
    // Assert that note was not created
    expect(screen.queryByText("Note Title")).not.toBeInTheDocument();
  });
});