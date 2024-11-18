const queries = require('./queries');

module.exports = {
    registerUser: async (req, res) => {
        const {fio, nickname, dob} = req.body;

        try {
            // Проверяем, есть ли пользователь с таким псевдонимом
            const existingUsers = await queries.getUserByNickname(nickname);
            if (existingUsers.length > 0) {
                return res.send('<script>alert("Nickname already exists!"); window.location.href="/";</script>');
            }

            // Добавляем пользователя в бд
            await queries.addUser(fio, nickname, dob);

            // Перенаправляем в чат с ником пользователя
            res.redirect(`/${nickname}`);
        } catch (err) {
            console.error('Error registering user:', err);
            res.send('<script>alert("Server error occurred!"); window.location.href="/";</script>');
        }
    }
};
