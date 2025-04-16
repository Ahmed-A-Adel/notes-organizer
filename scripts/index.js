"use strict";
import state from "./modle.js";
import addNoteView from "./views/addNoteView.js";
import sideNoteView from "./views/sideNoteView.js";
//______________________________________________________________;
function loadNotesHandler() {
  // state.loadNotes(addNoteView.renderPrevNotes.bind(addNoteView), {
  //   getMode: state.getMode.bind(state),
  //   toggleMode: state.toggleMode.bind(state),
  //   editPrevNotes: state.editPrevNotes.bind(state),
  //   deletePrevNote: state.deletePrevNote.bind(state),
  //   updateNotes: state.updateNotes.bind(state),
  //   getNotes: state.getNotes.bind(state),
  // });
  state.loadNotes(sideNoteView.renderPrevNotes.bind(sideNoteView));
}
// addNoteView({
//   getMode: state.getMode.bind(state),
//   toggleMode: state.toggleMode.bind(state),
//   editPrevNotes: state.editPrevNotes.bind(state),
//   deletePrevNote: state.deletePrevNote.bind(state),
//   updateNotes: state.updateNotes.bind(state),
//   getNotes: state.getNotes.bind(state),
// });
addNoteView.setDefault({
  getMode: state.getMode.bind(state),
  toggleMode: state.toggleMode.bind(state),
  editPrevNotes: state.editPrevNotes.bind(state),
  deletePrevNote: state.deletePrevNote.bind(state),
  updateNotes: state.updateNotes.bind(state),
  getNotes: state.getNotes.bind(state),
});
sideNoteView.setDefault({
  getMode: state.getMode.bind(state),
  toggleMode: state.toggleMode.bind(state),
  editPrevNotes: state.editPrevNotes.bind(state),
  deletePrevNote: state.deletePrevNote.bind(state),
  updateNotes: state.updateNotes.bind(state),
  getNotes: state.getNotes.bind(state),
});
//------------ Event Listeners ---------------------------------
window.addEventListener("load", loadNotesHandler);
//------------ Event Listeners ---------------------------------
sideNoteView.toggleSideNotesHandler(state.toggleMode.bind(state));
// addNoteView.toggleSideNotesHandler(state.toggleMode.bind(state));
addNoteView.saveNoteHandler(
  state.notes,
  state.time,
  state.date,
  state.saveNoteOnEdit.bind(state),
  state.addNote.bind(state),
  sideNoteView.renderPrevNotes.bind(sideNoteView)
);
addNoteView.listNotesHandler(
  state.getMode.bind(state),
  state.toggleMode.bind(state)
);
addNoteView.toggleFullViewHandler(
  state.toggleMode.bind(state),
  state.getMode.bind(state)
);
addNoteView.tagNoteHandler(state.toggleMode.bind(state));
addNoteView.resetAddNoteHandler(state.toggleMode.bind(state));
addNoteView.togglePointHandler(
  state.getMode.bind(state),
  state.toggleMode.bind(state)
);
addNoteView.pointNoteHandler(
  state.toggleMode.bind(state),
  state.getMode.bind(state)
);
sideNoteView.toggleSideOnFullHandler();
