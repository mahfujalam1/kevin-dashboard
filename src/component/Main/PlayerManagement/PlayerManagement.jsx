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
    player: {
      name: "ETIHAD",
      sport: "Football",
      email: "player@gmail.com",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
  },
  {
    key: 2,
    sNo: "#86475",
    player: {
      name: "ETIHAD",
      sport: "Football",
      email: "player@gmail.com",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
  },
  {
    key: 3,
    sNo: "#86475",
    player: {
      name: "ETIHAD",
      sport: "Football",
      email: "player@gmail.com",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
  },
  {
    key: 4,
    sNo: "#86475",
    player: {
      name: "ETIHAD",
      sport: "Football",
      email: "player@gmail.com",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
  },
  {
    key: 5,
    sNo: "#86475",
    player: {
      name: "ETIHAD",
      sport: "Football",
      email: "player@gmail.com",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
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
    title: "Player",
    key: "player",
    render: (_, r) => (
      <Space>
        <Avatar src={r.player.avatar} size={36} />
        <div className="text-start">
          <div style={{ fontWeight: 600 }}>{r.player.name}</div>
          <div style={{ fontSize: 12, color: "#8c8c8c" }}>{r.player.email}</div>
        </div>
      </Space>
    ),
    align: "center",
    responsive: ["xs", "sm", "md", "lg", "xl", "xxl"],
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


export default function PlayerManagement() {
  const [query, setQuery] = useState("");

  const filtered = rows.filter((r) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      r.sNo.toLowerCase().includes(q) ||
      r.player.name.toLowerCase().includes(q) ||
      r.player.sport.toLowerCase().includes(q) ||
      String(r.joined).includes(q) ||
      r.sessionType.toLowerCase().includes(q)
    );
  });

  return (
    <Card
      title="Player Manage"
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
