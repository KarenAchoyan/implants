import React, { useState } from 'react';
import {Table, Input, Typography, Button, Select, message, Divider, Card} from 'antd';
import App from "../../components/layouts/app";

const { Title } = Typography;
const { Option } = Select;

const Index = () => {
    // Sample product data
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Product A',
            ref: 'REF123',
            quantity: 10,
            price: 100,
            salePrice: 120,
        },
        {
            id: 2,
            name: 'Product B',
            ref: 'REF456',
            quantity: 5,
            price: 150,
            salePrice: 170,
        },
        {
            id: 3,
            name: 'Product C',
            ref: 'REF789',
            quantity: 8,
            price: 200,
            salePrice: 220,
        },
        {
            id: 4,
            name: 'Product D',
            ref: 'REF101',
            quantity: 3,
            price: 250,
            salePrice: 280,
        },
    ]);

    // Sample client data
    const [clients, setClients] = useState([
        { id: 1, name: 'Client One' },
        { id: 2, name: 'Client Two' },
        { id: 3, name: 'Client Three' },
        { id: 4, name: 'Client Four' },
    ]);

    const [selectedClient, setSelectedClient] = useState(null); // Currently selected client
    const [selectedProducts, setSelectedProducts] = useState([]); // Products added to the sales table
    const [searchTerm, setSearchTerm] = useState(''); // Current search term

    // Add product to the sales table
    const addProductToSale = (product) => {
        // Check if product is already added
        if (selectedProducts.find(p => p.id === product.id)) {
            message.warning('Product already added to the sales table.');
            return;
        }

        // Initialize the product quantity to 1
        setSelectedProducts([...selectedProducts, { ...product, selectedQuantity: 1 }]);
        message.success('Product added to the sales table.');
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter products based on search term
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
                ? { ...product, selectedQuantity: product.selectedQuantity + 1 }
                : product
        ));
    };

    // Decrease product quantity
    const decreaseQuantity = (productId) => {
        setSelectedProducts(selectedProducts.map(product =>
            product.id === productId && product.selectedQuantity > 1
                ? { ...product, selectedQuantity: product.selectedQuantity - 1 }
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
        return selectedProducts.reduce((total, product) => {
            return total + product.salePrice * product.selectedQuantity;
        }, 0);
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

        // Simulate a successful sale process
        message.success('Sale completed successfully!');

        // Clear the selected products and reset client selection
        setSelectedProducts([]);
        setSelectedClient(null);
        setSearchTerm('');
    };

    // Table columns for sales table
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
                    <span style={{ margin: '0 10px' }}>{product.selectedQuantity}</span>
                    <Button onClick={() => increaseQuantity(product.id)}>+</Button>
                </div>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `$${text}`,
        },
        {
            title: 'Sale Price',
            dataIndex: 'salePrice',
            key: 'salePrice',
            render: (text) => `$${text}`,
        },
        {
            title: 'Total',
            key: 'total',
            render: (_, product) => (
                <span>${(product.salePrice * product.selectedQuantity).toFixed(2)}</span>
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
               <div style={{ padding: '20px' }}>
                   <div style={{ marginBottom: '20px' }}>
                       <Title level={4}>Select Client:</Title>
                       <Select
                           placeholder="Select a client"
                           style={{ width: '300px' }}
                           value={selectedClient}
                           onChange={handleClientSelect}
                       >
                           {clients.map(client => (
                               <Option key={client.id} value={client.id}>
                                   {client.name}
                               </Option>
                           ))}
                       </Select>
                   </div>

                   <Divider />

                   {/* Sales Table */}
                   <Table
                       dataSource={selectedProducts}
                       columns={salesColumns}
                       rowKey="id"
                       pagination={{ pageSize: 5 }}
                       style={{ marginBottom: '20px' }}
                   />

                   {/* Total Price */}
                   <div style={{ marginBottom: '20px' }}>
                       <Title level={4}>Total Price: ${calculateTotalPrice().toFixed(2)}</Title>
                   </div>

                   {/* Search Input */}
                   <Input
                       placeholder="Search by Ref Code"
                       value={searchTerm}
                       onChange={handleSearchChange}
                       style={{ marginBottom: '20px', width: '300px' }}
                   />

                   {/* Search Results */}
                   {searchTerm && (
                       <div>
                           <Title level={4}>Search Results:</Title>
                           {filteredProducts.length > 0 ? (
                               filteredProducts.map(product => (
                                   <div key={product.id} style={{ marginBottom: '10px' }}>
                                       <span>{product.name} ({product.ref}) - Sale Price: ${product.salePrice}</span>
                                       <Button
                                           type="primary"
                                           style={{ marginLeft: '10px' }}
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
                       style={{ marginTop: '20px' }}
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
