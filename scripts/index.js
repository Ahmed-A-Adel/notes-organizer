// ------------ Nav List ---------------------------------------
const saveNote = document.getElementById("save-note");
const listNote = document.getElementById("list-note");
const tagNote = document.getElementById("tag-note");
const doneNote = document.getElementById("done-note");
const clearNote = document.getElementById("clear-note");
const editNote = document.getElementById("edit-note");
const deleteNote = document.getElementById("delete-note");
const colorNote = document.getElementById("color-note");
const prevNote = document.getElementsByClassName(".prev-note");
//------------ Main section Add Note & Side Note ---------------
const addNote = document.getElementById("add-note");
const addNoteContainer = document.getElementsByClassName(
  "add-note__container"
)[0];
const addNoteTitle = document.getElementById("add-note__title");
const addNoteContent = document.getElementById("add-note__content");
const addNoteList = document.querySelector(".add-note__list");
const sideNotes = document.getElementById("side-notes");
const sideNotesList = document.getElementById("side-notes__list");
const timeNow = document.getElementById("time-now");
const timeNote = document.getElementById("time-note");
const dateNow = document.getElementById("date-now");
const dateNote = document.getElementById("date-note");
// ------------ App State --------------------------------------
const state = {
  notes: [
    {
      id: 1,
      title: "title 1",
      content: "content",
      complate: true,
      tags: [],
      edit: false,
      order: 1,
    },
    {
      id: 2,
      title: "title 2",
      content: "content",
      complate: true,
      tags: [],
      edit: false,
      order: 2,
    },
  ],
  darkmode: false,
  listMode: false,
  listItems: [],
  date: "",
  time: "",
};

// ------------ Functions ---------------------------------------
function addTime(date) {
  state.date = date.toLocaleDateString();
  state.time = date.toLocaleTimeString();
  dateNow.innerText = date.toLocaleDateString();
  timeNow.innerText = date.toLocaleTimeString();
}
const callAddTime = setInterval(() => {
  const date = new Date();
  addTime(date);
});

// ______________________________________________________________
function toggleTime(time) {
  switch (time) {
    case "note":
      timeNow.classList.add("remove");
      dateNow.classList.add("remove");
      timeNote.classList.remove("remove");
      dateNote.classList.remove("remove");
      break;
    case "now":
      timeNow.classList.remove("remove");
      dateNow.classList.remove("remove");
      timeNote.classList.add("remove");
      dateNote.classList.add("remove");
  }
}
// ______________________________________________________________
const notesToHtml = (notes) =>
  notes
    .map((note) => {
      const content = note.content.split(" ").slice(0, 9).join(" ");
      return `<li tabindex="8" class="prev-note" id='${note.id}'>
        <div class="btn-container">
      <span tabindex="9" title="edit" class="prev-note__edit">
      <div class="edit__icon">&#9998;
      <div class="edit__line"></div>
      </div>
      </span>
      <span tabindex="10" title="delete" class="prev-note__delete">&#10006;</span>
      </div>

      <span class="prev-note__title"> ${note.title}</span>
      <span class="prev-note__content hidden"> "${
        content || "waiting for inspiration"
      }"</span>
    </li>`;
    })
    .join(" ");
// ______________________________________________________________
function addToStorage(notes) {
  const notesString = JSON.stringify(notes);
  localStorage.setItem("notes", notesString);
}
function getFromStorage(notes) {
  const notesObj = JSON.parse(localStorage.getItem(notes));
  return notesObj;
}
// ______________________________________________________________
function renderNotes(notes) {
  state.notes = notes;
  // only the first 10 notes to show in the sidebar
  sideNotesList.innerHTML = notesToHtml(notes.slice(0, 10));
  addNoteTitle.value = "";
  addNoteContent.value = "";
}
// ______________________________________________________________
function loadNotes() {
  const notes = getFromStorage("notes") || state.notes;
  renderNotes(notes);
  addNoteTitle.focus();
}
// ______________________________________________________________
function addNoteHandler(event) {
  event.preventDefault();

  // ---------------- Authntication ------------------------------
  if (/^\s/.test(addNoteTitle.value, "g")) return null;
  // -------------------------------------------------------------
  if (!addNoteTitle.value) return null;
  // ---------------- Authntication ------------------------------

  // ---------------- Save Note When Edit ------------------------
  if (state.notes.some((note) => note.edit)) {
    const tags = addNoteContent.value
      .split(" ")
      .filter((tag) => tag[0] === "#");
    const note = state.notes.filter((note) => note.edit);
    const slicedNotes = state.notes.filter((note) => !note.edit);
    const notes = [
      {
        ...note,
        title: addNoteTitle.value,
        content: addNoteContent.value,
        edit: false,
        tags,
      },
      ...slicedNotes,
    ];
    renderNotes(notes);
    addToStorage(notes);
    toggleTime("now");
    return null;
  }
  // ---------------- Save Note When Edit ------------------------

  // ---------------- Add New Note ------------------------
  const noteId = new Uint32Array(1);
  crypto.getRandomValues(noteId);
  const tags = addNoteContent.value.split(" ").filter((tag) => tag[0] === "#");
  const storageNotes = getFromStorage("notes");
  const newNote = {
    id: noteId[0],
    title: addNoteTitle.value,
    content: addNoteContent.value,
    date: state.date,
    time: state.time,
    complate: true,
    tags,
    edit: false,
    order: storageNotes.length ?? +1,
  };
  const notes = storageNotes
    ? [newNote, ...storageNotes]
    : [newNote, ...state.notes];
  renderNotes(notes);
  addToStorage(notes);
  timeNote.innerText = state.time;
  dateNote.innerText = state.date;
  // ---------------- Add New Note ------------------------
}
// ______________________________________________________________
const clearNoteHandler = () => {
  if (addNoteContent.value !== "") addNoteContent.value = "";
  else addNoteTitle.value = "";
};
// ______________________________________________________________
function editSideNote(id, pen) {
  const pens = document.getElementsByClassName("pen-in");
  const lines = document.getElementsByClassName("pen-line-in");
  const note = state.notes.filter((note) => note.id == id)[0];
  const notes = [
    ...state.notes
      .filter((note) => note.id != id)
      .map((note) => {
        return { ...note, edit: false };
      }),
    { ...note, edit: !note.edit },
  ];
  for (const pen of pens) {
    pen.classList.remove("pen-in");
  }
  for (const line of lines) {
    line.classList.remove("pen-line-in");
  }

  // ____________ Reset AddNote inputes _______
  if (note.edit) {
    addNoteTitle.value = "";
    addNoteContent.value = "";
    state.notes = notes;
    // --------- Animation ------------------
    pen.icon.classList.remove("pen-in");
    pen.line.classList.remove("pen-line-in");
    // --------- Animation ------------------
    toggleTime("now");
  } else {
    // _______ Display current Note _________
    addNoteTitle.value = note.title;
    addNoteContent.value = note.content;
    state.notes = notes;
    // --------- Animation ------------------
    pen.icon.classList.add("pen-in");
    pen.line.classList.add("pen-line-in");
    // --------- Animation ------------------
    // --------- Display Date & Time --------
    timeNote.innerText = note.time;
    dateNote.innerText = note.date;
    toggleTime("note");
  }
  addNoteContent.focus();
}
// ______________________________________________________________
function deleteSideNote(id) {
  const note = state.notes.filter((note) => note.id == id)[0];
  const notes = [...state.notes.filter((note) => note.id != id)];
  const notesHtml = notesToHtml(notes.slice(0, 10));
  // --------------------------------------------------------
  if (note.edit) {
    addNoteTitle.value = "";
    addNoteContent.value = "";
  }
  state.notes = notes;
  addToStorage(notes);
  sideNotesList.innerHTML = notesHtml;
}
// ______________________________________________________________
function sideNotesHandler(e) {
  const target = e.target;
  const actionElement = target.parentElement.parentElement;
  const parentNote = target.parentElement.parentElement.parentElement;

  switch (target.classList[0]) {
    case "prev-note__delete":
      deleteSideNote(actionElement.id);
      break;

    case "edit__icon":
      editSideNote(parentNote.id, {
        icon: target,
        line: target.firstElementChild,
        target,
      });
      break;

    case "edit__line":
      editSideNote(parentNote.parentElement.id, {
        line: target,
        icon: target.parentElement,
        target,
      });
  }
}
// ______________________________________________________________
function tagNoteHandler() {
  const noteSplited = addNoteContent.value.split(" ");
  noteSplited.push("#");
  addNoteContent.value = noteSplited.join(" ");
  addNoteContent.focus();
}
// ______________________________________________________________
window.addEventListener("load", loadNotes);
// ______________________________________________________________
saveNote.addEventListener("click", addNoteHandler);
// ______________________________________________________________
clearNote.addEventListener("click", clearNoteHandler);
// ______________________________________________________________
sideNotesList.addEventListener("click", sideNotesHandler);
// ______________________________________________________________
tagNote.addEventListener("click", tagNoteHandler);
// ______________________________________________________________
listNote.addEventListener("click", (e) => {
  const oldText = addNoteContent.value;
  const newText = `1-\n 2-\n 3-\n`;
  const newNote = `${oldText} \n ${newText}`;
  addNoteContent.value = newNote;
  // state.listMode = !state.listMode;
});
