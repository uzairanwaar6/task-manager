const configure = (app) => {
    const express = require('express');
    app.use(express.json());//Enable JSON parsing
};


const start = (app, port) => {
    const finalPort = process.env.PORT || port || 3000;

    app.listen(finalPort, () => {
        const chalk = require('chalk');
        console.log(chalk.underline.yellow(`Server is started on port ${finalPort}`));
    });
};

module.exports = {
    configure,
    start
};

