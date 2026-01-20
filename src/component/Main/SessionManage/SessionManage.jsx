import React, { useState, useMemo } from "react";
import {
  Card,
  Table,
  Avatar,
  Space,
  Dropdown,
  Button,
  Input,
  Tag,
  message,
} from "antd";
import {
  DownOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  useCancelSessionMutation,
  useGetAllSessionQuery,
  useWarnSessionMutation,
} from "../../../redux/features/session/session";
import { NoteModal } from "../../ui/Modal/NoteModal";

const currency = (v) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(v || 0));

const formatDateTime = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return new Intl.DateTimeFormat(undefined, {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
};

export default function SessionManage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [actionModal, setActionModal] = useState({
    open: false,
    record: null,
    type: null, // 'warning' or 'cancel'
  });

  const { data, isLoading } = useGetAllSessionQuery({
    page,
    limit,
    search: query,
  });
  console.log(data);

  const [cancelSession, { isLoading: isCancelling }] =
    useCancelSessionMutation();
  const [warnSession, { isLoading: isWarning }] = useWarnSessionMutation();

  const sessions = data?.data?.sessions ?? [];
  const totalSessions = data?.data?.total ?? 0;

  const handleTableChange = (pagination) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
  };

  const tableData = useMemo(() => {
    return sessions?.map((s, idx) => ({
      key: s.id,
      id: s.id,
      sNo: `#${s.id || (page - 1) * limit + (idx + 1)}`,
      coach: {
        name: s?.coach?.fullName ?? "—",
        sport: s?.type ?? "—",
        avatar: s?.coach?.avatar
          ? `${import.meta.env.VITE_BASE_IMAGE_URL}/${s?.coach?.avatar}`
          : undefined,
      },
      joined: s?.joined ?? 0,
      fee: s?.fee ?? 0,
      max: s?.max_participants ?? 0,
      type: s?.type ?? "—",
      sessionType: s?.session_type || (s?.fee > 0 ? "Paid" : "Free"),
      endDate: formatDateTime(s?.ended_at || s?.started_at),
      isCancelable: s?.is_cancelable ?? false,
    }));
  }, [sessions, page, limit]);

  const handleWarningClick = (record) => {
    setActionModal({ open: true, record, type: "warning" });
  };

  const handleCancelClick = (record) => {
    setActionModal({ open: true, record, type: "cancel" });
  };

  const handleModalSubmit = async (note, record) => {
    try {
      if (actionModal.type === "warning") {
        await warnSession({
          session_id: record.id,
          note: note,
        }).unwrap();
        message.success("Warning sent successfully!");
      } else if (actionModal.type === "cancel") {
        await cancelSession({
          sessionId: record.id,
          note: note,
        }).unwrap();
        message.success("Session cancelled successfully!");
      }
      setActionModal({ open: false, record: null, type: null });
    } catch (error) {
      message.error(
        error?.data?.message || `Failed to ${actionModal.type} session`,
      );
    }
  };

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
              {r.coach.sport}
            </div>
          </div>
        </Space>
      ),
      responsive: ["xs", "sm", "md", "lg", "xl", "xxl"],
    },
    {
      title: "Total Player",
      dataIndex: "joined",
      key: "joined",
      align: "center",
      render: (v) => String(v ?? 0).padStart(2, "0"),
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
      title: "Session type",
      dataIndex: "sessionType",
      key: "sessionType",
      align: "center",
      render: (v) => (
        <Tag
          color={v === "Paid" ? "green" : "purple"}
          style={{ borderRadius: 999, padding: "2px 12px" }}
        >
          {v}
        </Tag>
      ),
      responsive: ["md", "lg", "xl", "xxl"],
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
            key: "cancel",
            icon: <DeleteOutlined />,
            danger: true,
            label: "Cancel",
            disabled: !record.is_cancelable,
          },
        ];
        const onClick = ({ key }) => {
          if (key === "warn") handleWarningClick(record);
          if (key === "cancel") handleCancelClick(record);
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

  return (
    <>
      <Card
        title="Session Manage"
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
          loading={isLoading || isCancelling || isWarning}
          pagination={{
            current: page,
            pageSize: limit,
            total: totalSessions,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            showLessItems: true,
          }}
          onChange={handleTableChange}
          scroll={{ x: 800 }}
          rowHoverable
        />
      </Card>

      {/* Reusable Note Modal */}
      <NoteModal
        open={actionModal.open}
        record={actionModal.record}
        onClose={() =>
          setActionModal({ open: false, record: null, type: null })
        }
        onSubmit={handleModalSubmit}
        title={
          actionModal.type === "warning" ? "Send Warning" : "Cancel Session"
        }
        noteLabel={
          actionModal.type === "warning"
            ? "Warning Message:"
            : "Cancellation Reason:"
        }
        placeholder={
          actionModal.type === "warning"
            ? "Enter warning message..."
            : "Enter cancellation reason..."
        }
        okText={
          actionModal.type === "warning" ? "Send Warning" : "Cancel Session"
        }
        okButtonProps={actionModal.type === "cancel" ? { danger: true } : {}}
        isLoading={isWarning || isCancelling}
      />
    </>
  );
}
