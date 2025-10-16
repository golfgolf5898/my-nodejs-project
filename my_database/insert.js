const client = require('./db');

const insertUser = async () => {
  try {
    const res = await client.query(
      `INSERT INTO users (name, email, age) 
       VALUES 
       ($1, $2, $3),
       ($4, $5, $6),
       ($7, $8, $9),
       ($10, $11, $12)
       RETURNING *`,
      [
        'John Doe', 'john.doe@example.com', 30,
        'Adaren gaga', 'a1245mo@example.com', 25,
        'mac canay', 'MC25698@example.com', 22,
        'wiliam moren', 'WL123654@example.com', 18
      ]
    );

    console.log('Users inserted:');
    console.table(res.rows);  // แสดงผลเป็นตารางอ่านง่าย
  } catch (err) {
    console.error('Error inserting user:', err);
  } finally {
    client.end();
  }
};

insertUser();
