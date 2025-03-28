// import { state } from "../modle.js";
import {
  showTimeOnEditHandler,
  saveNoteHandler,
  resetAddNoteHandler,
  editSideNoteHandler,
  deleteSideNoteHandler,
  tagNoteHandler,
  togglePointHandler,
  pointNoteHandler,
  fullViewHandler,
  listNoteHandler,
} from "../index.js";

// ------------ Nav List ---------------------------------------
const saveNoteBtn = document.getElementById("note__save");
const listNoteBtn = document.getElementById("note__add-list");
const pointNoteBtn = document.getElementById("note__add-point");
const tagNoteBtn = document.getElementById("note__add-tag");
const clearNoteBtn = document.getElementById("note__clear");
//------------ Main section Add Note & Side Note ---------------
const addNoteContainer = document.getElementById("add-note__container");
export const addNoteTitle = document.getElementById("add-note__title");
const addNoteFullView = document.querySelector("#note__full-view");
const sideNotes = document.getElementById("side-notes");
const sideNotesBtn = document.querySelector(".side-notes__btn");
const sideNotesList = document.getElementById("side-notes__list");
const dateContainer = document.getElementById("date-container");
const dateNote = document.getElementById("date-note");
const timeNote = document.getElementById("time-note");
// ------------ Functions ---------------------------------------
export function showTimeOnEdit(editMode) {
  // Show Date & Time only on editMode
  // if (state.editMode) {
  if (editMode) {
    dateContainer.classList.remove("hidden");
  } else {
    dateContainer.classList.add("hidden");
  }
}
// ______________________________________________________________
function prevNoteHandler(e) {
  // Either Edit or Delete Need Refactor
  const target = e.target;
  const currentTarget = e.currentTarget;

  switch (target.classList[0]) {
    case "prev-note__delete":
      deleteSideNoteHandler(currentTarget.id);
      // deleteSideNote(currentTarget.id);
      break;
    default:
      editSideNoteHandler(currentTarget);
  }
}
// ______________________________________________________________
const generatePrevNotes = (notes) => {
  // +++ 1- Refactor this function to be more generic
  // +++ 2- add DOM elements and HTML markup as Class props
  const prevNotes = notes.map((note) => {
    // Create prevNote element to inject html in it
    const prevNote = document.createElement("li");
    prevNote.classList.add("prev-note");
    prevNote.id = note.id;
    // Create prevNote element to inject html in it

    const content = note.content.split(" ").slice(0, 9).join(" ");
    const prevNoteChildren = `<div class="btn-container">
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

    prevNote.innerHTML = prevNoteChildren;

    prevNote.addEventListener("click", prevNoteHandler);
    return prevNote;
  });
  return prevNotes;
};
// ______________________________________________________________
export function resetAddNote(toggleEditMode) {
  const addNoteContainer = document.querySelector("#add-note__container");
  const addNoteContent = document.createElement("p");
  const addNoteTitle = document.getElementById("add-note__title");
  addNoteContainer.innerHTML = "";
  addNoteTitle.value = "";
  addNoteContent.classList.add("add-note__content");
  addNoteContent.innerHTML = "&nbsp";
  addNoteContainer.appendChild(addNoteContent);
  setCursorEditable(addNoteContent, 0, 0);
  toggleEditMode(false);
  // state.toggleEditMode(false);
}
// ______________________________________________________________
export function renderPrevNotes(notes) {
  // only the first 10 notes to show in the sidebar
  sideNotesList.innerHTML = "";
  generatePrevNotes(notes.slice(0, 10)).map((note) =>
    sideNotesList.insertAdjacentElement("beforeend", note)
  );
}
// ______________________________________________________________
export function saveNote(event, notes, time, date, saveNoteOnEdit, addNote) {
  event.preventDefault();
  const title = document.getElementById("add-note__title").value;
  const content = document.querySelector("#add-note__container").innerText;
  const markup = document.querySelector("#add-note__container").innerHTML;
  const tags = content.split(" ").filter((tag) => tag[0] === "#");

  // ---------------- Authntication ------------------------------
  if (/^\s/.test(addNoteTitle.value, "g")) return null;
  // -------------------------------------------------------------
  if (!addNoteTitle.value) return null;
  // ---------------- Authntication ------------------------------

  // ---------------- Save Note When Edit ------------------------
  if (notes.some((note) => note.edit)) {
    // if (state.notes.some((note) => note.edit)) {
    const newNotes = saveNoteOnEdit({ title, content, markup, tags });
    // const newNotes = state.saveNoteOnEdit({ title, content, markup, tags });
    // Render to the View
    renderPrevNotes(newNotes);
    // resetAddNote();
    resetAddNoteHandler();
    showTimeOnEditHandler(showTimeOnEdit);
    return null;
  }
  // ---------------- Save Note When Edit ------------------------

  // ---------------- Add New Note ------------------------
  const newNotes = addNote({ title, content, markup, tags });
  // const newNotes = state.addNote({ title, content, markup, tags });
  // Render to the View
  renderPrevNotes(newNotes);
  // resetAddNote();
  resetAddNoteHandler();
  timeNote.innerText = time;
  // timeNote.innerText = state.time;
  dateNote.innerText = date;
  // dateNote.innerText = state.date;
  // ---------------- Add New Note ------------------------
}
// ______________________________________________________________
const clearNoteHandler = () => {
  const addNoteContainer = document.querySelector("#add-note__container");
  if (addNoteContainer.innerText != false) {
    addNoteContainer.innerText = "";
  } else {
    // resetAddNote();
    resetAddNoteHandler();
  }
};

// ______________________________________________________________
export function editSideNote(target, notes, editPrevNotes, toggleEditMode) {
  const id = target.id;
  const pen = target.querySelector(".edit__icon");
  const line = target.querySelector(".edit__line");
  const pens = document.getElementsByClassName("pen-in");
  const lines = document.getElementsByClassName("pen-line-in");
  const prevNotesContent = document.querySelectorAll(".prev-note__content");
  const prevNoteContent = target.querySelector(".prev-note__content");
  const note = notes.filter((note) => note.id == id)[0];
  // const note = state.notes.filter((note) => note.id == id)[0];
  const container = document.querySelector("#add-note__container");
  // Remove animation classes for pens & lines & prev-contents
  for (const pen of pens) {
    pen.classList.remove("pen-in");
  }
  for (const line of lines) {
    line.classList.remove("pen-line-in");
  }
  for (const noteContent of prevNotesContent) {
    noteContent.classList.remove("span-content");
  }

  // ____________ Reset AddNote inputes _______
  if (note.edit) {
    editPrevNotes(note, id);
    // state.editPrevNotes(note, id);
    // resetAddNote();
    resetAddNoteHandler();
    // --------- Animation ------------------
    pen.classList.remove("pen-in");
    line.classList.remove("pen-line-in");
    prevNoteContent.classList.remove("span-content");
    // --------- Animation ------------------
    toggleEditMode(false);
    // state.toggleEditMode(false);
    showTimeOnEditHandler(showTimeOnEdit);
  } else {
    // _______ Display current Note _________
    addNoteTitle.value = note.title;
    container.innerHTML = note.markup;
    editPrevNotes(note, id);
    // state.editPrevNotes(note, id);
    // --------- Animation ------------------
    pen.classList.add("pen-in");
    line.classList.add("pen-line-in");
    prevNoteContent.classList.add("span-content");
    // --------- Animation ------------------
    // --------- Display Date & Time --------
    timeNote.innerText = note.time;
    dateNote.innerText = note.date;
    toggleEditMode(true);
    // state.toggleEditMode(true);
    showTimeOnEditHandler(showTimeOnEdit);
  }
}
// ______________________________________________________________
export function deleteSideNote(id, notes, deletePrevNote) {
  // +++ Save the animation of edit note
  const note = notes.filter((note) => note.id == id)[0];
  // const note = state.notes.filter((note) => note.id == id)[0];
  const newNotes = deletePrevNote(id);
  // const notes = state.deletePrevNote(id);
  if (note.edit) {
    // resetAddNote();
    resetAddNoteHandler();
  }
  renderPrevNotes(newNotes);
}
// ______________________________________________________________
function toggleSideNotes() {
  // Any visual effect should be knowing in the State!!!
  sideNotesBtn.parentElement.previousElementSibling.classList.toggle(
    "span-add-note"
  );
  sideNotesBtn.parentElement.classList.toggle("hide-notes-aside");
  sideNotesBtn.nextElementSibling.classList.toggle("hide-notes-list");
  sideNotesBtn.classList.toggle("hide-notes-btn");
}
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
export function tagNote(toggleTagMode) {
  toggleTagMode();
  // state.tagMode();
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
export function pointNote(togglePointMode, toggleListMode) {
  togglePointMode(true);
  // state.togglePointMode(true);
  toggleListMode(false);
  // state.toggleListMode(false);
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
export function fullView(toggleViewMode) {
  toggleViewMode();
  // state.toggleViewMode();
  document.querySelector(".full-view--false").classList.toggle("hidden");
  document.querySelector(".full-view--true").classList.toggle("hidden");
  document.querySelector(".body-index").classList.toggle("full-view");
  if (sideNotes.classList.contains("hide-notes-aside")) return null;
  toggleSideNotes();
}
// ______________________________________________________________
export function listNote(e, listMode, toggleListMode) {
  if (!listMode) {
    // if (!state.listMode) {
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
  toggleListMode();
  // state.toggleListMode();
}
// ______________________________________________________________
export function togglePoint(e, pointMode, togglePointMode) {
  if (e.key == "Enter") {
    if (pointMode) {
      // if (state.pointMode) {
      e.preventDefault();
      const addNoteContentNodes =
        document.querySelectorAll(".add-note__content");
      const addNoteContent =
        addNoteContentNodes[addNoteContentNodes.length - 1];
      const length = addNoteContentNodes.length - 1;
      setCursorEditable(addNoteContent, 0, 0);
    }
    togglePointMode(false);
    // state.togglePointMode(false);
  }
}
//____________________________________________________
saveNoteBtn.addEventListener("click", (event) => {
  saveNoteHandler(event);
});
// ______________________________________________________________
clearNoteBtn.addEventListener("click", clearNoteHandler);
// ______________________________________________________________
sideNotesBtn.addEventListener("click", toggleSideNotes);
// ______________________________________________________________
tagNoteBtn.addEventListener("click", tagNoteHandler);
// ______________________________________________________________
pointNoteBtn.addEventListener("click", pointNoteHandler);
// ______________________________________________________________
addNoteFullView.addEventListener("click", fullViewHandler);
//______________________________________________________________
listNoteBtn.addEventListener("click", listNoteHandler);
// ______________________________________________________________
addNoteContainer.addEventListener("keypress", togglePointHandler);
