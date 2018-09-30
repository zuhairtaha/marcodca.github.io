import express from 'express';
import bodyParser from 'body-parser';


//We import the routes
import routes from './Routes';

//We set up all the components of our router.
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/notes', routes);


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Now listening to port ${port} mate`));


