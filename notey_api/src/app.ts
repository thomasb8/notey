import e from "express";
import "reflect-metadata";
import NoteController from './controllers/note_controller';
import cors from "cors";

const app = e();

app.set("port", process.env.PORT || 8080);
app.set("view engine", "html");
app.use(cors());
app.use(e.json());

app.post("/note", NoteController.postNote);
app.get("/note", NoteController.getNotes);
app.delete("/note", NoteController.deleteNote);
app.put("/note", NoteController.updateNote);

app.use((err, req: e.Request, res: e.Response, next: e.NextFunction) => {
    console.error(err.stack);
    res.status(500).json(err);
});

export default app;

