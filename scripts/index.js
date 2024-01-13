// --- Nav List ----
const saveNote = document.getElementById("save-note");
const editNote = document.getElementById("edit-note");
const deleteNote = document.getElementById("delete-note");
const colorNote = document.getElementById("color-note");
//--- Main section Add Note & Side Note ---
const addInput = document.getElementById("add-input");
const sideNotes = document.getElementById("side-notes");
const sideNotesList = document.getElementById("side-notes__list");
// --------- App State --------------
const state = {
  notes: [
    {
      id: null,
      heading: "morning routine",
      content: "",
      color: "",
      tags: [],
      edit: false,
    },
    {
      id: null,
      heading: "afternoon routine",
      content: "",
      color: "",
      tags: [],
      edit: false,
    },
    {
      id: null,
      heading: "evening routine",
      content: "",
      color: "",
      tags: [],
      edit: false,
    },
    {
      id: null,
      heading: "morning routine",
      content: "",
      color: "",
      tags: [],
      edit: false,
    },
    {
      id: null,
      heading: "afternoon routine",
      content: "",
      color: "",
      tags: [],
      edit: false,
    },
    {
      id: null,
      heading: "evening routine",
      content: "",
      color: "",
      tags: [],
      edit: false,
    },
    {
      id: null,
      heading: "morning routine",
      content: "",
      color: "",
      tags: [],
      edit: false,
    },
    {
      id: null,
      heading: "afternoon routine",
      content: "",
      color: "",
      tags: [],
      edit: false,
    },
    {
      id: null,
      heading: "evening routine",
      content: "",
      color: "",
      tags: [],
      edit: false,
    },
  ],
  darkmode: false,
};

// ------------ Functions -----------------
const addNote = () => {
  const noteTitle = addInput[0].value;
  const elements = [`<li class="prev-note">${noteTitle}</li>`];

  Object.values(sideNotesList.children).map((note) =>
    elements.push(`<li class="prev-note">${note.innerHTML}</li>`)
  );

  sideNotesList.innerHTML = elements.join("");
};
// ______________________________________________________________
const loadNotes = () => {
  const elements = state.notes
    .map((note) => {
      return `<li class="prev-note">${note.heading}</li>`;
    })
    .join(" ");

  sideNotesList.innerHTML = elements;
};

//------------ Events Lesteners ------------------
saveNote.addEventListener("click", addNote);
// ______________________________________________________________
window.addEventListener("load", loadNotes);
