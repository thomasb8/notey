import {getContentType, getHost} from "../config/host_provider";
import Note from "../models/note";

export const ADD_NOTE = 'ADD_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const GET_NOTES = 'GET_NOTES';

export const STATUS_BEGIN = 'begin';
export const STATUS_SUCCESS = 'success';
export const STATUS_FAILURE = 'failure';

function createFetchers(action) {
    return {
        begin: () => { return { type: action, status: STATUS_BEGIN}},
        success: (items) => { return { type: action, status: STATUS_SUCCESS, payload: items }},
        failure: (error) => { return { type: action, status: STATUS_FAILURE, error: error }}
    };
}

const noteFetcher = createFetchers(GET_NOTES);
const notePoster = createFetchers(ADD_NOTE);
const noteUpdater = createFetchers(UPDATE_NOTE);
const noteDeleter = createFetchers(DELETE_NOTE);

export const getNotes = () => {
    return dispatch => {
        dispatch(noteFetcher.begin());
        return fetch(`${getHost()}/note`).then(async (res) => {
            let notes = await res.json();
            dispatch(noteFetcher.success(notes.map((note) => new Note(note))));
        }, (err) => {
            dispatch(noteFetcher.failure(err))
        });
    }
};

export const postNote = (note) => {
    return dispatch => {
        dispatch(notePoster.begin());
        fetch(`${getHost()}/note`,
            {method: 'POST', body: JSON.stringify(new Note(note)), headers: getContentType('json')})
            .then( async (res) => {
                let note = await res.json();
                dispatch(notePoster.success(note))
        }, err => dispatch(notePoster.failure(err)));
    }
};

export const updateNote = (note) => {
    return dispatch => {
        dispatch(noteUpdater.begin());
        fetch(`${getHost()}/note`, {method: 'PUT', body: JSON.stringify(note), headers: getContentType('json')})
            .then( async (res) => {
                const newNote = new Note(await res.json());
                dispatch(noteUpdater.success(newNote));
                }, (err) => dispatch(noteUpdater.failure(err)));
    }
};

export const deleteNote = (note) => {
    return dispatch => {
        dispatch(notePoster.begin());
        fetch(`${getHost()}/note?id=${note.id}`, {method: 'DELETE'}).then((res) => {
            if (res.status === 204) {
                dispatch(noteDeleter.success(note));
            }
        }, (err) => noteDeleter.failure(err));
    }
};
