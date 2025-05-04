"use strict";
import state from "./modle.js";
import addNoteView from "./views/addNoteView.js";
import sideNoteView from "./views/sideNoteView.js";
//______________________________________________________________;
// Take the common methods and props from all views to a single parent view.
// Shared fileds name yet specefic to one class would give us a true power of using inherited methods from parent without defining them
const stateMethods = {
  getMode: state.getMode.bind(state),
  toggleMode: state.toggleMode.bind(state),
  editPrevNotes: state.editPrevNotes.bind(state),
  deletePrevNote: state.deletePrevNote.bind(state),
  updateNotes: state.updateNotes.bind(state),
  getNotes: state.getNotes.bind(state),
};
//______________________________________________________________;
function loadNotesHandler() {
  state.loadNotes(sideNoteView.renderPrevNotes.bind(sideNoteView));
}
//______________________________________________________________;
// Filter view methods to do only one specific action and the left actions like updateding the state and side effects will be handled here in the contoller
// the methods that doesn't need callBAck handler should be called in the view constructor
function controlAddNote(props, edit = false) {
  let newNotes = edit ? state.saveNoteOnEdit(props) : state.addNote(props);
  sideNoteView.renderPrevNotes(newNotes);
  state.updateNotes(newNotes);
}
//_____________________________________________________`_________;

function init() {
  addNoteView.setDefault(stateMethods);
  sideNoteView.setDefault(stateMethods);
  sideNoteView.toggleSideNotesHandler();
  sideNoteView.toggleSideOnFullHandler();
  // addNoteView.addNoteHandler(
  //   state.saveNoteOnEdit.bind(state),
  //   state.addNote.bind(state),
  //   sideNoteView.renderPrevNotes.bind(sideNoteView)
  // );
  addNoteView.saveNoteHandler(controlAddNote);
  // addNoteView.saveNoteHandler(
  //   state.saveNoteOnEdit.bind(state),
  //   state.addNote.bind(state),
  //   sideNoteView.renderPrevNotes.bind(sideNoteView)
  // );
  addNoteView.listNotesHandler();
  addNoteView.toggleFullViewHandler();
  addNoteView.tagNoteHandler();
  addNoteView.clearAddNoteHandler();
  addNoteView.togglePointHandler();
  addNoteView.pointNoteHandler();
  // addNoteView.addNoteHandler(controlAddNote);
}
//------------ Event Listeners ---------------------------------
window.addEventListener("load", loadNotesHandler);
//------------ Event Listeners ---------------------------------
init();
