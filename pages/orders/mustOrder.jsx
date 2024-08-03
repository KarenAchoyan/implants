// pages/orders/must-order.jsx

import React, { useState } from 'react';
import App from "../../components/layouts/app";
import { Card, Table, Button, Typography } from "antd";

const { Text } = Typography;

const MustOrder = () => {
    // Sample data for products
    const [products, setProducts] = useState([
        { id: 1, name: 'Product A', quantity: 10, completed: false },
        { id: 2, name: 'Product B', quantity: 5, completed: false },
        { id: 3, name: 'Product C', quantity: 2, completed: false },
        { id: 4, name: 'Product D', quantity: 8, completed: false },
    ]);

    // Function to mark a product as completed
    const markAsCompleted = (productId) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId ? { ...product, completed: true } : product
            )
        );
    };

    // Table columns definition
    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, product) => (
                product.completed ? (
                    <Text type="success">Completed</Text>
                ) : (
                    <Button
                        type="primary"
                        onClick={() => markAsCompleted(product.id)}
                    >
                        Mark as Completed
                    </Button>
                )
            ),
        },
    ];

    return (
        <App>
            <Card title='Must Order'>
                <Table
                    dataSource={products}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                />
            </Card>
        </App>
    );
};

export default MustOrder;
