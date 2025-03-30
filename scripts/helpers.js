export function setCursorEditable(editableElem, index, position = 1) {
  let range = document.createRange();
  let sel = window.getSelection();
  range.setStart(editableElem.childNodes[index], position);
  range.collapse(true);

  sel.removeAllRanges();
  sel.addRange(range);
  editableElem.focus();
}
//______________________________________________________________
export function addToStorage(name, items) {
  const itemsString = JSON.stringify(items);
  localStorage.setItem(name, itemsString);
}
//______________________________________________________________
export function getFromStorage(name) {
  const itemsObj = JSON.parse(localStorage.getItem(name));
  return itemsObj;
}
