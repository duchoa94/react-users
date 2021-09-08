import { createSlice } from '@reduxjs/toolkit';
import client from '../../api/client';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    searchResult: null,
    searching: false,
    error: null,
  },
  reducers: {
    searchUsersRequest: (state, action) => {
      state.searching = true;
    },
    searchUsersSuccess: (state, action) => {
      state.searchResult = action.payload;
      state.searching = false;
    },
    searchUsersFailed: (state, action) => {
      state.error = action.payload;
      state.searching = false;
    }
  }
});

export const { searchUsersRequest, searchUsersSuccess, searchUsersFailed } = userSlice.actions

export const searchGithubUsers = (searchText: string) => async (dispatch: any) => {
  dispatch(searchUsersRequest(null));
  try {
    const response = await client.get('/search/users', { params: { q: searchText, per_page: 100 } });
    dispatch(searchUsersSuccess(response));
  } catch (err: any) {
    dispatch(searchUsersFailed(err?.message));
  }
};

export const resetSearchUsers = () => async (dispatch: any) => {
  dispatch(searchUsersSuccess(null));
}

export default userSlice.reducer

