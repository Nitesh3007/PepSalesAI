import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
}

const searchSlice = createSlice({
  name: 'search',
  initialState: { query: '' } as SearchState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;