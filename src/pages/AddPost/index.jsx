import React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectorIsSign } from "../../redux/slisec/signSlice";
import axios from "../../axios";

export const AddPost = () => {
	const { id } = useParams();
	const isSign = useSelector(selectorIsSign);
	const navigate = useNavigate();
	const [value, setValue] = React.useState("");
	const [title, setTitle] = React.useState("");
	const [tags, setTags] = React.useState("");
	const [isLoading, setLoading] = React.useState(false);
	const [imageUrl, setImageUrl] = React.useState("");

	const fileInputRef = React.useRef(null);
	const isEditing = Boolean(id);

	const handleChangeFile = async (event) => {
		try {
			const formData = new FormData();
			formData.append("image", event.target.files[0]);
			const { data } = await axios.post("/upload", formData);
			setImageUrl(data.url);
		} catch (error) {
			alert("error to be uploading to file", error);
		}
	};

	const onClickRemoveImage = async () => {
		setImageUrl("");
	};

	const onChange = React.useCallback((value) => {
		setValue(value);
	}, []);

	const onSubmit = async () => {
		try {
			setLoading(true);
			const fields = {
				title,
				imageUrl: imageUrl
					? `https://mernbackend1.herokuapp.com/${imageUrl}`
					: `https://mernbackend1.herokuapp.com//uploads/mike.png`,
				tags,
				text: value,
			};
			const { data } = isEditing
				? await axios.patch(`/posts/${id}`, fields)
				: await axios.post("/posts", fields);

			const _id = isEditing ? id : data._id;
			navigate(`/posts/${_id}`);
		} catch (error) {
			console.warn(error);
			alert("ошибка при создании стати");
		}
	};

	React.useEffect(() => {
		if (id) {
			axios
				.get(`/posts/${id}`)
				.then(({ data }) => {
					console.log(data);
					setTitle(data.title);
					setValue(data.text);
					setImageUrl(data.imageUrl.replace(`https://mernbackend1.herokuapp.com`, ""));
					setTags(data.tags);
				})
				.catch((err) => alert(err));
		}
	}, []);
	const options = React.useMemo(
		() => ({
			spellChecker: false,
			maxHeight: "400px",
			autofocus: true,
			placeholder: "Введите текст...",
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
			},
		}),
		[]
	);
	if (!window.localStorage.getItem("token-sign") && !isSign) {
		return <Navigate to="/" />;
	}
	return (
		<Paper style={{ padding: 30 }}>
			<Button
				variant="outlined"
				size="large"
				onClick={() => {
					fileInputRef.current.click();
				}}
			>
				Загрузить превью
			</Button>
			<input
				type="file"
				ref={fileInputRef}
				onChange={handleChangeFile}
				hidden
			/>
			{imageUrl && (
				<>
					<Button
						variant="contained"
						color="error"
						onClick={onClickRemoveImage}
					>
						Удалить
					</Button>
					<img
						className={styles.image}
						src={`https://mernbackend1.herokuapp.com${imageUrl}`}
						alt="Uploaded"
					/>
				</>
			)}

			<br />
			<br />
			<TextField
				classes={{ root: styles.title }}
				variant="standard"
				value={title}
				placeholder="Заголовок статьи..."
				fullWidth
				onChange={(e) => setTitle(e.target.value)}
			/>
			<TextField
				classes={{ root: styles.tags }}
				variant="standard"
				placeholder="Тэги"
				fullWidth
				value={tags}
				onChange={(e) => setTags(e.target.value)}
			/>
			<SimpleMDE
				className={styles.editor}
				value={value}
				onChange={onChange}
				options={options}
			/>
			<div className={styles.buttons}>
				<Button onClick={onSubmit} size="large" variant="contained">
					{isEditing ? "Змінити" : "Опубликовать"}
				</Button>
				<Link to="/">
					<Button size="large">Отмена</Button>
				</Link>
			</div>
		</Paper>
	);
};
