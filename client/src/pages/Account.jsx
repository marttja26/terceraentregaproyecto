import { useOutletContext } from 'react-router-dom';
const Account = () => {
	const user = useOutletContext();
	return (
		<>
			<h1>Mi cuenta</h1>
			<img
				src={`http://localhost:8080/uploads/${user.avatar}`}
				alt="avatar"
			/>
			<p>Nombre {user.name}</p>
			<p>Edad {user.age}</p>
			<p>Celular {user.phone}</p>
			<p>Direccion {user.address}</p>
		</>
	);
};

export default Account;
