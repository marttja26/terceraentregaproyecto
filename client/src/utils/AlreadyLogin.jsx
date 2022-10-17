import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AlreadyLogin = () => {
	const navigate = useNavigate();
	useEffect(() => {
		fetch('http://localhost:8080/auth', {
			method: 'GET',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((json) => {
				if (json.token) {
                    navigate('/');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});
	return <Outlet />;
};

export default AlreadyLogin;
