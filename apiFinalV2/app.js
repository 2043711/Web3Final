require('dotenv').config();

var express = require("express");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const swaggerUI = require('swagger-ui-express');

const swaggerJSDoc = require('swagger-jsdoc');

const swagger_options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Ville - Développement Web 3 - A22 - Projet Final",
            version: "1.0.0",
            description: "Api utilisée dans le cadre du projet final du cours Développement Web 3 à l'automne 2022",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

var indexRouter = require('./routes/index');
var villeRouter = require('./routes/ville');
var statsRouter = require('./routes/stats');

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const specs = swaggerJSDoc(swagger_options);

app.use('/', indexRouter);
app.use('/ville', villeRouter);
app.use('/stats', statsRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

module.exports = app;
