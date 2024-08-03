import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Typography, Card, List } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import App from "../../components/layouts/app";

const { Title } = Typography;

const All = () => {
    const [clinics, setClinics] = useState([
        {
            id: 1, clinicaName: 'Clinica A', ownerName: 'John', ownerSurname: 'Doe', dept: 1,
            dateOfDept: '2023-08-01', products: [
                { name: 'Product 1', quantity: 10, price: 100 },
                { name: 'Product 2', quantity: 5, price: 50 }
            ]
        },
        {
            id: 2, clinicaName: 'Clinica B', ownerName: 'Jane', ownerSurname: 'Smith', dept: 0,
            dateOfDept: '', products: []
        },
        {
            id: 3, clinicaName: 'Clinica C', ownerName: 'Mike', ownerSurname: 'Johnson', dept: 1,
            dateOfDept: '2023-07-15', products: [
                { name: 'Product 3', quantity: 3, price: 75 }
            ]
        },
        {
            id: 4, clinicaName: 'Clinica D', ownerName: 'Anna', ownerSurname: 'Taylor', dept: 0,
            dateOfDept: '', products: []
        },
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeptModalVisible, setIsDeptModalVisible] = useState(false);
    const [editingClinic, setEditingClinic] = useState(null);
    const [deptModalData, setDeptModalData] = useState({ dateOfDept: '', products: [], total: 0 });

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

    // Show Dept Details
    const showDeptDetails = (clinic) => {
        setEditingClinic(clinic);

        if (clinic.dept === 1) {
            const total = clinic.products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
            setDeptModalData({ dateOfDept: clinic.dateOfDept, products: clinic.products, total });
            setIsDeptModalVisible(true); // Show the dept details modal
        }
    };

    // Repay debt
    const repayDebt = (clinicId) => {
        const updatedClinics = clinics.map(clinic =>
            clinic.id === clinicId ? { ...clinic, dept: 0 } : clinic
        );
        setClinics(updatedClinics);
        message.success('Debt has been repaid!');
        setIsDeptModalVisible(false);
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
            title: 'Dept',
            key: 'dept',
            render: (_, clinic) => (
                <span
                    style={{ color: clinic.dept === 0 ? 'green' : 'red', cursor: clinic.dept === 1 ? 'pointer' : 'default' }}
                    onClick={() => showDeptDetails(clinic)}
                >
                    {clinic.dept === 0 ? 'No Dept' : 'Yes Dept'}
                </span>
            ),
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
                <Card title={'All Clinics'}>
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

                        {/* Dept Details Modal */}
                        <Modal
                            title="Dept Details"
                            visible={isDeptModalVisible}
                            onCancel={() => setIsDeptModalVisible(false)}
                            footer={[
                                <Button key="repay" type="primary" onClick={() => repayDebt(editingClinic.id)}>
                                    Repay Debt
                                </Button>
                            ]}
                        >
                            <div>
                                <Title level={4}>Date of Dept</Title>
                                <p>{deptModalData.dateOfDept}</p>
                                <Title level={4}>Products</Title>
                                <List
                                    bordered
                                    dataSource={deptModalData.products}
                                    renderItem={({ name, quantity, price }) => (
                                        <List.Item>
                                            {name} - Quantity: {quantity} - Price: ${price}
                                        </List.Item>
                                    )}
                                />
                                <Title level={4}>Total Price</Title>
                                <p>${deptModalData.total}</p>
                            </div>
                        </Modal>
                    </div>
                </Card>
            </App>
        </>
    );
};

export default All;
