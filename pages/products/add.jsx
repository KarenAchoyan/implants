import React, {useState} from 'react';
import {Form, Input, Button, Upload, Typography, message, Card} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import App from "../../components/layouts/app";
import {useDispatch} from "react-redux";
import {addProduct} from "../../store/product/actions";
import {compressImage} from "../../utils/utils";

const {Title} = Typography;
const {TextArea} = Input;

const Add = () => {
    const [avatarFile, setAvatarFile] = useState(null);

    const [form] = Form.useForm();
    const dispatch = useDispatch();

    // Handle form submission
    const onFinish = (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('diameter', values.diameter);
        formData.append('length', values.length);
        formData.append('degree', values.degree);
        formData.append('ref', values.ref);
        formData.append('price', values.price);
        formData.append('sale_price', values.sale_price);
        formData.append('quantity', values.quantity);
        formData.append('description', values.description);
        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }
        setAvatarFile(null)
        dispatch(addProduct.request(formData))
        message.success('Product added successfully!');
        form.resetFields(); // Reset form fields after submission
    };

    // Handle form submission errors
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error('Please fill in all required fields!');
    };
    const handleAvatarChange = async (info) => {
        const file = info.fileList[0]?.originFileObj;
        if (file instanceof Blob) {
            const compressedAvatarFile = await compressImage(file);
            setAvatarFile(compressedAvatarFile);
        }
    };
    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('You can only upload image files!');
        }
        return isImage || Upload.LIST_IGNORE;
    };
    const normFile = (e) => {
        console.log(e)
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    return (
        <>
            <App>
                <Card title={'Add product'}>
                    <div style={{maxWidth: '600px', margin: '0 auto', padding: '50px 0'}}>
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
                                rules={[{required: true, message: 'Please enter the product name!'}]}
                            >
                                <Input placeholder="Enter Product Name"/>
                            </Form.Item>

                            {/* Avatar Upload */}
                            <Form.Item
                                name="avatar"
                                label="Avatar"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                            >
                                <Upload
                                    name="avatar"
                                    listType="picture"
                                    beforeUpload={beforeUpload}
                                    maxCount={1}
                                    onChange={handleAvatarChange}
                                >
                                    <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                                </Upload>
                            </Form.Item>

                            {/* Diameters (Optional) */}
                            <Form.Item
                                label="Diameters"
                                name="diameter"
                            >
                                <Input placeholder="Enter Diameters"/>
                            </Form.Item>

                            {/* Length (Optional) */}
                            <Form.Item
                                label="Length"
                                name="length"
                            >
                                <Input placeholder="Enter Length"/>
                            </Form.Item>

                            {/* Degree (Optional) */}
                            <Form.Item
                                label="Degree"
                                name="degree"
                            >
                                <Input placeholder="Enter Degree"/>
                            </Form.Item>

                            {/* Ref (Required) */}
                            <Form.Item
                                label="Ref"
                                name="ref"
                                rules={[{required: true, message: 'Please enter the reference!'}]}
                            >
                                <Input placeholder="Enter Ref"/>
                            </Form.Item>
                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[{required: true, message: 'Please enter the price!'}]}
                            >
                                <Input placeholder="Enter price"/>
                            </Form.Item>

                            <Form.Item
                                label="Sale price"
                                name="sale_price"
                                rules={[{required: true, message: 'Please enter the Sale price!'}]}
                            >
                                <Input placeholder="Enter Sale price"/>
                            </Form.Item>

                            <Form.Item
                                label="Quantity"
                                name="quantity"
                                rules={[{required: true, message: 'Please enter the Quantity price!'}]}
                            >
                                <Input placeholder="Enter Quantity"/>
                            </Form.Item>

                            {/* Description (Optional) */}
                            <Form.Item
                                label="Description"
                                name="description"
                            >
                                <TextArea rows={4} placeholder="Enter Description"/>
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
