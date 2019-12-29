import e from "express";
import {NoteDto} from '../dtos/NoteDto';
import {classToPlain} from "class-transformer";
import {Note} from "../models/Note";
import {Validate} from '../decorators/Validator';

export default class NoteController {

    @Validate(NoteDto)
    static postNote = async (dto: NoteDto, req: e.Request, res: e.Response, next: e.NextFunction) => {
        const note = new Note(dto);
        note.save().then((saved) => {
            const resDto = new NoteDto(saved);
            res.json(classToPlain(resDto));
        }, (err) => {
            return next(err);
        });
    };

    @Validate(NoteDto)
    static updateNote = async (dto: NoteDto, req: e.Request, res: e.Response, next: e.NextFunction) => {
        Note.findByIdAndUpdate(dto.id, {content: dto.content, color: dto.color, created: dto.created},
            {new: true}, (err, updateResult) => {
            if (err) {
                console.error(err);
                return res.sendStatus(404);
            } else {
                res.json(new NoteDto(updateResult));
            }
        })
    };

    static getNotes = async(req: e.Request, res: e.Response, next: e.NextFunction) => {
        Note.find({}, (err, notes) => {
            if (err) { return next(err);}
            const noteDtos = notes.map((note) => new NoteDto(note));
            res.json(classToPlain(noteDtos));
        });
    };

    static deleteNote = async(req: e.Request, res: e.Response, next: e.NextFunction) => {
        if (req.query.id === undefined) {
            return next(400);
        }
        Note.findByIdAndDelete(req.query.id, ((err) => {
            if (err) {
                return next(err);
            }
            res.sendStatus(204);
        }));
    };
}