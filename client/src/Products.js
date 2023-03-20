import React, { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Add from './Add';
import Update from './Update';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function Products({ handleLogout }) {
    const [data, setData] = useState([]);
    const [updatedKey, setUpdatedKey] = useState();
    const [showAdd, setShowAdd] = useState(true);
    const [showUpdate, setShowUpdate] = useState(false);
    const [productId, setProductId] = useState();

    const resetForm = () => {
        setShowAdd(true);
        setShowUpdate(false);
    };
    useEffect(() => {
        fetch('http://localhost:3000/')
            .then(response => response.json())
            .then(data => setData(data));
    }, [updatedKey]);

    const [columnDefs] = useState([
        { field: 'id', headerName: 'ID' },
        { field: 'title', headerName: 'Title' },
        { field: 'price', headerName: 'Price' },
        {
            field: 'id', headerName: 'Delete',
            cellRenderer: DeleteCellRenderer,
            cellRendererParams: {
                clicked: (field) => {
                    fetch(`http://localhost:3000/${field}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            // authorization headers can go here. 
                        },
                    }).then(response => {
                        if (!response.ok) {
                            toast.error('Network response was not ok');
                            throw new Error('Network response was not ok');
                        }
                        toast.success(`Product ${field} was deleted.`);
                        setUpdatedKey(field);
                    }).catch(error => {
                        console.error('There was a problem with the delete request:', error);
                        toast.error('There was a problem with the delete request:', error);
                    });
                },
            },
            sortable: false,
            filter: false,
        },
        {
            field: 'id', headerName: 'Update',
            cellRenderer: UpdateCellRenderer,
            cellRendererParams: {
                clicked: (field) => {
                    setShowAdd(false);
                    setProductId(field);
                    setShowUpdate(true);
                },
            },
            sortable: false,
            filter: false,
        },
    ]);

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
    }), []);

    return (
        <>
            <div className='card' style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: '90%'
            }}>
                <div className='card-body'>
                    {showAdd && <Add setUpdatedKey={setUpdatedKey} />}
                    {showUpdate && <Update setUpdatedKey={setUpdatedKey} productId={productId} resetForm={resetForm} />}
                    &nbsp;
                    <ToastContainer />
                    <div className='card' style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: '90%'
                    }}>
                        <div className='card-header'><h5>Existing Products</h5></div>
                        <AgGridReact className="ag-theme-material"
                            animateRows
                            domLayout='autoHeight'
                            rowData={data}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                        />
                    </div>
                </div>
                <div className='card-footer'>
                    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </>
    )
}

class DeleteCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.deleteClickedHandler = this.deleteClickedHandler.bind(this);
    }
    deleteClickedHandler() {
        this.props.clicked(this.props.value);
    }
    render() {
        return (
            <button
                className='btn btn-primary'
                onClick={this.deleteClickedHandler}>
                Delete
            </button>
        )
    }
}

class UpdateCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.updateClickedHandler = this.updateClickedHandler.bind(this);
    }
    updateClickedHandler() {
        this.props.clicked(this.props.value);
    }

    render() {
        return (
            <button className='btn btn-primary' onClick={this.updateClickedHandler}>Update</button>
        )
    }
}

export default Products;