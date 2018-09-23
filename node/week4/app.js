const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const footballPlayer_route = require('./footballPlayer_route');




app.use('/football_team', footballPlayer_route);

const port = process.env.PORT || 8080;
app.listen(port, ()=> console.log(`Now listening to port ${port} mate`));


