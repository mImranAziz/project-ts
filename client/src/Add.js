import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({ setUpdatedKey }) {
    const [productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);

    function handleProductIdChange(event) {
        setProductId(Number(event.target.value));
    }

    function handletNameChange(event) {
        setName(event.target.value);
    }

    function handlePriceChange(event) {
        const price = Number(event.target.value);
        if (price < 0) {
            toast.error('Price can not be less than zero');
        } else {
            setPrice(Number(event.target.value));
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (price < 0) {
            toast.error('Price should not be less than 0. ');
            return;
        } else {

            fetch('http://localhost:3000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([{
                    id: productId,
                    title: name,
                    price,
                    deleted: false
                }])
            }).then(async (response) => {
                if (response.ok) {
                    toast.success('Product inserted successfully.');
                    await response.json();// I need to do this? 
                    setUpdatedKey(Math.random()); // refresh the grid 

                    // Clear the fields 
                    setName('');
                    setPrice('');
                    setProductId('');
                } else {
                    toast.error('An error occurred.');

                }
            }).catch(error => {
                toast.error('An error occurred.' + error);
            });
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="productId">Product Id:</label>
                    <input className="form-control" type="text" id="productId" value={productId} onChange={handleProductIdChange} required />
                </div>
                <div>
                    <label htmlFor="productName">Product Name:</label>
                    <input className="form-control" type="text" id="productName" value={name} onChange={handletNameChange} required />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input className="form-control" type="number" id="price" value={price} onChange={handlePriceChange} required />
                </div>
                <button className='btn btn-primary' type="submit">Add Product</button>
                <ToastContainer />
            </form>
        </div>
    );
}

export default Add;