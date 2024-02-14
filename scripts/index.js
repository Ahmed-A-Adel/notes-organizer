// ------------ Nav List ---------------------------------------
const saveNote = document.getElementById("add-note__save");
const listNote = document.getElementById("add-note__list");
const tagNote = document.getElementById("add-note__tag");
const doneNote = document.getElementById("add-note__done");
const clearNote = document.getElementById("add-note__clear");
const editNote = document.getElementById("edit-note");
const deleteNote = document.getElementById("delete-note");
const colorNote = document.getElementById("color-note");
const prevNote = document.getElementsByClassName(".prev-note");
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
      title: "title",
      content: "content",
      color: "",
      tags: "#",
      edit: false,
    },
    {
      id: null,
      title: "title",
      content: "content",
      color: "",
      tags: "#",
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
      return `<li class="prev-note" id='${note.id}'>
      <span id="prev-note__edit">&#9998;</span>
      <span id="prev-note__delete">&#10006;</span>

      <span class="prev-note__title"> ${note.title}</span>
    </li>`;
    })
    .join(" ");

  sideNotesList.innerHTML = elements;
};
// ______________________________________________________________
const addNoteHandler = (event) => {
  event.preventDefault();

  if (
    /^\s/.test(addNoteTitle.value, "g") ||
    /^\s/.test(addNoteContent.value, "g")
  )
    return null;
  if (!addNoteTitle.value && !addNoteContent.value) return null;

  const noteId = new Uint32Array(1);
  crypto.getRandomValues(noteId);
  const tags = addNoteContent.value.split(" ").filter((tag) => tag[0] === "#");
  const newNote = {
    id: noteId,
    title: addNoteTitle.value,
    content: addNoteContent.value,
    color: "",
    tags: tags,
    edit: false,
  };
  const notes = [newNote, ...state.notes];
  state.notes = notes;
  sideNotesList.innerHTML = notes
    .map(
      (note) => `<li class="prev-note" id='${note.id}'>
      <span id="prev-note__edit">&#9998;</span>
      <span id="prev-note__delete">&#10006;</span>

      <span class="prev-note__title"> ${note.title}</span>
    </li>`
    )
    .join(" ");
  addNoteTitle.value = "";
  addNoteContent.value = "";
};
// ______________________________________________________________
const clearNoteHandler = () => {
  if (addNoteContent.value !== "") addNoteContent.value = "";
  else addNoteTitle.value = "";
};
// ______________________________________________________________
function editNoteHandler(e) {
  const target = e.target;
  if (e.target.localName != "li") return null;
  const note = state.notes.filter((note) => note.id == target.id)[0];
  const notes = [
    ...state.notes
      .filter((note) => note.id != target.id)
      .map((note) => {
        return { ...note, edit: false };
      }),
    { ...note, edit: !note.edit },
  ];
  // ________________________________________________________
  if (note.edit) {
    addNoteTitle.value = "";
    addNoteContent.value = "";
    state.notes = notes;
    return null;
  }
  // ________________________________________________________

  addNoteTitle.value = note.title;
  addNoteContent.value = note.content;
  state.notes = notes;
}
// ______________________________________________________________

//------------ Events Lesteners ---------------------------------
window.addEventListener("load", loadNotes);
// ______________________________________________________________
saveNote.addEventListener("click", addNoteHandler);
// ______________________________________________________________
clearNote.addEventListener("click", clearNoteHandler);
// ______________________________________________________________
sideNotesList.addEventListener("click", editNoteHandler);
