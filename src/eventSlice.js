import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const events=[
    {id:1, title:'Event1', date: '14-04-2025', venue: 'chennai'},
    {id:2, title:'Event2', date: '15-04-2025', venue: 'banglore'}
]

// export const fetchEvents=createAsyncThunk('events/fetchEvents',async()=>{
//     return new Promise((resolve)=>{
//         setTimeout(()=>resolve(events), 500);
//     });
// });

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
    const stored = localStorage.getItem('events');
    return stored ? JSON.parse(stored) : [];
  });

export const fetchEventById = createAsyncThunk('events/fetchEventById', async(id)=>{
    return new Promise((resolve)=>{
        const stored = localStorage.getItem('events');
    const events = stored ? JSON.parse(stored) : [];
        const event=events.find(event=>event.id==parseInt(id));
        setTimeout(()=>resolve(event), 300);
    });
})

const saveToLocalStorage = (items) => {
    localStorage.setItem('events', JSON.stringify(items));
  };

const eventSlice = createSlice({
    name: 'events',
    initialState: {
        items: JSON.parse(localStorage.getItem('events')) || [],
        selectedEvent: null,
        status: 'idle',
    },
    reducers: {
        addEvent: (state, action) => {
            state.items.push({ ...action.payload, id: Date.now() });
            saveToLocalStorage(state.items);
          },
          editEvent: (state, action) => {
            const index = state.items.findIndex(e => e.id === action.payload.id);
  if (index !== -1) {
    state.items[index] = { ...state.items[index], ...action.payload.updatedEvent };
  }
  saveToLocalStorage(state.items);
          },
          deleteEvent: (state, action) => {
            state.items = state.items.filter(e => e.id !== action.payload);
            saveToLocalStorage(state.items);  
        }
        },

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

export const { addEvent, editEvent, deleteEvent } = eventSlice.actions;
export default eventSlice.reducer;