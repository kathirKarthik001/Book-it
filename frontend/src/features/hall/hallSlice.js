import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import hallService from "./hallService";


// get Halls
export const getHalls = createAsyncThunk('booking/getHalls' , async(_,thunkAPI) =>{
    try { 
        const token = thunkAPI.getState().auth.user.token       //getting token
        return await hallService .getHalls(token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        
        return thunkAPI.rejectWithValue(message)
    }
})






const initialState = {
    halls:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:''
}

const hallSlice = createSlice({
    name:'halls',
    initialState,
    reducers:{
        reset:(state)=>{
         state.isLoading =false,
         state.isSuccess = false,
         state.isError =false,
         state.message =''
        }
    },
    extraReducers:(builder) => { 
        builder
         // Get halls
         .addCase(getHalls.pending , (state,action) =>{
            state.isLoading = true
        })
        .addCase(getHalls.rejected , (state,action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getHalls.fulfilled , (state,action) =>{
            state.isLoading = false
            state.isSuccess= true
            state.halls = action.payload
        })

    }
    }

)

export const {reset} = hallSlice.actions
export default hallSlice.reducer