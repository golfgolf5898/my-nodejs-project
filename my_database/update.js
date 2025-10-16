const client = require('./db');

const updateUser = async () => {
try {
const res = await client.query(
'UPDATE users SET age = $1 WHERE name = $2 RETURNING *',
[35, 'John Doe']
);
console.log('User updated:', res.rows[0]);
} catch (err) {
console.error('Error updating user:', err);
} finally {
client.end();
}
};

updateUser();