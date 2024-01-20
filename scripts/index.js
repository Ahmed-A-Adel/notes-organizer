// ------------ Nav List ---------------------------------------
const saveNote = document.getElementById("save-note");
const clearNote = document.getElementById("clear-note");
const editNote = document.getElementById("edit-note");
const deleteNote = document.getElementById("delete-note");
const colorNote = document.getElementById("color-note");
//------------ Main section Add Note & Side Note ---------------
const addNote = document.getElementById("add-note");
const addNoteTitle = document.getElementById("add-note__title");
const addNoteContent = document.getElementById("add-note__content");
const sideNotes = document.getElementById("side-notes");
const sideNotesList = document.getElementById("side-notes__list");
// ------------ App State --------------------------------------
const state = {
  notes: [
    {
      id: null,
      title: "morning routine",
      content: "",
      color: "",
      tags: [],
      edit: false,
    },
    {
      id: null,
      title: "afternoon routine",
      content: "",
      color: "",
      tags: [],
      edit: false,
    },
    {
      id: null,
      title: "evening routine",
      content: "",
      color: "",
      tags: [],
      edit: false,
    },
  ],
  darkmode: false,
  set AddNote(note) {
    this.notes = [note, ...this.notes];
  },
};

// ------------ Functions ---------------------------------------
const loadNotes = () => {
  const elements = state.notes
    .map((note) => {
      return `<li class="prev-note">${note.title}</li>`;
    })
    .join(" ");

  sideNotesList.innerHTML = elements;
};
// ______________________________________________________________
const addNoteHandler = () => {
  const newNote = {
    id: null,
    title: addNoteTitle.value,
    content: addNoteContent.value,
    color: "",
    tags: [],
    edit: false,
  };
  const notes = [newNote, ...state.notes];
  state.AddNote = newNote;

  sideNotesList.innerHTML = notes
    .map((note) => `<li class="prev-note">${note.title}</li>`)
    .join(" ");
};
// ______________________________________________________________
const clearNoteHandler = () => {
  if (addNoteContent.value !== "") addNoteContent.value = "";
  else addNoteTitle.value = "";
};

//------------ Events Lesteners ---------------------------------
window.addEventListener("load", loadNotes);
// ______________________________________________________________
saveNote.addEventListener("click", addNoteHandler);
// ______________________________________________________________
clearNote.addEventListener("click", clearNoteHandler);
