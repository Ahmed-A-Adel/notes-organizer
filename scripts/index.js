"use strict";
import {
  deletePrevNote,
  editPrevNotes,
  getMode,
  getNotes,
  loadNotes,
  toggleMode,
  updateNotes,
  addNote,
  saveNoteOnEdit,
} from "./modle.js";
import addNoteView from "./views/addNoteView.js";
import sideNoteView from "./views/sideNoteView.js";
import view from "./views/View.js";
//______________________________________________________________;
// Take the common methods and props from all views to a single parent view.
// Shared fileds name yet specefic to one class would give us a true power of using inherited methods from parent without defining them
const stateMethods = {
  getMode: getMode,
  toggleMode: toggleMode,
  editPrevNotes: editPrevNotes,
  deletePrevNote: deletePrevNote,
  updateNotes: updateNotes,
  getNotes: getNotes,
};
// const stateMethods = {
//   getMode: state.getMode.bind(state),
//   toggleMode: state.toggleMode.bind(state),
//   editPrevNotes: state.editPrevNotes.bind(state),
//   deletePrevNote: state.deletePrevNote.bind(state),
//   updateNotes: state.updateNotes.bind(state),
//   getNotes: state.getNotes.bind(state),
// };
//______________________________________________________________;
function loadNotesHandler() {
  loadNotes(sideNoteView.renderPrevNotes.bind(sideNoteView));
  // state.loadNotes(sideNoteView.renderPrevNotes.bind(sideNoteView));
}
//______________________________________________________________;
// Filter view methods to do only one specific action and the left actions like updateding the state and side effects will be handled here in the contoller
// the methods that doesn't need callBAck handler should be called in the view constructor
function controlSaveNote(props, edit = false) {
  let newNotes = edit ? saveNoteOnEdit(props) : addNote(props);
  // let newNotes = edit ? state.saveNoteOnEdit(props) : state.addNote(props);
  sideNoteView.renderPrevNotes(newNotes);
  updateNotes(newNotes);
  // state.updateNotes(newNotes);
}
//_____________________________________________________`_________;

function init() {
  view.setDefault(stateMethods);
  addNoteView.setDefault(stateMethods);
  sideNoteView.setDefault(stateMethods);
  sideNoteView.toggleSideNotesHandler();
  addNoteView.saveNoteHandler(controlSaveNote);
}
//------------ Event Listeners ---------------------------------
window.addEventListener("load", loadNotesHandler);
//------------ Event Listeners ---------------------------------
init();
