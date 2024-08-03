// pages/events/index.js

import React, { useState } from 'react';
import App from "../../components/layouts/app";
import { Card, Table, DatePicker, Row, Col, Button } from "antd";
import moment from 'moment';

const { RangePicker } = DatePicker;

const Index = () => {
    // Sample event data
    const [events, setEvents] = useState([
        { id: 1, userName: 'Alice Johnson', date: '2024-08-01', event: 'Added a new product.' },
        { id: 2, userName: 'Bob Smith', date: '2024-08-02', event: 'Deleted a client.' },
        { id: 3, userName: 'Charlie Brown', date: '2024-08-03', event: 'Updated order status.' },
        { id: 4, userName: 'Diana Prince', date: '2024-08-04', event: 'Processed payment.' },
        { id: 5, userName: 'Eric Knight', date: '2024-08-05', event: 'Added a new client.' },
    ]);

    // State for filtered data
    const [filteredEvents, setFilteredEvents] = useState(events);
    const [dateRange, setDateRange] = useState([null, null]);

    // Table columns
    const columns = [
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
            sorter: (a, b) => a.userName.localeCompare(b.userName),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
        },
        {
            title: 'Event',
            dataIndex: 'event',
            key: 'event',
        },
    ];

    // Function to filter events based on date range
    const filterByDate = (dates) => {
        // Check if dates is not null and is an array with two elements
        if (Array.isArray(dates) && dates.length === 2) {
            const [startDate, endDate] = dates;

            if (startDate && endDate) {
                const filtered = events.filter(event => {
                    const eventDate = moment(event.date);
                    return eventDate.isSameOrAfter(startDate) && eventDate.isSameOrBefore(endDate);
                });

                setFilteredEvents(filtered);
            } else {
                setFilteredEvents(events);
            }
        } else {
            setFilteredEvents(events);
        }
    };

    return (
        <>
            <App>
                <Card title='Action History'>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <RangePicker
                                onChange={(dates) => {
                                    setDateRange(dates);
                                    filterByDate(dates);
                                }}
                                value={dateRange}
                            />
                        </Col>
                        <Col span={24}>
                            <Table
                                dataSource={filteredEvents}
                                columns={columns}
                                rowKey="id"
                                pagination={{ pageSize: 5 }}
                            />
                        </Col>
                    </Row>
                </Card>
            </App>
        </>
    );
};

export default Index;
