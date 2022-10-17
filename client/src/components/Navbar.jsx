import { Link, NavLink, useOutletContext, useNavigate } from 'react-router-dom';
import { useDispatchCart } from './CartContext';
const NavBar = () => {
	const navigate = useNavigate();

	const dispatch = useDispatchCart()

	const handleLogout = () => {
		dispatch({type: 'CLEAN'})
		fetch('http://localhost:8080/logout', {
			method: 'GET',
			credentials: 'include',
		}).then((res) => navigate('/login'));
	};
	const user = useOutletContext();
	return (
		<nav className="nav">
			<Link to="/">Home</Link>
			<ul>
				<NavLink
					style={({ isActive }) => {
						return isActive ? { color: 'red' } : {};
					}}
					to="/cart"
				>
					Cart
				</NavLink>
				<NavLink
					style={({ isActive }) => {
						return isActive ? { color: 'red' } : {};
					}}
					to="/products"
				>
					Products
				</NavLink>
				<NavLink
					style={({ isActive }) => {
						return isActive ? { color: 'red' } : {};
					}}
					to="/account"
				>
					{user ? user.email : null}
				</NavLink>
			</ul>
			<button onClick={handleLogout}>Cerrar Sesion</button>
		</nav>
	);
};

export default NavBar;
