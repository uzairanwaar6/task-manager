const controller = require('../controllers/taskController');

const routes = function (app) {
    app.get('/tasks', (req, res) => {
        controller.getAll()
            .then((result) => res.send(result))
            .catch((errorObject) => {
                res.status(errorObject.code).send(errorObject.error);
            });
    });

    app.get('/tasks/:id', (req, res) => {
        controller.getById(req.params.id)
            .then((result) => res.send(result))
            .catch((errorObject) => {
                res.status(errorObject.code).send(errorObject.error);
            });
    });

    app.post('/tasks', (req, res) => {
        controller.add(req.body)
            .then((result) => res.send(result))
            .catch((errorObject) => {
                res.status(errorObject.code).send(errorObject.error);
            });
    });

    app.put('/tasks', (req, res) => {
        controller.replace(req.body)
            .then((result) => res.send(result))
            .catch((errorObject) => {
                res.status(errorObject.code).send(errorObject.error);
            });
    });

    app.patch('/tasks', (req, res) => {
        controller.update(req.body)
        .then((result) => res.send(result))
        .catch((errorObject) => {
            res.status(errorObject.code).send(errorObject.error);
        });
    });

    app.delete('/tasks/:id', (req, res) => {
        controller.deleteById(req.params.id)
            .then((result) => res.send(result))
            .catch((errorObject) => {
                res.status(errorObject.code).send(errorObject.error);
            });
    });
};

module.exports = routes;