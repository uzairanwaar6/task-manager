const controller = require('../controllers/userController');

const routes = function (app) {
    app.get('/users', (req, res) => {
        controller.getAll()
            .then((result) => res.send(result))
            .catch((errorObject) => {
                res.status(errorObject.code).send(errorObject.error);
            });
    });

    app.get('/users/:id', (req, res) => {
        controller.getById(req.params.id)
            .then((result) => res.send(result))
            .catch((errorObject) => {
                res.status(errorObject.code).send(errorObject.error);
            });
    });

    app.post('/users', (req, res) => {
        controller.add(req.body)
            .then((result) => res.send(result))
            .catch((errorObject) => {
                res.status(errorObject.code).send(errorObject.error);
            });
    });

    app.put('/users', (req, res) => {
        controller.replace(req.body)
            .then((result) => res.send(result))
            .catch((errorObject) => {
                res.status(errorObject.code).send(errorObject.error);
            });
    });

    app.patch('/users', (req, res) => {
        controller.update(req.body)
        .then((result) => res.send(result))
        .catch((errorObject) => {
            res.status(errorObject.code).send(errorObject.error);
        });
    });

    app.delete('/users/:id', (req, res) => {
        controller.deleteById(req.params.id)
            .then((result) => res.send(result))
            .catch((errorObject) => {
                res.status(errorObject.code).send(errorObject.error);
            });
    });
};

module.exports = routes;