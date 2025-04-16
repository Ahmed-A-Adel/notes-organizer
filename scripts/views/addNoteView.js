import { setCursorEditable } from "../helpers.js";

// ------------ Add Note Btn ----------------------------------
const saveNoteBtn = document.getElementById("note__save");
const listNoteBtn = document.getElementById("note__add-list");
const pointNoteBtn = document.getElementById("note__add-point");
const tagNoteBtn = document.getElementById("note__add-tag");
const clearNoteBtn = document.getElementById("note__clear");
// ------------ Add Note Btn ----------------------------------
//------------ Main section Add Note & Side Note ---------------
const addNoteContainer = document.getElementById("add-note__container");
const addNoteTitle = document.getElementById("add-note__title");
const addNoteFullView = document.querySelector("#note__full-view");
const dateContainer = document.getElementById("date-container");
const dateNote = document.getElementById("date-note");
const timeNote = document.getElementById("time-note");
const sideNotesBtn = document.querySelector(".side-notes__btn");
const sideNotesList = document.getElementById("side-notes__list");
export class AddNoteView {
  deletePrevNotes;
  editPrevNotes;
  getMode;
  toggleMode;
  updateNotes;
  getNotes;
  constructor(props) {
    // this.getMode = props.getMode;
    // this.toggleMode = props.toggleMode;
    // this.editPrevNotes = props.editPrevNotes;
    // this.deletePrevNotes = props.deletePrevNote;
    // this.updateNotes = props.updateNotes;
    // this.getNotes = props.getNotes;
  }
  setDefault(objectFileds) {
    // setting the default fields
    //   if (handlersObj.getMode) {
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
    // }
  }

  //------------ Main section Add Note & Side Note ---------------
  // prevNoteHandler(e) {
  //   // Either Edit or Delete Need Refactor
  //   const target = e.target;
  //   const currentTarget = e.currentTarget;
  //   switch (target.classList[0]) {
  //     case "prev-note__delete":
  //       this.deleteSideNote(currentTarget.id);
  //       break;
  //     default:
  //       this.editSideNote(currentTarget);
  //   }
  // }
  // ______________________________________________________________
  // generatePrevNotes(notes) {
  //   // +++ 1- Refactor this  to be more generic
  //   // +++ 2- add DOM elements and HTML markup as Class props
  //   const prevNotes = notes.map((note) => {
  //     // Create prevNote element to inject html in it
  //     const prevNote = document.createElement("li");
  //     prevNote.classList.add("prev-note");
  //     prevNote.id = note.id;
  //     // Create prevNote element to inject html in it

  //     const content = note.content.split(" ").slice(0, 9).join(" ");
  //     const prevNoteChildren = `<div class="btn-container">
  //     <span  tabindex="9" title="edit" class="prev-note__edit">
  //     <button class="edit__icon">&9998;
  //     <div class="edit__line"></div>
  //     </button>
  //     </span>
  //     <button tabindex="10" title="delete" class="prev-note__delete">&10006;</button>
  //     </div>

  //     <span class="prev-note__title"> ${note.title}</span>
  //     <span class="prev-note__content hidden"> "${
  //       content || "waiting for inspiration"
  //     }"</span>`;

  //     prevNote.innerHTML = prevNoteChildren;

  //     prevNote.addEventListener("click", (e) => this.prevNoteHandler(e, notes));
  //     return prevNote;
  //   });
  //   return prevNotes;
  // }

  // ______________________________________________________________
  // renderPrevNotes(notes = {}, handlersObj = {}) {
  //   // only the first 10 notes to show in the sidebar
  //   sideNotesList.innerHTML = "";
  //   this.generatePrevNotes(notes.slice(0, 10)).map((note) =>
  //     sideNotesList.insertAdjacentElement("beforeend", note)
  //   );
  //   // setting the default fields
  //   if (handlersObj.getMode) {
  //     const {
  //       getMode,
  //       toggleMode,
  //       editPrevNotes,
  //       deletePrevNote,
  //       updateNotes,
  //       getNotes,
  //     } = handlersObj;
  //     this.getMode = getMode;
  //     this.toggleMode = toggleMode;
  //     this.editPrevNotes = editPrevNotes;
  //     this.deletePrevNotes = deletePrevNote;
  //     this.updateNotes = updateNotes;
  //     this.getNotes = getNotes;
  //   }
  //   addNoteTitle.focus();
  // }

  // ______________________________________________________________
  // editSideNote(target) {
  //   const notes = this.getNotes();
  //   const id = target.id;
  //   const pen = target.querySelector(".edit__icon");
  //   const line = target.querySelector(".edit__line");
  //   const pens = document.getElementsByClassName("pen-in");
  //   const lines = document.getElementsByClassName("pen-line-in");
  //   const prevNotesContent = document.querySelectorAll(".prev-note__content");
  //   const prevNoteContent = target.querySelector(".prev-note__content");
  //   const note = notes.filter((note) => note.id == id)[0];
  //   const container = document.querySelector("add-note__container");
  //   // Remove animation classes for pens & lines & prev-contents
  //   for (const pen of pens) {
  //     pen.classList.remove("pen-in");
  //   }
  //   for (const line of lines) {
  //     line.classList.remove("pen-line-in");
  //   }
  //   for (const noteContent of prevNotesContent) {
  //     noteContent.classList.remove("span-content");
  //   }
  //   // ____________ Reset AddNote inputes _______
  //   if (note.edit) {
  //     const notes = this.editPrevNotes(note, id);
  //     this.updateNotes(notes);
  //     this.resetAddNote();
  //     // --------- Animation ------------------
  //     pen.classList.remove("pen-in");
  //     line.classList.remove("pen-line-in");
  //     prevNoteContent.classList.remove("span-content");
  //     // --------- Animation ------------------
  //     this.toggleMode("editMode", false);
  //     this.showTimeOnEdit();
  //   } else {
  //     // _______ Display current Note _________
  //     addNoteTitle.value = note.title;
  //     container.innerHTML = note.markup;
  //     const notes = this.editPrevNotes(note, id);
  //     this.updateNotes(notes);
  //     // --------- Animation ------------------
  //     pen.classList.add("pen-in");
  //     line.classList.add("pen-line-in");
  //     prevNoteContent.classList.add("span-content");
  //     // --------- Animation ------------------
  //     // --------- Display Date & Time --------
  //     timeNote.innerText = note.time;
  //     dateNote.innerText = note.date;
  //     this.toggleMode("editMode", true);
  //     this.showTimeOnEdit();
  //   }
  // }
  // ______________________________________________________________
  // deleteSideNote(id) {
  //   const notes = this.getNotes();
  //   const newNotes = this.deletePrevNotes(id);
  //   const note = notes.filter((note) => note.id == id)[0];
  //   // +++ Save the animation of edit note
  //   if (note.edit) {
  //     this.resetAddNote();
  //   }
  //   this.renderPrevNotes(newNotes);
  // }
  // ______________________________________________________________
  // toggleSideNotes(toggleMode = "") {
  //   // Any visual effect should be knowing in the State!!!
  //   sideNotesBtn.parentElement.previousElementSibling.classList.toggle(
  //     "span-add-note"
  //   );
  //   sideNotesBtn.parentElement.classList.toggle("hide-notes-aside");
  //   sideNotesBtn.nextElementSibling.classList.toggle("hide-notes-list");
  //   sideNotesBtn.classList.toggle("hide-notes-btn");
  //   if (toggleMode) {
  //     toggleMode("sideNotesMode");
  //     this.toggleMode = toggleMode;
  //   } else this.toggleMode("sideNotesMode");
  // }
  // ______________________________________________________________
  showTimeOnEdit() {
    // change name to toggleTime
    // Show Date & Time only on editMode
    if (this.getMode("editMode")) {
      dateContainer.classList.remove("hidden");
    } else {
      dateContainer.classList.add("hidden");
    }
  }
  // ______________________________________________________________
  resetAddNote() {
    const addNoteContent = document.createElement("p");
    addNoteContainer.innerHTML = "";
    addNoteTitle.value = "";
    addNoteContent.classList.add("#add-note__content");
    addNoteContent.innerHTML = "&nbsp";
    addNoteContainer.appendChild(addNoteContent);
    setCursorEditable(addNoteContent, 0, 0);
    this.toggleMode("editMode", false);
    this.showTimeOnEdit();
  }
  // ______________________________________________________________
  saveNote(event, _, time, date, saveNoteOnEdit, addNote, renderPrevNotes) {
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
      const newNotes = saveNoteOnEdit({ title, content, markup, tags });
      // Render to the View
      renderPrevNotes(newNotes);
      this.resetAddNote();
      this.showTimeOnEdit();
      this.updateNotes(newNotes);
      console.log();
      return null;
    }
    // ---------------- Save Note When Edit ------------------------

    // ---------------- Add New Note ------------------------
    const newNotes = addNote({ title, content, markup, tags });
    // Render to the View
    renderPrevNotes(newNotes);
    this.resetAddNote();
    timeNote.innerText = time;
    dateNote.innerText = date;
    // ---------------- Add New Note ------------------------
    this.updateNotes(newNotes);
  }
  // ______________________________________________________________
  clearNote = () => {
    const addNoteContainer = document.querySelector("#add-note__container");
    if (addNoteContainer.innerText != false) {
      addNoteContainer.innerText = "";
    } else {
      // this.resetAddNote();
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
  toggleFullView(toggleMode, getMode) {
    this.toggleMode("fullViewMode");
    // ----------------------------------------------------------------
    document.querySelector(".full-view--false").classList.toggle("hidden");
    document.querySelector(".full-view--true").classList.toggle("hidden");
    document.querySelector(".body-index").classList.toggle("full-view");
    // // ----------------------------------------------------------------
    // const fullViewMode = getMode("fullViewMode");
    // const sideNotesMode = getMode("sideNotesMode");
    // if (fullViewMode && sideNotesMode) this.toggleSideNotes(toggleMode);

    // if (!fullViewMode && !sideNotesMode) this.toggleSideNotes(toggleMode);
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
  saveNoteHandler(notes, time, date, saveNoteOnEdit, addNote, renderPrevNotes) {
    saveNoteBtn.addEventListener("click", (event) => {
      this.saveNote(
        event,
        notes,
        time,
        date,
        saveNoteOnEdit,
        addNote,
        renderPrevNotes
      );
    });
  }
  // toggleSideNotesHandler(toggleMode) {
  //   sideNotesBtn.addEventListener("click", () => {
  //     this.toggleSideNotes(toggleMode);
  //   });
  // }
  listNotesHandler(getMode, toggleMode) {
    listNoteBtn.addEventListener("click", () => {
      this.listNote(getMode, toggleMode);
    });
  }
  clearNoteHandler(toggleMode) {
    clearNoteBtn.addEventListener("click", () => {
      clearNote(toggleMode);
    });
  }
  resetAddNoteHandler(toggleMode) {
    this.toggleMode = toggleMode;
  }
  toggleFullViewHandler(toggleMode, getMode) {
    addNoteFullView.addEventListener("click", () => {
      this.toggleFullView(toggleMode, getMode);
    });
  }
  tagNoteHandler(toggleMode) {
    tagNoteBtn.addEventListener("click", () => {
      this.tagNote(toggleMode);
    });
  }
  pointNoteHandler(toggleMode, getMode) {
    pointNoteBtn.addEventListener("click", () => {
      this.pointNote(toggleMode, getMode);
    });
  }
  togglePointHandler(pointMode, togglePointMode) {
    addNoteContainer.addEventListener("keypress", (e) => {
      this.togglePoint(e, pointMode, togglePointMode);
    });
  }
}
export default new AddNoteView();
