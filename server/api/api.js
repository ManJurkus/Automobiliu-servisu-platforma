
import express from 'express';
import { register } from './register.js';
import { login } from './login.js';
import { logout } from './logout.js';
import { upload } from './upload.js';
import { servisai } from './servisai.js';
import { servisaiPublic } from './servisaiPublic.js';
// import { donation } from './donation.js';
// import { fundsPublic } from './fundsPublic.js';
// import { fundReceived } from './fundReceived.js';
// import { users } from './users.js';
// import { fundsStatus } from './fundsStatus.js';


export const api = express.Router();

api.all('/', (req, res) => {
    return res.json({
        msg: 'Incomplete URL',
    });
});

api.use('/register', register);
api.use('/login', login);
api.use('/logout', logout);
api.use('/upload', upload);
api.use('/servisai', servisai);
api.use('/servisai', servisai);
api.use('/servisaiPublic', servisaiPublic);

