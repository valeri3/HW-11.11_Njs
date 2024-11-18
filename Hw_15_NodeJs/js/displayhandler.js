const queries = require('./queries');

module.exports = {
    adminLogin: async (req, res) => {
        const {username, password} = req.body;

        try {
            const isAdmin = await queries.verifyAdmin(username, password);
            if (isAdmin) {
                res.redirect('/admin/panel');
            } else {
                res.send('<script>alert("Неверные данные для входа!"); window.location.href="/admin";</script>');
            }
        } catch (err) {
            console.error(err);
            res.send('<script>alert("Ошибка сервера!"); window.location.href="/admin";</script>');
        }
    },

    displayUsers: async (req, res) => {
        try {
            const users = await queries.getUsers();
            res.render('admin_panel', {users});
        } catch (err) {
            console.error(err);
            res.send('Ошибка загрузки пользователей.');
        }
    }
};
