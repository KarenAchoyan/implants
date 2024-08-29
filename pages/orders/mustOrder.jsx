// pages/orders/must-order.jsx

import React, {useEffect, useState} from 'react';
import App from "../../components/layouts/app";
import { Card, Table, Button, Typography } from "antd";
import {useDispatch, useSelector} from "react-redux";
import {callOrders, completedOrder} from "../../store/product/actions";

const { Text } = Typography;

const MustOrder = () => {
    const orders = useSelector(state => state.product.orders);
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(callOrders.request());
    },[])

    const markAsCompleted = (productId) => {
        dispatch(completedOrder.request({id:productId}))
    };

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'product',
            key: 'product',
            render: product => (
                <p>{product.name}</p>
            )
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
                product.status ? (
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
                    dataSource={orders}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                />
            </Card>
        </App>
    );
};

export default MustOrder;
