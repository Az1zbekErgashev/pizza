import { createSlice } from '@reduxjs/toolkit'

const initialState = { switcher: [] }

const switherSlice = createSlice({
  name: 'switcher',
  initialState,
  reducers: {
    getFoodsFromLocalStorage(state) {
      state.switcher = JSON.parse(localStorage.getItem('FoodsArray')) || []
    }
  },
})

export const { getFoodsFromLocalStorage } = switherSlice.actions
export default switherSlice.reducer