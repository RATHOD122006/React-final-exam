

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    favorites: [],
    watchlist: [],
  },
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    addToFavorites(state, action) {
      if (!state.favorites.some(movie => movie.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites(state, action) {
      state.favorites = state.favorites.filter(movie => movie.id !== action.payload);
    },
    addToWatchlist(state, action) {
      if (!state.watchlist.some(movie => movie.id === action.payload.id)) {
        state.watchlist.push(action.payload);
      }
    },
    removeFromWatchlist(state, action) {
      state.watchlist = state.watchlist.filter(movie => movie.id !== action.payload);
    },
  },
});

export const { 
  loginSuccess, 
  logout, 
  addToFavorites, 
  removeFromFavorites,
  addToWatchlist,
  removeFromWatchlist
} = authSlice.actions;

export default authSlice.reducer;