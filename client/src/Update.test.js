import { render, screen, fireEvent } from '@testing-library/react';
import Update from './Update';

test('Renders product update form that validates', async () => {
    const noop = jest.fn();
    render(<Update setUpdateKey={noop} />);

    const productLabel = screen.getByText('Product Id:');
    const nameInput = screen.getByLabelText('Product Name:');
    const priceInput = screen.getByLabelText('Price:');

    fireEvent.change(nameInput, { target: { value: '' } });

    const button = screen.getByRole('button', { name: 'Update Product' });
    expect(productLabel).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(priceInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(nameInput).toBeInvalid();
});