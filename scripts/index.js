"use strict";
import { state, loadNotes } from "./modle.js";
import {
  showTimeOnEdit,
  resetAddNote,
  saveNote,
  tagNote,
  togglePoint,
  pointNote,
  fullView,
  listNote,
} from "./views/addNoteView.js";
import {
  editSideNote,
  deleteSideNote,
  renderPrevNotes,
} from "./views/sideNoteView.js";

//------------ Main section Add Note & Side Note ---------------
const addNoteTitle = document.getElementById("add-note__title");
//------------ Main section Add Note & Side Note ---------------

//------------ Functions ---------------------------------------
export function showTimeOnEditHandler() {
  showTimeOnEdit(state.editMode);
}
//______________________________________________________________;
export function saveNoteHandler(event) {
  saveNote(
    event,
    state.notes,
    state.time,
    state.date,
    state.saveNoteOnEdit.bind(state),
    state.addNote.bind(state)
  );
}
//______________________________________________________________;
export function resetAddNoteHandler() {
  resetAddNote(state.toggleEditMode.bind(state));
}
//______________________________________________________________;
export function editSideNoteHandler(target) {
  editSideNote(
    target,
    state.notes,
    state.editPrevNotes.bind(state),
    state.toggleEditMode.bind(state)
  );
}
//______________________________________________________________;
export function deleteSideNoteHandler(id) {
  deleteSideNote(id, state.notes, state.deletePrevNote.bind(state));
}
//______________________________________________________________;
export function tagNoteHandler() {
  tagNote(state.toggleTagMode);
}
//______________________________________________________________;
export function togglePointHandler(e) {
  togglePoint(e, state.pointMode, state.togglePointMode.bind(state));
}
//______________________________________________________________;
export function pointNoteHandler(e) {
  pointNote(
    state.togglePointMode.bind(state),
    state.toggleListMode.bind(state)
  );
}
//______________________________________________________________;
export function fullViewHandler(e) {
  fullView(state.toggleViewMode.bind(state));
  //______________________________________________________________;
}
export function listNoteHandler(e) {
  listNote(e, state.listMode, state.toggleListMode.bind(state));
}
//______________________________________________________________;
function loadNotesHandler() {
  loadNotes(addNoteTitle, renderPrevNotes);
}
//------------ Functions ---------------------------------------

//------------ Event Listeners ---------------------------------
window.addEventListener("load", loadNotesHandler);
//------------ Event Listeners ---------------------------------
