import { configureStore } from "@reduxjs/toolkit";
import { reducerFood } from "./Reducer/reducerFood";
import switcherSlice from './localStorate'

const store = configureStore({
    reducer: {
        Card: reducerFood,
        Switcher: switcherSlice,
        NotificationCount: reducerFood 
    }
})
export { store };