import React, { useState } from 'react';
import {Form, Input, Button, Typography, message, Card} from 'antd';
import App from "../../components/layouts/app";

const { Title } = Typography;

const Add = () => {
    const [form] = Form.useForm();

    // Handle form submission
    const onFinish = (values) => {
        console.log('Form Values:', values);
        message.success('Clinica added successfully!');
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
                <Card title={'Add Client'}>
                    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '50px 0' }}>
                        <Form
                            form={form}
                            name="clinicaForm"
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            {/* Clinica Name */}
                            <Form.Item
                                label="Clinica Name"
                                name="clinicaName"
                                rules={[{ required: true, message: 'Please enter the Clinica name!' }]}
                            >
                                <Input placeholder="Enter Clinica Name" />
                            </Form.Item>

                            {/* Owner Name */}
                            <Form.Item
                                label="Owner Name"
                                name="ownerName"
                                rules={[{ required: true, message: 'Please enter the Owner name!' }]}
                            >
                                <Input placeholder="Enter Owner Name" />
                            </Form.Item>

                            {/* Owner Surname */}
                            <Form.Item
                                label="Owner Surname"
                                name="ownerSurname"
                                rules={[{ required: true, message: 'Please enter the Owner surname!' }]}
                            >
                                <Input placeholder="Enter Owner Surname" />
                            </Form.Item>

                            {/* Submit Button */}
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    Add Clinica
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
