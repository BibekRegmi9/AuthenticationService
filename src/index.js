const express = require('express');
const bodyParser = require('body-parser');

const UserService = require('./services/user-service');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const app = express();


const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, async() => {
        console.log(`Server started on port: ${PORT}`);

        const service = new UserService();
        // const newToken = service.createToken({email:'Jon@hotmail.com', id: 1});
        // console.log("New Token: ", newToken);

        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkpvbkBob3RtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2OTg3NDE3ODAsImV4cCI6MTY5ODc0MTgxMH0.fpvqRrMMkTos7pJPJdCj4PIM9oLU8jsVO1eT83FOfDg'
        // const response = service.verifyToken(token);
        // console.log(response);
    });

}

prepareAndStartServer();