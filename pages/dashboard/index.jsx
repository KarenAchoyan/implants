import React, {useEffect, useState} from 'react';
import {Table, Input, Typography, Button, Select, message, Divider, Card} from 'antd';
import App from "../../components/layouts/app";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import {useDispatch, useSelector} from "react-redux";
import {getClients} from "../../store/client/actions";
import {getProducts} from "../../store/product/actions";
import {addOrder} from "../../store/orders/actions";

const {Title} = Typography;
const {Option} = Select;

const Index = () => {
    const dispatch = useDispatch();
    const clients = useSelector(state => state.client.clients);
    const products = useSelector(state => state.product.products);


    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [total, setTotal] = useState(0)

    useEffect(() => {
        dispatch(getClients.request())
        dispatch(getProducts.request())
    }, [])

    const addProductToSale = (product) => {
        if (selectedProducts.find(p => p.id === product.id)) {
            message.warning('Product already added to the sales table.');
            return;
        }

        setSelectedProducts([...selectedProducts, {...product, selectedQuantity: 1}]);
        message.success('Product added to the sales table.');
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.ref.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle client selection
    const handleClientSelect = (clientId) => {
        setSelectedClient(clientId);
    };

    // Increase product quantity
    const increaseQuantity = (productId) => {
        setSelectedProducts(selectedProducts.map(product =>
            product.id === productId && product.selectedQuantity < product.quantity
                ? {...product, selectedQuantity: product.selectedQuantity + 1}
                : product
        ));
    };

    // Decrease product quantity
    const decreaseQuantity = (productId) => {
        setSelectedProducts(selectedProducts.map(product =>
            product.id === productId && product.selectedQuantity > 1
                ? {...product, selectedQuantity: product.selectedQuantity - 1}
                : product
        ));
    };

    // Remove product from the sales table
    const removeProductFromSale = (id) => {
        setSelectedProducts(selectedProducts.filter(product => product.id !== id));
        message.success('Product removed from the sales table.');
    };

    // Calculate total price of selected products
    const calculateTotalPrice = () => {
        const calc =  selectedProducts.reduce((total, product) => {
            return total + product.sale_price * product.selectedQuantity;
        }, 0);
        return calc;
    };

    // Finalize the sale
    const finalizeSale = () => {
        if (!selectedClient) {
            message.error('Please select a client before finalizing the sale.');
            return;
        }

        if (selectedProducts.length === 0) {
            message.error('Please add at least one product to the sales table.');
            return;
        }
        dispatch(addOrder.request({products: JSON.stringify(selectedProducts), client_id: selectedClient}))
        message.success('Sale completed successfully!');

        setSelectedProducts([]);
        setSelectedClient(null);
        setSearchTerm('');
    };

    const salesColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ref',
            dataIndex: 'ref',
            key: 'ref',
        },
        {
            title: 'Quantity',
            key: 'quantity',
            render: (_, product) => (
                <div>
                    <Button onClick={() => decreaseQuantity(product.id)}>-</Button>
                    <span style={{margin: '0 10px'}}>{product.selectedQuantity}</span>
                    <Button onClick={() => increaseQuantity(product.id)}>+</Button>
                </div>
            ),
        },
        {
            title: 'Sale Price',
            dataIndex: 'sale_price',
            key: 'sale_price',
            render: (text) => `${text} AMD`,
        },
        {
            title: 'Total',
            key: 'total',
            render: (_, product) => (
                <span>{(product.sale_price * product.selectedQuantity).toFixed(2)} AMD</span>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, product) => (
                <Button type="link" onClick={() => removeProductFromSale(product.id)} danger>
                    Remove
                </Button>
            ),
        },
    ];

    return (
        <App>
            <Card title={'Sales '}>
                <div style={{padding: '20px'}}>
                    <div style={{marginBottom: '20px'}}>
                        <Title level={4}>Select Client:</Title>
                        <Select
                            placeholder="Select a client"
                            style={{width: '300px'}}
                            value={selectedClient}
                            onChange={handleClientSelect}
                        >
                            {clients.map(client => (
                                <Option key={client.id} value={client.id}>
                                    {client.clinic_name}
                                </Option>
                            ))}
                        </Select>
                    </div>

                    <Divider/>

                    {/* Sales Table */}
                    <Table
                        dataSource={selectedProducts}
                        columns={salesColumns}
                        rowKey="id"
                        pagination={{pageSize: 5}}
                        style={{marginBottom: '20px'}}
                    />

                    {/* Total Price */}
                    <div style={{marginBottom: '20px'}}>
                        <Title level={4}>Total Price: ${calculateTotalPrice().toFixed(2)}</Title>
                    </div>

                    {/* Search Input */}
                    <Input
                        placeholder="Search by Ref Code"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        style={{marginBottom: '20px', width: '300px'}}
                    />

                    {/* Search Results */}
                    {searchTerm && (
                        <div>
                            <Title level={4}>Search Results:</Title>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <div key={product.id} style={{marginBottom: '10px'}}>
                                        <span>{product.name} ({product.ref}) - Sale Price: {product.sale_price} AMD</span>
                                        <Button
                                            type="primary"
                                            style={{marginLeft: '10px'}}
                                            onClick={() => addProductToSale(product)}
                                        >
                                            Add to Sale
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <p>No products found with the provided Ref Code.</p>
                            )}
                        </div>
                    )}

                    {/* Finalize Sale Button */}
                    <Button
                        type="primary"
                        style={{marginTop: '20px'}}
                        onClick={finalizeSale}
                        disabled={!selectedClient || selectedProducts.length === 0}
                    >
                        Finalize Sale
                    </Button>
                </div>
            </Card>
        </App>
    );
};

export default Index;
