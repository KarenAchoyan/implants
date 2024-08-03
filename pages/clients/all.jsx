// components/All.js

import React, { useState } from 'react';
import {Table, Button, Modal, Form, Input, message, Typography, Card} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import App from "../../components/layouts/app";

const { Title } = Typography;

const All = () => {
    const [clinics, setClinics] = useState([
        { id: 1, clinicaName: 'Clinica A', ownerName: 'John', ownerSurname: 'Doe' },
        { id: 2, clinicaName: 'Clinica B', ownerName: 'Jane', ownerSurname: 'Smith' },
        { id: 3, clinicaName: 'Clinica C', ownerName: 'Mike', ownerSurname: 'Johnson' },
        { id: 4, clinicaName: 'Clinica D', ownerName: 'Anna', ownerSurname: 'Taylor' },
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingClinic, setEditingClinic] = useState(null);

    // Delete a clinic
    const deleteClinic = (id) => {
        setClinics(clinics.filter(clinic => clinic.id !== id));
        message.success('Clinic deleted successfully!');
    };

    // Edit a clinic
    const editClinic = (clinic) => {
        setEditingClinic(clinic);
        setIsModalVisible(true);
    };

    // Save edited clinic
    const handleSave = (values) => {
        const updatedClinics = clinics.map(clinic =>
            clinic.id === editingClinic.id ? { ...clinic, ...values } : clinic
        );
        setClinics(updatedClinics);
        message.success('Clinic updated successfully!');
        setIsModalVisible(false);
    };

    // Table columns
    const columns = [
        {
            title: 'Clinica Name',
            dataIndex: 'clinicaName',
            key: 'clinicaName',
        },
        {
            title: 'Owner Name',
            dataIndex: 'ownerName',
            key: 'ownerName',
        },
        {
            title: 'Owner Surname',
            dataIndex: 'ownerSurname',
            key: 'ownerSurname',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, clinic) => (
                <span>
          <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => editClinic(clinic)}
          >
            Edit
          </Button>
          <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => deleteClinic(clinic.id)}
              danger
          >
            Delete
          </Button>
        </span>
            ),
        },
    ];

    return (
        <>
            <App>
                <Card title={'All clients'}>
                    <div style={{ padding: '50px' }}>
                        <Table
                            dataSource={clinics}
                            columns={columns}
                            rowKey="id"
                            pagination={{ pageSize: 5 }}
                        />

                        {/* Edit Modal */}
                        <Modal
                            title="Edit Clinic"
                            visible={isModalVisible}
                            onCancel={() => setIsModalVisible(false)}
                            footer={null}
                        >
                            <Form
                                layout="vertical"
                                initialValues={editingClinic}
                                onFinish={handleSave}
                            >
                                <Form.Item
                                    label="Clinica Name"
                                    name="clinicaName"
                                    rules={[{ required: true, message: 'Please enter the Clinica name!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Owner Name"
                                    name="ownerName"
                                    rules={[{ required: true, message: 'Please enter the Owner name!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Owner Surname"
                                    name="ownerSurname"
                                    rules={[{ required: true, message: 'Please enter the Owner surname!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" block>
                                        Save Changes
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
