const routes = (app) => {
    app.get('/users', (req, res) => {
        res.send('Rout is setup correctly...');
    });
};

module.exports = routes;