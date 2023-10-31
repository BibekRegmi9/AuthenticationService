const express = require('express');
const bodyParser = require('body-parser');

// const UserRepository = require('./repository/user-repository')

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const app = express();


const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, async() => {
        console.log(`Server started on port: ${PORT}`);

        // const repo = new UserRepository();
        // const response = await repo.getById(3);
        // console.log(response);
    });

}

prepareAndStartServer();