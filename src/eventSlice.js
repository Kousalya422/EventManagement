import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from './api'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return {};
  }
  return { Authorization: `Token ${token}` };
};

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      if (!headers.Authorization) {
        return rejectWithValue('No token found. Please log in.');
      }

      const response = await fetch(`${BASE_URL}/events/`, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) throw new Error('Failed to fetch events');
      return await response.json();
    } catch (error) {
      console.error('Error fetching events:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (id, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      if (!headers.Authorization) return rejectWithValue('No token found. Please log in.');

      const response = await fetch(`${BASE_URL}/events/${id}/`, {
        headers,
      });

      if (!response.ok) throw new Error('Failed to fetch event by ID');
      return await response.json();
    } catch (error) {
      console.error('Error fetching event by ID:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      if (!headers.Authorization) return rejectWithValue('No token found. Please log in.');

      const formData = new FormData();
      formData.append('title', eventData.title);
      formData.append('description', eventData.description);
      formData.append('date', eventData.date);
      formData.append('venue', eventData.venue);
      if (eventData.image) {
        formData.append('image', eventData.image);
      }

      const response = await fetch(`${BASE_URL}/events/`, {
        method: 'POST',
        headers: headers, 
        body: formData,   
      });

      if (!response.ok) throw new Error('Failed to create event');
      return await response.json();
    } catch (error) {
      console.error('Error creating event:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async ({ id, updatedEvent }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      if (!headers.Authorization) return rejectWithValue('No token found. Please log in.');

      const formData = new FormData();
      formData.append('title', updatedEvent.title);
      formData.append('description', updatedEvent.description);
      formData.append('venue', updatedEvent.venue);
      formData.append('date', updatedEvent.date);
      if (updatedEvent.image) {
        formData.append('image', updatedEvent.image);
      }

      const response = await fetch(`${BASE_URL}/events/${id}/`, {
        method: 'PATCH',
        headers: headers, 
        body: formData,    
      });

      if (!response.ok) throw new Error('Failed to update event');
      return await response.json();
    } catch (error) {
      console.error('Error updating event:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEventAPI = createAsyncThunk(
  'events/deleteEvent',
  async (id, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      if (!headers.Authorization) return rejectWithValue('No token found. Please log in.');

      const response = await fetch(`${BASE_URL}/events/${id}/`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) throw new Error('Failed to delete event');
      return id;
    } catch (error) {
      console.error('Error deleting event:', error);
      return rejectWithValue(error.message);
    }
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    items: [],
    selectedEvent: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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

      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.selectedEvent = action.payload;
      })

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

      .addCase(updateEvent.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(deleteEventAPI.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteEventAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter((e) => e.id !== action.payload);
      })
      .addCase(deleteEventAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;
