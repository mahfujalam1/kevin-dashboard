// ReportTable.jsx — Ant Design version with separated ReplyModal component
// import 'antd/dist/reset.css';

import { useState } from "react";
import { Card, Table, Tag, Button, Input } from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import ConfirmModal from "../../ui/Modal/ConfirmModal";
import { ReplyModal } from "../../ui/Modal/ReplyModal";

const initialData = [
  {
    key: 1,
    name: "Jullu Jalal",
    description: "Our Bachelor of Commerce program is ACBSP–accredited.",
    time: "8:38 AM",
    status: "Pending",
    feedback:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure",
  },
  {
    key: 2,
    name: "Jullu Jalal",
    description: "Our Bachelor of Commerce program is ACBSP–accredited.",
    time: "8:38 AM",
    status: "Replied",
    feedback:
      "There are many variations of passages of Lorem Ipsum available...",
  },
];

export default function ReportTable() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(initialData);
  const [replyModal, setReplyModal] = useState({ open: false, record: null });
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    record: null,
  });

  const handleSend = (text) => {
    if (!replyModal.record) return;
    setData((prev) =>
      prev.map((r) =>
        r.key === replyModal.record.key ? { ...r, status: "Replied" } : r
      )
    );
    setReplyModal({ open: false, record: null });
  };

  const handleDelete = (record) => {
    setConfirmModal({ open: true, record });
  };

  const confirmDelete = () => {
    setData((prev) => prev.filter((r) => r.key !== confirmModal.record.key));
    setConfirmModal({ open: false, record: null });
  };

  const filtered = data.filter((r) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      r.name.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (v, record) => (
        <Tag
          color={v === "Replied" ? "green" : "purple"}
          icon={<ArrowLeftOutlined />}
          style={{ borderRadius: 6, padding: "4px 12px", cursor: "pointer" }}
          onClick={() => setReplyModal({ open: true, record })}
        >
          {v}
        </Tag>
      ),
    },
    {
      title: "",
      key: "delete",
      align: "center",
      render: (_, record) => (
        <Button
          icon={<DeleteOutlined />}
          type="text"
          danger
          onClick={() => handleDelete(record)}
        />
      ),
    },
  ];

  return (
    <Card
      title="Report"
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
      <Table columns={columns} dataSource={filtered} pagination={false} />

      {/* Reply Modal */}
      <ReplyModal
        open={replyModal.open}
        record={replyModal.record}
        onClose={() => setReplyModal({ open: false, record: null })}
        onSend={handleSend}
      />

      {/* Delete Confirmation */}
      <ConfirmModal
        open={confirmModal.open}
        onClose={() => setConfirmModal({ open: false, record: null })}
        onConfirm={confirmDelete}
        title="Are you sure?"
        message="You want to delete this report."
      />
    </Card>
  );
}


