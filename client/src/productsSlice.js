// redux/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, category, sort, search }, thunkAPI) => {
    const res = await axios.get(`/api/products?limit=${page*9}&${category}&${sort}&title[regex]=${search}`);
    return res.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    category: '',
    sort: '',
    search: '',
    page: 1,
    result: 0,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
        state.result = action.payload.result;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCategory, setSort, setSearch, setPage } = productsSlice.actions;

export default productsSlice.reducer;
