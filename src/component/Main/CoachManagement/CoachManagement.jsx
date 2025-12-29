import React, { useState, useMemo } from "react";
import {
  Card,
  Table,
  Avatar,
  Space,
  Dropdown,
  Button,
  Input,
  message,
} from "antd";
import {
  DownOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useGetAllUserWithRoleQuery } from "../../../redux/features/session/session";
import { GrDisabledOutline } from "react-icons/gr";
import {
  useWarnUserMutation,
  useBlockUserMutation,
} from "../../../redux/features/dashboard/dashboardApi";
import { NoteModal } from "../../ui/Modal/NoteModal";

const formatDateTime = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(d);
};

export default function CoachManagement() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [warningModal, setWarningModal] = useState({
    open: false,
    record: null,
  });

  const { data, isLoading } = useGetAllUserWithRoleQuery({
    search: query,
    page,
    limit,
    role: "COACH",
  });
  const [warnUser, { isLoading: isWarning }] = useWarnUserMutation();
  const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();

  const coaches = data?.data?.users ?? [];
  const totalCoaches = data?.data?.total ?? 0;

  const handleTableChange = (pagination) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
  };

  const tableData = useMemo(() => {
    return coaches?.map((coach, idx) => ({
      key: coach.id,
      id: coach.id,
      sNo: `#${coach.id || (page - 1) * limit + (idx + 1)}`,
      coach: {
        name: coach?.fullName ?? "—",
        sport: coach?.sport?.name ?? coach?.specialization ?? "—",
        avatar: coach?.avatar
          ? `${import.meta.env.VITE_BASE_IMAGE_URL}/${coach?.avatar}`
          : undefined,
      },
      totalSession: coach?.total_sessions ?? 0,
      email: coach?.email ?? "—",
      cancelSession: coach?.cancelled_sessions ?? 0,
      subscription: coach?.subscription_end_date
        ? formatDateTime(coach.subscription_end_date)
        : "No subscription",
      isBlocked: coach?.is_blocked ?? false,
    }));
  }, [coaches, page, limit]);

  const handleWarningClick = (record) => {
    setWarningModal({ open: true, record });
  };

  const handleWarningSubmit = async (reason, record) => {
    try {
      await warnUser({
        userId: record.id,
        reason: reason,
      }).unwrap();
      message.success("Warning sent successfully!");
      setWarningModal({ open: false, record: null });
    } catch (error) {
      message.error(error?.data?.message || "Failed to send warning");
    }
  };

  const handleBlock = async (record) => {
    try {
      await blockUser({
        userId: record.id,
      }).unwrap();
      message.success("Coach blocked successfully!");
    } catch (error) {
      message.error(error?.data?.message || "Failed to block coach");
    }
  };

  const handleAction = (key, record) => {
    if (key === "warn") {
      handleWarningClick(record);
    }
    if (key === "block") {
      handleBlock(record);
    }
  };

  const renderCoachInfo = (record) => (
    <div
      style={{
        marginBottom: 16,
        padding: 12,
        background: "#f5f5f5",
        borderRadius: 6,
      }}
    >
      <p style={{ margin: 0, marginBottom: 4 }}>
        <strong>Coach:</strong> {record.coach.name}
      </p>
      <p style={{ margin: 0, marginBottom: 4 }}>
        <strong>Sport:</strong> {record.coach.sport}
      </p>
      <p style={{ margin: 0 }}>
        <strong>Email:</strong> {record.email}
      </p>
    </div>
  );

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
          <Avatar src={r.coach.avatar} size={36}>
            {(r.coach.name?.[0] ?? "?").toUpperCase()}
          </Avatar>
          <div>
            <div style={{ fontWeight: 600 }}>{r.coach.name}</div>
            <div style={{ fontSize: 12, color: "#8c8c8c" }}>
              {r.coach.role}
            </div>
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
      render: (v) => String(v ?? 0).padStart(2, "0"),
      responsive: ["md", "lg", "xl", "xxl"],
    },
    {
      title: "Cancel Session",
      dataIndex: "cancelSession",
      key: "cancelSession",
      align: "center",
      render: (v) => String(v ?? 0).padStart(2, "0"),
      responsive: ["md", "lg", "xl", "xxl"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "start",
      responsive: ["md", "lg", "xl", "xxl"],
    },
    {
      title: "Subscription Status",
      dataIndex: "subscription",
      key: "subscription",
      align: "center",
      render: (v) => (
        <span style={{ color: "#ef4444", fontWeight: 600 }}>{v}</span>
      ),
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
            key: "block",
            icon: <GrDisabledOutline />,
            danger: true,
            label: record.isBlocked ? "Unblock" : "Block",
          },
        ];
        const onClick = ({ key }) => handleAction(key, record);
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

  return (
    <>
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
        styles={{ body: { padding: 0 } }}
      >
        <Table
          columns={columns}
          dataSource={tableData}
          loading={isLoading || isBlocking}
          pagination={{
            current: page,
            pageSize: limit,
            total: totalCoaches,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            showLessItems: true,
          }}
          onChange={handleTableChange}
          scroll={{ x: 800 }}
          rowHoverable
        />
      </Card>

      {/* Warning Modal */}
      <NoteModal
        open={warningModal.open}
        record={warningModal.record}
        onClose={() => setWarningModal({ open: false, record: null })}
        onSubmit={handleWarningSubmit}
        title="Send Warning to Coach"
        noteLabel="Warning Message:"
        placeholder="Enter warning message..."
        okText="Send Warning"
        isLoading={isWarning}
        recordInfoRenderer={renderCoachInfo}
      />
    </>
  );
}
