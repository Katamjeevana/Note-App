const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");

getNotes().forEach((note) => {          //As when we refresh the page the content will not delete  
  const noteEl = createNoteEl(note.id, note.content);  // creating the same content in the local storage 
  appEl.insertBefore(noteEl, btnEl);     // Inserting the same data on web page which is created in the local storage 
});

function createNoteEl(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "Empty Note";
  element.value = content;

  element.addEventListener("dblclick", () => {
    const warning = confirm("Do you want to delete this note?");
    if (warning) {
      deleteNote(id, element);
    }
  });

  element.addEventListener("input", () => {
    updateNote(id, element.value);   //When we write something in text area ,to modify the content in the textarea we need to call this function
  });

  return element;
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id) // deleting the content in the local storage  
  saveNote(notes)
  appEl.removeChild(element)   //delete the content in the web browser 
}

function updateNote(id, content) {
  const notes = getNotes();
  const target = notes.filter((note) => note.id == id)[0];
  target.content = content;
  saveNote(notes);
}

function addNote() {
  const notes = getNotes();
  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };
  const noteEl = createNoteEl(noteObj.id, noteObj.content);
  appEl.insertBefore(noteEl, btnEl); //Insert noteE1 before btnE1 in appE1

  notes.push(noteObj);

  saveNote(notes);
}

function saveNote(notes) {                // saveNotes is to save the created content in thee local storage 
  localStorage.setItem("note-app", JSON.stringify(notes));
}

function getNotes() {                     // getNotes is to bring the localstorage content
  return JSON.parse(localStorage.getItem("note-app") || "[]");
}

btnEl.addEventListener("click", addNote);


//saveNotes and the getNotes are the communication between the local storage and the web browser