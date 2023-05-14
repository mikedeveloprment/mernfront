import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSignMe } from "./redux/slisec/signSlice";
import React from "react";

function App() {
	const disp = useDispatch();

	React.useEffect(() => {
		disp(getSignMe());
	}, []);
	return (
		<>
			<Header />
			<Container maxWidth="lg">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/posts" element={<Home />} />
					<Route path="/posts/:id" element={<FullPost />} />
					<Route path="/posts/:id/edit" element={<AddPost />} />
					<Route path="/create" element={<AddPost />} />
					<Route path="/sign" element={<Login />} />
					<Route path="/login" element={<Registration />} />
				</Routes>
			</Container>
		</>
	);
}

export default App;
