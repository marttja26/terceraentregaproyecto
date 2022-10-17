import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Products from './pages/Products';
import Cart from './pages/Cart';
import PrivateRoutes from './utils/PrivateRoutes';
import AlreadyLogin from './utils/AlreadyLogin';
import NavBar from './components/Navbar';


function App() {
	return (
		<div className="App">
			<Routes>
				<Route element={<PrivateRoutes />}>
					<Route element={<><NavBar/><Home/></>} path="/" exact />
					<Route element={<><NavBar/><Account /></>} path="/account" exact />
					<Route element={<><NavBar/><Products /></>} path="/products" exact />
					<Route element={<><NavBar/><Cart /></>} path="/cart" exact />
				</Route>
				<Route element={<AlreadyLogin />}>
					<Route element={<Login />} path="/login" exact />
					<Route element={<Register />} path="/register" exact />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
