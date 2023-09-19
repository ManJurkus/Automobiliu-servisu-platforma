import express from 'express';
import { connection } from '../setupDb.js';
import { hash } from '../lib/hash.js';

const register = express.Router();

register.get('/', (req, res) => {
    return res.json({ msg: 'GET: REGISTER API' });
});

register.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    const minUsernameSize = 2;
    const maxUsernameSize = 50;
    const minEmailSize = 6;
    const maxEmailSize = 50;
    const atSymbolCount = email.split('@').length - 1;
    // const atSymbol = email.indexOf('@');
    // const dotSymbol = email.lastIndexOf('.');
    const minPasswordSize = 6;
    const maxPasswordSize = 100;



    const errors = [];
    if (typeof username !== 'string') {
        errors.push({
            input: 'username',
            msg: 'Bad username format. Must to be "string".',
        });
    }
    if (username.length < minUsernameSize) {
        errors.push({
            input: 'username',
            msg: `Username too short. Minimum ${minUsernameSize} symbols required.`,
        });
    }
    if (username.length > maxUsernameSize) {
        errors.push({
            input: 'username',
            msg: `Username too long. Maximum ${maxUsernameSize} symbols required.`,
        });
    }

    if (typeof email !== 'string') {
        errors.push({
            input: 'email',
            msg: 'Bad email format. Must to be "string".',
        });
    }
    if (email.length < minEmailSize) {
        errors.push({
            input: 'email',
            msg: `Email too short. Minimum ${minEmailSize} symbols required.`,
        });
    }

    if (!email.includes('@')) {
        errors.push({
            input: 'email',
            msg: `The "@" symbol is missing.`,
        });
    }
    if (atSymbolCount > 1) {
        errors.push({
            input: 'email',
            msg: `Only 1 "@" character is allowed.`,
        });
    }

    if (email.length > maxEmailSize) {
        errors.push({
            input: 'email',
            msg: `Email too long. Maximum ${maxEmailSize} symbols required.`,
        });
    }





    if (typeof password !== 'string') {
        errors.push({
            input: 'password',
            msg: 'Bad email format. Must to be "string".',
        });
    }

    if (password.length < minPasswordSize) {
        errors.push({
            input: 'password',
            msg: `Password too short. Minimum ${minPasswordSize} symbols required.`,
        });
    }

    if (password.length > maxPasswordSize) {
        errors.push({
            input: 'password',
            msg: `Password too ling. Maximum ${maxPasswordSize} symbols required.`,
        });
    }

    if (errors.length > 0) {
        return res.status(409).json({ status: 'err-list', errors });
    }

    try {
        const selectQuery = `SELECT * FROM users WHERE email = ?;`;
        const [selectRes] = await connection.execute(selectQuery, [email]);

        if (selectRes.length > 0) {
            return res.status(200).json({
                status: 'err-list',
                errors: [
                    {
                        input: 'email',
                        msg: 'User with such email already exists.'
                    }
                ]
            });
        }

        const insertQuery = `INSERT INTO users 
                            (username, email, password_hash)
                        VALUES 
                            (?, ?, ?);`;
        const [insertRes] = await connection.execute(insertQuery, [username, email, hash(password)]);

        if (insertRes.insertId > 0) {
            return res.status(200).json({ status: 'ok', msg: 'POST: REGISTER API - ok, user created' });
        } else {
            return res.status(400).json({ status: 'err', msg: 'POST: REGISTER API - error....' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'err', msg: 'POST: REGISTER API - server error.' });
    }
});

register.use((req, res, next) => {
    return res.status(404).json({ msg: 'Unsupported "Register" method' });
});

export { register };