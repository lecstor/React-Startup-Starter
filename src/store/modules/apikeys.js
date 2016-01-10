import findIndex from 'lodash/array/findIndex';

const LOAD = 'rss/apikeys/LOAD';
const LOAD_SUCCESS = 'rss/apikeys/LOAD_SUCCESS';
const LOAD_FAIL = 'rss/apikeys/LOAD_FAIL';

const CREATE_KEY = 'rss/apikeys/CREATE_KEY';
const CREATE_KEY_SUCCESS = 'rss/apikeys/CREATE_KEY_SUCCESS';
const CREATE_KEY_FAIL = 'rss/apikeys/CREATE_KEY_FAIL';

const UPDATE_KEY = 'rss/apikeys/UPDATE_KEY';
const UPDATE_KEY_SUCCESS = 'rss/apikeys/UPDATE_KEY_SUCCESS';
const UPDATE_KEY_FAIL = 'rss/apikeys/UPDATE_KEY_FAIL';

const DELETE_KEY = 'rss/apikeys/DELETE_KEY';
const DELETE_KEY_SUCCESS = 'rss/apikeys/DELETE_KEY_SUCCESS';
const DELETE_KEY_FAIL = 'rss/apikeys/DELETE_KEY_FAIL';

const initialState = { loaded: false, keys: [] };

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {

    case LOAD:
      return { ...state, loading: true };

    case LOAD_SUCCESS:
      return { ...state, loading: false, loaded: true, keys: action.result };

    case LOAD_FAIL:
      return { ...state, loading: false, error: action.error };


    case CREATE_KEY:
      return { ...state, loading: true };

    case CREATE_KEY_SUCCESS:
      const keys = [...state.keys, action.result];
      return { ...state, loading: false, keys };

    case CREATE_KEY_FAIL:
      return { ...state, loading: false, error: action.error };


    case DELETE_KEY:
      return { ...state, loading: true };

    case DELETE_KEY_SUCCESS:
      const idx = findIndex(state.keys, { id: action.result.id });
      if (idx < 0) return { ...state, loading: false };
      return {
        ...state,
        loading: false,
        keys: [
          ...state.keys.slice(0, idx),
          ...state.keys.slice(idx + 1),
        ],
      };

    case DELETE_KEY_FAIL:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
}

export function load () {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (fetch) => fetch('/apikeys'),
  };
}

export function createKey (key) {
  return {
    types: [CREATE_KEY, CREATE_KEY_SUCCESS, CREATE_KEY_FAIL],
    promise: (fetch) => fetch('/apikeys', { method: 'post', body: JSON.stringify(key) }),
  };
}

export function updateKey (key) {
  return {
    types: [UPDATE_KEY, UPDATE_KEY_SUCCESS, UPDATE_KEY_FAIL],
    promise: (fetch) => fetch(`/apikeys/${key.id}`, { method: 'put', body: JSON.stringify(key) }),
  };
}

export function deleteKey (key) {
  return {
    types: [DELETE_KEY, DELETE_KEY_SUCCESS, DELETE_KEY_FAIL],
    promise: (fetch) => {
      return fetch(`/apikeys/${key.id}`, { method: 'delete' })
      .then((response) => {
        if (!response.error) response.result = { id: key.id };
        return response;
      });
    },
  };
}
