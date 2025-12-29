import React, { useMemo, useState } from "react";
import { Card, Table, Avatar, Space, Dropdown, Button, message } from "antd";
import {
  DownOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
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
  if (!iso) return "-";
  const d = new Date(iso);
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
};

export default function NewSessionTable() {
  const page = 1;
  const limit = 5;
  const [actionModal, setActionModal] = useState({
    open: false,
    record: null,
    type: null, // 'warning' or 'cancel'
  });

  const { data, isLoading } = useGetAllSessionQuery({
    page,
    limit,
    search: "",
  });

  const [cancelSession, { isLoading: isCancelling }] =
    useCancelSessionMutation();
  const [warnUser, { isLoading: isWarning }] = useWarnSessionMutation();

  const sessions = data?.data?.sessions ?? [];

  const tableData = useMemo(() => {
    return sessions?.map((s, idx) => ({
      key: s.id,
      id: s.id,
      sl: (page - 1) * limit + (idx + 1),
      coach: {
        name: s?.coach?.fullName ?? "—",
        avatar: s?.coach?.avatar
          ? `${import.meta.env.VITE_BASE_IMAGE_URL}/${s?.coach?.avatar}`
          : undefined,
      },
      joined: s?.joined ?? 0,
      fee: s?.fee ?? 0,
      max: s?.max_participants ?? 0,
      type: s?.type ?? "—",
      startDate: formatDateTime(s?.started_at),
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
        await warnUser({
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
        error?.data?.message || `Failed to ${actionModal.type} session`
      );
    }
  };

  const handleAction = (key, record) => {
    if (key === "warn") {
      handleWarningClick(record);
    }
    if (key === "delete") {
      handleCancelClick(record);
    }
  };

  const renderSessionInfo = (record) => (
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
        <strong>Type:</strong> {record.type}
      </p>
      <p style={{ margin: 0, marginBottom: 4 }}>
        <strong>Fee:</strong> {currency(record.fee)}
      </p>
      <p style={{ margin: 0 }}>
        <strong>Start Date:</strong> {record.startDate}
      </p>
    </div>
  );

  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      key: "sl",
      width: 80,
      align: "center",
    },
    {
      title: "Coach",
      key: "coach",
      render: (_, r) => (
        <Space>
          <Avatar src={r.coach.avatar} size={36} alt={r.coach.name}>
            {(r.coach.name?.[0] ?? "?").toUpperCase()}
          </Avatar>
          <div>
            <div style={{ fontWeight: 600 }}>{r.coach.name}</div>
            <div style={{ fontSize: 12, color: "#8c8c8c" }}>{r.type}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "Total join Player",
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
      title: "Max par.",
      dataIndex: "max",
      key: "max",
      align: "center",
      responsive: ["lg", "xl", "xxl"],
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
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
            label: "Cancel",
            disabled: !record.is_cancelable,
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
    },
  ];

  return (
    <>
      <Card
        title="New Session"
        extra={<a href="#">View all</a>}
        styles={{ body: { padding: 0 } }}
      >
        <Table
          columns={columns}
          dataSource={tableData}
          loading={isLoading || isCancelling || isWarning}
          pagination={false}
          scroll={{ x: true }}
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
        recordInfoRenderer={renderSessionInfo}
      />
    </>
  );
}
