// import { state, getFromStorage, addToStorage } from "../modle.js";
// import {
//   toggleSideNotes,
//   editSideNote,
//   deleteSideNote,
// } from "./sideNoteView.js";
// ------------ Nav List ---------------------------------------
const saveNote = document.getElementById("note__save");
const listNote = document.getElementById("note__add-list");
const pointNote = document.getElementById("note__add-point");
const tagNote = document.getElementById("note__add-tag");
const clearNote = document.getElementById("note__clear");
const editNote = document.getElementById("edit-note");
const deleteNote = document.getElementById("delete-note");
const colorNote = document.getElementById("color-note");
const prevNote = document.getElementsByClassName(".prev-note");
//------------ Main section Add Note & Side Note ---------------
const addNote = document.getElementById("add-note");
const addNoteContainer = document.getElementById("add-note__container");
export const addNoteTitle = document.getElementById("add-note__title");
const addNoteContent = document.querySelector(".add-note__content");
const addNoteInput = document.getElementById("add-note__input");
const addNoteList = document.querySelector(".add-note__list");
const addNoteFullView = document.querySelector("#note__full-view");
const addNoteNav = document.querySelector(".add-note__nav");
const sideNotes = document.getElementById("side-notes");
const sideNotesBtn = document.querySelector(".side-notes__btn");
const sideNotesList = document.getElementById("side-notes__list");
const dateContainer = document.getElementById("date-container");
const dateNote = document.getElementById("date-note");
const timeNote = document.getElementById("time-note");
// ------------ Functions ---------------------------------------
export function toggleTime() {
  // Show Date & Time only on editMode
  if (state.editMode) {
    dateContainer.classList.remove("hidden");
  } else {
    dateContainer.classList.add("hidden");
  }
}

const addTime = setInterval(() => {
  const dateObject = new Date();
  const date = dateObject.toLocaleDateString();
  const time = dateObject.toLocaleTimeString();
  const timeOutSec = `${time.split(" ")[0].slice(0, 4)} ${time.split(" ")[1]}`;
  state.date = date;
  state.time = timeOutSec;
}, 1000);

function prevNoteHandler(e) {
  const target = e.target;
  const currentTarget = e.currentTarget;

  switch (target.classList[0]) {
    case "prev-note__delete":
      deleteSideNote(currentTarget.id);
      break;
    default:
      editSideNote(currentTarget);
  }
}
// ______________________________________________________________
export const notesToHtml = function (notes) {
  const markup = notes.map((note) => {
    const content = note.content.split(" ").slice(0, 9).join(" ");

    let currNote = `<li onClick="prevNoteHandler(event)" tabindex="8" class="prev-note" id='${note.id}'>
       
    </li>`;
    let currNoteChildren = ` <div class="btn-container">
      <span  tabindex="9" title="edit" class="prev-note__edit">
      <button class="edit__icon">&#9998;
      <div class="edit__line"></div>
      </button>
      </span>
      <button tabindex="10" title="delete" class="prev-note__delete">&#10006;</button>
      </div>

      <span class="prev-note__title"> ${note.title}</span>
      <span class="prev-note__content hidden"> "${
        content || "waiting for inspiration"
      }"</span>`;
    const parentNote = document.createElement("li");
    parentNote.id = note.id;
    parentNote.addEventListener("click", prevNoteHandler);
    parentNote.classList.add("prev-note");
    parentNote.innerHTML = currNoteChildren;

    return parentNote;
  });
  return markup;
};

// ______________________________________________________________
export function resetAddNote() {
  const addNoteContainer = document.querySelector("#add-note__container");
  addNoteContainer.innerHTML = "";
  const addNoteContent = document.createElement("p");
  const addNoteTitle = document.getElementById("add-note__title");
  addNoteTitle.value = "";
  addNoteContent.classList.add("add-note__content");
  addNoteContent.innerHTML = "&nbsp";
  addNoteContainer.appendChild(addNoteContent);
  setCursorEditable(addNoteContent, 0, 0);

  state.editMode = false;
}
// ______________________________________________________________
export function renderNotes(notes) {
  state.notes = notes;
  // only the first 10 notes to show in the sidebars
  console.log(notes);
  sideNotesList.innerHTML = "";
  notesToHtml(notes.slice(0, 10)).map((note) =>
    sideNotesList.insertAdjacentElement("beforeend", note)
  );
}

// ______________________________________________________________
function addNoteHandler(event) {
  event.preventDefault();
  const markup = document.querySelector("#add-note__container").innerHTML;
  const content = document.querySelector("#add-note__container").innerText;
  const tags = content.split(" ").filter((tag) => tag[0] === "#");

  // ---------------- Authntication ------------------------------
  if (/^\s/.test(addNoteTitle.value, "g")) return null;
  // -------------------------------------------------------------
  if (!addNoteTitle.value) return null;
  // ---------------- Authntication ------------------------------

  // ---------------- Save Note When Edit ------------------------
  if (state.notes.some((note) => note.edit)) {
    const note = state.notes.filter((note) => note.edit)[0];
    const slicedNotes = state.notes.filter((note) => !note.edit);
    const notes = [
      {
        ...note,
        title: addNoteTitle.value,
        content: content,
        markup,
        edit: false,
        tags,
      },
      ...slicedNotes,
    ];
    renderNotes(notes);
    addToStorage(notes);
    resetAddNote();
    state.editMode = false;
    toggleTime();
    return null;
  }
  // ---------------- Save Note When Edit ------------------------

  // ---------------- Add New Note ------------------------
  const noteId = new Uint32Array(1);
  crypto.getRandomValues(noteId);
  const notes = getFromStorage("notes") || state.notes;
  const newNote = {
    id: noteId[0],
    title: addNoteTitle.value,
    content,
    markup,
    content,
    markup,
    date: state.date,
    time: state.time,
    complate: true,
    tags,
    edit: false,
    order: notes.length ?? +1,
  };
  const newNotes = notes ? [newNote, ...notes] : [newNote, ...state.notes];
  renderNotes(newNotes);
  addToStorage(newNotes);
  resetAddNote();
  timeNote.innerText = state.time;
  dateNote.innerText = state.date;
  // ---------------- Add New Note ------------------------
}
// ______________________________________________________________
const clearNoteHandler = () => {
  const addNoteContainer = document.querySelector("#add-note__container");
  if (addNoteContainer.innerText != false) {
    addNoteContainer.innerText = "";
  } else {
    resetAddNote();
  }
};

// ______________________________________________________________
function setCursorEditable(editableElem, index, position = 1) {
  let range = document.createRange();
  let sel = window.getSelection();
  range.setStart(editableElem.childNodes[index], position);
  range.collapse(true);

  sel.removeAllRanges();
  sel.addRange(range);
  editableElem.focus();
}
// ______________________________________________________________
function tagNoteHandler() {
  state.tagMode = !state.tagMode;
  const addNoteContainer = document.querySelector("#add-note__container");
  const addNoteContent =
    addNoteContainer.children[addNoteContainer.childElementCount - 1];
  const span = document.createElement("span");
  span.classList.add("add-note__statement");
  span.innerText = " ";
  const tag = document.createElement("span");
  tag.classList.add("add-note__tag");
  tag.innerText = "#";
  addNoteContent.appendChild(tag);
  addNoteContent.appendChild(span);
  setCursorEditable(tag, 0, 1);
}
// ______________________________________________________________
function pointNoteHandler() {
  state.addPoint = true;
  state.listMode = false;
  const addNoteContainer = document.querySelector("#add-note__container");
  const div = document.createElement("div");
  div.classList.add("point-container");
  const h2 = document.createElement("h2");
  h2.classList.add("add-note__heading");
  h2.innerHTML = "&nbsp";
  h2.style.minHeight = "30px";
  const p = document.createElement("p");
  p.classList.add("add-note__content");
  p.innerHTML = "&nbsp";
  div.appendChild(h2);
  div.appendChild(p);
  addNoteContainer.appendChild(div);
  setCursorEditable(h2, 0, 0);
}
// ______________________________________________________________
function fullViewHandler() {
  state.fullView = !state.fullView;
  document.querySelector(".full-view--false").classList.toggle("hidden");
  document.querySelector(".full-view--true").classList.toggle("hidden");
  document.querySelector(".body-index").classList.toggle("full-view");
  if (sideNotes.classList.contains("hide-notes-aside")) return null;
  toggleSideNotes();
}
function listNoteHandler(e) {
  if (!state.listMode) {
    const addNoteContainer = document.querySelector("#add-note__container");
    const list = document.createElement("ol");
    const listItem = document.createElement("li");
    list.style.listStyleType = "A";
    list.classList.add("add-note__list");
    listItem.classList.add("add-note__list-item");
    listItem.innerHTML = "&nbsp";
    list.appendChild(listItem);
    addNoteContainer.appendChild(list);
    setCursorEditable(listItem, 0, 0);
  } else {
    const div = document.createElement("div");
    div.innerHTML = "&nbsp";
    addNoteContainer.appendChild(div);
    setCursorEditable(div, 0, 0);
  }
  state.listMode = !state.listMode;
}
// ______________________________________________________________
saveNote.addEventListener("click", addNoteHandler);
// ______________________________________________________________
clearNote.addEventListener("click", clearNoteHandler);
// ______________________________________________________________
tagNote.addEventListener("click", tagNoteHandler);
// ______________________________________________________________
pointNote.addEventListener("click", pointNoteHandler);
// ______________________________________________________________
addNoteFullView.addEventListener("click", fullViewHandler);
listNote.addEventListener("click", listNoteHandler);
