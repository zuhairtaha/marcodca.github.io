"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
class Note {
    constructor(title, content, tags) {
        this.title = title;
        this.content = content;
        this.tags = tags;
    }

    //Validation by setters

    //Title
    set title(val) {
        if (!val || val.length > 35) {
            throw new Error("Title can't be empty, ar have more than 35 characters");
        }
        this._title = val;
    }

    get title() {
        return this._title;
    }

    //Content
    set content(valCont) {
        if (!valCont || valCont.length > 155) {
            throw new Error("Content can't be empty, ar have more than 155 characters");
        }
        this._content = valCont;
    }

    get content() {
        return this._content;
    }

    //tags
    set tags(valTags) {
        const validTags = ['reminder', 'to-do', 'post-it', 'other'];
        const noteTags = [];

        valTags.forEach(elem => {
            if (validTags.includes(elem)) {
                noteTags.push(elem);
            }
        });
        this._tags = valTags;
    }

}

exports.Note = Note;
class Notes {
    constructor(arrOfNotes) {
        this.collectionOfNotes = new Map(arrOfNotes);
    }

    addNote(note) {
        //The title original title of the note is going to be used as a key in the Map object that contains all the notes, so  to notice that if the title of the note is later updated, the key would remain being the primitive value. 
        if (note instanceof Note) this.collectionOfNotes.set(note.title, note);else {
            throw new Error('Not valid note');
        };

        return this.collectionOfNotes.get(note.title);
    }

    getAllNotes() {
        const response = [];
        this.collectionOfNotes.forEach(note => response.push(note));
        return response;
    }

    getSingleNote(noteTitle) {
        return this.collectionOfNotes.get(noteTitle);
    }

    deleteNote(noteTitle) {
        if (this.collectionOfNotes.has(noteTitle)) {
            const NoteToDelete = this.collectionOfNotes.get(noteTitle);
            this.collectionOfNotes.delete(noteTitle);
            return NoteToDelete;
        } else throw new Error('The note introduced could not be found');
    }

    editNote(noteTitleToEdit, newTitle, newContent, Newtags) {
        const editedNote = new Note(newTitle, newContent, Newtags);

        if (!this.collectionOfNotes.has(noteTitleToEdit)) throw new Error('The note that you want to edit was not found');

        this.collectionOfNotes.set(newTitle, editedNote);

        return this.collectionOfNotes.get(newTitle);
    }

    filterNotesByTag(tag) {
        const filtered = [];
        this.collectionOfNotes.forEach(note => {
            if (note._tags.includes(tag)) filtered.push(note);
        });
        return filtered;
    }
}
exports.Notes = Notes;
//# sourceMappingURL=Note.js.map