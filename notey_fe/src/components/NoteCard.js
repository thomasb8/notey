import React, {Component} from "react";
import styled from "styled-components";
import Note from "../models/note";
import moment from "moment";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from '@material-ui/icons/Delete';


class NoteCard extends Component {
    constructor(props) {
        super(props);
        this.state = {note: this.props.note};
        this.updateNote = this.updateNote.bind(this);
    }

    updateNote(e) {
        const { onUpdate } = this.props;
        const note = new Note(this.state.note);
        note.content = e.target.value;
        onUpdate(note);
    }

    render() {
        const { onDelete } = this.props;
        return (
            <div className={this.props.className}>
                <div className="container">
                    <div className="content">
                        <textarea defaultValue={this.state.note.content} onChange={this.updateNote}/>
                    </div>
                    <Fab className="delete-fab" onClick={() => onDelete(this.state.note)} >
                        <DeleteIcon/>
                    </Fab>
                    <div className="create-time">{moment(new Date(this.state.note.created)).format("YYYY-MM-DD")}</div>
                </div>
            </div>
        );
    }
}

export const StyledNoteCard = styled(NoteCard)`
  .container {
    background-color: ${props => props.note.color ? `#${props.note.color}` : "papayawhip"};
    width: 100%;
    height: 100%; 
    border: 1px solid #282c34;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    .content {
    width: 90%;
    height: 90%;
    }
    .delete-fab {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
    textarea {
      background-color: ${props => props.note.color ? `#${props.note.color}` : "papayawhip"};
      border: 0;
      width: 100%;
      height: 100%;
      resize: none;
      outline: none;
    }
  }
`;