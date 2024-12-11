// ------------ Nav List ---------------------------------------
const saveNote = document.getElementById("note__save");
const listNote = document.getElementById("note__add-list");
const pointNote = document.getElementById("note__add-point");
const tagNote = document.getElementById("note__add-tag");
const clearNote = document.getElementById("note__clear");
const editNote = document.getElementById("edit-note");
const deleteNote = document.getElementById("delete-note");
const colorNote = document.getElementById("color-note");
const prevNote = document.getElementsByClassName(".prev-note");
//------------ Main section Add Note & Side Note ---------------
const addNote = document.getElementById("add-note");
const addNoteContainer = document.getElementById("add-note__container");
const addNoteTitle = document.getElementById("add-note__title");
const addNoteContent = document.querySelector(".add-note__content");
const addNoteInput = document.getElementById("add-note__input");
const addNoteList = document.querySelector(".add-note__list");
const addNoteFullView = document.querySelector("#note__full-view");
const addNoteNav = document.querySelector(".add-note__nav");
const sideNotes = document.getElementById("side-notes");
const sideNotesBtn = document.querySelector(".side-notes__btn");
const sideNotesList = document.getElementById("side-notes__list");
const timeNow = document.getElementById("time-now");
const timeNote = document.getElementById("time-note");
const dateNow = document.getElementById("date-now");
const dateNote = document.getElementById("date-note");
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
  listMode: false,
  tagMode: false,
  addPoint: false,
  fullView: false,
  listItems: [],
  date: "",
  time: "",
};

// ------------ Functions ---------------------------------------
function addTime(date) {
  state.date = date.toLocaleDateString();
  state.time = date.toLocaleTimeString();
  dateNow.innerText = date.toLocaleDateString();
  timeNow.innerText = date.toLocaleTimeString();
}
const callAddTime = setInterval(() => {
  const date = new Date();
  addTime(date);
});

// ______________________________________________________________
function toggleTime(time) {
  switch (time) {
    case "note":
      timeNow.classList.add("remove");
      dateNow.classList.add("remove");
      timeNote.classList.remove("remove");
      dateNote.classList.remove("remove");
      break;
    case "now":
      timeNow.classList.remove("remove");
      dateNow.classList.remove("remove");
      timeNote.classList.add("remove");
      dateNote.classList.add("remove");
  }
}
// ______________________________________________________________
const notesToHtml = (notes) =>
  notes
    .map((note) => {
      const content = note.content.split(" ").slice(0, 9).join(" ");
      return `<li tabindex="8" class="prev-note" id='${note.id}'>
        <div class="btn-container">
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
      }"</span>
    </li>`;
    })
    .join(" ");
// ______________________________________________________________
function addToStorage(notes) {
  const notesString = JSON.stringify(notes);
  localStorage.setItem("notes", notesString);
}
function getFromStorage(notes) {
  const notesObj = JSON.parse(localStorage.getItem(notes));
  return notesObj;
}
// ______________________________________________________________
function resetAddNote(title = true) {
  const addNoteContainer = document.querySelector("#add-note__container");
  addNoteContainer.innerHTML = "";
  const addNoteContent = document.createElement("p");
  addNoteContent.classList.add("add-note__content");
  addNoteContent.innerHTML = "&nbsp";
  addNoteContainer.appendChild(addNoteContent);
  setCursorEditable(addNoteContent, 0, 0);
  if (title) {
    const addNoteTitle = document.getElementById("add-note__title");
    addNoteTitle.value = "";
  }
}
// ______________________________________________________________
function renderNotes(notes) {
  state.notes = notes;
  // only the first 10 notes to show in the sidebar
  sideNotesList.innerHTML = notesToHtml(notes.slice(0, 10));
}
// ______________________________________________________________
function loadNotes() {
  const notes = getFromStorage("notes") || state.notes;
  renderNotes(notes);
  addNoteTitle.focus();
}

// ______________________________________________________________
function addNoteHandler(event) {
  event.preventDefault();
  const markup = document.querySelector("#add-note__container").innerHTML;
  const content = document.querySelector("#add-note__container").innerText;
  const tags = content.split(" ").filter((tag) => tag[0] === "#");

  // ---------------- Authntication ------------------------------
  if (/^\s/.test(addNoteTitle.value, "g")) return null;
  // -------------------------------------------------------------
  if (!addNoteTitle.value) return null;
  // ---------------- Authntication ------------------------------

  // ---------------- Save Note When Edit ------------------------
  if (state.notes.some((note) => note.edit)) {
    const note = state.notes.filter((note) => note.edit)[0];
    const slicedNotes = state.notes.filter((note) => !note.edit);
    const notes = [
      {
        ...note,
        title: addNoteTitle.value,
        content: content,
        markup,
        edit: false,
        tags,
      },
      ...slicedNotes,
    ];
    renderNotes(notes);
    addToStorage(notes);
    toggleTime("now");
    resetAddNote();
    return null;
  }
  // ---------------- Save Note When Edit ------------------------

  // ---------------- Add New Note ------------------------
  const noteId = new Uint32Array(1);
  crypto.getRandomValues(noteId);
  const notes = getFromStorage("notes") || state.notes;
  const newNote = {
    id: noteId[0],
    title: addNoteTitle.value,
    content,
    markup,
    content,
    markup,
    date: state.date,
    time: state.time,
    complate: true,
    tags,
    edit: false,
    order: notes.length ?? +1,
  };
  const newNotes = notes ? [newNote, ...notes] : [newNote, ...state.notes];
  renderNotes(newNotes);
  addToStorage(newNotes);
  resetAddNote();
  timeNote.innerText = state.time;
  dateNote.innerText = state.date;
  // ---------------- Add New Note ------------------------
}
// ______________________________________________________________
const clearNoteHandler = () => {
  const addNoteContainer = document.querySelector("#add-note__container");
  if (addNoteContainer.innerText != false) {
    resetAddNote(false);
  } else {
    addNoteTitle.value = "";
  }
};
// ______________________________________________________________
function editSideNote(id, pen) {
  const pens = document.getElementsByClassName("pen-in");
  const lines = document.getElementsByClassName("pen-line-in");
  const note = state.notes.filter((note) => note.id == id)[0];
  const container = document.querySelector("#add-note__container");
  const notes = [
    ...state.notes
      .filter((note) => note.id != id)
      .map((note) => {
        return { ...note, edit: false };
      }),
    { ...note, edit: !note.edit },
  ];
  for (const pen of pens) {
    pen.classList.remove("pen-in");
  }
  for (const line of lines) {
    line.classList.remove("pen-line-in");
  }

  // ____________ Reset AddNote inputes _______
  if (note.edit) {
    state.notes = notes;
    resetAddNote();
    // --------- Animation ------------------
    pen.icon.classList.remove("pen-in");
    pen.line.classList.remove("pen-line-in");
    // --------- Animation ------------------
    toggleTime("now");
  } else {
    // _______ Display current Note _________
    addNoteTitle.value = note.title;
    container.innerHTML = note.markup;
    state.notes = notes;
    // --------- Animation ------------------
    pen.icon.classList.add("pen-in");
    pen.line.classList.add("pen-line-in");
    // --------- Animation ------------------
    // --------- Display Date & Time --------
    timeNote.innerText = note.time;
    dateNote.innerText = note.date;
    toggleTime("note");
  }
}
// ______________________________________________________________
function deleteSideNote(id) {
  const note = state.notes.filter((note) => note.id == id)[0];
  const notes = [...state.notes.filter((note) => note.id != id)];
  const notesHtml = notesToHtml(notes.slice(0, 10));

  // --------------------------------------------------------
  if (note.edit) {
    resetAddNote();
    resetAddNote();
  }
  state.notes = notes;
  addToStorage(notes);
  sideNotesList.innerHTML = notesHtml;
}
// ______________________________________________________________
function sideNotesHandler(e) {
  const target = e.target;
  const actionElement = target.parentElement.parentElement;
  const parentNote = target.parentElement.parentElement.parentElement;
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
      break;
  }
}

// ______________________________________________________________
function toggleSideNotes() {
  sideNotesBtn.parentElement.previousElementSibling.classList.toggle(
    "span-add-note"
  );
  sideNotesBtn.parentElement.classList.toggle("hide-notes-aside");
  sideNotesBtn.nextElementSibling.classList.toggle("hide-notes-list");
  sideNotesBtn.classList.toggle("hide-notes-btn");
}
// ______________________________________________________________
function hideSideNotes() {
  sideNotesBtn.parentElement.previousElementSibling.classList.add(
    "span-add-note"
  );
  sideNotesBtn.parentElement.classList.add("hide-notes-aside");
  sideNotesBtn.nextElementSibling.classList.add("hide-notes-list");
  sideNotesBtn.classList.add("hide-notes-btn");
}
// ______________________________________________________________
function setCursorEditable(editableElem, index, position = 1) {
  let range = document.createRange();
  let sel = window.getSelection();
  range.setStart(editableElem.childNodes[index], position);
  range.collapse(true);

  sel.removeAllRanges();
  sel.addRange(range);
  editableElem.focus();
}
// ______________________________________________________________
function tagNoteHandler() {
  state.tagMode = !state.tagMode;
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
function pointNoteHandler() {
  state.addPoint = true;
  state.listMode = false;
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
function fullViewHandler() {
  state.fullView = !state.fullView;
  document.querySelector(".full-view--false").classList.toggle("hidden");
  document.querySelector(".full-view--true").classList.toggle("hidden");
  document.querySelector(".body-index").classList.toggle("full-view");
  if (sideNotes.classList.contains("hide-notes-aside")) return null;
  toggleSideNotes();
}
// ______________________________________________________________
window.addEventListener("load", loadNotes);
// ______________________________________________________________
saveNote.addEventListener("click", addNoteHandler);
// ______________________________________________________________
clearNote.addEventListener("click", clearNoteHandler);
// ______________________________________________________________
sideNotes.addEventListener("click", sideNotesHandler);
// ______________________________________________________________
sideNotesBtn.addEventListener("click", toggleSideNotes);
// ______________________________________________________________
tagNote.addEventListener("click", tagNoteHandler);
// ______________________________________________________________
pointNote.addEventListener("click", pointNoteHandler);
// ______________________________________________________________
sideNotesBtn.addEventListener("click", toggleSideNotes);
// ______________________________________________________________
addNoteFullView.addEventListener("click", fullViewHandler);
// ______________________________________________________________
listNote.addEventListener("click", (e) => {
  if (!state.listMode) {
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
  state.listMode = !state.listMode;
});
// ______________________________________________________________
// window.addEventListener("keypress", (e) => {
//   if (
//     e.target.parentElement.className == "add-note__list__item" &&
//     e.key === "Enter"
//   ) {
//     const listItem = document.createElement("li");
//     // const input = document.createElement("input");
//     // listItem.appendChild(input);
//     listItem.tabIndex = 2;
//     listItem.contentEditable = true;
//     listItem.classList.add("add-note__list__item");
//     addNoteList.appendChild(listItem);
//     addNoteList.children[addNoteList.children.length - 1].children[0].focus();
//   }
//   // else if (e.key === "Enter") {
//   //   e.preventDefault();
//   // }
// });
// ______________________________________________________________

// addNoteContainer.addEventListener("keypress", (e) => {
//   if (state.tagMode) {
//     if (e.key == " ") {
//       const addNoteContainer = document.querySelector("#add-note__container");
//       const addNoteContent =
//         addNoteContainer.children[addNoteContainer.childElementCount - 1];

//       // addNoteContent.innerHTML.slice(0, -4);
//       const length = addNoteContent.childNodes.length - 1;
//       setCursorEditable(addNoteContent, length);

//       state.tagMode = false;
//     }
//   }
// });
addNoteContainer.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    if (state.addPoint) {
      e.preventDefault();
      const addNoteContentNodes =
        document.querySelectorAll(".add-note__content");
      const addNoteContent =
        addNoteContentNodes[addNoteContentNodes.length - 1];
      console.log(addNoteContentNodes, addNoteContent);
      const length = addNoteContentNodes.length - 1;
      setCursorEditable(addNoteContent, 0, 0);
    }
    state.addPoint = false;
  }
});
// on click on addNoteContainer set the addNoteContentNode index
