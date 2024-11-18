const queries = require('./queries');

module.exports = {
    deleteUser: async (req, res) => {
        const { userId } = req.body;

        try {
            await queries.deleteUserById(userId);
            res.redirect('/admin/panel');
        } catch (err) {
            console.error(err);
            res.send('Ошибка удаления пользователя.');
        }
    }
};
