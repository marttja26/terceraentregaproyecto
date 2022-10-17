import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const Register = () => {
	const navigate = useNavigate();

    const [info , setInfo] = useState('');

	const { register, handleSubmit } = useForm();

	const onSubmit = async (data) => {
		const formData = new FormData();

		formData.append('avatar', data.avatar[0]);
		formData.append('name', data.name);
		formData.append('address', data.address);
		formData.append('age', data.age);
		formData.append('phone', data.phone);
        formData.append('email', data.email);
        formData.append('password', data.password);

		await fetch('http://localhost:8080/register', {
			method: 'POST',
			body: formData,
			credentials: 'include',
		})
			.then((res) => res.json()
            .then((res) => {
                setInfo(res.message)
                if (res.message === 'Registro exitoso') {
					setTimeout(() => {
						navigate('/login');
					}, 3000);
				}
            }))
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="name">Nombre</label>
				<input
					{...register('name', { required: true })}
					placeholder="Escribe tu nombre aqui"
				/>
				<label htmlFor="address">Direccion</label>
				<input
					{...register('address', { required: true })}
					placeholder="Escribe tu direccion aqui"
				/>
				<label htmlFor="age">Edad</label>
				<input
					type="number"
					{...register('age', { required: true })}
					placeholder="Escribe tu edad aqui"
				/>
				<label htmlFor="phone">Celular</label>
				<input
					type="number"
					{...register('phone', { required: true })}
					placeholder="Escribe tu numero de telefono aqui"
				/>
				<label htmlFor="avatar">Foto de Perfil</label>
				<input
					type="file"
					{...register('avatar', { required: true })}
					placeholder="Sube tu foto de perfil aqui"
				/>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					{...register('email', { required: true })}
					placeholder="Escribe tu email aqui"
				/>
				<label htmlFor="password">Contraseña</label>
				<input
					type="password"
					{...register('password', { required: true })}
					placeholder="Escribe tu contraseña aqui"
				/>
				<button type="submit">Registrarse</button>
                <span>{info}</span>
			</form>
			<Link to='/login'>Iniciar sesion</Link>
		</>
	);
};

export default Register;
