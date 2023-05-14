import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import { useSelector } from "react-redux";

export const FullPost = () => {
	const [data, setData] = React.useState();
	const [isLoading, setIsLoading] = React.useState(true);
	const { id } = useParams();
	const UserData = useSelector(state => state.sign.data)

	React.useEffect( () => {
		axios.get(`/posts/${id}`).then(res => {
			setData(res.data);
      setIsLoading(false)
		}).catch(err => {
			alert(err)
		})
	}, []);
  if (isLoading) {
    return <Post isLoading={true}/> 
  }
	return (
		<>
			<Post
				id={data._id}
				title={data.title}
				imageUrl={data.imageUrl}
				autor={data.autor}
				createdAt={data.createdAt}
				viewsCount={data.viewsCount}
				commentsCount={3}
				tags={data.tags}
				isFullPost
				isEditable={UserData?._id === data.autor._id}
			>

				<ReactMarkdown children={data.text}/>
			</Post>
			<CommentsBlock
				items={[
					{
						user: {
							fullName: "Вася Пупкин",
							avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
						},
						text: "Это тестовый комментарий 555555",
					},
					{
						user: {
							fullName: "Иван Иванов",
							avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
						},
						text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
					},
				]}
				isLoading={false}
			>
				<Index />
			</CommentsBlock>
		</>
	);
};
