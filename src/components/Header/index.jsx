import React from "react";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectorIsSign } from "../../redux/slisec/signSlice";

export const Header = () => {
	const isSign   = useSelector(selectorIsSign);
	const disp = useDispatch();

	const onClickLogout = () => {
		disp(logout());
		window.localStorage.removeItem("token-sign")

	};

	return (
		<div className={styles.root}>
			<Container maxWidth="lg">
				<div className={styles.inner}>
					<Link className={styles.logo} to="/">
						<div>Mikel Blog</div>
					</Link>
					<div className={styles.buttons}>
						{isSign ? (
							<>
								<Link to="/create">
									<Button variant="contained">Створити пост</Button>
								</Link>
								<Button
									onClick={onClickLogout}
									variant="contained"
									color="error"
								>
									Вийти
								</Button>
							</>
						) : (
							<>
								<Link to="/sign">
									<Button variant="outlined">Війти</Button>
								</Link>
								<Link to="/login">
									<Button variant="contained">Створити акаунт</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};
