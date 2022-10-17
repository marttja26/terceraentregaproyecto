import { Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PrivateRoutes = () => {
	const [auth, setAuth] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		fetch('http://localhost:8080/auth', {
			method: 'GET',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((json) => {
				if (json.token) {
					setAuth(true);
				} else {
					setAuth(false);
					navigate('/login');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});

	const [user, setUser] = useState({});
	useEffect(() => {
		if (auth) {
			fetch('http://localhost:8080/user', {
				method: 'GET',
				credentials: 'include',
			})
				.then((res) => res.json())
				.then((json) => {
					setUser(json);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [auth]);

	return (
			<Outlet context={user} />
	);
};

export default PrivateRoutes;
