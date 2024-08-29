import React, {useEffect, useState} from 'react';
import {Table, Button, Modal, Form, Input, message, Typography, Card, List} from 'antd';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import App from "../../components/layouts/app";
import {useDispatch, useSelector} from "react-redux";
import {getClients} from "../../store/client/actions";

const {Title} = Typography;

const All = () => {
    const clients = useSelector(state => state.client.clients);
    const dispatch = useDispatch();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeptModalVisible, setIsDeptModalVisible] = useState(false);
    const [editingClinic, setEditingClinic] = useState(null);
    const [deptModalData, setDeptModalData] = useState({dateOfDept: '', products: [], total: 0});

    useEffect(() => {
        dispatch(getClients.request());
    }, [dispatch])

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
            clinic.id === editingClinic.id ? {...clinic, ...values} : clinic
        );
        setClinics(updatedClinics);
        message.success('Clinic updated successfully!');
        setIsModalVisible(false);
    };

    // Show Dept Details
    const showDeptDetails = (clinic) => {
        setEditingClinic(clinic);

        const products = [];
        let total = 0;
        clinic.orders.forEach(function (item) {
            item.product_orders.forEach(function (product) {
                product.product.quantity = product.quantity;
                products.push(product.product)

            })
            total += item.total;

        })

        setDeptModalData({dateOfDept: clinic.updated_at, products: products, total});
        setIsDeptModalVisible(true);
    };

    // Repay debt
    const repayDebt = (clinicId) => {
        const updatedClinics = clinics.map(clinic =>
            clinic.id === clinicId ? {...clinic, dept: 0} : clinic
        );
        setClinics(updatedClinics);
        message.success('Debt has been repaid!');
        setIsDeptModalVisible(false);
    };

    // Table columns
    const columns = [
        {
            title: 'Clinica Name',
            dataIndex: 'clinic_name',
            key: 'clinic_name',
        },
        {
            title: 'Owner Name',
            dataIndex: 'owner_name',
            key: 'owner_name',
        },
        {
            title: 'Owner Surname',
            dataIndex: 'owner_surname',
            key: 'owner_surname',
        },
        {
            title: 'Dept',
            key: 'dept',
            render: (_, clinic) => {
                const data = clinic.orders.filter((item) => {
                    return item.paid_status === 0;
                })
                if (data.length > 0) {
                    return (
                        <span
                            style={{
                                color: 'red',
                                cursor: 'pointer'
                            }}
                            onClick={() => showDeptDetails(clinic)}
                        >
                                Yes Dept
                            </span>
                    )
                } else {
                    return (
                        <span
                            style={{
                                color: 'green'
                            }}
                        >
                                No Dept
                            </span>
                    )
                }

            }
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, clinic) => (
                <span>
                    <Button
                        type="link"
                        icon={<EditOutlined/>}
                        onClick={() => editClinic(clinic)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="link"
                        icon={<DeleteOutlined/>}
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
                    <div style={{padding: '50px'}}>
                        <Table
                            dataSource={clients}
                            columns={columns}
                            rowKey="id"
                            pagination={{pageSize: 5}}
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
                                    rules={[{required: true, message: 'Please enter the Clinica name!'}]}
                                >
                                    <Input/>
                                </Form.Item>
                                <Form.Item
                                    label="Owner Name"
                                    name="ownerName"
                                    rules={[{required: true, message: 'Please enter the Owner name!'}]}
                                >
                                    <Input/>
                                </Form.Item>
                                <Form.Item
                                    label="Owner Surname"
                                    name="ownerSurname"
                                    rules={[{required: true, message: 'Please enter the Owner surname!'}]}
                                >
                                    <Input/>
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
                                    renderItem={({name, quantity, sale_price}) => (
                                        <List.Item>
                                            {name} - Quantity: {quantity} - Price: {sale_price} AMD
                                        </List.Item>
                                    )}
                                />
                                <Title level={4}>Total Price</Title>
                                <p>{deptModalData.total} AMD</p>
                            </div>
                        </Modal>
                    </div>
                </Card>
            </App>
        </>
    );
};

export default All;
