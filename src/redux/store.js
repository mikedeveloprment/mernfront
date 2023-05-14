import { configureStore } from "@reduxjs/toolkit";
import { postsReduce } from "./slisec/postsSlice";
import { signReduce } from "./slisec/signSlice";

export const store = configureStore({
	reducer: { posts: postsReduce, sign: signReduce },
});
