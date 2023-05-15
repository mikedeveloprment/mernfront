import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Login.module.scss";
import { getSign, selectorIsSign } from "../../redux/slisec/signSlice";
import { Navigate } from "react-router-dom";

export const Login = () => {
	const isSign = useSelector(selectorIsSign);
	const disp = useDispatch();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({

		mode: "all",
	});
	const onSubmit = async (values) => {
		const { payload } = await disp(getSign(values));
		console.log(payload);
		if (!payload) {
			alert("не вийшло ввійти");
		}
		if (payload.token) {
			window.localStorage.setItem("token-sign", payload.token)
		}
	};
	if (isSign) {
		return <Navigate to="/" />;
	}

	return (
		<Paper  classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Вход в аккаунт
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label="E-Mail"
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					fullWidth
					{...register("email", { required: "вкажіть почту" })}
				/>
				<TextField
					className={styles.field}
					label="Пароль"
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					{...register("password", { required: "вкажіть пароль" })}
					fullWidth
				/>
				<Button disabled={!isValid} type="submit" size="medium" variant="contained" fullWidth>
					Войти
				</Button>
			</form>
		</Paper>
	);
};
