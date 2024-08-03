// pages/orders/all.jsx

import React, { useState, useEffect } from 'react';
import App from "../../components/layouts/app";
import { Card, Table, Button, Modal, List, Typography, DatePicker, Select, Row, Col } from "antd";
import moment from 'moment';

const { Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const AllOrders = () => {
    // Sample data for orders
    const [orders, setOrders] = useState([
        {
            id: 1,
            clientName: 'Alice Johnson',
            totalPrice: 250,
            products: [
                { id: 1, name: 'Product A', quantity: 2, price: 50 },
                { id: 2, name: 'Product B', quantity: 3, price: 30 },
            ],
            date: '2024-07-25',
            paid: false,
        },
        {
            id: 2,
            clientName: 'Bob Smith',
            totalPrice: 150,
            products: [
                { id: 3, name: 'Product C', quantity: 1, price: 150 },
            ],
            date: '2024-08-01',
            paid: true,
        },
        {
            id: 3,
            clientName: 'Charlie Brown',
            totalPrice: 400,
            products: [
                { id: 4, name: 'Product D', quantity: 2, price: 200 },
            ],
            date: '2024-08-02',
            paid: false,
        },
        {
            id: 4,
            clientName: 'Diana Prince',
            totalPrice: 300,
            products: [
                { id: 5, name: 'Product E', quantity: 1, price: 300 },
            ],
            date: '2024-08-03',
            paid: true,
        },
    ]);

    // States for filtering
    const [filteredOrders, setFilteredOrders] = useState(orders);
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
    const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(null); // New state for payment status
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        handleFilter(); // Run filter whenever filters change
    }, [selectedClient, selectedDateRange, selectedPaymentStatus]);

    // Function to handle date range filter
    const filterByDate = (dates) => {
        if (!dates || dates.length === 0) {
            // Clear date filter
            setSelectedDateRange([null, null]);
        } else {
            setSelectedDateRange(dates);
        }
    };

    // Function to handle client filter
    const filterByClient = (clientName) => {
        setSelectedClient(clientName);
    };

    // Function to handle payment status filter
    const filterByPaymentStatus = (status) => {
        setSelectedPaymentStatus(status);
    };

    // Function to handle filtering based on date, client, and payment status
    const handleFilter = () => {
        const [startDate, endDate] = selectedDateRange;
        const filtered = orders.filter(order => {
            const orderDate = moment(order.date);
            return (
                (!startDate || orderDate.isSameOrAfter(startDate, 'day')) &&
                (!endDate || orderDate.isSameOrBefore(endDate, 'day')) &&
                (!selectedClient || order.clientName === selectedClient) &&
                (selectedPaymentStatus === null || order.paid === (selectedPaymentStatus === 'Paid'))
            );
        });
        setFilteredOrders(filtered);
    };

    // Function to clear all filters
    const clearFilters = () => {
        setSelectedClient(null);
        setSelectedDateRange([null, null]);
        setSelectedPaymentStatus(null);
        setFilteredOrders(orders); // Reset to all orders
    };

    // Open modal with selected order's products
    const viewProducts = (order) => {
        setSelectedOrder(order);
        setIsModalVisible(true);
    };

    // Close the modal
    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedOrder(null);
    };

    // Mark an order as paid
    const markAsPaid = (orderId) => {
        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, paid: true } : order
        );
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders); // Update filtered orders as well
    };

    // Table columns definition
    const columns = [
        {
            title: 'Client Name',
            dataIndex: 'clientName',
            key: 'clientName',
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (price) => `$${price}`,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, order) => (
                <div>
                    <Button
                        type="primary"
                        onClick={() => viewProducts(order)}
                    >
                        Products
                    </Button>
                    {order.paid ? (
                        <Text type="success" style={{ marginLeft: '10px' }}>Paid</Text>
                    ) : (
                        <Button
                            type="default"
                            style={{ marginLeft: '10px' }}
                            onClick={() => markAsPaid(order.id)}
                        >
                            Mark as Completed
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <App>
            <Card title='All Orders'>
                <Row gutter={16} style={{ marginBottom: '16px' }}>
                    <Col span={5}>
                        <RangePicker
                            style={{ width: '100%' }}
                            onChange={filterByDate}
                            value={selectedDateRange}
                        />
                    </Col>
                    <Col span={5}>
                        <Select
                            placeholder="Select Client"
                            style={{ width: '100%' }}
                            onChange={filterByClient}
                            allowClear
                            value={selectedClient}
                        >
                            {Array.from(new Set(orders.map(order => order.clientName))).map(client => (
                                <Option key={client} value={client}>{client}</Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={5}>
                        <Select
                            placeholder="Payment Status"
                            style={{ width: '100%' }}
                            onChange={filterByPaymentStatus}
                            allowClear
                            value={selectedPaymentStatus}
                        >
                            <Option value="Paid">Paid</Option>
                            <Option value="Unpaid">Unpaid</Option>
                        </Select>
                    </Col>
                    <Col span={3}>
                        <Button
                            type="default"
                            style={{ width: '100%' }}
                            onClick={clearFilters}
                        >
                            Clear Filters
                        </Button>
                    </Col>
                </Row>

                <Table
                    dataSource={filteredOrders}
                    columns={columns}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                />
            </Card>

            {/* Products Modal */}
            <Modal
                title="Products"
                visible={isModalVisible}
                onCancel={handleCloseModal}
                footer={null}
            >
                {selectedOrder && (
                    <List
                        itemLayout="horizontal"
                        dataSource={selectedOrder.products}
                        renderItem={product => (
                            <List.Item>
                                <List.Item.Meta
                                    title={product.name}
                                    description={`Quantity: ${product.quantity} x $${product.price}`}
                                />
                                <div>Total: ${product.quantity * product.price}</div>
                            </List.Item>
                        )}
                    />
                )}
            </Modal>
        </App>
    );
};

export default AllOrders;
