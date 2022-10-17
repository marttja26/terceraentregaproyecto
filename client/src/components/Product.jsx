import { useDispatchCart } from './CartContext';

const Product = ({ product }) => {
	const dispatch = useDispatchCart();
    
	const addToCart = (item) => {
		dispatch({ type: 'ADD', item });
	};

	return (
		<div>
			<img src={product.img} alt="Imagen del producto" />
			<p>Producto: {product.name}</p>
			<p>Precio: {product.price}</p>
			<p>Marca: {product.brand}</p>
			<p>descripcion: {product.description}</p>
			<p>categoria: {product.category}</p>
			<button
				onClick={() => {
					addToCart(product);
				}}
			>
				Agregar Producto
			</button>
		</div>
	);
};

export default Product;
