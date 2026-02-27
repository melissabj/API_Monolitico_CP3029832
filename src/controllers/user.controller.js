const userService = require('../services/user.service');

// =========================
// POST /users
// =========================
async function createUser(req, res) {
    try {
        const { nome, email } = req.body;

        if (!nome || !email) {
            return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
        }

        const user = await userService.createUser(nome, email);

        return res.status(201).json(user);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// =========================
// GET /users
// =========================
async function getAllUsers(req, res) {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json(users);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// =========================
// GET /users/:id
// =========================
async function getUserById(req, res) {
    try {
        const { id } = req.params;

        const user = await userService.getUserById(id);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// =========================
// PUT /users/:id
// =========================
async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { nome, status } = req.body;

        if (!nome || !status) {
            return res.status(400).json({ error: 'Nome e status são obrigatórios.' });
        }

        const changes = await userService.updateUser(id, nome, status);

        if (changes === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        return res.status(200).json({ message: 'Usuário atualizado com sucesso.' });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// =========================
// DELETE /users/:id
// =========================
async function deactivateUser(req, res) {
    try {
        const { id } = req.params;

        const changes = await userService.deactivateUser(id);

        if (changes === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        return res.status(200).json({ message: 'Usuário desativado com sucesso.' });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deactivateUser
};