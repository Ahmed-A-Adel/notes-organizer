import { View } from "./View.js";

//------------ Main section Add Note & Side Note ---------------
const addNoteTitle = document.getElementById("add-note__title");
const dateNote = document.getElementById("date-note");
const timeNote = document.getElementById("time-note");
const sideNotesBtn = document.querySelector(".side-notes__btn");

class SideNoteView extends View {
  //------------ Main section Add Note & Side Note ---------------
  constructor() {
    super();
  }
  // ______________________________________________________________
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
  toggleSideOnFull() {
    // ----------------------------------------------------------------
    const fullViewMode = this.getMode("fullViewMode");
    const sideNotesMode = this.getMode("sideNotesMode");
    if (fullViewMode && sideNotesMode) this.toggleSideNotes();

    if (!fullViewMode && !sideNotesMode) this.toggleSideNotes(this.toggleMode);
  }
  // ______________________________________________________________
  prevNoteHandler(e) {
    // Either Edit or Delete Need Refactor
    const target = e.target;
    const currentTarget = e.currentTarget;
    switch (target.classList[0]) {
      case "prev-note__delete":
        this.deleteSideNote(currentTarget.id);
        break;
      default:
        this.editSideNote(currentTarget);
    }
  }

  // ______________________________________________________________
  // editSideNote(target) {
  editSideNote(target, editMode) {
    const notes = this.getNotes();
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
      const notes = this.editPrevNotes(note, id);
      this.updateNotes(notes);
      this.resetAddNote();
      // --------- Animation ------------------
      pen.classList.remove("pen-in");
      line.classList.remove("pen-line-in");
      prevNoteContent.classList.remove("span-content");
      // --------- Animation ------------------
      this.toggleMode("editMode", false);
      console.log(this);
      this.showTimeOnEdit();
    } else {
      // _______ Display current Note _________
      addNoteTitle.value = note.title;
      container.innerHTML = note.markup;
      const notes = this.editPrevNotes(note, id);
      console.log(note, notes);
      this.updateNotes(notes);
      // --------- Animation ------------------
      pen.classList.add("pen-in");
      line.classList.add("pen-line-in");
      prevNoteContent.classList.add("span-content");
      // --------- Animation ------------------
      // --------- Display Date & Time --------
      timeNote.innerText = note.time;
      dateNote.innerText = note.date;
      this.toggleMode("editMode", true);
      this.showTimeOnEdit();
    }
  }
  // ______________________________________________________________
  deleteSideNote(id) {
    const notes = this.getNotes();
    const newNotes = this.deletePrevNotes(id);
    const note = notes.filter((note) => note.id == id)[0];
    // +++ Save the animation of edit note
    if (note.edit) {
      this.resetAddNote();
    }
    this.renderPrevNotes(newNotes);
  }
  // ______________________________________________________________
  toggleSideNotes() {
    // Any visual effect should be knowing in the State!!!
    sideNotesBtn.parentElement.previousElementSibling.classList.toggle(
      "span-add-note"
    );
    sideNotesBtn.parentElement.classList.toggle("hide-notes-aside");
    sideNotesBtn.nextElementSibling.classList.toggle("hide-notes-list");
    sideNotesBtn.classList.toggle("hide-notes-btn");
    this.toggleMode("sideNotesMode");
  }
  // ______________________________________________________________

  toggleSideNotesHandler() {
    sideNotesBtn.addEventListener("click", () => {
      this.toggleSideNotes();
    });
  }
}
export default new SideNoteView();
