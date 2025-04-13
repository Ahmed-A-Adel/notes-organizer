"use strict";
import state from "./modle.js";
import View from "./views/addNoteView.js"; // addNoteTitle, //
//  listNote, // fullView, // pointNote, // togglePoint, // tagNote, // saveNote, // resetAddNote, // showTimeOnEdit,
// import // editSideNote,
// // deleteSideNote,
// // renderPrevNotes,
// // toggleSideNotes,
// "./views/sideNoteView.js";

//------------ Main section Add Note & Side Note ---------------
// const addNoteTitle = document.getElementById("add-note__title");
//------------ Main section Add Note & Side Note ---------------

//------------ Functions ---------------------------------------
// export function showTimeOnEditHandler() {
//   showTimeOnEdit(state.editMode);
// }
//______________________________________________________________;
// export function saveNoteHandler(event) {
//   saveNote(
//     event,
//     state.notes,
//     state.time,
//     state.date,
//     state.saveNoteOnEdit.bind(state),
//     state.addNote.bind(state)
//   );
// }
//______________________________________________________________;
// export function resetAddNoteHandler() {
//   resetAddNote(state.toggleEditMode.bind(state));
// }
//______________________________________________________________;
// export function editSideNoteHandler(target) {
//   editSideNote(
//     target,
//     state.notes,
//     state.editPrevNotes.bind(state).bind(state),
//     state.toggleEditMode.bind(state)
//   );
// }
//______________________________________________________________;
// export function deleteSideNoteHandler(id) {
//   deleteSideNote(id, state.notes, state.deletePrevNote.bind(state).bind(state));
// }
//______________________________________________________________;
// export function tagNoteHandler() {
//   tagNote(state.toggleTagMode);
// }
//______________________________________________________________;
// export function togglePointHandler(e) {
//   togglePoint(e, state.pointMode, state.togglePointMode.bind(state));
// }
//______________________________________________________________;
// export function pointNoteHandler(e) {
//   pointNote(
//     state.togglePointMode.bind(state),
//     state.toggleListMode.bind(state)
//   );
// }
//______________________________________________________________;
// export function fullViewHandler(e) {
//   fullView(
//     state.toggleViewMode.bind(state),
//     state.fullView,
//     state.sideNotesMode
//   );
//   //______________________________________________________________;
// }
// export function listNoteHandler(e) {
//   listNote(e, state.listMode, state.toggleListMode.bind(state));
// }
//______________________________________________________________;
// export function toggleSideNotesHandler() {
//   toggleSideNotes(state.toggleSideNotesMode.bind(state));
// }
//______________________________________________________________;
function loadNotesHandler() {
  state.loadNotes(
    View.renderPrevNotes.bind(View),
    // state.editPrevNotes.bind(state).bind(state),
    // state.deletePrevNote.bind(state).bind(state)
    {
      getMode: state.getMode.bind(state),
      toggleMode: state.toggleMode.bind(state),
      editPrevNotes: state.editPrevNotes.bind(state),
      deletePrevNote: state.deletePrevNote.bind(state),
      updateNotes: state.updateNotes.bind(state),
      getNotes: state.getNotes.bind(state),
    }
  );
}
// console.log(state.editPrevNotes.bind(state));
//------------ Functions ---------------------------------------
// function togglePointMode(value = "") {
//   toggleMode("pointMode", value);
// }
// function toggleListMode(value = "") {
//   toggleMode("listMode", value);
// }
// function toggleFullViewMode(value = "") {
//   toggleMode("fullViewMode", value);
// }
// function toggleSideNotesMode(value = "") {
//   toggleMode("sideNotesMode", value);
// }
//------------ Event Listeners ---------------------------------
window.addEventListener("load", loadNotesHandler);
//------------ Event Listeners ---------------------------------
View.toggleSideNotesHandler(state.toggleMode.bind(state));
View.saveNoteHandler(
  state.notes,
  state.time,
  state.date,
  state.saveNoteOnEdit.bind(state),
  state.addNote.bind(state)
);
// View.sideNotesHandler(
//   state.notes,
//   state.editPrevNotes.bind(state).bind(state),
//   state.toggleEditMode.bind(state)
// );
View.deleteSideNoteHandler(
  state.notes,
  state.deletePrevNote.bind(state).bind(state)
);
//  deleteSideNote(id, state.notes, state.deletePrevNote.bind(state).bind(state));
View.listNotesHandler(state.getMode.bind(state), state.toggleMode.bind(state));
View.toggleFullViewHandler(
  // state.toggleViewMode.bind(state),
  state.toggleMode.bind(state),
  // state.fullView,
  // getMode("fullViewMode"),
  // state.sideNotesMode,
  // getMode("sideNotesMode"),
  // toggleSideNotesMode
  state.getMode.bind(state)
  // state.toggleSideNotesMode.bind(state)
);
View.tagNoteHandler(state.toggleMode.bind(state));
View.resetAddNoteHandler(state.toggleMode.bind(state));
View.togglePointHandler(
  state.getMode.bind(state),
  state.toggleMode.bind(state)
);
// View.togglePointHandler(state.pointMode, toggleMode);
View.pointNoteHandler(
  // togglePointMode,
  // toggleListMode,
  state.toggleMode.bind(state),
  state.getMode.bind(state)
  // getMode("pointMode"),
  // state
);
// View.pointNoteHandler(
//   // state.togglePointMode.bind(state),
//   state.toggleListMode.bind(state),
//   state.toggleListMode.bind(state),
//   state.pointMode,
//   state
// );
// View.togglePointHandler(state.pointMode, state.togglePointMode.bind(state));
