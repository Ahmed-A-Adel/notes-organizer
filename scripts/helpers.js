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
  try {
    if (!name) throw new Error("name is not defined ✨");
    const itemsString = JSON.stringify(items);
    localStorage.setItem(name, itemsString);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
//______________________________________________________________
export function getFromStorage(name) {
  try {
    const itemsObj = JSON.parse(localStorage.getItem(name));
    if (!itemsObj || itemsObj == null)
      throw new Error(`items of ${name} are not defined ✨`);
    return itemsObj;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
