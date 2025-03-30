import {
  showTimeOnEditHandler,
  saveNoteHandler,
  resetAddNoteHandler,
  tagNoteHandler,
  togglePointHandler,
  pointNoteHandler,
  fullViewHandler,
  listNoteHandler,
} from "../index.js";
import { renderPrevNotes } from "./sideNoteView.js";

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
const dateContainer = document.getElementById("date-container");
const dateNote = document.getElementById("date-note");
const timeNote = document.getElementById("time-note");
// ------------ Functions ---------------------------------------
export function showTimeOnEdit(editMode) {
  // Show Date & Time only on editMode
  if (editMode) {
    dateContainer.classList.remove("hidden");
  } else {
    dateContainer.classList.add("hidden");
  }
}
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
    const newNotes = saveNoteOnEdit({ title, content, markup, tags });
    // Render to the View
    renderPrevNotes(newNotes);
    resetAddNoteHandler();
    showTimeOnEditHandler(showTimeOnEdit);
    return null;
  }
  // ---------------- Save Note When Edit ------------------------

  // ---------------- Add New Note ------------------------
  const newNotes = addNote({ title, content, markup, tags });

  // Render to the View
  renderPrevNotes(newNotes);
  resetAddNoteHandler();
  timeNote.innerText = time;
  dateNote.innerText = date;
  // ---------------- Add New Note ------------------------
}
// ______________________________________________________________
const clearNoteHandler = () => {
  const addNoteContainer = document.querySelector("#add-note__container");
  if (addNoteContainer.innerText != false) {
    addNoteContainer.innerText = "";
  } else {
    resetAddNoteHandler();
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
export function tagNote(toggleTagMode) {
  toggleTagMode();
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
  toggleListMode(false);
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
  document.querySelector(".full-view--false").classList.toggle("hidden");
  document.querySelector(".full-view--true").classList.toggle("hidden");
  document.querySelector(".body-index").classList.toggle("full-view");
  if (sideNotes.classList.contains("hide-notes-aside")) return null;
  toggleSideNotes();
}
// ______________________________________________________________
export function listNote(e, listMode, toggleListMode) {
  if (!listMode) {
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
}
// ______________________________________________________________
export function togglePoint(e, pointMode, togglePointMode) {
  if (e.key == "Enter") {
    if (pointMode) {
      e.preventDefault();
      const addNoteContentNodes =
        document.querySelectorAll(".add-note__content");
      const addNoteContent =
        addNoteContentNodes[addNoteContentNodes.length - 1];
      const length = addNoteContentNodes.length - 1;
      setCursorEditable(addNoteContent, 0, 0);
    }
    togglePointMode(false);
  }
}
//____________________________________________________
saveNoteBtn.addEventListener("click", (event) => {
  saveNoteHandler(event);
});
// ______________________________________________________________
clearNoteBtn.addEventListener("click", clearNoteHandler);
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
