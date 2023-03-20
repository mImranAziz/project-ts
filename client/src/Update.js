import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Update({ productId, setUpdatedKey, resetForm }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:3000/${productId}`)
            .then(response => response.json())
            .then(data => {
                setName(data.title);
                setPrice(data.price);
            });
    }, [productId]);

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
                    toast.success('Product updated successfully.');
                    await response.json(); // I need to do this? 
                    setUpdatedKey(Math.random()); // refresh the grid 

                    // Clear the fields 
                    setName('');
                    setPrice('');

                    // Reset parent back to adding products 
                    resetForm();
                } else {
                    toast.error('An error occurred updating.');
                }
            }).catch(error => {
                toast.error('An error occurred updating.' + error);
            });
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="productId">Product Id: {productId}</label>
                </div>
                <div>
                    <label htmlFor="productName">Product Name:</label>
                    <input className="form-control" type="text" id="productName" value={name} onChange={handletNameChange} required />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input className="form-control" type="number" id="price" value={price} onChange={handlePriceChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Update Product</button>
                &nbsp;<button onClick={resetForm} className="btn btn-primary">Cancel</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Update;