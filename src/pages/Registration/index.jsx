import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
	dataSet,
	getLogin,
	selectorIsSign,
} from "../../redux/slisec/signSlice";
import { Navigate } from "react-router-dom";
import axios from "../../axios";

export const Registration = () => {
	const isSign = useSelector(selectorIsSign);
	const disp = useDispatch();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: "",
			name: "",
			password: "",
		},
		mode: "all",
	});
	const onSubmit = async (values) => {
		const { data } = await axios.post("/register", values);
		if (!data._id) {
			data.map((item) => {
				if (item.path === "email") {
					setError("email", { type: "custom", message: item.msg });
				}
				if (item.path === "password") {
					setError("password", { type: "custom", message: item.msg });
				}
				if (item.path === "name") {
					setError("name", { type: "custom", message: item.msg });
				}
			});
		}
		if (data._id) {
		disp(dataSet(data));
		}
		if (data.token) {
			window.localStorage.setItem("token-sign", data.token);
		}
	};
	if (isSign) {
		return <Navigate to="/" />;
	}

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Створення аккаунта
			</Typography>
			<div className={styles.avatar}>
				<Avatar sx={{ width: 100, height: 100 }} />
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					error={Boolean(errors.name?.message)}
					helperText={errors.name?.message}
					{...register("name", { required: "це поле обов'язкове" })}
					label="Ім'я"
					fullWidth
				/>
				<TextField
					className={styles.field}
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					{...register("email", { required: "це поле обов'язкове" })}
					label="E-Mail"
					fullWidth
				/>
				<TextField
					className={styles.field}
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					{...register("password", { required: "це поле обов'язкове" })}
					label="Пароль"
					fullWidth
				/>
				<Button
					disabled={!isValid}
					type="submit"
					size="large"
					variant="contained"
					fullWidth
				>
					Пройти регистрацію
				</Button>
			</form>
		</Paper>
	);
};
