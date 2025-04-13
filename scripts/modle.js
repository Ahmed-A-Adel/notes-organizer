import { addToStorage, getFromStorage } from "./helpers.js";
// transform state object into class and transform gloabl functions into class methods
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
    console.log("addNote", this);
    return newNotes;
  }
  saveNoteOnEdit(props) {
    const note = this.notes.filter((note) => note.edit)[0];
    const slicedNotes = this.notes.filter((note) => !note.edit);
    const newNotes = [
      {
        ...note,
        ...props,
        // id: note.id,
        date: this.date,
        time: this.time,
        complate: true,
        edit: false,
        order: this.notes.length ?? +1,
      },
      ...slicedNotes,
    ];

    addToStorage("notes", newNotes);
    this.notes = newNotes;
    this.toggleMode("editMode");
    console.log(this, "saveNoteOnEdit");
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
    // console.log("edit notes", this.notes, note, id);
    this.notes = notes;
    console.log("editPrevNotes", this);
    return notes;
  }
  deletePrevNote(id) {
    const notes = [...state.notes.filter((note) => note.id != id)];
    state.notes = notes;
    addToStorage("notes", notes);
    console.log("deletePrevNote", this);
    return notes;
  }
  // group all handlers into one generic one that set the state
  // toggleEditMode(boolean = !this.editMode) {
  //   this.editMode = boolean;
  //   return boolean;
  // }
  // toggleListMode(boolean = !this.listMode) {
  //   this.listMode = boolean;
  //   return boolean;
  // }
  // togglePointMode(boolean = !this.pointMode) {
  //   this.pointMode = boolean;
  //   return boolean;
  // }
  // toggleViewMode(boolean = !this.fullViewMode) {
  //   this.fullViewMode = boolean;
  //   return boolean;
  // }
  // toggleTagMode(boolean = !this.tagMode) {
  //   this.tagMode = boolean;
  //   return boolean;
  // }
  // toggleSideNotesMode(boolean = !this.sideNotesMode) {
  //   this.sideNotesMode = boolean;
  //   return boolean;
  // }
  toggleMode(name, value = "", newNotes = {}) {
    const oldValue = state[name];
    const inValue = typeof value == "boolean" ? value : !oldValue;
    this[name] = inValue;
    // ---------- Only toggling mode NO state mutation!!! --------

    // const newState = newNotes
    //   ? (state = { ...state, ...newNotes, [name]: inValue })
    //   : (state = { ...state, [name]: inValue });
    // const newState = { ...state, ...newNotes, [name]: inValue };
    // newNotes[0] ? (this.notes = newNotes) : "";
    console.log("toggleMode", this);
    // return this.notes;
    // console.log("old Value", oldValue, "new", inValue);
  }
  getMode(name) {
    const value = this[name];
    console.log("getMode", name, ":", value);
    return value;
  }
  loadNotes(renderPrevNotes, handlersObj) {
    // this function should be in the controller (index.js)
    const notes = getFromStorage("notes") || this.notes;
    renderPrevNotes(notes, handlersObj);
    this.notes = notes;
    console.log("loadNotes", this);
  }
  updateNotes(notes) {
    this.notes = notes;
    return notes;
  }
  getNotes() {
    return this.notes;
  }
}

// export function toggleMode(name, value = "", newNotes = {}) {
//   const oldValue = state[name];
//   const inValue = typeof value == "boolean" ? value : !oldValue;
//   // const newState = newNotes
//   //   ? (state = { ...state, ...newNotes, [name]: inValue })
//   //   : (state = { ...state, [name]: inValue });
//   // const newState = { ...state, ...newNotes, [name]: inValue };
//   state[name] = inValue;
//   console.log(state);
//   newNotes[0] ? (state.notes = newNotes) : "";
//   console.log(state);
//   return state.notes;
//   // console.log("old Value", oldValue, "new", inValue);
// }
// export function getMode(name) {
//   const value = state[name];
//   // console.log(name, ":", value);
//   return value;
// }
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
// export function loadNotes(renderPrevNotes, handlersObj) {
//   // this function should be in the controller (index.js)
//   const notes = getFromStorage("notes") || state.notes;
//   renderPrevNotes(notes, handlersObj);
//   state.notes = notes;
//   console.log(notes);
// }
export default state;
