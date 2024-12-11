const app = require('./src/app');
const pool = require('./src/config/database');

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await pool.query('SELECT 1');
    console.log('Database connected and server running on port', PORT);
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
});
