import dotenv from "dotenv";
import fs from "fs";
import {MongoMemoryServer} from 'mongodb-memory-server-core';
import mongoose, {Mongoose} from "mongoose";
import {MongoError} from 'mongodb';

export interface DbSettings {
    testServer: MongoMemoryServer | undefined;
    mongoose: Mongoose;
}

export const ENVIRONMENT = process.env.NODE_ENV;

let promiseComplete = false;

let db: DbSettings;

export const mongooseOpts = {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false};

if (fs.existsSync(".env")) {
    console.log("Using .env file to supply config enviroment variables");
    dotenv.config({path: ".env"});
}

const setupDbPromise = new Promise<DbSettings>(async (resolve, reject) => {
    const prod = ENVIRONMENT === "production";
    const test = ENVIRONMENT === "test";
    let mongoUri;
    let mongoTestServer: MongoMemoryServer;
    if (test) {
        mongoTestServer = new MongoMemoryServer();
        mongoUri = await mongoTestServer.getUri();
        console.log("Using in-memory db");
    } else {
        mongoUri = prod ? process.env['MONGODB_URI'] : process.env['MONGODB_URI_LOCAL'];
    }
    if (!mongoUri) {
        if (prod)
            console.log("No mongo connection set. Set MONGODB_URI environment variable.")
        else if (test)
            console.log("Could\'t setup in-memory db connection.");
        else
            console.log("No mongo connection set. Set MONGODB_URI_LOCAL environment variable.")
        reject();
    } else {
        const mongooseConn: Mongoose = await mongoose.connect(mongoUri, mongooseOpts, (err: MongoError) => {
            if (err) {
                console.log('Couldn\'t connect to MongoDb', err);
            }
        });
        db = { testServer: mongoTestServer, mongoose: mongooseConn };
        promiseComplete = true;
        resolve(db);
    }
});

export const setupDb = async (): Promise<DbSettings> => {
    if (promiseComplete) {
        return db;
    } else {
        return await setupDbPromise;
    }
};