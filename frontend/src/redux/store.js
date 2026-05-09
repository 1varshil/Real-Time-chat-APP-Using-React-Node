import {configureStore} from "@reduxjs/toolkit";
import pizza from "./userSlice.js"

const store = configureStore({
    reducer:{
       user : pizza
    }
})

export default store;
