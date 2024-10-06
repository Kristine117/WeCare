import { configureStore } from "@reduxjs/toolkit";
import registrationSlice from "./registration_slice";

const store = configureStore({
    reducer:{
        registration:registrationSlice.reducer
    }
})


export const registrationAction = registrationSlice.actions;


export default store;