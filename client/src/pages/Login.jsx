import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
const Login = () => {
	const navigate = useNavigate();

	const { register, handleSubmit } = useForm();
	const [info, setInfo] = useState('');

	const onSubmit = async (data) => {
		await fetch('http://localhost:8080/login', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((res) => {
				setInfo(res.message);
				if (res.message === 'Conexion exitosa.') {
					setTimeout(() => {
						navigate('/');
					}, 3000);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					{...register('email', { required: true })}
					placeholder="Escribe tu email aqui"
				/>
				<label htmlFor="usuario">Contraseña</label>
				<input
					type="password"
					{...register('password', { required: true })}
					placeholder="Escribe tu contraseña aqui"
				/>
				<button type="submit">Conectarse</button>
				<span>{info}</span>
			</form>
			<Link to="/register" >Registrate</Link>
		</>
	);
};
export default Login;
