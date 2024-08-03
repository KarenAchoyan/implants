import React, { useState } from 'react';
import {Form, Input, Button, Upload, Typography, message, Card} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import App from "../../components/layouts/app";

const { Title } = Typography;
const { TextArea } = Input;

const Add = () => {
    const [form] = Form.useForm();

    // Handle form submission
    const onFinish = (values) => {
        console.log('Form Values:', values);
        message.success('Product added successfully!');
        form.resetFields(); // Reset form fields after submission
    };

    // Handle form submission errors
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error('Please fill in all required fields!');
    };

    return (
        <>
            <App>
                <Card title={'Add product'}>
                    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '50px 0' }}>
                        <Form
                            form={form}
                            name="productForm"
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            {/* Product Name */}
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please enter the product name!' }]}
                            >
                                <Input placeholder="Enter Product Name" />
                            </Form.Item>

                            {/* Avatar Upload */}
                            <Form.Item
                                label="Avatar"
                                name="avatar"
                                valuePropName="fileList"
                                getValueFromEvent={(e) => {
                                    if (Array.isArray(e)) {
                                        return e;
                                    }
                                    return e?.fileList;
                                }}
                            >
                                <Upload
                                    name="avatar"
                                    listType="picture"
                                    maxCount={1}
                                    beforeUpload={() => false} // Prevent automatic upload
                                >
                                    <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                                </Upload>
                            </Form.Item>

                            {/* Diameters (Optional) */}
                            <Form.Item
                                label="Diameters"
                                name="diameters"
                            >
                                <Input placeholder="Enter Diameters" />
                            </Form.Item>

                            {/* Length (Optional) */}
                            <Form.Item
                                label="Length"
                                name="length"
                            >
                                <Input placeholder="Enter Length" />
                            </Form.Item>

                            {/* Degree (Optional) */}
                            <Form.Item
                                label="Degree"
                                name="degree"
                            >
                                <Input placeholder="Enter Degree" />
                            </Form.Item>

                            {/* Ref (Required) */}
                            <Form.Item
                                label="Ref"
                                name="ref"
                                rules={[{ required: true, message: 'Please enter the reference!' }]}
                            >
                                <Input placeholder="Enter Ref" />
                            </Form.Item>

                            {/* Description (Optional) */}
                            <Form.Item
                                label="Description"
                                name="description"
                            >
                                <TextArea rows={4} placeholder="Enter Description" />
                            </Form.Item>

                            {/* Submit Button */}
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    Add Product
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Card>
            </App>
        </>
    );
};

export default Add;
