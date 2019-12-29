export default class Note {
    constructor(obj) {
        this.id = obj.id;
        this.content = obj.content;
        this.color = obj.color;
        this.created  = obj.created;
    }
}