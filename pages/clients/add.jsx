import React, { useState } from 'react';
import {Form, Input, Button, Typography, message, Card} from 'antd';
import App from "../../components/layouts/app";
import {useDispatch} from "react-redux";
import {addClient} from "../../store/client/actions";

const { Title } = Typography;

const Add = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    // Handle form submission
    const onFinish = (values) => {
        console.log('Form Values:', values);
        const formData = new FormData();
        formData.append('clinic_name', values.clinic_name)
        formData.append('owner_name', values.owner_name)
        formData.append('owner_surname', values.owner_surname)

        dispatch(addClient.request(formData))
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
                                name="clinic_name"
                                rules={[{ required: true, message: 'Please enter the Clinica name!' }]}
                            >
                                <Input placeholder="Enter Clinica Name" />
                            </Form.Item>

                            {/* Owner Name */}
                            <Form.Item
                                label="Owner Name"
                                name="owner_name"
                                rules={[{ required: true, message: 'Please enter the Owner name!' }]}
                            >
                                <Input placeholder="Enter Owner Name" />
                            </Form.Item>

                            {/* Owner Surname */}
                            <Form.Item
                                label="Owner Surname"
                                name="owner_surname"
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
