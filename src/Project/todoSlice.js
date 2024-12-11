import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=200`);
   const data=await res.json();
   const finaldata=data.results.map(async(curr)=>{
     const ress = await fetch(curr.url);
     const datas=ress.json();
     return datas;
   })
const detaileddata=await Promise.all(finaldata);
   return detaileddata;
});

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        isLoading: false,
        data: [],
        isError: false,
        error:null
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state, action) => {
           state.error=null;
            state.isLoading = true;
        })
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.isError = true;
            state.error=action.payload;
        })
    }
});

export default todoSlice.reducer; 