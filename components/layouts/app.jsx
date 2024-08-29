// components/Layout.js

import React, { useState } from 'react';
import {Layout, Menu, Avatar, Dropdown, Space, notification, List, Badge, Button} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
    SettingOutlined,
    LogoutOutlined, BellOutlined, HistoryOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import useAuthRedirect from "../../hooks/useAuthRedirect";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const App = ({ children }) => {
    const {isLoader} = useAuthRedirect()

    const [collapsed, setCollapsed] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'New Order', description: 'You have received a new order.' },
        { id: 2, title: 'Payment Received', description: 'Your payment has been processed.' },
        { id: 3, title: 'New Client', description: 'A new client has registered.' },
    ]);
    const toggle = () => {
        setCollapsed(!collapsed);
    };
    if (isLoader) {
        return <h1>Loading...</h1>;
    }
    const menu = (
        <Menu>
            <Menu.Item key="settings" icon={<SettingOutlined />}>
                <Link href="/settings">Settings</Link>
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />}>
                <a href="#" onClick={() => alert('Logout')}>Logout</a>
            </Menu.Item>
        </Menu>
    );


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="lg"
                onBreakpoint={(broken) => {
                    if (broken) {
                        setCollapsed(true);
                    }
                }}
            >
                <div
                    className="logo"
                    style={{ color: 'white', textAlign: 'center', padding: '10px' }}
                >
                    Win implants
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="dashboard" icon={<LaptopOutlined />}>
                        <Link href="/dashboard">Sales</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="Products">
                        <Menu.Item key="1">
                            <Link href="/products/add">Add Products</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link href="/products/all">All Products</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<LaptopOutlined />} title="Payments">
                        <Menu.Item key="4">
                            <Link href="/orders/all">All Orders</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<NotificationOutlined />} title="Clients">
                        <Menu.Item key="5">
                            <Link href="/clients/add">Add Client</Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link href="/clients/all">All Clients</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="event-history" icon={<HistoryOutlined />}>
                        <Link href="/events">Event History</Link>
                    </Menu.Item>
                    <Menu.Item key="must-order" icon={<LaptopOutlined />}>
                        <Link href="/orders/mustOrder">Must Order</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                        background: '#fff',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingRight: '24px', // Added padding to align the avatar
                    }}
                >
                    <div>
                        {collapsed ? (
                            <MenuUnfoldOutlined
                                className="trigger"
                                onClick={toggle}
                                style={{ padding: '0 24px', fontSize: '24px' }}
                            />
                        ) : (
                            <MenuFoldOutlined
                                className="trigger"
                                onClick={toggle}
                                style={{ padding: '0 24px', fontSize: '24px' }}
                            />
                        )}
                    </div>
                    <div>

                        <Dropdown overlay={menu}>
                            <Space>
                                <Avatar
                                    size="large"
                                    style={{
                                        backgroundColor: '#87d068',
                                        cursor: 'pointer',
                                    }}
                                    icon={<UserOutlined />}
                                />
                                <span style={{ cursor: 'pointer', color: '#000' }}>Username</span>
                            </Space>
                        </Dropdown>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: '#fff',
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;
