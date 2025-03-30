import { addToStorage, getFromStorage } from "./helpers.js";
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
  pointMode: false,
  fullView: false,
  listItems: [],
  date: "",
  time: "",
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
  },
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
    this.toggleEditMode();
    return newNotes;
  },
  editPrevNotes(note, id) {
    // Save editNote (animation) on reload !!
    const notes = [
      ...state.notes
        .filter((note) => note.id != id)
        .map((note) => {
          return { ...note, edit: false };
        }),
      { ...note, edit: !note.edit },
    ];
    this.notes = notes;
  },
  deletePrevNote(id) {
    const notes = [...state.notes.filter((note) => note.id != id)];
    state.notes = notes;
    addToStorage("notes", notes);
    return notes;
  },
  toggleEditMode(boolean = !this.editMode) {
    this.editMode = boolean;
  },
  toggleListMode(boolean = !this.listMode) {
    this.listMode = boolean;
  },
  togglePointMode(boolean = !this.pointMode) {
    this.pointMode = boolean;
  },
  toggleViewMode(boolean = !this.fullView) {
    this.fullView = boolean;
  },
  toggleTagMode(boolean = !this.tagMode) {
    this.tagMode = boolean;
  },
};
// //______________________________________________________________
// export function addToStorage(items,name) {
//   const itemsString = JSON.stringify(items);
//   localStorage.setItem(name, itemsString);
// }
// //______________________________________________________________
// export function getFromStorage(name) {
//   const itemsObj = JSON.parse(localStorage.getItem(name));
//   return itemsObj;
// }
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
export function loadNotes(addNoteTitle, renderPrevNotes) {
  const notes = getFromStorage("notes") || state.notes;
  renderPrevNotes(notes);
  state.notes = notes;
  addNoteTitle.focus();
}
