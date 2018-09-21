class FootballPlayer {
    /**
    * FootballPlayer
    * @param {String} firstName - player first name
    * @param {String} lastName - player last name
    * @param {String} strongFoot - player strong foot
    * @param {String|Array} positions - player positions
    * @param {boolean} captain - [captain = false] - stats if the player is the captain
    */
    constructor(firstName, lastName, strongFoot, positions, captain = false) {

        //Some shy validation over here.
        this.validation().firstName(firstName);
        this.validation().lastName(lastName);
        this.validation().strongFoot(strongFoot);
        this.validation().positions(positions);
        this.validation().captain(captain);
        // ----------
        this.fullName = { 'first name': firstName, 'last name': lastName };
        this.strongFoot = strongFoot.toLowerCase();
        this.positions = positions;
        this.captain = captain;
    }
    edit(propertyName, newValue) {
        console.log('edit')
        switch (propertyName) {
            case 'firstName':
                this.validation().firstName(newValue);
                this.fullName['first name'] = newValue;
                break;

            case 'lastName':
                this.validation().lastName(newValue);
                this.fullName['last name'] = newValue;
                break;
            case 'dorsal':
                throw ('dorsal cannot be modified');
                breack;

            case 'strongFoot':
                this.validation().strongFoot(newValue);
                this.strongFoot = newValue;
                break;

            case 'positions':
                this.validation().positions(newValue);
                this.positions = newValue;
                break;

            case 'captain':
                this.validation().captain(newValue);
                this.captain = newValue;
                break;
            case 'dorsal':
                this.validation().dorsal(newValue);
                this.dorsal = newValue;
                break;

            default:
                throw Error(`${propertyName} is not a valid property to edit`)
        }
    }

    //Functions for validation, so we can re-use them when editing.
    validation() {
        return {
            firstName(value) {
                if (!(typeof value === 'string')) {
                    throw Error('First Name needs to be a string');
                }
            },

            lastName(value) {
                if (!(typeof value === 'string')) {
                    throw Error('Last Name needs to be a string');
                }
            },
            strongFoot(value) {
                if (!(typeof value === 'string')) {
                    throw Error('Strong foot needs to be an string');
                }
                switch (value.toLowerCase()) {
                    case 'left':
                        break;
                    case 'right':
                        break;
                    case 'both':
                        break;
                    default: throw Error('Strong foot need to be : "left", ""right" or "both"');
                }
            },
            positions(value) {
                if (!Array.isArray(value) && (typeof value !== 'string')) {
                    throw Error('positions needs to be an string or an array ');
                }
                if (Array.isArray(value)) {
                    value.forEach((position) => {
                        if (!(typeof position === 'string')) {
                            throw Error('position needs to be an string');
                        };
                    })
                }
            },
            dorsal(value) {
                if (!(typeof value === 'number')) {
                    throw Error('Dorsal needs to be a number')
                }
            },
            captain(value) {
                if (!(typeof value === 'boolean')) {
                    throw Error('Captain needs to be a boolean')
                }
            }
        }
    }
}

class FootballTeam {
    constructor() {
        this._team = [];
    }

    addPlayer(...players) {
        players.forEach((player) => {
            if (!(player instanceof FootballPlayer)) {
                throw Error(`${player} is not an instance of footballPlayer`)
            }
            if (this._team.includes(player)) {
                throw Error(`${player.fullName['last name']} is already on the team`)
            }
            else {
                this._team.push(player);
            }
            //When entering the team, a dorsal is assigned  as a property to each new player. The dorsal is going to be the current position of the player in the _team array
            this._team[this._team.length - 1].dorsal = this._team.length;
        })
    }
    getAll() {
        return this._team
    }
    getPlayerByDorsal(dorsalNr) {
        if (!(this._team[dorsalNr - 1])) {
            throw (`No player with the dorsal ${dorsalNr} was found in the team`)
        }
        return this._team[dorsalNr - 1];
    }
    editPlayer(playerDorsal, propertyToEdit, newValue) {
        
        if (!(this._team[playerDorsal - 1])) {
            throw (`No player with the dorsal ${playerDorsal} was found in the team`)
        }
        
        this._team[playerDorsal - 1].edit(propertyToEdit, newValue);
        
        // return this._team[playerDorsal - 1];
    }
    deletePlayer(dorsalNr) {
        if (!(this._team[dorsalNr - 1])) {
            throw (`No player with the dorsal ${dorsalNr} was found in the team`)
        }
        const deletePlayer = this._team[dorsalNr - 1];
        this._team.splice(dorsalNr - 1, 1);
        return deletePlayer;
    }
}

module.exports = { FootballPlayer, FootballTeam };