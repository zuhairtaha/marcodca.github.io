'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _Note = require('./Note.js');

var _jsonHandlers = require('./controllers/jsonHandlers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express2.default)();

(0, _jsonHandlers.getJSON)().then(json => {
    //We fetch the data from the JSONbin API, and set it into the notes collection.

    const notes = new _Note.Notes(json.data);

    routes.get('/', (req, res) => {

        res.sendFile(_path2.default.join(__dirname + "/../public/index.html"));
    }).get('/api', (req, res) => {
        try {
            res.status(200).send(notes.getAllNotes()).end();
        } catch (error) {
            throw error;
        };
    }).get('/api/:noteTitle', (req, res) => {
        try {
            res.send(notes.getSingleNote(req.params.noteTitle));
        } catch (error) {
            throw error;
        };
    }).post("/api", (req, res) => {
        try {
            const newNote = new _Note.Note(req.body.title, req.body.content, [req.body.tags]);
            res.send(notes.addNote(newNote));
            (0, _jsonHandlers.updateJSON)(notes.collectionOfNotes);
        } catch (error) {
            throw error;
        };
    }).delete('/api/:noteTitle', (req, res) => {
        try {
            res.send(notes.deleteNote(req.params.noteTitle));
            (0, _jsonHandlers.updateJSON)(notes.collectionOfNotes);
        } catch (error) {
            throw error;
        };
    }).post('/api/:noteTitle', (req, res) => {
        res.send(notes.editNote(req.params.noteTitle, req.body.title, req.body.content, [req.body.tags]));
        (0, _jsonHandlers.updateJSON)(notes.collectionOfNotes);
    }).get('/api/tag/:tag', (req, res) => {
        res.send(notes.filterNotesByTag(req.params.tag));
    });
});

exports.default = routes;
//# sourceMappingURL=Routes.js.map