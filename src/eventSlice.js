import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const events=[
    {id:1, title:'Event1', date: '14-04-2025', venue: 'chennai'},
    {id:2, title:'Event2', date: '15-04-2025', venue: 'banglore'}
]

export const fetchEvents=createAsyncThunk('events/fetchEvents',async()=>{
    return new Promise((resolve)=>{
        setTimeout(()=>resolve(events), 500);
    });
});

export const fetchEventById = createAsyncThunk('events/fetchEventById', async(id)=>{
    return new Promise((resolve)=>{
        const event=events.find(event=>event.id==parseInt(id));
        setTimeout(()=>resolve(event), 300);
    });
})

const eventSlice = createSlice({
    name: 'events',
    initialState: {
        items: [],
        selectedEvent: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchEvents.pending, (state) => {
            state.status = 'loading';})
        .addCase(fetchEvents.fulfilled, (state,action)=>{
            state.status = 'succeeded';
            state.items = action.payload;})
        .addCase(fetchEvents.rejected,(state)=>{
            state.status = 'failed';})
        .addCase(fetchEventById.fulfilled, (state,action)=>{
            state.selectedEvent = action.payload;})
        }

});

export default eventSlice.reducer;