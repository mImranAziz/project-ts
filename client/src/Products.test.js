import { render, screen } from '@testing-library/react';
import Products from './Products';

test('Renders products page with a form and inventory', () => {
    const noop = jest.fn();
    render(<Products handleLogout={noop} />);

    const productId = screen.getByText(/Product Id/i);
    const addProduct = screen.getByText(/Add Product/i);
    const existingProducts = screen.getByText(/Existing Products/i);
    expect(productId).toBeInTheDocument();
    expect(addProduct).toBeInTheDocument();
    expect(existingProducts).toBeInTheDocument();
});
