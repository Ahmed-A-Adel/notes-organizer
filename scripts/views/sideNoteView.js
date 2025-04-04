import {
  showTimeOnEditHandler,
  resetAddNoteHandler,
  editSideNoteHandler,
  deleteSideNoteHandler,
  toggleSideNotesHandler,
} from "../index.js";
import { showTimeOnEdit } from "./addNoteView.js";

//------------ Main section Add Note & Side Note ---------------
const sideNotesBtn = document.querySelector(".side-notes__btn");
const sideNotesList = document.getElementById("side-notes__list");
const dateNote = document.getElementById("date-note");
const timeNote = document.getElementById("time-note");
const addNoteTitle = document.getElementById("add-note__title");
//------------ Main section Add Note & Side Note ---------------
// ------------ Functions ---------------------------------------
// ______________________________________________________________
function prevNoteHandler(e) {
  // Either Edit or Delete Need Refactor
  const target = e.target;
  const currentTarget = e.currentTarget;

  switch (target.classList[0]) {
    case "prev-note__delete":
      deleteSideNoteHandler(currentTarget.id);
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
export function renderPrevNotes(notes) {
  // only the first 10 notes to show in the sidebar
  sideNotesList.innerHTML = "";
  generatePrevNotes(notes.slice(0, 10)).map((note) =>
    sideNotesList.insertAdjacentElement("beforeend", note)
  );
}

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
    resetAddNoteHandler();
    // --------- Animation ------------------
    pen.classList.remove("pen-in");
    line.classList.remove("pen-line-in");
    prevNoteContent.classList.remove("span-content");
    // --------- Animation ------------------
    toggleEditMode(false);
    showTimeOnEditHandler(showTimeOnEdit);
  } else {
    // _______ Display current Note _________
    addNoteTitle.value = note.title;
    container.innerHTML = note.markup;
    editPrevNotes(note, id);
    // --------- Animation ------------------
    pen.classList.add("pen-in");
    line.classList.add("pen-line-in");
    prevNoteContent.classList.add("span-content");
    // --------- Animation ------------------
    // --------- Display Date & Time --------
    timeNote.innerText = note.time;
    dateNote.innerText = note.date;
    toggleEditMode(true);
    showTimeOnEditHandler(showTimeOnEdit);
  }
}
// ______________________________________________________________
export function deleteSideNote(id, notes, deletePrevNote) {
  // +++ Save the animation of edit note
  const note = notes.filter((note) => note.id == id)[0];
  const newNotes = deletePrevNote(id);
  if (note.edit) {
    resetAddNoteHandler();
  }
  renderPrevNotes(newNotes);
}
// ______________________________________________________________
export function toggleSideNotes(toggleSideNotesMode) {
  // Any visual effect should be knowing in the State!!!
  sideNotesBtn.parentElement.previousElementSibling.classList.toggle(
    "span-add-note"
  );
  sideNotesBtn.parentElement.classList.toggle("hide-notes-aside");
  sideNotesBtn.nextElementSibling.classList.toggle("hide-notes-list");
  sideNotesBtn.classList.toggle("hide-notes-btn");
  toggleSideNotesMode();
}

// ______________________________________________________________
sideNotesBtn.addEventListener("click", toggleSideNotesHandler);
