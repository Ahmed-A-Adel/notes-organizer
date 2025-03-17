const addNoteTitle = document.getElementById("add-note__title");
const dateContainer = document.getElementById("date-container");
import { renderPrevNotes } from "./index.js";
export const state = {
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
  editMode: false,
  listMode: false,
  tagMode: false,
  addPoint: false,
  fullView: false,
  listItems: [],
  date: "",
  time: "",
  setNotes(notes) {
    this.notes = notes;
  },
};
export function addToStorage(notes) {
  const notesString = JSON.stringify(notes);
  localStorage.setItem("notes", notesString);
}
export function getFromStorage(notes) {
  const notesObj = JSON.parse(localStorage.getItem(notes));
  return notesObj;
}
export function toggleTime() {
  // Show Date & Time only on editMode
  if (state.editMode) {
    dateContainer.classList.remove("hidden");
  } else {
    dateContainer.classList.add("hidden");
  }
}

setInterval(() => {
  const dateObject = new Date();
  const date = dateObject.toLocaleDateString();
  const time = dateObject.toLocaleTimeString();
  const timeOutSec = `${time.split(" ")[0].slice(0, 5)} ${time.split(" ")[1]}`;
  state.date = date;
  state.time = timeOutSec;
}, 1000);
function loadNotes() {
  const notes = getFromStorage("notes") || state.notes;
  renderPrevNotes(notes);
  addNoteTitle.focus();
}
//______________________________________________________________
window.addEventListener("load", loadNotes);
