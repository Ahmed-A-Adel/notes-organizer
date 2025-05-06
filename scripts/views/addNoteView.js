import { setCursorEditable } from "../helpers.js";
import sideNoteView from "./sideNoteView.js";
import { View } from "./View.js";
// ------------ Add Note Btn ----------------------------------
const saveNoteBtn = document.getElementById("note__save");
const listNoteBtn = document.getElementById("note__add-list");
const pointNoteBtn = document.getElementById("note__add-point");
const tagNoteBtn = document.getElementById("note__add-tag");
const clearNoteBtn = document.getElementById("note__clear");
// ------------ Add Note Btn ----------------------------------
//------------ Main section Add Note --------------------------
const addNoteForm = document.getElementById("add-note");
const addNoteContainer = document.getElementById("add-note__container");
const addNoteTitle = document.getElementById("add-note__title");
const addNoteFullView = document.querySelector("#note__full-view");
//------------ Main section Add Note --------------------------

export class AddNoteView extends View {
  constructor() {
    super();
    listNoteBtn.addEventListener("click", () => {
      this.listNote();
    });

    clearNoteBtn.addEventListener("click", () => {
      this.clearNote();
    });

    addNoteFullView.addEventListener("click", () => {
      this.toggleFullView();
      sideNoteView.toggleSideOnFull();
      console.log("click");
    });

    tagNoteBtn.addEventListener("click", () => {
      this.tagNote();
    });

    pointNoteBtn.addEventListener("click", () => {
      this.pointNote();
    });

    addNoteContainer.addEventListener("keypress", (e) => {
      this.togglePoint(e);
    });
  }
  setDefault(objectFileds) {
    // setting the default fields
    const {
      getMode,
      toggleMode,
      editPrevNotes,
      deletePrevNote,
      updateNotes,
      getNotes,
    } = objectFileds;
    this.getMode = getMode;
    this.toggleMode = toggleMode;
    this.editPrevNotes = editPrevNotes;
    this.deletePrevNotes = deletePrevNote;
    this.updateNotes = updateNotes;
    this.getNotes = getNotes;
  }
  // ______________________________________________________________
  saveNote(event, saveNote) {
    event.preventDefault();
    const title = document.getElementById("add-note__title").value;
    const content = document.querySelector("#add-note__container").innerText;
    const markup = document.querySelector("#add-note__container").innerHTML;
    const tags = content.split(" ").filter((tag) => tag[0] === "#");
    const notes = this.getNotes();
    // ---------------- Authntication ------------------------------
    if (/^\s/.test(addNoteTitle.value, "g")) return null;
    // -------------------------------------------------------------
    if (!addNoteTitle.value) return null;
    // ---------------- Authntication ------------------------------

    // ---------------- Save Note When Edit ------------------------
    if (notes.some((note) => note.edit)) {
      saveNote({ title, content, markup, tags }, true);
      this.showTimeOnEdit();
      this.resetAddNote();
      return null;
    }
    // ---------------- Save Note When Edit ------------------------

    // ---------------- Add New Note ------------------------
    saveNote({ title, content, markup, tags });
    this.resetAddNote();
    // ---------------- Add New Note ------------------------
  }
  // ______________________________________________________________
  clearNote = () => {
    const addNoteContainer = document.querySelector("#add-note__container");
    if (addNoteContainer.innerText != false) {
      addNoteContainer.innerText = "";
    } else {
      this.resetAddNote();
    }
  };
  // ______________________________________________________________
  tagNote() {
    this.toggleMode("tagMode");
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
  pointNote() {
    this.toggleMode("pointMode", true);
    this.toggleMode("listMode", false);

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
  toggleFullView() {
    // ----------------------------------------------------------------
    document.querySelector(".full-view--false").classList.toggle("hidden");
    document.querySelector(".full-view--true").classList.toggle("hidden");
    document.querySelector(".body-index").classList.toggle("full-view");
    this.toggleMode("fullViewMode");
  }
  // ______________________________________________________________
  listNote() {
    const listMode = this.getMode("listMode");
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
    this.toggleMode("listMode");
  }
  // ______________________________________________________________
  togglePoint(e) {
    const pointMode = this.getMode("pointMode");
    if (e.key == "Enter") {
      if (pointMode) {
        e.preventDefault();
        const addNoteContentNodes =
          document.querySelectorAll(".add-note__content");
        const addNoteContent =
          addNoteContentNodes[addNoteContentNodes.length - 1];
        const length = addNoteContentNodes.length - 1;
        setCursorEditable(addNoteContent, 0, 0);
        this.toggleMode("pointMode", false);
      }
    }
  }
  // ______________________________________________________________
  saveNoteHandler(saveNote) {
    addNoteForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.saveNote(event, saveNote);
    });
    saveNoteBtn.addEventListener("click", (event) => {
      this.saveNote(event, saveNote);
    });
  }
}
export default new AddNoteView();
