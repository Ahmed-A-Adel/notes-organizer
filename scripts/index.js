// ------------ Nav List ---------------------------------------
const saveNote = document.getElementById("add-note__save");
const listNote = document.getElementById("add-note__list");
const tagNote = document.getElementById("add-note__tag");
const doneNote = document.getElementById("add-note__done");
const clearNote = document.getElementById("add-note__clear");
const editNote = document.getElementById("edit-note");
const deleteNote = document.getElementById("delete-note");
const colorNote = document.getElementById("color-note");
const prevNote = document.getElementsByClassName(".prev-note");
//------------ Main section Add Note & Side Note ---------------
const addNote = document.getElementById("add-note");
const addNoteTitle = document.getElementById("add-note__title");
const addNoteContent = document.getElementById("add-note__content");
const sideNotes = document.getElementById("side-notes");
const sideNotesList = document.getElementById("side-notes__list");
// ------------ App State --------------------------------------
const state = {
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
};

// ------------ Functions ---------------------------------------
const notesToHtml = (notes) =>
  notes
    .map(
      (note) => `<li tabindex="8" class="prev-note" id='${note.id}'>
      <span tabindex="9" class="prev-note__edit">
      <div class="edit__icon">&#9998;
      <div class="edit__line"></div>
      </div>
      </span>
      <span tabindex="10" class="prev-note__delete">&#10006;</span>

      <span class="prev-note__title"> ${note.title}</span>
    </li>`
    )
    .join(" ");

// ______________________________________________________________
function renderNotes(notes) {
  state.notes = notes.sort((a, b) => a.order > b.order);
  sideNotesList.innerHTML = notesToHtml(notes);
  addNoteTitle.value = "";
  addNoteContent.value = "";
}
// ______________________________________________________________
function loadNotes() {
  const notes = notesToHtml(state.notes);
  sideNotesList.innerHTML = notes;
}
// ______________________________________________________________
function addNoteHandler(event) {
  event.preventDefault();
  // --------------------------------------------------------------
  if (
    /^\s/.test(addNoteTitle.value, "g") ||
    /^\s/.test(addNoteContent.value, "g")
  )
    return null;
  // --------------------------------------------------------------
  if (!addNoteTitle.value && !addNoteContent.value) return null;
  // --------------------------------------------------------------
  if (state.notes.some((note) => note.edit)) {
    const tags = addNoteContent.value
      .split(" ")
      .filter((tag) => tag[0] === "#");
    const notes = state.notes.map((note) =>
      note.edit
        ? {
            ...note,
            title: addNoteTitle.value,
            content: addNoteContent.value,
            edit: false,
            tags,
          }
        : note
    );
    renderNotes(notes);
    return null;
  }
  // --------------------------------------------------------------

  const noteId = new Uint32Array(1);
  crypto.getRandomValues(noteId);
  const tags = addNoteContent.value.split(" ").filter((tag) => tag[0] === "#");
  const newNote = {
    id: noteId,
    title: addNoteTitle.value,
    content: addNoteContent.value,
    complate: true,
    tags,
    edit: false,
    order: state.notes.length ?? +1,
  };
  const notes = [newNote, ...state.notes];
  renderNotes(notes);
}
// ______________________________________________________________
const clearNoteHandler = () => {
  if (addNoteContent.value !== "") addNoteContent.value = "";
  else addNoteTitle.value = "";
};
// ______________________________________________________________
function editSideNote(id, pen) {
  const note = state.notes.filter((note) => note.id == id)[0];
  const notes = [
    ...state.notes
      .filter((note) => note.id != id)
      .map((note) => {
        return { ...note, edit: false };
      }),
    { ...note, edit: !note.edit },
  ];

  //--------------------------------------------------------
  const pens = document.getElementsByClassName("pen-in");
  const lines = document.getElementsByClassName("pen-line-in");
  for (const pen of pens) {
    pen.classList.remove("pen-in");
  }
  for (const line of lines) {
    line.classList.remove("pen-line-in");
  }

  if (note.edit) {
    addNoteTitle.value = "";
    addNoteContent.value = "";
    state.notes = notes;
    pen.icon.classList.remove("pen-in");
    pen.line.classList.remove("pen-line-in");
  } else {
    addNoteTitle.value = note.title;
    addNoteContent.value = note.content;
    state.notes = notes;
    pen.icon.classList.add("pen-in");
    pen.line.classList.add("pen-line-in");
  }
}
// ______________________________________________________________
function deleteSideNote(id) {
  const note = state.notes.filter((note) => note.id == id)[0];
  const notes = [...state.notes.filter((note) => note.id != id)];
  const notesHtml = notesToHtml(notes);
  // --------------------------------------------------------
  if (note.edit) {
    addNoteTitle.value = "";
    addNoteContent.value = "";
    state.notes = notes;
    sideNotesList.innerHTML = notesHtml;
  } else {
    state.notes = notes;
    sideNotesList.innerHTML = notesHtml;
  }
}
// ______________________________________________________________
function sideNotesHandler(e) {
  const target = e.target;
  const actionElement = target.parentElement;
  const parentNote = target.parentElement.parentElement;

  switch (target.classList[0]) {
    case "prev-note__delete":
      deleteSideNote(actionElement.id);
      break;

    case "edit__icon":
      editSideNote(parentNote.id, {
        icon: target,
        line: target.firstElementChild,
        target,
      });
      break;

    case "edit__line":
      editSideNote(parentNote.parentElement.id, {
        line: target,
        icon: target.parentElement,
        target,
      });
  }
}
// ______________________________________________________________

//------------ Events Lesteners ---------------------------------
window.addEventListener("load", loadNotes);
// ______________________________________________________________
saveNote.addEventListener("click", addNoteHandler);
// ______________________________________________________________
clearNote.addEventListener("click", clearNoteHandler);
// ______________________________________________________________
sideNotesList.addEventListener("click", sideNotesHandler);
// ______________________________________________________________
