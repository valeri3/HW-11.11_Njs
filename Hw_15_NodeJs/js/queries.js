const sql = require('mssql');
const connection = require('./config');

module.exports = {

    // Получить пользователя по псевдониму
    getUserByNickname: async (nickname) => {
        const pool = await sql.connect(connection);
        const result = await pool.request()
            .input('nickname', sql.NVarChar, nickname)
            .query('SELECT * FROM users WHERE nickname = @nickname');
        return result.recordset;
    },

    // Добавить нового пользователя
    addUser: async (fio, nickname, dob) => {
        const pool = await sql.connect(connection);
        await pool.request()
            .input('fio', sql.NVarChar, fio)
            .input('nickname', sql.NVarChar, nickname)
            .input('dob', sql.Date, dob)
            .query('INSERT INTO users (fio, nickname, dob) VALUES (@fio, @nickname, @dob)');
    },

    // Получить всех пользователей
    getUsers: async () => {
        const pool = await sql.connect(connection);
        const result = await pool.request().query('SELECT * FROM users');
        return result.recordset;
    },

    // Удалить пользователя по айди
    deleteUserById: async (userId) => {
        const pool = await sql.connect(connection);
        await pool.request().input('id', sql.Int, userId).query('DELETE FROM users WHERE id = @id');
    },

    // Проверка на админа
    verifyAdmin: async (nickname, password) => {
        const pool = await sql.connect(connection);
        const result = await pool.request()
            .input('nickname', sql.NVarChar, nickname)
            .input('password', sql.VarBinary, Buffer.from(password))
            .query('SELECT * FROM admins WHERE nickname = @nickname AND password = HASHBYTES(\'SHA2_256\', @password)');
        return result.recordset.length > 0;
    }
};
