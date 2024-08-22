import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ActiveUrlState{
    url: string | null;
}

const initialState: ActiveUrlState = {
    url: null
}

const activeUrlSlice  = createSlice({
    name: 'activeUrl',
    initialState,
    reducers:  {
        setActiveUrl(sttate, action: PayloadAction<string>){
            sttate.url = action.payload;
        }
    }
});

export const { setActiveUrl } = activeUrlSlice.actions;
export default activeUrlSlice.reducer;