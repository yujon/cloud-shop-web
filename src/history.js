import createHistory from 'history/createBrowserHistory'

export const history = createHistory()

// Get the current location.
export const initialState = history.location;