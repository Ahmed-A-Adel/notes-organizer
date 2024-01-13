const saveInput = document.getElementById("save-input");
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
  const elements = [`<li class="prev-note">${addInput.value}</li>`];

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
saveInput.addEventListener("click", addNote);
// ______________________________________________________________
window.addEventListener("load", loadNotes);
