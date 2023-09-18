import { useCallback, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import NavBar from "./components/layout/NavBar";
import LoginPage from "./features/account/LoginPage";
import CreateGamePage from "./features/games/CreateGamePage";
import EditGamePage from "./features/games/EditGamePage";
import GamesPage from "./features/games/GamesPage";
import SingleGamePage from "./features/games/SingleGamePage";
import { getGames } from "./features/games/gameSlice";
import { useAppDispatch } from "./store/store";
import "react-toastify/dist/ReactToastify.css";
import AuthGuard from "./components/guards/AuthGuard";
import { getCurrentUser } from "./features/account/accountSlice";

function App() {
	const dispatch = useAppDispatch();

	const initApp = useCallback(async () => {
		await dispatch(getGames());
		await dispatch(getCurrentUser());
	}, [dispatch]);

	useEffect(() => {
		initApp();
	}, [initApp]);

	return (
		<BrowserRouter>
			<ToastContainer />
			<NavBar />
			<Routes>
				<Route path="/" element={<GamesPage />} />
				<Route path="/game/:id" element={<SingleGamePage />} />
				<Route element={<AuthGuard />}>
					<Route path="/editgame/:id" element={<EditGamePage />} />
					<Route path="/creategame" element={<CreateGamePage />} />
				</Route>
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
