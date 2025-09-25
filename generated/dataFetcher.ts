import { createAsyncThunk } from '@reduxjs/toolkit';

// Define the types for the data and the API response
interface DataItem {
  id: number;
  name: string;
}

interface ApiResponse {
  data: DataItem[];
  error?: string;
}

// Create an asynchronous thunk for fetching data
export const fetchData = createAsyncThunk<DataItem[], void, { rejectValue: string }>(
  'data/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      // Replace with your actual API call
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10'); 

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || response.statusText}`);
      }

      const data: ApiResponse = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data.data;
    } catch (error: any) {
      // Handle errors appropriately (log, display user message, etc.)
      console.error('Error fetching data:', error);
      return rejectWithValue(error.message); 
    }
  }
);


// Example usage within a Redux slice (needs to be integrated into your existing Redux store)

//In your Redux Slice (e.g., dataSlice.ts)
import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from './dataFetcher';


interface DataState {
  data: DataItem[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: null,
  loading: false,
  error: null,
};


const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {}, //No reducers needed in this example, all state updates come from the asyncThunk
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});


export default dataSlice.reducer;