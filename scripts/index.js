const saveInput = document.getElementById("save-input");
const addInput = document.getElementById("add-input");
const sideNotes = document.getElementById("side-notes");
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
  ],
  darkmode: false,
};

//  Functions
const addNote = () => {
  const elements = [`<li class="prev-note">${addInput.value}</li>`];

  Object.values(sideNotes.children).map((note) =>
    elements.push(`<li class="prev-note">${note.innerHTML}</li>`)
  );

  sideNotes.innerHTML = elements.join("");
};

// Events Lesteners
saveInput.addEventListener("click", addNote);
