// Import necessary Redux toolkit functions
import { configureStore, createSlice } from "@reduxjs/toolkit";

// Define the initial state of the application
const initialState = {
    breakLength: 5,
    sessionLength: 25,
    time: 1000 * 60 * 25, // Initial time in milliseconds (25 minutes)
    running: false,
    currentTime: 'session',
    interval: undefined
}

// Create a Redux slice for managing time-related state
const time = createSlice({
    name: "time", // Slice name
    initialState, // Initial state defined above
    reducers: {
        // Reducer for increasing the break length
        breakLengthUp: (state) => ({ ...state, breakLength: state.running ? state.breakLength : state.breakLength + 1 }),

        // Reducer for decreasing the break length (if not running and not already at 0)
        breakLengthDown: (state) => ({ ...state, breakLength: state.running || state.breakLength === 0 ? state.breakLength : state.breakLength - 1 }),

        // Reducer for increasing the session length (if not running)
        sessionLengthUp: (state) => {
            if (!state.running) {
                return { ...state, sessionLength: state.sessionLength + 1, time: (state.sessionLength + 1) * 60 * 1000 }
            }
            return { ...state }
        },

        // Reducer for decreasing the session length (if not running and not already at 0)
        sessionLengthDown: (state) => {
            if (!state.running && state.sessionLength !== 0) {
                return { ...state, sessionLength: state.sessionLength - 1, time: (state.sessionLength - 1) * 60 * 1000 }
            }
            return { ...state }
        },

        // Reducer for setting the time
        setTime: (state, action) => ({ ...state, time: action.payload }),

        // Reducer for starting the timer and storing the interval
        run: (state, action) => {
            return { ...state, running: true, interval: action.payload }
        },

        // Reducer for stopping the timer, clearing the interval, and resetting the time
        stop: (state) => {
            clearInterval(state.interval);

            const newTime = state.currentTime === 'session' ? state.breakLength : state.sessionLength;
            const currentTime = state.currentTime === 'session' ? "break" : 'session';

            return { ...state, running: false, interval: undefined, time: newTime * 60 * 1000, currentTime }
        },

        // Reducer for resetting the state to initial values
        reset: (state) => {
            if (state.interval) {
                clearInterval(state.interval);
            }
            return { ...initialState };
        }
    }
});

// Export individual action creators from the time slice
export const { breakLengthUp, reset, breakLengthDown, stop, sessionLengthDown, sessionLengthUp, setTime, run } = time.actions;

// Configure the Redux store using the time reducer
export default configureStore({
    reducer: {
        time: time.reducer
    },
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
});
