import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../CartContext';
import type { CartItem } from '../CartContext';

const mockProduct: Omit<CartItem, 'id' | 'quantity'> = {
    productId: '1',
    name: 'Test Product',
    slug: 'test-product',
    price: 1000,
    imageUrl: 'https://example.com/image.jpg',
    stock: 50,
};

describe('CartContext', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CartProvider>{children}</CartProvider>
    );

    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
    });

    it('initializes with empty cart', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        
        expect(result.current.items).toEqual([]);
        expect(result.current.itemCount).toBe(0);
        expect(result.current.subtotal).toBe(0);
    });

    it('adds item to cart correctly', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        
        act(() => {
            result.current.addItem(mockProduct);
        });
        
        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0].productId).toBe('1');
        expect(result.current.items[0].quantity).toBe(1);
        expect(result.current.itemCount).toBe(1);
    });

    it('increases quantity when adding existing item', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        
        act(() => {
            result.current.addItem(mockProduct);
        });
        
        act(() => {
            result.current.addItem(mockProduct);
        });
        
        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0].quantity).toBe(2);
        expect(result.current.itemCount).toBe(2);
    });

    it('removes item from cart correctly', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        
        let itemId: string;
        
        act(() => {
            result.current.addItem(mockProduct);
        });
        
        itemId = result.current.items[0].id;
        
        act(() => {
            result.current.removeItem(itemId);
        });
        
        expect(result.current.items).toHaveLength(0);
        expect(result.current.itemCount).toBe(0);
    });

    it('updates item quantity correctly', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        
        let itemId: string;
        
        act(() => {
            result.current.addItem(mockProduct);
        });
        
        itemId = result.current.items[0].id;
        
        act(() => {
            result.current.updateQuantity(itemId, 5);
        });
        
        expect(result.current.items[0].quantity).toBe(5);
        expect(result.current.itemCount).toBe(5);
    });

    it('calculates total price correctly', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        
        let itemId: string;
        
        act(() => {
            result.current.addItem(mockProduct);
        });
        
        itemId = result.current.items[0].id;
        
        act(() => {
            result.current.updateQuantity(itemId, 3);
        });
        
        expect(result.current.subtotal).toBe(3000); // 1000 * 3
    });

    it('calculates total with multiple products', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        
        const product2 = { ...mockProduct, productId: '2', price: 500 };
        
        let itemId1: string;
        let itemId2: string;
        
        act(() => {
            result.current.addItem(mockProduct);
            result.current.addItem(product2);
        });
        
        itemId1 = result.current.items[0].id;
        itemId2 = result.current.items[1].id;
        
        act(() => {
            result.current.updateQuantity(itemId1, 2); // 2000
            result.current.updateQuantity(itemId2, 3); // 1500
        });
        
        expect(result.current.subtotal).toBe(3500);
        expect(result.current.itemCount).toBe(5);
    });

    it('clears cart correctly', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        
        act(() => {
            result.current.addItem(mockProduct);
        });
        
        act(() => {
            result.current.clearCart();
        });
        
        expect(result.current.items).toHaveLength(0);
        expect(result.current.itemCount).toBe(0);
        expect(result.current.subtotal).toBe(0);
    });

    it('persists cart to localStorage', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        
        act(() => {
            result.current.addItem(mockProduct);
        });
        
        const savedCart = localStorage.getItem('bharti-clinic-cart');
        expect(savedCart).toBeTruthy();
        
        const parsedCart = JSON.parse(savedCart!);
        expect(parsedCart).toHaveLength(1);
        expect(parsedCart[0].productId).toBe('1');
    });

    it('loads cart from localStorage on init', () => {
        // Pre-populate localStorage
        const cartData = [
            {
                id: 'cart-test-1',
                productId: '1',
                name: 'Test Product',
                slug: 'test-product',
                price: 1000,
                imageUrl: 'https://example.com/image.jpg',
                quantity: 3,
                stock: 50,
            },
        ];
        localStorage.setItem('bharti-clinic-cart', JSON.stringify(cartData));
        
        const { result } = renderHook(() => useCart(), { wrapper });
        
        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0].quantity).toBe(3);
        expect(result.current.itemCount).toBe(3);
    });
});
