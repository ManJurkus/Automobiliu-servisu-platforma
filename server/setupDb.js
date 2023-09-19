import mysql from 'mysql2/promise';
import { DB_DATABASE, DB_HOST, DB_PASS, DB_USER } from './env.js';
import { hash } from './lib/hash.js';

const DATABASE_RESET = false;

async function setupDb() {
    // Susikuriame DB, jei nera
    let connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASS,
    });

    if (DATABASE_RESET) {
        await connection.execute(`DROP DATABASE IF EXISTS \`${DB_DATABASE}\``);
    }
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\``);
    connection.query(`USE \`${DB_DATABASE}\``);

    if (DATABASE_RESET) {
        // Susikuriame lenteles
        await rolesTable(connection);
        await usersTable(connection);
        await tokensTable(connection);
        await servisoTable(connection);
        await mechanicTable(connection);
        


        // Uzpildome informacija
        await generateRoles(connection);
        await generateUsers(connection);
        await generateServisus(connection);
        await generateMechanic(connection);
        

    }

    return connection;
}

async function usersTable(db) {
    try {
        const sql = `CREATE TABLE users (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        username varchar(30) NOT NULL,
                        email varchar(40) NOT NULL,
                        password_hash varchar(128) NOT NULL,
                        role_id int(10) NOT NULL DEFAULT 2,
                        is_blocked int(1) NOT NULL DEFAULT 0,
                        created timestamp NOT NULL DEFAULT current_timestamp(),
                        PRIMARY KEY (id),
                        KEY role_id (role_id),
                        CONSTRAINT users_ibfk_1 FOREIGN KEY (role_id) REFERENCES roles (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti "users" lenteles');
        console.log(error);
        throw error;
    }
}

async function tokensTable(db) {
    try {
        const sql = `CREATE TABLE tokens (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        user_id int(10) NOT NULL,
                        token varchar(36) NOT NULL,
                        created timestamp NOT NULL DEFAULT current_timestamp(),
                        PRIMARY KEY (id),
                        KEY user_id (user_id),
                        CONSTRAINT tokens_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti "tokens" lenteles');
        console.log(error);
        throw error;
    }
}

async function rolesTable(db) {
    try {
        const sql = `CREATE TABLE roles (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        role varchar(10) NOT NULL,
                        PRIMARY KEY (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti "roles" lenteles');
        console.log(error);
        throw error;
    }
}


async function servisoTable(db) {
    try {
        const sql = `CREATE TABLE servisas (
            id int(10) NOT NULL AUTO_INCREMENT,
            user_id int(10) NOT NULL,
            pavadinimas varchar(100) NOT NULL,
            miestas varchar(100) NOT NULL,
            image varchar(100) NOT NULL,
            created timestamp NOT NULL DEFAULT current_timestamp(),
            PRIMARY KEY (id),
            KEY user_id (user_id),
            CONSTRAINT servisas_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id)
          ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti "serviso" lenteles');
        console.log(error);
        throw error;
    }
}

async function mechanicTable(db) {
    try {
        const sql = `CREATE TABLE mechanic (
            id int(10) NOT NULL AUTO_INCREMENT,
            serviso_id int(10) NOT NULL,
            vardas varchar(100) NOT NULL,
            pavarde varchar(100) NOT NULL,
            specializacija varchar(100) NOT NULL,
            image varchar(100) NOT NULL,
            PRIMARY KEY (id),
            KEY serviso_id (serviso_id),
            CONSTRAINT mechanic_ibfk_1 FOREIGN KEY (serviso_id) REFERENCES servisas (id)
          ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti "mechanic" lenteles');
        console.log(error);
        throw error;
    }
}

async function generateRoles(db) {
    try {
        const sql = `INSERT INTO roles (role) VALUES ('admin'), ('user');`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sugeneruoti "roles" lenteles turinio');
        console.log(error);
        throw error;
    }
}

async function generateUsers(db) {
    try {
        const sql = `INSERT INTO users (username, email, password_hash, role_id) 
                    VALUES ('Mantas', 'mantas@mantas.com', '${hash('mantas@mantas.com')}', 1),
                        ('Jonas Jonaitis', 'jonas@jonas.lt', '${hash('jonas@jonas.lt')}', 2),
                        ('Ona Onaityte', 'ona@ona.lt', '${hash('ona@ona.lt')}', 2);`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sugeneruoti "users" lenteles turinio');
        console.log(error);
        throw error;
    }
}

async function generateServisus(db) {
    try {
        const sql = `INSERT INTO servisas (user_id, pavadinimas, miestas) 
                    VALUES ('2', 'UAB Servisas', 'Vilnius');`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sugeneruoti "servisu" lenteles turinio');
        console.log(error);
        throw error;
    }
}

async function generateMechanic(db) {
    try {
        const sql = `INSERT INTO mechanic (serviso_id, vardas, pavarde, specializacija, image) 
                    VALUES ('2', 'Mnatas', 'Jurkus', 'Saltkalvis', 'sdgfsfdg');`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sugeneruoti "Mechanic" lenteles turinio');
        console.log(error);
        throw error;
    }
}




// INSERT INTO servisas (id, user_id, pavadinimas, miestas, created) VALUES (NULL, '2', 'UAB Servisas', 'Vilnius', current_timestamp());

// INSERT INTO mechanic (id, serviso_id, vardas, pavarde, specializacija, image) VALUES (NULL, '2', 'Mnatas', 'Jurkus', 'Saltkalvis', 'sdgfsfdg');

export const connection = await setupDb();