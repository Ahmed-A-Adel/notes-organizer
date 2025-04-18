"use strict";
import state from "./modle.js";
import addNoteView from "./views/addNoteView.js";
import sideNoteView from "./views/sideNoteView.js";
//______________________________________________________________;
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
function init() {
  addNoteView.setDefault(stateMethods);
  sideNoteView.setDefault(stateMethods);
  sideNoteView.toggleSideNotesHandler();
  sideNoteView.toggleSideOnFullHandler();
  addNoteView.addNoteHandler();
  addNoteView.saveNoteHandler(
    state.saveNoteOnEdit.bind(state),
    state.addNote.bind(state),
    sideNoteView.renderPrevNotes.bind(sideNoteView)
  );
  addNoteView.listNotesHandler();
  addNoteView.toggleFullViewHandler();
  addNoteView.tagNoteHandler();
  addNoteView.clearAddNoteHandler();
  addNoteView.togglePointHandler();
  addNoteView.pointNoteHandler();
  addNoteView.addNoteHandler();
}
//------------ Event Listeners ---------------------------------
window.addEventListener("load", loadNotesHandler);
//------------ Event Listeners ---------------------------------
init();
// form.onsubmit = addNoteView.addNoteHandler;
