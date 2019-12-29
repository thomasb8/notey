import {IsDefined, IsInt, IsOptional, IsString} from 'class-validator';
import {NoteDocument} from '../models/Note';

export class NoteDto {

    constructor();

    constructor(partial?: Partial<NoteDto>);

    constructor(document?: NoteDocument);

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.content = obj && obj.content || null;
        this.color = obj && obj.color || null;
        this.created = obj && obj.created || null;
    }

    public id: string | undefined;

    @IsDefined()
    public content: string;

    @IsOptional()
    @IsString()
    public color: string;

    @IsInt()
    public created: number;
}