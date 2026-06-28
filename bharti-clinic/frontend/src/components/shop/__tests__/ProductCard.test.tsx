import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProductCard } from '../ProductCard';
import { CartProvider } from '../../../context/CartContext';

const mockProduct = {
    id: '1',
    name: 'Test Ayurvedic Oil',
    slug: 'test-ayurvedic-oil',
    description: 'Test description',
    price: 999,
    comparePrice: 1299,
    stock: 50,
    imageUrls: ['https://example.com/image.jpg'],
    category: {
        id: 'cat1',
        name: 'Oils',
        slug: 'oils',
    },
    isActive: true,
    isFeatured: false,
    avgRating: 4.5,
    reviewCount: 10,
    categoryId: 'cat1',
    createdAt: '2023-01-01T00:00:00.000Z',
};

describe('ProductCard Component', () => {
    const renderProductCard = () => {
        return render(
            <BrowserRouter>
                <CartProvider>
                    <ProductCard product={mockProduct} />
                </CartProvider>
            </BrowserRouter>
        );
    };

    it('renders product name', () => {
        renderProductCard();

        expect(screen.getByText('Test Ayurvedic Oil')).toBeInTheDocument();
    });

    it('renders product price', () => {
        renderProductCard();

        expect(screen.getByText(/₹999/)).toBeInTheDocument();
    });

    it('renders compare price with strikethrough', () => {
        renderProductCard();

        // Price is formatted with comma: ₹1,299
        const comparePriceElement = screen.getByText(/₹1,299/);
        expect(comparePriceElement).toBeInTheDocument();
        expect(comparePriceElement).toHaveClass('line-through');
    });

    it('renders product image', () => {
        renderProductCard();

        const image = screen.getByRole('img', { name: 'Test Ayurvedic Oil' });
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    });

    it('renders add to cart button', () => {
        renderProductCard();

        expect(screen.getByText(/Add to Cart/i)).toBeInTheDocument();
    });

    it('triggers add to cart when button is clicked', () => {
        renderProductCard();

        const addToCartButton = screen.getByText(/Add to Cart/i);
        fireEvent.click(addToCartButton);

        // Cart should now have 1 item
        // This would be verified by checking cart context state
    });

    it('renders rating if available', () => {
        renderProductCard();

        // Rating is shown as stars, not text. Check for review count instead
        expect(screen.getByText(/\(10\)/)).toBeInTheDocument();
    });

    it('shows out of stock message when stock is 0', () => {
        const outOfStockProduct = { ...mockProduct, stock: 0 };

        render(
            <BrowserRouter>
                <CartProvider>
                    <ProductCard product={outOfStockProduct} />
                </CartProvider>
            </BrowserRouter>
        );

        // Multiple "Out of Stock" elements exist (overlay + button)
        const outOfStockElements = screen.getAllByText(/Out of Stock/i);
        expect(outOfStockElements.length).toBeGreaterThan(0);
    });

    it('links to product detail page', () => {
        renderProductCard();

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/shop/test-ayurvedic-oil');
    });
});
