import Router from 'express';
import path from 'path';

import { Note, Notes } from './Note.js';
import {getJSON, updateJSON} from './controllers/jsonHandlers';



const routes = Router()

getJSON().then((json)=>{
    //We fetch the data from the JSONbin API, and set it into the notes collection.

    const notes = new Notes(json.data);

    routes
        .get('/', (req, res)=>{
        
            res.sendFile(path.join(__dirname + "/../public/index.html"))
        })

        .get('/api', (req, res) => {
            try {
                res.status(200).send(notes.getAllNotes()).end();
            }
            catch (error) { throw error };
        })

        .get('/api/:noteTitle', (req, res) => {
            try { res.send(notes.getSingleNote(req.params.noteTitle)); }

            catch (error) { throw error };
        })

        .post("/api", (req, res) => {
            try {
                const newNote = new Note(req.body.title, req.body.content, [req.body.tags]);
                res.send(notes.addNote(newNote));
                updateJSON(notes.collectionOfNotes);
            }
            catch (error) { throw error };
        })

        .delete('/api/:noteTitle', (req, res) => {
            try {
                res.send(notes.deleteNote(req.params.noteTitle));
                updateJSON(notes.collectionOfNotes);
            }
            catch (error) { throw error };
        })
        .post('/api/:noteTitle', (req, res) => {
            res.send(notes.editNote(req.params.noteTitle, req.body.title, req.body.content, [req.body.tags]));
            updateJSON(notes.collectionOfNotes);
        })

        .get('/api/tag/:tag', (req, res) => {
            res.send(notes.filterNotesByTag(req.params.tag));
        })
})

export default routes;

