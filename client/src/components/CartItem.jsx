const CartItem = ({ product, index, handleRemove }) => {
	return (
		<article>
			<div>
				<div>
					<img src={product.img} alt="product img" />
				</div>
				<div>
					<h1>{product.name}</h1>
						<p>{product.price}</p>
						<p>
							{product.description}
						</p>
					<button onClick={() => handleRemove(index)}>Remover del Carrito.</button>
				</div>
			</div>
		</article>
	);
};

export default CartItem
