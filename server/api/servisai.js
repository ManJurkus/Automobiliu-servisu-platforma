import express from 'express';
import { connection } from '../setupDb.js';

export const servisai = express.Router();

servisai.post('/', async (req, res) => {
    const { role, id } = req.user;

    if (role !== 'user') {
        return res.status(400).json({
            status: 'err',
            msg: 'You are not a seller.',
        });
    }

    const { image, pavadinimas, miestas } = req.body;

    if (!pavadinimas) {
        return res.status(400).json({
            status: 'err',
            msg: 'Service could not be created. Provide "Pavadinimas" value.',
        });
    }

    if (!image) {
        return res.status(400).json({
            status: 'err',
            msg: 'Servisas could not be created. Provide "nuotraukos" value.',
        });
    }


    if (!miestas) {
        return res.status(400).json({
            status: 'err',
            msg: 'Servisas could not be created. Provide "miestas" value.',
        });
    }


    try {
       

        const insertQuery = `INSERT INTO servisas
            (user_id, pavadinimas, miestas, image)
            VALUES (?, ?, ?, ?);`;
        const insertRes = await connection.execute(insertQuery,
            [id, pavadinimas, miestas, image]);
        const insertResObject = insertRes[0];

        if (insertResObject.insertId > 0) {
            return res.status(201).json({
                status: 'ok',
                msg: 'Servisas sukurtas',
            });
        } else {
            return res.status(400).json({
                status: 'err',
                msg: 'Servisas sukurti nepavyko',
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'err',
            msg: 'POST: Serviso API - server error.',
        });
    }
});

// funds.put('/:fundId', async (req, res) => {
//     const { fundId } = req.params;
//     const { newStatus } = req.body;
//     console.log(fundId);
//     console.log(newStatus);

//     if (!fundId || !newStatus) {
//         return res.status(400).json({
//             status: 'err',
//             msg: 'User could not be updated. Provide "email" and "newStatus" values.',
//         });
//     }

//     try {
//         const updateQuery = `UPDATE funds SET is_blocked_fund = ? WHERE id = ?`;
//         const updateRes = await connection.execute(updateQuery, [newStatus, fundId]);
//         const updateResObject = updateRes[0];

//         if (updateResObject.affectedRows > 0) {
//             return res.status(200).json({
//                 status: 'ok',
//                 msg: 'User status updated.',
//                 info: {
//                     fundId: Number(fundId),
//                     newStatus: newStatus,
//                 } 
//             });
//         } else {
//             return res.status(400).json({
//                 status: 'err',
//                 msg: 'User status could not be updated.',
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({
//             status: 'err',
//             msg: 'PUT: USERS API - server error.',
//         });
//     }
// });

servisai.get('/', async (req, res) => {
    const role = req.user.role;
    let selectQuery = '';

    if (role === 'admin') {
        selectQuery = `SELECT funds.id, funds.user_id, funds.title, funds.fundText,                  funds.fundSum,        block.status, funds.image
                        FROM funds
                        INNER JOIN block ON block.id = funds.is_blocked_fund;`;
    } else if (role === 'public') {
        selectQuery = `SELECT * FROM funds WHERE is_blocked_fund = 2;`;

        try {
            const selectRes = await connection.execute(selectQuery);
            const fundslist = selectRes[0];

            console.log(fundslist);
    
            return res.status(200).json({
                status: 'ok',
                list: fundslist,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'err',
                msg: 'GET: Funds (Public) API - server error.',
            });
        }

    } else if (role === 'user') {
        selectQuery = `SELECT * FROM servisas WHERE user_id = ?;`;
    } else {
        return res.status(403).json({
            status: 'err',
            msg: 'Forbiden.',
        });
    }
    try {
        const selectRes = await connection.execute(selectQuery, [req.user.id]);
        const servisailist = selectRes[0];

        return res.status(200).json({
            status: 'ok',
            list: servisailist,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'GET: Servisai API - server error.',
        });
    }
});

// cars.get('/:carId', async (req, res) => {
//     const { carId } = req.params;

//     try {
//         const selectQuery = `SELECT cars.id, cars.title, \`car-types\`.title as carType, cars.image, 
//                                 cars.price, cars.color, cars.location, \`steering-wheel\`.side as steeringWheel
//                             FROM cars
//                             INNER JOIN \`car-types\` ON \`car-types\`.id = cars.car_type_id
//                             INNER JOIN \`steering-wheel\` ON \`steering-wheel\`.id = cars.steering_wheel_id
//                             WHERE cars.id = ?;`;
//         const selectRes = await connection.execute(selectQuery, [carId]);
//         const cars = selectRes[0];

//         return res.status(200).json({
//             status: 'ok',
//             car: cars[0],
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             status: 'err',
//             msg: 'GET: CAR TYPES API - server error.',
//         });
//     }
// });

servisai.delete('/:title', async (req, res) => {
    const { title } = req.params;

    try {
        const deleteQuery = `DELETE FROM funds WHERE title = ?;`;
        const deleteRes = await connection.execute(deleteQuery, [title]);
        const fundDelete = deleteRes[0];

        if (fundDelete.affectedRows > 0) {
            return res.status(200).json({
                status: 'ok',
                msg: 'Fund deleted.',
            });
        } else {
            return res.status(400).json({
                status: 'err',
                msg: 'There was nothing to delete.',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'DELETE: Funds API - server error.',
        });
    }
});

// cars.put('/:oldTitle', async (req, res) => {
//     const { oldTitle } = req.params;
//     const { newTitle } = req.body;
//     console.log(oldTitle, newTitle);

//     if (!oldTitle || !newTitle) {
//         return res.status(400).json({
//             status: 'err',
//             msg: 'Car type could not be created. Provide "title" values.',
//         });
//     }

//     try {
//         const selectQuery = `SELECT * FROM \`car-types\` WHERE title = ?;`;
//         const selectRes = await connection.execute(selectQuery, [newTitle]);
//         const carTypes = selectRes[0];

//         if (carTypes.length > 0) {
//             return res.status(200).json({
//                 status: 'err-list',
//                 errors: [
//                     {
//                         input: 'carType',
//                         msg: 'Such car type already exists.',
//                     }
//                 ]
//             });
//         }

//         const updateQuery = `UPDATE \`car-types\` SET title = ? WHERE title = ?`;
//         const updateRes = await connection.execute(updateQuery, [newTitle, oldTitle]);
//         const updateResObject = updateRes[0];

//         if (updateResObject.affectedRows > 0) {
//             return res.status(200).json({
//                 status: 'ok',
//                 msg: 'Car type updated.',
//             });
//         } else {
//             return res.status(400).json({
//                 status: 'err',
//                 msg: 'Car type could not be updated.',
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({
//             status: 'err',
//             msg: 'PUT: CAR TYPES API - server error.',
//         });
//     }
// });

servisai.use((req, res, next) => {
    return res.status(404).json({ msg: 'Unsupported "servisai" method' });
});