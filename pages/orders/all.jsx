// pages/orders/all.jsx

import React, { useState, useEffect } from 'react';
import App from "../../components/layouts/app";
import { Card, Table, Button, Modal, List, Typography, DatePicker, Select, Row, Col } from "antd";
import moment from 'moment';
import {useDispatch, useSelector} from "react-redux";
import {callOrders} from "../../store/product/actions";
import {getOrders} from "../../store/orders/actions";

const { Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const AllOrders = () => {
    const orders = useSelector(state => state.order.orders);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getOrders.request());
    },[dispatch])

    const [filteredOrders, setFilteredOrders] = useState(orders);
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
    const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(null); // New state for payment status
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        handleFilter();
    }, [selectedClient, selectedDateRange, selectedPaymentStatus]);

    const filterByDate = (dates) => {
        if (!dates || dates.length === 0) {
            // Clear date filter
            setSelectedDateRange([null, null]);
        } else {
            setSelectedDateRange(dates);
        }
    };

    const filterByClient = (clientName) => {
        setSelectedClient(clientName);
    };

    const filterByPaymentStatus = (status) => {
        setSelectedPaymentStatus(status);
    };

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

    const clearFilters = () => {
        setSelectedClient(null);
        setSelectedDateRange([null, null]);
        setSelectedPaymentStatus(null);
        setFilteredOrders(orders);
    };

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
        // const updatedOrders = orders.map(order =>
        //     order.id === orderId ? { ...order, paid: true } : order
        // );
        // setOrders(updatedOrders);
        // setFilteredOrders(updatedOrders);
    };

    const columns = [
        {
            title: 'Client Name',
            dataIndex: 'client',
            key: 'client',
            render: client => (
                <p>{client?.clinic_name}</p>
            )
        },
        {
            title: 'Total Price',
            dataIndex: 'total',
            key: 'total',
            render: (total) => `${total} AMD`,
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
                    dataSource={orders}
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
                        dataSource={selectedOrder.product_orders}
                        renderItem={product => (
                            <List.Item>
                                <List.Item.Meta
                                    title={product?.product.name}
                                    description={`Quantity: ${product?.quantity} x ${product?.product.sale_price} AMD`}
                                />
                                <div>Total: { product?.quantity * product?.product?.sale_price} AMD</div>
                            </List.Item>
                        )}
                    />
                )}
            </Modal>
        </App>
    );
};

export default AllOrders;
