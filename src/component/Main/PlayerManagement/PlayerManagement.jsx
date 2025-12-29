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
  useBlockUserMutation,
  useWarnUserMutation,
} from "../../../redux/features/dashboard/dashboardApi";
import { NoteModal } from "../../ui/Modal/NoteModal";

export default function PlayerManagement() {
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
    role: "PLAYER",
  });
  const [warnUser, { isLoading: isWarning }] = useWarnUserMutation();
  const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();

  const players = data?.data?.users ?? [];
  const totalPlayers = data?.data?.total ?? 0;

  const handleTableChange = (pagination) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
  };

  const tableData = useMemo(() => {
    return players?.map((player, idx) => ({
      key: player.id,
      id: player.id,
      sNo: `#${player.id || (page - 1) * limit + (idx + 1)}`,
      player: {
        name: player?.fullName ?? "—",
        email: player?.email ?? "—",
        sport: player?.sport?.name ?? player?.preferred_sport ?? "—",
        avatar: player?.avatar
          ? `${import.meta.env.VITE_BASE_IMAGE_URL}/${player?.avatar}`
          : undefined,
      },
      isBlocked: player?.is_blocked ?? false,
    }));
  }, [players, page, limit]);

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
      message.success("Player blocked successfully!");
    } catch (error) {
      message.error(error?.data?.message || "Failed to block player");
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

  const renderPlayerInfo = (record) => (
    <div
      style={{
        marginBottom: 16,
        padding: 12,
        background: "#f5f5f5",
        borderRadius: 6,
      }}
    >
      <p style={{ margin: 0, marginBottom: 4 }}>
        <strong>Player:</strong> {record.player.name}
      </p>
      <p style={{ margin: 0, marginBottom: 4 }}>
        <strong>Email:</strong> {record.player.email}
      </p>
      <p style={{ margin: 0 }}>
        <strong>Sport:</strong> {record.player.sport}
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
      title: "Player",
      key: "player",
      render: (_, r) => (
        <Space>
          <Avatar src={r.player.avatar} size={36}>
            {(r.player.name?.[0] ?? "?").toUpperCase()}
          </Avatar>
          <div style={{ textAlign: "start" }}>
            <div style={{ fontWeight: 600 }}>{r.player.name}</div>
            <div style={{ fontSize: 12, color: "#8c8c8c" }}>
              {r.player.email}
            </div>
          </div>
        </Space>
      ),
      responsive: ["xs", "sm", "md", "lg", "xl", "xxl"],
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
        styles={{ body: { padding: 0 } }}
      >
        <Table
          columns={columns}
          dataSource={tableData}
          loading={isLoading || isBlocking}
          pagination={{
            current: page,
            pageSize: limit,
            total: totalPlayers,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
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
        title="Send Warning to Player"
        noteLabel="Warning Message:"
        placeholder="Enter warning message..."
        okText="Send Warning"
        isLoading={isWarning}
        recordInfoRenderer={renderPlayerInfo}
      />
    </>
  );
}
