import { useEffect } from 'react';
import { useReducer, useContext, createContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case 'ADD':
			return [...state, action.item];
		case 'REMOVE':
			const newArr = [...state];
			newArr.splice(action.index, 1);
			return newArr;
		case 'CLEAN':
			return [];

		default:
			throw new Error(`unknown action ${action.type}`);
	}
};

export const CartProvider = ({ children }) => {
	const init = (initialState) => {
		const localCart = localStorage.getItem('cartProducts');
		if (localCart) {
			try {
				return JSON.parse(localCart);
			} catch (error) {
				return initialState;
			}
		} else {
			return initialState;
		}
	};

	const [state, dispatch] = useReducer(reducer, [], init);

	useEffect(() => {
		localStorage.setItem('cartProducts', JSON.stringify(state));
	}, [state]);

	return (
		<CartDispatchContext.Provider value={dispatch}>
			<CartStateContext.Provider value={state}>
				{children}
			</CartStateContext.Provider>
		</CartDispatchContext.Provider>
	);
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
