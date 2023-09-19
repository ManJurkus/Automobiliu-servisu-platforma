import express from 'express';
import { connection } from '../setupDb.js';

export const servisaiPublic = express.Router();


servisaiPublic.get('/', async (req, res) => {

        const selectQuery = `SELECT * FROM servisas ;`;

        try {
            const selectRes = await connection.execute(selectQuery);
            const servisailist = selectRes[0];
    
            return res.status(200).json({
                status: 'ok',
                list: servisailist,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'err',
                msg: 'GET: Servisai (Public) API - server error.',
            });
        }
});

servisaiPublic.use((req, res, next) => {
    return res.status(404).json({ msg: 'Unsupported "Servisai Public" method' });
});