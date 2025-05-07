import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Fetch all events
export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:8000/api/events/');
        if (!response.ok) throw new Error('Failed to fetch events');
        return await response.json();
    } catch (error) {
        console.error('Error fetching events:', error);
        return rejectWithValue(error.message);
    }
});

// Fetch single event by ID
export const fetchEventById = createAsyncThunk('events/fetchEventById', async (id, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:8000/api/events/${id}/`);
        if (!response.ok) throw new Error('Failed to fetch event by ID');
        return await response.json();
    } catch (error) {
        console.error('Error fetching event by ID:', error);
        return rejectWithValue(error.message);
    }
});

// Create a new event
export const createEvent = createAsyncThunk('events/createEvent', async (eventData, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        formData.append('title', eventData.title);
        formData.append('description', eventData.description);
        formData.append('date', eventData.date);
        formData.append('venue', eventData.venue);
        
        if (eventData.image) {
            formData.append('image', eventData.image);
        }

        const response = await fetch('http://localhost:8000/api/events/', {
            method: 'POST',
            body: formData, // No need to set Content-Type
        });

        if (!response.ok) throw new Error('Failed to create event');
        return await response.json();
    } catch (error) {
        console.error('Error creating event:', error);
        return rejectWithValue(error.message);
    }
});

// Update an existing event using PATCH
export const updateEvent = createAsyncThunk('events/updateEvent', async ({ id, updatedEvent }, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        formData.append('title', updatedEvent.title);
        formData.append('description', updatedEvent.description);
        formData.append('venue', updatedEvent.venue);
        formData.append('date', updatedEvent.date);

        if (updatedEvent.image) {
            formData.append('image', updatedEvent.image); // Only append if image is a File
        }

        const response = await fetch(`http://localhost:8000/api/events/${id}/`, {
            method: 'PATCH', // Use PATCH to update fields
            body: formData,
        });

        if (!response.ok) throw new Error('Failed to update event');
        return await response.json();
    } catch (error) {
        console.error('Error updating event:', error);
        return rejectWithValue(error.message);
    }
});

// Delete an event
export const deleteEventAPI = createAsyncThunk('events/deleteEvent', async (id, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:8000/api/events/${id}/`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete event');
        return id;
    } catch (error) {
        console.error('Error deleting event:', error);
        return rejectWithValue(error.message);
    }
});

// Slice
const eventSlice = createSlice({
    name: 'events',
    initialState: {
        items: [],
        selectedEvent: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        // Removed addEvent, editEvent, deleteEvent since they are not needed
    },
    extraReducers: (builder) => {
        builder
            // Fetch Events
            .addCase(fetchEvents.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Fetch Event By ID
            .addCase(fetchEventById.fulfilled, (state, action) => {
                state.selectedEvent = action.payload;
            })

            // Create Event
            .addCase(createEvent.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items.push(action.payload);
            })
            .addCase(createEvent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Update Event
            .addCase(updateEvent.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.items.findIndex(e => e.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateEvent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Delete Event
            .addCase(deleteEventAPI.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteEventAPI.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = state.items.filter(e => e.id !== action.payload);
            })
            .addCase(deleteEventAPI.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { addEvent, editEvent, deleteEvent } = eventSlice.actions;
export default eventSlice.reducer;
