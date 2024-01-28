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
const addNoteHandler = (event) => {
  event.preventDefault();

  if (
    /^\s/.test(addNoteTitle.value, "g") &&
    /^\s/.test(addNoteContent.value, "g")
  )
    return null;
  if (!addNoteTitle.value && !addNoteContent.value) return null;
  const tags = addNoteContent.value.split(" ").filter((tag) => tag[0] === "#");
  const newNote = {
    id: null,
    title: addNoteTitle.value,
    content: addNoteContent.value,
    color: "",
    tags: tags,
    edit: false,
  };
  state.AddNote = newNote;
  const notes = [newNote, ...state.notes];
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
// ______________________________________________________________
