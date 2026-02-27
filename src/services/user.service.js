const db = require('../database/db');

// =========================
// CRIAR USUÁRIO
// =========================
function createUser(nome, email) {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO usuarios (nome, email)
            VALUES (?, ?)
        `;

        db.run(sql, [nome, email], function (err) {
            if (err) {
                return reject(err);
            }

            resolve({
                id: this.lastID,
                nome,
                email,
                status: 'ativo'
            });
        });
    });
}

// =========================
// LISTAR TODOS
// =========================
function getAllUsers() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM usuarios', [], (err, rows) => {
            if (err) {
                return reject(err);
            }

            resolve(rows);
        });
    });
}

// =========================
// BUSCAR POR ID
// =========================
function getUserById(id) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM usuarios WHERE id = ?', [id], (err, row) => {
            if (err) {
                return reject(err);
            }

            resolve(row);
        });
    });
}

// =========================
// ATUALIZAR
// =========================
function updateUser(id, nome, status) {
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE usuarios
            SET nome = ?, status = ?
            WHERE id = ?
        `;

        db.run(sql, [nome, status, id], function (err) {
            if (err) {
                return reject(err);
            }

            resolve(this.changes); // quantidade de linhas alteradas
        });
    });
}

// =========================
// DESATIVAR (DELETE LÓGICO)
// =========================
function deactivateUser(id) {
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE usuarios SET status = 'inativo' WHERE id = ?`,
            [id],
            function (err) {
                if (err) {
                    return reject(err);
                }

                resolve(this.changes);
            }
        );
    });
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deactivateUser
};