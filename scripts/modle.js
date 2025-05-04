import { addToStorage, getFromStorage } from "./helpers.js";
class State {
  darkmode = false;
  editMode = false;
  listMode = false;
  tagMode = false;
  pointMode = false;
  fullViewMode = false;
  sideNotesMode = true;
  listItems = [];
  date = "";
  time = "";
  constructor() {
    this.notes = [
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
    ];
  }

  addNote(props) {
    // Custom made ID
    const noteId = new Uint32Array(1);
    crypto.getRandomValues(noteId);
    // Custom made ID

    const newNote = {
      id: noteId[0],
      date: this.date,
      time: this.time,
      complate: true,
      edit: false,
      order: this.notes.length ?? +1,
      ...props,
    };
    const newNotes = [newNote, ...this.notes];

    addToStorage("notes", newNotes);
    this.notes = newNotes;
    return newNotes;
  }
  saveNoteOnEdit(props) {
    const note = this.notes.filter((note) => note.edit)[0];
    const slicedNotes = this.notes.filter((note) => !note.edit);
    const newNotes = [
      {
        ...note,
        ...props,
        edit: false,
      },
      ...slicedNotes,
    ];

    addToStorage("notes", newNotes);
    this.notes = newNotes;
    this.toggleMode("editMode");
    return newNotes;
  }
  editPrevNotes(note, id) {
    // Save editNote (animation) on reload !!
    const notes = [
      ...this.notes
        .filter((note) => note.id != id)
        .map((note) => {
          return { ...note, edit: false };
        }),
      { ...note, edit: !note.edit },
    ];
    this.notes = notes;
    return notes;
  }
  deletePrevNote(id) {
    const notes = [...state.notes.filter((note) => note.id != id)];
    state.notes = notes;
    addToStorage("notes", notes);
    return notes;
  }

  toggleMode(name, value = "") {
    const oldValue = state[name];
    const inValue = typeof value == "boolean" ? value : !oldValue;
    this[name] = inValue;
  }
  getMode(name) {
    const value = this[name];
    console.log("getMode", name, ":", value);
    return value;
  }
  loadNotes(renderPrevNotes) {
    const notes = getFromStorage("notes") || this.notes;
    renderPrevNotes(notes);
    this.notes = notes;
  }
  updateNotes(notes) {
    this.notes = notes;
    return notes;
  }
  getNotes() {
    return this.notes;
  }
}

const state = new State();
//______________________________________________________________
setInterval(() => {
  const dateObject = new Date();
  const date = dateObject.toLocaleDateString();
  const time = dateObject.toLocaleTimeString();
  const timeOutSec = `${time.split(" ")[0].slice(0, 5)} ${time.split(" ")[1]}`;
  state.date = date;
  state.time = timeOutSec;
}, 1000);
//______________________________________________________________
export default state;
