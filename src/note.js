
function createNote(title, content) {
  let _title = title;
  let _content = content;
  
  return {
    getTitle: () => { _title },
    getContent: () => { _content  },

    setTitle: (newTitle) => { _title = newTitle },
    setContent: (newContent) => { _content = newContent },
  }
}

const NoteManager = {
  /* 
    Centralized manager of notes
  */
  
  getTitle(note) {
    return note.getTitle();
  },

  getContent(note) {
    return note.getContent();
  },

  changeTitle(note, newTitle) {
    note.setTitle(newTitle);
  },

  changeContent(note, newContent) {
    note.setContent(newContent);
  }
}