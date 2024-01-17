// ------------ Nav List ---------------------------------------
const saveNote = document.getElementById("save-note");
const editNote = document.getElementById("edit-note");
const deleteNote = document.getElementById("delete-note");
const colorNote = document.getElementById("color-note");
//------------ Main section Add Note & Side Note ---------------
const addNote = document.getElementById("add-note");
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
  const noteTitle = addNote[0].value;
  const elements = [`<li class="prev-note">${noteTitle}</li>`];

  Object.values(sideNotesList.children).map((note) =>
    elements.push(`<li class="prev-note">${note.innerHTML}</li>`)
  );

  sideNotesList.innerHTML = elements.join("");
};
// ______________________________________________________________

//------------ Events Lesteners ---------------------------------
window.addEventListener("load", loadNotes);
// ______________________________________________________________
saveNote.addEventListener("click", addNoteHandler);
