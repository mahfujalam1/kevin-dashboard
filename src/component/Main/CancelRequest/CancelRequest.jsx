// CancelRequestTable.jsx — Ant Design version
// import 'antd/dist/reset.css'; // include once in your app root

import React, { useState } from "react";
import { Card, Table, Avatar, Space, Dropdown, Button, Input } from "antd";
import {
  DownOutlined,
  SearchOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { FcCancel } from "react-icons/fc";

const rows = [
  {
    key: 1,
    sNo: "#86475",
    coach: {
      name: "ETIHAD",
      sport: "Football",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    player: {
      name: "ETIHAD",
      sport: "Football",
      avatar: "https://i.pravatar.cc/100?img=22",
    },
    date: "05/12/24",
    title: "Ultimate Football Skills Workshop",
    refund: 120,
    notes: "Ultimate Football Skills Workshop",
  },
  {
    key: 2,
    sNo: "#86476",
    coach: {
      name: "ETIHAD",
      sport: "Football",
      avatar: "https://i.pravatar.cc/100?img=13",
    },
    player: {
      name: "ETIHAD",
      sport: "Football",
      avatar: "https://i.pravatar.cc/100?img=23",
    },
    date: "05/12/24",
    title: "Ultimate Football Skills Workshop",
    refund: 120,
    notes: "Ultimate Football Skills Workshop",
  },
  {
    key: 3,
    sNo: "#86477",
    coach: {
      name: "ETIHAD",
      sport: "Football",
      avatar: "https://i.pravatar.cc/100?img=14",
    },
    player: {
      name: "ETIHAD",
      sport: "Football",
      avatar: "https://i.pravatar.cc/100?img=24",
    },
    date: "05/12/24",
    title: "Ultimate Football Skills Workshop",
    refund: 120,
    notes: "Ultimate Football Skills Workshop",
  },
];

const columns = [
  {
    title: "S. No",
    dataIndex: "sNo",
    key: "sNo",
    width: 100,
  },
  {
    title: "Coach name",
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
  },
  {
    title: "Player name",
    key: "player",
    render: (_, r) => (
      <Space>
        <Avatar src={r.player.avatar} size={36} />
        <div>
          <div style={{ fontWeight: 600 }}>{r.player.name}</div>
          <div style={{ fontSize: 12, color: "#8c8c8c" }}>{r.player.sport}</div>
        </div>
      </Space>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Session Title",
    dataIndex: "title",
    key: "title",
    ellipsis: true,
  },
  {
    title: "Refund Amount",
    dataIndex: "refund",
    key: "refund",
    align: "center",
    render: (v) => <span style={{ color: "red", fontWeight: 600 }}>${v}</span>,
  },
  {
    title: "Notes",
    dataIndex: "notes",
    key: "notes",
    ellipsis: true,
  },
  {
    title: "Action",
    key: "action",
    align: "center",
    render: (_, record) => {
      const items = [
        {
          key: "refund",
          icon: <DollarCircleOutlined />,
          label: "Refund",
        },
        {
          key: "reject",
          icon: <FcCancel />,
          label: "Reject",
        },
      ];
      const onClick = ({ key }) => {
        if (key === "refund") console.log("Refund →", record.key);
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
  },
];

export default function CancelRequest() {
  const [query, setQuery] = useState("");

  const filtered = rows.filter((r) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      r.sNo.toLowerCase().includes(q) ||
      r.coach.name.toLowerCase().includes(q) ||
      r.player.name.toLowerCase().includes(q) ||
      r.title.toLowerCase().includes(q) ||
      r.notes.toLowerCase().includes(q)
    );
  });

  return (
    <Card
      title="Refund Request"
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
