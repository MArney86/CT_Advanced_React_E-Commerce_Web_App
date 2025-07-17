import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '../../interfaces/CartItem';

// Session storage helper functions
const saveCartToStorage = (cartState: CartState) => {
    try {
        sessionStorage.setItem('cart', JSON.stringify(cartState));
    } catch (error) {
        console.error('Failed to save cart to session storage:', error);
    }
};

const loadCartFromStorage = (): CartState | null => {
    try {
        const savedCart = sessionStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : null;
    } catch (error) {
        console.error('Failed to load cart from session storage:', error);
        return null;
    }
};

interface CartState {
    items: CartItem[];
    status: 'idle' | 'loading' | 'error';
    error: string | null;
}

const initialState: CartState = loadCartFromStorage() || {
    items: [],
    status: 'idle',
    error: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            if (state.items.filter((item: CartItem) => item.prodId === action.payload.prodId).length) {
                const existingItem = state.items.find((item: CartItem) => item.prodId === action.payload.prodId);
                if (existingItem) {
                    existingItem.quantity += action.payload.quantity;
                }
            } else {
                action.payload.id = Date.now(); // Assign a unique ID based on timestamp
                state.items.push(action.payload);
            }
            saveCartToStorage(state);
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item: CartItem) => item.id !== action.payload);
            saveCartToStorage(state);
        },
        updateItemQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            state.items = state.items.map((item: CartItem) => {
                if (item.id === action.payload.id) {
                    if (action.payload.quantity < 1) {
                        state.error = 'Quantity must be at least 1, please check your inputs or use removeItem if you want to remove the item.';
                        state.status = 'error';
                        return item; // Return the item unchanged if quantity is less than 1
                    }
                    state.error = null; // Reset error if quantity is valid
                    return {...item, quantity: action.payload.quantity};
                }
                return item;
            });
            saveCartToStorage(state);
        },
        clearCart: (state) => {
            state.items = [];
            state.error = null;
            state.status = 'idle';
            saveCartToStorage(state);
        },
    },
});

export const { addItem, removeItem, updateItemQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;