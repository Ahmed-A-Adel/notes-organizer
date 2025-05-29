import { setCursorEditable } from "../helpers.js";

const addNoteContainer = document.getElementById("add-note__container");
const addNoteTitle = document.getElementById("add-note__title");
const dateContainer = document.getElementById("date-container");
const sideNotesList = document.getElementById("side-notes__list");

export class View {
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
  // showTimeOnEdit() {
  showTimeOnEdit() {
    // change name to toggleTime
    // Make it toggles despites editMode
    // Show Date & Time only on editMode
    if (this.getMode("editMode")) {
      dateContainer.classList.remove("hidden");
    } else {
      dateContainer.classList.add("hidden");
    }
  }
  //_________________________________________________________
  resetAddNote(editMode) {
    const addNoteContent = document.createElement("p");
    addNoteContainer.innerHTML = "";
    addNoteTitle.value = "";
    addNoteContent.classList.add("#add-note__content");
    addNoteContent.innerHTML = "&nbsp";
    addNoteContainer.appendChild(addNoteContent);
    setCursorEditable(addNoteContent, 0, 0);
    this.toggleMode("editMode", false);
    this.showTimeOnEdit(editMode);
  }
  //_________________________________________________________
  generatePrevNotes(notes) {
    // +++ 1- Refactor this  to be more generic
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

      prevNote.addEventListener("click", (e) => this.prevNoteHandler(e, notes));
      return prevNote;
    });
    return prevNotes;
  }

  // ______________________________________________________________
  renderPrevNotes(notes = {}) {
    // only the first 10 notes to show in the sidebar

    // this.generatePrevNotes(notes.slice(0, 10)).map((note) =>
    //   sideNotesList.insertAdjacentElement("beforeend", note)
    // );

    // show all notes instead of only just 10
    sideNotesList.innerHTML = "";
    this.generatePrevNotes(notes).map((note) =>
      sideNotesList.insertAdjacentElement("beforeend", note)
    );
    addNoteTitle.focus();
  }
}
export default new View();
