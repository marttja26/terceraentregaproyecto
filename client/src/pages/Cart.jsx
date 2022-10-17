import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useCart, useDispatchCart } from '../components/CartContext';
import CartItem from '../components/CartItem';
const Cart = () => {
	const items = useCart();
	const dispatch = useDispatchCart();
	const totalPrice = items.reduce((total, b) => total + b.price, 0);
	const user = useOutletContext();

	const handleRemove = (index) => {
		dispatch({ type: 'REMOVE', index });
	};

	const [orderResponse, setOrderResponse] = useState('');

	if (items.length === 0) {
		return (
			<main>
				<p>El carrito esta vacio.</p>
			</main>
		);
	}
	const handleOrder = () => {
		const buyer = { name: user.name, email: user.email, phone: user.phone };
		const order = { buyer, cart: items, totalPrice };
		fetch('http://localhost:8080/order', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(order),
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.status) {
                    setOrderResponse(res.message)
					setTimeout(() => {
						dispatch({ type: 'CLEAN' });
					}, 3000);
				} else {
                    setOrderResponse(res.message)
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<main>
			<p>
				Total price:{' '}
				{totalPrice.toLocaleString('en', {
					style: 'currency',
					currency: 'USD',
				})}
			</p>
			<button onClick={handleOrder}>Comprar</button>
            <span>{orderResponse}</span>
			{items.map((item, index) => (
				<CartItem
					handleRemove={handleRemove}
					key={index}
					product={item}
					index={index}
				/>
			))}
		</main>
	);
};

export default Cart;
