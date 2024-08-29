// components/AllProducts.js

import React, {useEffect, useState} from 'react';
import {Table, Button, Modal, Form, Input, Upload, message, Typography, Card} from 'antd';
import {EditOutlined, DeleteOutlined, UploadOutlined} from '@ant-design/icons';
import App from "../../components/layouts/app";
import {useDispatch, useSelector} from "react-redux";
import {callProduct, deleteProduct, getProducts, updateProduct} from "../../store/product/actions";
import UploadAvatar from "../../components/products/uploadAvatar";
import {call, put} from "redux-saga/effects";
import axiosInstance from "../../configs/axiosIntance";

const {Title} = Typography;
const {TextArea} = Input;

const All = () => {
    const products = useSelector(state => state.product.products);
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts.request())
    }, [])

    const [form] = Form.useForm();
    const [orderForm] = Form.useForm();

    // Delete a product
    const deleteProductHandler = (id) => {

        dispatch(deleteProduct.request({id}))
        message.success('Product deleted successfully!');
    };

    // Edit a product
    const editProduct = (product) => {
        setEditingProduct(product);
        setAvatarPreview(process.env.IMAGE_URL + product.avatar);
        setIsModalVisible(true);
    };

    const handleSave = (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('diameter', values.diameter);
        formData.append('length', values.length);
        formData.append('degree', values.degree);
        formData.append('ref', values.ref);
        formData.append('price', values.price);
        formData.append('sale_price', values.sale_price);
        formData.append('description', values.description);
        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }
        dispatch(updateProduct.request({formData, id:editingProduct.id}))
        message.success('Product updated successfully!');
        setIsModalVisible(false);
    };

    const handleOrder = (values) => {
        const formData = new FormData();
        formData.append('quantity', values.quantity);
        dispatch(callProduct.request({formData, id:editingProduct.id}))
        message.success(`Ordered ${values.quantity} units of ${editingProduct.name}!`);
        setIsOrderModalVisible(false);
    };
    const handleAvatarChange = async (info) => {
        const file = info.fileList[0].originFileObj;
        if (file instanceof Blob) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

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
            render: (text) => <img src={process.env.IMAGE_URL + text} alt="avatar" style={{width: 50, height: 50}}/>,
        },
        {
            title: 'Diameters',
            dataIndex: 'diameter',
            key: 'diameter',
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
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Ref',
            dataIndex: 'ref',
            key: 'ref',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Sale price',
            dataIndex: 'sale_price',
            key: 'sale_price',
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
                        icon={<EditOutlined/>}
                        onClick={() => editProduct(product)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="link"
                        icon={<DeleteOutlined/>}
                        onClick={() => deleteProductHandler(product.id)}
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
                    <div style={{padding: '50px'}}>
                        <Table
                            dataSource={products}
                            columns={columns}
                            rowKey="id"
                            pagination={{pageSize: 5}}
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
                                    rules={[{required: true, message: 'Please enter the product name!'}]}
                                >
                                    <Input placeholder="Enter Product Name"/>
                                </Form.Item>

                                <UploadAvatar avatarFile={avatarFile} avatarPreview={avatarPreview}
                                              handleAvatarChange={handleAvatarChange}/>


                                <Form.Item label="Diameters" name="diameter">
                                    <Input placeholder="Enter Diameters"/>
                                </Form.Item>

                                <Form.Item label="Length" name="length">
                                    <Input placeholder="Enter Length"/>
                                </Form.Item>

                                <Form.Item label="Degree" name="degree">
                                    <Input placeholder="Enter Degree"/>
                                </Form.Item>
                                <Form.Item label="Price" name="price">
                                    <Input placeholder="Enter Price"/>
                                </Form.Item>
                                <Form.Item label="Sale Price" name="sale_price">
                                    <Input placeholder="Enter Sale Price"/>
                                </Form.Item>

                                <Form.Item
                                    label="Ref"
                                    name="ref"
                                    rules={[{required: true, message: 'Please enter the reference!'}]}
                                >
                                    <Input placeholder="Enter Ref"/>
                                </Form.Item>

                                <Form.Item label="Description" name="description">
                                    <TextArea rows={4} placeholder="Enter Description"/>
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
                                    rules={[{required: true, message: 'Please enter the quantity!'}]}
                                >
                                    <Input type="number" placeholder="Enter Quantity"/>
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
