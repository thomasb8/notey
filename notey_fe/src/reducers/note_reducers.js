import {
    ADD_NOTE,
    DELETE_NOTE,
    UPDATE_NOTE,
    GET_NOTES,
    STATUS_BEGIN,
    STATUS_SUCCESS, STATUS_FAILURE
} from '../actions/note_actions';

function noteReducer(
    state = {
        loading: false,
        error: null,
        items: {}
    }, action
) {
    switch(action.type) {
        case GET_NOTES:
        case DELETE_NOTE:
        case UPDATE_NOTE:
        case ADD_NOTE:
            if (action.status === STATUS_BEGIN) {
                return Object.assign({}, { ...state, loading: true });
            } else if (action.status === STATUS_SUCCESS) {
                return Object.assign({}, { ...state, loading: false, items: noteList(state.items, action) })
            } else if (action.status === STATUS_FAILURE) {
                return Object.assign({}, { ...state, loading: false, error: action.error });
            }
            break;
        default:
            return state;
        }
}

function splitByIds(items) {
    let obj = {};
    items.forEach((item) => {
        obj[item.id] = item;
    });
    return obj;
}

function noteList(items = {}, action) {
    let existingItems = Object.assign({}, items);
    switch(action.type) {
        case GET_NOTES:
            return splitByIds(action.payload);
        case ADD_NOTE:
            existingItems[action.payload.id] = action.payload;
            return existingItems;
        case DELETE_NOTE:
            delete existingItems[action.payload.id];
            return existingItems;
        case UPDATE_NOTE:
            existingItems[action.payload.id] = action.payload;
            return existingItems;
        default:
            return existingItems;
    }
}

export default noteReducer;