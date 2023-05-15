import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import { Post } from "../components/Post";
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
		</>
	);
};
