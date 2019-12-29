import React, {Component} from "react";
import {StyledNoteCard} from "./NoteCard";
import styled from "styled-components";
import Note from "../models/note";
import {deleteNote, getNotes, postNote, updateNote} from "../actions/note_actions";
import {connect} from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.props.getNotes();
        this.addNew = this.addNew.bind(this);
    }

    addNew() {
        const { postNote } = this.props;
        postNote(new Note({content: '', created: Date.now()}));
    }

    render() {

        const { updateNote, deleteNote } = this.props;

        return (
            <div className={this.props.className}>
                <div className="background"/>
                <Fab className="add-button" onClick={this.addNew}>
                    <AddIcon/>
                </Fab>
                <div className="notes-container">
                {this.props.notes.map((note) => (
                    <StyledNoteCard key={note.id} note={note} className="item" onUpdate={updateNote} onDelete={deleteNote}/>))}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        notes: Object.values(state.items)
    }
}

const mapDispatchToProps = {
    getNotes,
    postNote,
    updateNote,
    deleteNote
};

const AsyncDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export const StyledDashboard = styled(AsyncDashboard)`
  display: flex;
  flex-direction: column; 
  .add-button {
    align-self: flex-end;
    margin: 10px;
  }
  .background {
    position: fixed;
    width: 100%;
    height: 100%;
    background: url("assets/v2osk-uUbEvoRfRdY-unsplash.jpg") no-repeat fixed center;
    z-index: -1;
  }
  .notes-container {
    margin-top: 0;
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    margin: 0 auto;
  }
  .notes-container .item {
    width: 300px;
    height: 300px;
    padding: 10px;
  }
`;
