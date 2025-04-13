"use strict";
import state from "./modle.js";
import View from "./views/addNoteView.js";
//______________________________________________________________;
function loadNotesHandler() {
  state.loadNotes(View.renderPrevNotes.bind(View), {
    getMode: state.getMode.bind(state),
    toggleMode: state.toggleMode.bind(state),
    editPrevNotes: state.editPrevNotes.bind(state),
    deletePrevNote: state.deletePrevNote.bind(state),
    updateNotes: state.updateNotes.bind(state),
    getNotes: state.getNotes.bind(state),
  });
}
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
View.listNotesHandler(state.getMode.bind(state), state.toggleMode.bind(state));
View.toggleFullViewHandler(
  state.toggleMode.bind(state),
  state.getMode.bind(state)
);
View.tagNoteHandler(state.toggleMode.bind(state));
View.resetAddNoteHandler(state.toggleMode.bind(state));
View.togglePointHandler(
  state.getMode.bind(state),
  state.toggleMode.bind(state)
);
View.pointNoteHandler(state.toggleMode.bind(state), state.getMode.bind(state));
