import React, { useState } from "react";
import { Card, Table, Avatar, Space, Dropdown, Button, Input, Tag } from "antd";
import {
  DownOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const currency = (v) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(v);

const rows = [
  {
    key: 1,
    sNo: "#86475",
    coach: {
      name: "ETIHAD",
      sport: "Football",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    totalSession: 4,
    email: "mahfuj@gmail.com",
    cancelSession: 3,
    subscription: "2 Days left",
  },
  {
    key: 2,
    sNo: "#86475",
    coach: {
      name: "ETIHAD",
      sport: "Football",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    totalSession: 4,
    email: "mahfuj@gmail.com",
    cancelSession: 3,
    subscription: "2 Days left",
  },
  {
    key: 31,
    sNo: "#86475",
    coach: {
      name: "ETIHAD",
      sport: "Football",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    totalSession: 4,
    email: "mahfuj@gmail.com",
    cancelSession: 3,
    subscription: "2 Days left",
  },
  {
    key: 5,
    sNo: "#86475",
    coach: {
      name: "ETIHAD",
      sport: "Football",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    totalSession: 4,
    email: "mahfuj@gmail.com",
    cancelSession: 3,
    subscription: "2 Days left",
  },
  {
    key: 6,
    sNo: "#86475",
    coach: {
      name: "ETIHAD",
      sport: "Football",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    totalSession: 7,
    email: "mahfuj@gmail.com",
    cancelSession: 3,
    subscription: "2 Days left",
  },
  {
    key: 8,
    sNo: "#86475",
    coach: {
      name: "ETIHAD",
      sport: "Football",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    totalSession: 4,
    email: "mahfuj@gmail.com",
    cancelSession: 3,
    subscription: "2 Days left",
  },
  {
    key: 9,
    sNo: "#86475",
    coach: {
      name: "ETIHAD",
      sport: "Football",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    totalSession: 4,
    email: "mahfuj@gmail.com",
    cancelSession: 3,
    subscription: "2 Days left",
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
    title: "Total Session",
    dataIndex: "totalSession",
    key: "totalSession",
    align: "center",
    render: (v) => String(v).padStart(2, "0"),
    responsive: ["md", "lg", "xl", "xxl"],
  },
  {
    title: "Cancel Session",
    dataIndex: "cancelSession",
    key: "cancelSession",
    align: "center",
    render: (v) => String(v).padStart(2, "0"),
    responsive: ["md", "lg", "xl", "xxl"],
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: "start",
    render: (v) => String(v).padStart(2, "0"),
    responsive: ["md", "lg", "xl", "xxl"],
  },
  {
    title: "Subscription Status",
    dataIndex: "subscription",
    key: "subscription",
    align: "center",
    className: "text-red-400 font-semibold",
    render: (v) => String(v).padStart(2, "0"),
    responsive: ["md", "lg", "xl", "xxl"],
  },
  {
    title: "Action",
    key: "action",
    align: "center",
    render: (_, record) => {
      const items = [
        { key: "warn", icon: <ExclamationCircleOutlined />, label: "Warning" },
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

export default function CoachManagement() {
  const [query, setQuery] = useState("");

  const filtered = rows.filter((r) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      r.sNo.toLowerCase().includes(q) ||
      r.coach.name.toLowerCase().includes(q) ||
      r.coach.sport.toLowerCase().includes(q) ||
      String(r.joined).includes(q) ||
      r.sessionType.toLowerCase().includes(q)
    );
  });

  return (
    <Card
      title="Coach Manage"
      extra={
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          allowClear
          size="large"
          placeholder="Search"
          prefix={<SearchOutlined />}
          style={{ width: 320, background: "#f5f5f5", borderRadius: 999 }}
        />
      }
      bodyStyle={{ padding: 0 }}
    >
      <Table
        columns={columns}
        dataSource={filtered}
        pagination={false}
        scroll={{ x: true }}
      />
    </Card>
  );
}
