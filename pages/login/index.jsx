import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";

const Index = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const signIn = async (email, password) => {
        try {
            const response = await fetch(`${process.env.API_URL}/auth/signIn`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errors.email[0]);
            }

            const data = await response.json();

            if (data.status) {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('name', data.user?.name);
                localStorage.setItem('role', data.user?.role_id);

                const nextUrl = searchParams.get("next");
                router.push(nextUrl ?? "/dashboard");

            } else {
                console.log('error');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const onFinish = (values) => {
        const username = values.username;
        const password = values.password;
        setError(null);
        signIn(username, password);
    };

    useEffect(() => {
        const access = localStorage.getItem('access_token');
        if (access) {
            router.push(searchParams.get("next") ?? "/dashboard");
        } else {
            setLoading(false);
        }
    }, [router, searchParams]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (isAuthenticated) {
        return <h1>Redirecting...</h1>;
    }

    return (
        <div style={{ maxWidth: '300px', margin: 'auto', padding: '50px 0' }}>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    validateStatus={error ? 'error' : ''}
                    help={error ? "Սխալ էլ-հասցե կամ ծածկագիր" : ""}
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username" // Fixed placeholder
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" block>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Index;
