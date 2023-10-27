import { configureStore, createSlice } from "@reduxjs/toolkit";

// Color Palette
const colors = ['red', 'orange', 'lime-800', 'emerald', 'blue', 'cyan-800', 'purple', 'pink-800', 'rose']

// Dummy quote for initial state
const dummyQuote = {
    quote: "When I was 5 years old, my mother always told me that happiness was the key to life. When I went to school, they asked me what I wanted to be when I grew up. I wrote down ‘happy’. They told me I didn’t understand the assignment, and I told them they didn’t understand life.",
    author: "John Lennon",
}

// Initial State
const initialState = {
    quote: dummyQuote.quote,
    author: dummyQuote.author,
    quotes: [],
    color: "black",
}

// Reducer Slice
const quote = createSlice({
    name: "quote",
    initialState,
    reducers: {
        newQuote: (state, action) => ({ ...state, ...action.payload }),
        getQuotes: (state, action) => ({ ...state, ...action.payload }),
        newColor: (state) => ({ ...state, color: colors[Math.floor(Math.random() * colors.length)] })
    }
})

// Exporting actions and reducer
export const { newQuote, getQuotes, newColor } = quote.actions;
export const quoteReducer = quote.reducer


// Exporting all store as default.
export const store = configureStore({
    reducer: {
        quoteReducer
    },
    devTools: process.env.NODE_ENV !== "production",
});
