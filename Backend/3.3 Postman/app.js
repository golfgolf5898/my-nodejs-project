const express = require('express');
const app = express();
app.use(express.json());
let users = [
{ id: 1, name: 'John Doe', email: 'john@example.com' },
{ id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

// GET - ดึงข้อมูลผู้ใช้ทั้งหมด
app.get('/users', (req, res) => {
res.json(users);
});

// POST - เพิ่มผู้ใช้ใหม่
app.post('/users', (req, res) => {
const user = { id: users.length + 1, ...req.body };
users.push(user);
res.status(201).json(user);
});

// PUT - อัปเดตข้อมูลผู้ใช้
app.put('/users/:id', (req, res) => {
const user = users.find(u => u.id === parseInt(req.params.id));
if (!user) return res.status(404).send('User not found');

user.name = req.body.name;
user.email = req.body.email;
res.json(user);
});

// DELETE - ลบผู้ใช้
app.delete('/users/:id', (req, res) => {
const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
if (userIndex === -1) return res.status(404).send('User not found');

users.splice(userIndex, 1);
res.sendStatus(204);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API running on port ${port}`));