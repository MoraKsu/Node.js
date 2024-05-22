const express = require('express');
const joi = require('joi');
const fs = require('fs').promises;

const app = express();
const userSchema = joi.object({
    firstName: joi.string().min(1).required(),
    secondName: joi.string().min(1).required(),
    city: joi.string().min(1),
    age: joi.number().min(0).max(150).required()
})

app.use(express.json());

const usersFilePath = 'users.json';

// Функция для чтения данных о пользователях из файла
async function readUsersFromFile() {
    try {
        const data = await fs.readFile(usersFilePath);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Функция для записи данных о пользователях в файл
async function writeUsersToFile(users) {
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
}

/**
 * Запрос на получение всех пользователей
 */
app.get('/users', async (req, res) => {
    const users = await readUsersFromFile();
    res.send({ users });
});

/**
 * Запрос на получение пользователя по id
 */
app.get('/users/:id', async (req, res) => {
    const userID = +req.params.id;
    const users = await readUsersFromFile();
    const user = users.find(user => user.id === userID);
    if (user) {
        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    }
});

/**
 * Запрос на создание пользователей
 */
app.post('/users', async (req, res) => {
    const users = await readUsersFromFile();
    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        ...req.body
    };
    users.push(newUser);
    await writeUsersToFile(users);
    res.send({ id: newUser.id });
});

/**
 * Запрос на обнавление пользователя по id
 */
app.put('/users/:id', async (req, res) => {
    const result = userSchema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ error: result.error.details });
    }
    const userID = +req.params.id;
    let users = await readUsersFromFile();
    const userIndex = users.findIndex(user => user.id === userID);
    if (userIndex !== -1) {
        users[userIndex] = { id: userID, ...req.body };
        await writeUsersToFile(users);
        res.send({ user: users[userIndex] });
    } else {
        res.status(404);
        res.send({ user: null });
    }
});

/**
 * Запрос на удаление пользователя по id
 */
app.delete('/users/:id', async (req, res) => {
    const userID = +req.params.id;
    let users = await readUsersFromFile();
    const userIndex = users.findIndex(user => user.id === userID);
    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1)[0];
        await writeUsersToFile(users);
        res.send({ user: deletedUser });
    } else {
        res.status(404);
        res.send({ user: null });
    }
});

const server = app.listen(3000, () => {
    console.log('Server is running...');
});