// NewSessionTable.jsx — Ant Design version
// Make sure Ant Design CSS is imported once in your app root:
// import 'antd/dist/reset.css';

import React from "react";
import { Card, Table, Avatar, Space, Dropdown, Button } from "antd";
import {
  DownOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const currency = (v) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(v);

const data = [
  {
    key: 1,
    sNo: "#86475",
    coach: {
      name: "ETIHAD",
      sport: "Football",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    joined: 4,
    fee: 2415,
    max: 20,
    endDate: "05-12-25",
  },
  {
    key: 2,
    sNo: "#86476",
    coach: {
      name: "ETIHAD",
      sport: "Football",
      avatar: "https://i.pravatar.cc/100?img=15",
    },
    joined: 4,
    fee: 2415,
    max: 20,
    endDate: "05-12-25",
  },
  {
    key: 3,
    sNo: "#86477",
    coach: {
      name: "ETIHAD",
      sport: "Football",
      avatar: "https://i.pravatar.cc/100?img=20",
    },
    joined: 4,
    fee: 2415,
    max: 20,
    endDate: "05-12-25",
  },
];

const columns = [
  {
    title: "S. No",
    dataIndex: "sNo",
    key: "sNo",
    width: 110,
    ellipsis: true,
    responsive: ["xs", "sm", "md", "lg", "xl", "xxl"],
  },
  {
    title: "Coach",
    key: "coach",
    render: (_, r) => (
      <Space>
        <Avatar src={r.coach.avatar} size={36} />
        <div>
          <div style={{ fontWeight: 600 }}>{r.coach.name}</div>
          <div style={{ fontSize: 12, color: "#8c8c8c" }}>{r.coach.sport}</div>
        </div>
      </Space>
    ),
    responsive: ["xs", "sm", "md", "lg", "xl", "xxl"],
  },
  {
    title: "Total join Player",
    dataIndex: "joined",
    key: "joined",
    align: "center",
    render: (v) => String(v).padStart(2, "0"),
    responsive: ["md", "lg", "xl", "xxl"],
  },
  {
    title: "Fee",
    dataIndex: "fee",
    key: "fee",
    align: "right",
    render: (v) => currency(v),
    responsive: ["md", "lg", "xl", "xxl"],
  },
  {
    title: "Max par.",
    dataIndex: "max",
    key: "max",
    align: "center",
    responsive: ["lg", "xl", "xxl"],
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
    responsive: ["md", "lg", "xl", "xxl"],
  },
  {
    title: "Action",
    key: "action",
    align: "center",
    render: (_, record) => {
      const items = [
        {
          key: "warn",
          icon: <ExclamationCircleOutlined />,
          label: "Warning",
        },
        { type: "divider" },
        {
          key: "delete",
          icon: <DeleteOutlined />,
          danger: true,
          label: "Delete",
        },
      ];

      const onClick = ({ key }) => {
        if (key === "warn") console.log("Warning →", record.key);
        if (key === "delete") console.log("Delete →", record.key);
      };

      return (
        <Dropdown
          menu={{ items, onClick }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button>
            Action <DownOutlined />
          </Button>
        </Dropdown>
      );
    },
    responsive: ["xs", "sm", "md", "lg", "xl", "xxl"],
  },
];

export default function NewSessionTable() {
  return (
    <Card
      title="New Session"
      extra={<a href="#">View all</a>}
      bodyStyle={{ padding: 0 }}
      styles={{ body: { padding: 0 } }}
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: true }}
        rowHoverable
      />
    </Card>
  );
}
