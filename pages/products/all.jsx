// components/AllProducts.js

import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Upload, message, Typography, Card } from 'antd';
import { EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import App from "../../components/layouts/app";

const { Title } = Typography;
const { TextArea } = Input;

const All = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Product A',
            avatar: 'https://via.placeholder.com/50',
            diameters: '10cm',
            length: '20cm',
            degree: '45',
            ref: 'REF123',
            description: 'A nice product',
        },
        {
            id: 2,
            name: 'Product B',
            avatar: 'https://via.placeholder.com/50',
            diameters: '15cm',
            length: '25cm',
            degree: '30',
            ref: 'REF456',
            description: 'Another great product',
        },
        {
            id: 3,
            name: 'Product C',
            avatar: 'https://via.placeholder.com/50',
            diameters: '12cm',
            length: '30cm',
            degree: '60',
            ref: 'REF789',
            description: 'This product is awesome',
        },
        {
            id: 4,
            name: 'Product D',
            avatar: 'https://via.placeholder.com/50',
            diameters: '20cm',
            length: '40cm',
            degree: '90',
            ref: 'REF101',
            description: 'A must-have product',
        },
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [form] = Form.useForm();
    const [orderForm] = Form.useForm();

    // Delete a product
    const deleteProduct = (id) => {
        setProducts(products.filter((product) => product.id !== id));
        message.success('Product deleted successfully!');
    };

    // Edit a product
    const editProduct = (product) => {
        setEditingProduct(product);
        setIsModalVisible(true);
    };

    // Save edited product
    const handleSave = (values) => {
        const updatedProducts = products.map((product) =>
            product.id === editingProduct.id ? { ...product, ...values } : product
        );
        setProducts(updatedProducts);
        message.success('Product updated successfully!');
        setIsModalVisible(false);
    };

    // Handle order submission
    const handleOrder = (values) => {
        message.success(`Ordered ${values.quantity} units of ${editingProduct.name}!`);
        setIsOrderModalVisible(false);
    };

    // Table columns
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text) => <img src={text} alt="avatar" style={{ width: 50, height: 50 }} />,
        },
        {
            title: 'Diameters',
            dataIndex: 'diameters',
            key: 'diameters',
        },
        {
            title: 'Length',
            dataIndex: 'length',
            key: 'length',
        },
        {
            title: 'Degree',
            dataIndex: 'degree',
            key: 'degree',
        },
        {
            title: 'Ref',
            dataIndex: 'ref',
            key: 'ref',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, product) => (
                <span>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => editProduct(product)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="link"
                        icon={<DeleteOutlined />}
                        onClick={() => deleteProduct(product.id)}
                        danger
                    >
                        Delete
                    </Button>
                    <Button
                        type="link"
                        onClick={() => {
                            setEditingProduct(product);
                            setIsOrderModalVisible(true);
                        }}
                    >
                        To be ordered
                    </Button>
                </span>
            ),
        },
    ];

    return (
        <>
            <App>
                <Card title={'All products'}>
                    <div style={{ padding: '50px' }}>
                        <Table
                            dataSource={products}
                            columns={columns}
                            rowKey="id"
                            pagination={{ pageSize: 5 }}
                        />

                        {/* Edit Modal */}
                        <Modal
                            title="Edit Product"
                            visible={isModalVisible}
                            onCancel={() => setIsModalVisible(false)}
                            footer={null}
                        >
                            <Form
                                form={form}
                                layout="vertical"
                                initialValues={editingProduct}
                                onFinish={handleSave}
                            >
                                <Form.Item
                                    label="Name"
                                    name="name"
                                    rules={[{ required: true, message: 'Please enter the product name!' }]}
                                >
                                    <Input placeholder="Enter Product Name" />
                                </Form.Item>

                                {/*<Form.Item*/}
                                {/*    label="Avatar"*/}
                                {/*    name="avatar"*/}
                                {/*    valuePropName="fileList"*/}
                                {/*    getValueFromEvent={(e) => {*/}
                                {/*        if (Array.isArray(e)) {*/}
                                {/*            return e;*/}
                                {/*        }*/}
                                {/*        return e?.fileList;*/}
                                {/*    }}*/}
                                {/*>*/}
                                {/*    <Upload*/}
                                {/*        name="avatar"*/}
                                {/*        listType="picture"*/}
                                {/*        maxCount={1}*/}
                                {/*        beforeUpload={() => false}*/}
                                {/*        defaultFileList={[*/}
                                {/*            {*/}
                                {/*                uid: '-1',*/}
                                {/*                name: 'default.png',*/}
                                {/*                status: 'done',*/}
                                {/*                url: editingProduct?.avatar,*/}
                                {/*            },*/}
                                {/*        ]}*/}
                                {/*    >*/}
                                {/*        <Button icon={<UploadOutlined />}>Upload Avatar</Button>*/}
                                {/*    </Upload>*/}
                                {/*</Form.Item>*/}

                                <Form.Item label="Diameters" name="diameters">
                                    <Input placeholder="Enter Diameters" />
                                </Form.Item>

                                <Form.Item label="Length" name="length">
                                    <Input placeholder="Enter Length" />
                                </Form.Item>

                                <Form.Item label="Degree" name="degree">
                                    <Input placeholder="Enter Degree" />
                                </Form.Item>

                                <Form.Item
                                    label="Ref"
                                    name="ref"
                                    rules={[{ required: true, message: 'Please enter the reference!' }]}
                                >
                                    <Input placeholder="Enter Ref" />
                                </Form.Item>

                                <Form.Item label="Description" name="description">
                                    <TextArea rows={4} placeholder="Enter Description" />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" block>
                                        Save Changes
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>

                        {/* Order Modal */}
                        <Modal
                            title="Order Product"
                            visible={isOrderModalVisible}
                            onCancel={() => setIsOrderModalVisible(false)}
                            footer={null}
                        >
                            <Form
                                form={orderForm}
                                layout="vertical"
                                onFinish={handleOrder}
                            >
                                <Form.Item
                                    label="Quantity"
                                    name="quantity"
                                    rules={[{ required: true, message: 'Please enter the quantity!' }]}
                                >
                                    <Input type="number" placeholder="Enter Quantity" />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" block>
                                        Place Order
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                </Card>
            </App>
        </>
    );
};

export default All;
