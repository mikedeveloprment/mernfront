import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
	const { data } = await axios.get("/posts");
	return data;
});
export const getTags = createAsyncThunk("posts/getTags", async () => {
	const { data } = await axios.get("/posts/tags");
	return data;
});

export const setRemove = createAsyncThunk("posts/setRemove", async (id) => {
	const { data } = await axios.delete(`/posts/${id}`);
	return data;
});

const initialState = {
	posts: {
		items: [],
		status: "load",
	},
	tags: {
		items: [],
		status: "load",
	},
};

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers: {
		//
		[getPosts.pending]: (state) => {
			state.posts.items = [];
			state.posts.status = "load";
		},
		[getPosts.fulfilled]: (state, action) => {
			state.posts.items = action.payload.reverse();
			state.posts.status = "confirm";
		},
		[getPosts.rejected]: (state) => {
			state.posts.items = [];
			state.posts.status = "error";
		},

		//
		[getTags.pending]: (state) => {
			state.tags.items = [];
			state.tags.status = "load";
		},
		[getTags.fulfilled]: (state, action) => {
			state.tags.items = action.payload;
			state.tags.status = "confirm";
		},
		[getTags.rejected]: (state) => {
			state.tags.items = [];
			state.tags.status = "error";
		},

		//
		[setRemove.pending]: (state, action) => {
			state.posts.items = state.posts.items.filter(
				(obj) => obj._id !== action.meta.arg
			);
		},
	},
});

// export const { } = counterSlice.actions
export const postsReduce = postsSlice.reducer;
