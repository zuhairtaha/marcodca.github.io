const Router = require('express')
const { FootballPlayer, FootballTeam } = require('./FootballPlayer.js');
const {getJSON, writeJSON} = require("./json_handlers");
const footballTeamRoute = Router();
const footballTeam = new FootballTeam;


getJSON().then((JSON) => {
    footballTeam._team = JSON.footballteam;
    
    //To get all the players use GET method on "/"
    footballTeamRoute.get('/', (req, res) => {
        res.send(footballTeam.getAll())
    });

    //To get a particular player by its dorsal use GET method on "/DORSAL NR""
    footballTeamRoute.get('/:dorsalNr', (req, res) => {
        try {
            res.send(footballTeam.getPlayerByDorsal(req.params.dorsalNr))
        } catch (error) {
            res.status(404).send(error).end();
        }
    })

    //To delete a player, use DELETE method con "/"
    footballTeamRoute.delete('/:dorsalNr', (req, res) => {
        try {
            res.send(footballTeam.deletePlayer(req.params.dorsalNr));
            writeJSON(footballTeam._team);
        }
        catch (error) {
            res.status(400).send(error).end();
        }
    })

    //to add player, use POST method on "/", the request body should be with the format: 
    // "firstName": string,
    // "lastName": string,
    // "strongFoot": string with value "right", "left" or "both"
    // "positions": a string or an array of strings,
    // "captain": boolean, default false.

    footballTeamRoute.post('/', (req, res) => {
        try {
            const footballPlayer = new FootballPlayer(req.body.firstName, req.body.lastName, req.body.strongFoot, req.body.positions, req.body.captain);
            footballTeam.addPlayer(footballPlayer);

            writeJSON(footballTeam._team);
            
            res.status(200).send(footballPlayer).end();
        }
        catch (error) {
            res.status(400).send(error).end();
        }

    })

    // to edit a player, make a PUT request to "/DORSAL NR", the request body should be with the format: "propertyToEdit" :, and "newValue" :
    footballTeamRoute.put('/:dorsalNr', (req, res) => {
        const { propertyToEdit, newValue } = req.body;
        const { dorsalNr } = req.params;
        try {
            res.status(200).send(footballTeam.editPlayer(dorsalNr, propertyToEdit, newValue));
            writeJSON(footballTeam._team);
        }
        catch (error) {
            res.status(404).send(error).end();
        }
    })

})

module.exports = footballTeamRoute;
