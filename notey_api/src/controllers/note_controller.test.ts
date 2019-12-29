import { MongoMemoryServer } from 'mongodb-memory-server';
import {Mongoose} from "mongoose";
import app from '../app';
import request from 'supertest';
import {Note} from '../models/Note';
import {setupDb, DbSettings} from '../config/db_config';

let mongoServer: MongoMemoryServer;
let mongoose: Mongoose;

const predefinedData = [
    new Note({content: 'This is the first note', created: Date.now(), color: '#FFFFFF'}),
    new Note({content: 'This is the second note', created: Date.now(), color: '#000000'}),
];

beforeAll(async () => {
    const dbConn: DbSettings = await setupDb();
    mongoServer = dbConn.testServer;
    mongoose = dbConn.mongoose;
    for (let note of predefinedData) {
        await note.save();
    }
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('all endpoints', () => {
    test('should get notes', async () => {
        const res = await request(app)
            .get('/note');
        expect(res.status).toEqual(200);
        expect(res.body instanceof Array).toBe(true);
        let arr: any[] = res.body;
        expect(arr).toHaveLength(2);
        for (let o of arr) {
            expect(o).toHaveProperty('id');
        }
    });
    test('should insert a note', async () => {
        const res = await request(app)
            .post('/note')
            .send({content: 'this is a note', created: Date.now()});
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('id');
    });

    test('should modify a note', async () => {
        const firstRes = await request(app)
            .post('/note')
            .send({content: 'this is a note', created: Date.now()});
        const initialNote = firstRes.body;
        const modifiedNote = Object.assign({}, initialNote, {content: 'this is modified'});
        const res = await request(app)
            .put('/note')
            .send(modifiedNote);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('content', 'this is modified');
    });

    test('should delete note', async () => {
        const res = await request(app)
            .get('/note');
        let notes = res.body;
        const deleteId = notes[0].id;
        const deleteRes = await request(app)
            .delete(`/note?id=${deleteId}`);
        expect(deleteRes.status).toEqual(204);
        const secondGet = await request(app)
            .get('/note');
        let hasId = false;
        notes = secondGet.body;
        for (let note of notes) {
            hasId = note.id === deleteId;
        }
        expect(hasId).toEqual(false);
    });
});

