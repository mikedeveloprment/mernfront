import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../components/Post";
import { getPosts } from "../redux/slisec/postsSlice";

export const Home = () => {
	const disp = useDispatch();
	const { posts } = useSelector((state) => state.posts);
	const userData = useSelector((state) => state.sign.data);

	const isLoadingPosts = posts.status === "load";
	React.useEffect(() => {
		disp(getPosts());
	}, []);
	return (
		<>
			<Tabs
				style={{ marginBottom: 15 }}
				value={0}
				aria-label="basic tabs example"
			>
				<Tab label="Новые" />
				<Tab label="Популярные" />
			</Tabs>
				<Grid xs={1} item>
					{(isLoadingPosts ? [...Array(5)] : posts.items).map((obj, index) =>
						isLoadingPosts ? (
							<Post key={index} isLoading={isLoadingPosts} />
						) : (
							<Post
								key={index}
								id={obj._id}
								title={obj.title}
								imageUrl={obj.imageUrl}
								autor={obj.autor}
								createdAt={obj.createdAt}
								viewsCount={obj.viewsCount}
								commentsCount={3}
								isEditable={userData?._id === obj.autor._id}
							/>
						)
					)}
				</Grid>
		</>
	);
};
