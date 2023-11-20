import "dotenv/config";
import express from "express";
import exphbs from "express-handlebars";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import path from "path";
import Lab from "./src/models/Lab.js";
import connect from './src/database/db.js';
import routes from './src/routes/router.js';
import initializeData from "./src/database/initializeData.js";


async function main () {
    const app = express();
    const __dirname = dirname(fileURLToPath(import.meta.url));

    app.use(cors()); //to allow clients to access the server and send requests
    app.use(bodyParser.json()); //to accept json requests
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );

    const hbs = exphbs.create({
        extname: 'hbs'
    });

    app.use("/static", express.static(path.join(__dirname, "public")));//to allow the use of the JavaScript, CSS, and the pictures
    app.engine(".hbs", hbs.engine); // express will look for files with .hbs for the views
    app.set("view engine", ".hbs"); // to indiate when using res.render that the files to be used are hbs
    app.set("views", "./src/views");

    app.use(routes);
    initializeData();

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something went wrong!');
    });

    app.listen(process.env.SERVER_PORT, async function() {
        console.log("App started");
        console.log(`Express app is now listening on port ${process.env.SERVER_PORT}`);
        try {
            await connect();
            console.log(`Now connected to MongoDB`);
        } catch (err) {
            console.log('Connection to MongoDB failed: ');
            console.error(err);
        }
    });
}

main()