import { render, screen, fireEvent } from '@testing-library/react';
import Add from './Add';

test('Renders product add form that validates', async () => {
    const noop = jest.fn();
    render(<Add setUpdateKey={noop} />);

    const productIdInput = screen.getByLabelText('Product Id:');
    const nameInput = screen.getByLabelText('Product Name:');
    const priceInput = screen.getByLabelText('Price:');

    fireEvent.change(productIdInput, { target: { value: 77777 } });
    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(priceInput, { target: { value: 5 } });

    const button = screen.getByRole('button', { name: 'Add Product' });
    expect(productIdInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(priceInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(nameInput).toBeInvalid();
});

test('Renders product add form that validates', async () => {
    const noop = jest.fn();
    render(<Add setUpdateKey={noop} />);

    const productIdInput = screen.getByLabelText('Product Id:');
    const nameInput = screen.getByLabelText('Product Name:');
    const priceInput = screen.getByLabelText('Price:');

    fireEvent.change(productIdInput, { target: { value: 77777 } });
    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(priceInput, { target: { value: 5 } });

    const button = screen.getByRole('button', { name: 'Add Product' });
    expect(productIdInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(priceInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(nameInput).toBeInvalid();
});