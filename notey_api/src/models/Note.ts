import * as mongoose from 'mongoose';

export type NoteDocument = mongoose.Document & {
    content: string;
    color: string;
    created: number;
}

const noteSchema = new mongoose.Schema({
    content: { type: String },
    color: {type: String},
    created: {type: Number }
});

export const Note = mongoose.model<NoteDocument>("Note", noteSchema);
