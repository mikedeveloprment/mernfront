import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getSign = createAsyncThunk("sign/getSign", async (params) => {
	const { data } = await axios.post("/sign", params);
	return data;
});

export const getSignMe = createAsyncThunk("sign/getSignMe", async (params) => {
	const { data } = await axios.get("/sign/me");
	return data;
});
export const getLogin = createAsyncThunk("sign/getLogin", async (params) => {
	const { data } = await axios.post("/register", params);
	return data;
});

const initialState = {
	data: null,
	status: "load",
};

const signSlice = createSlice({
	name: "sign",
	initialState,
	reducers: {
		logout: (state) => {
			state.data = null;
			state.status = "load";
		},
		dataSet: (state, action)=> {
			state.data = action.payload
		}
	},
	extraReducers: {
		//
		[getLogin.pending]: (state) => {
			state.data = null;
			state.status = "load";
		},
		[getLogin.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.status = "confirm";
		},
		[getLogin.rejected]: (state) => {
			state.data = null;
			state.status = "error";
		},

		//

		[getSign.pending]: (state) => {
			state.data = null;
			state.status = "load";
		},
		[getSign.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.status = "confirm";
		},
		[getSign.rejected]: (state) => {
			state.data = null;
			state.status = "error";
		},

		//

		[getSignMe.pending]: (state) => {
			state.data = null;
			state.status = "load";
		},
		[getSignMe.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.status = "confirm";
		},
		[getSignMe.rejected]: (state) => {
			state.data = null;
			state.status = "error";
		},
	},
});

export const selectorIsSign = (state) => Boolean(state.sign.data);
export const { logout,dataSet } = signSlice.actions;
export const signReduce = signSlice.reducer;
