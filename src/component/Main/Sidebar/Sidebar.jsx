import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  LayoutList,
  Users,
  Settings,
  ChevronRight,
  ChevronDown,
  LogOut,
  Menu,
  X,
  MessageSquareMore,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
} from "lucide-react";
import { useGetPlatformFeeQuery } from "../../../redux/features/dashboard/dashboardApi";
import PlatformFeeModal from "../../ui/Modal/PlatformFeeModal";
import LogOutModal from "../../ui/Modal/LogoutModal";

// Main Sidebar Component
export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [platformFeeOpen, setPlatformFeeOpen] = useState(false);
  const [showAddFeeModal, setShowAddFeeModal] = useState(false);
  const [showEditFeeModal, setShowEditFeeModal] = useState(false);
  const [editingFee, setEditingFee] = useState(null);
  const { data } = useGetPlatformFeeQuery();
  const feeData = data?.data;
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", path: "/", icon: Home },
    { label: "Session Manage", path: "/session-manage", icon: LayoutList },
    { label: "Coach Management", path: "/coach-management", icon: Users },
    { label: "Player Management", path: "/player-management", icon: Users },
    { label: "Refund Request", path: "/refund-request", icon: DollarSign },
    { label: "Report", path: "/report", icon: MessageSquareMore },
  ];

  const settingsSubRoutes = [
    { label: "Profile", path: "/settings/profile" },
    { label: "Terms & Condition", path: "/settings/terms-conditions" },
    { label: "Privacy Policy", path: "/settings/privacy-policy" },
  ];

  const openEditModal = () => {
    setShowEditFeeModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setConfirmOpen(false);
    navigate("/auth");
  };

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-lg border bg-white p-2 shadow lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-72 border-r bg-white shadow-sm transition-transform duration-300 ease-in-out
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto inline-flex rounded-lg p-2 hover:bg-gray-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex h-[calc(100%-160px)] flex-col justify-between overflow-y-auto px-3 py-4">
          <ul className="space-y-2">
            {navItems?.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex w-full items-center gap-3 rounded-lg px-3 py-3 transition-colors ${
                        isActive
                          ? "bg-gray-900 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                </li>
              );
            })}

            {/* Platform Fee Dropdown */}
            <li>
              <button
                onClick={() => setPlatformFeeOpen((prev) => !prev)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <DollarSign className="h-5 w-5" />
                <span className="font-medium">Platform Fee</span>
                {platformFeeOpen ? (
                  <ChevronDown className="ml-auto h-4 w-4 opacity-60" />
                ) : (
                  <ChevronRight className="ml-auto h-4 w-4 opacity-60" />
                )}
              </button>

              {platformFeeOpen && (
                <div className="ml-9 mt-2 space-y-2 border-l-2 border-gray-200 pl-3">
                  <div
                    key={feeData?.id}
                    className="group relative rounded-md bg-gray-50 p-2.5 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          ${feeData?.fee}
                        </p>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEditModal(feeData)}
                          className="rounded p-1 hover:bg-white transition-colors"
                        >
                          <Edit2 className="h-3.5 w-3.5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>

            {/* Settings Dropdown */}
            <li>
              <button
                onClick={() => setSettingsOpen((prev) => !prev)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Settings className="h-5 w-5" />
                <span className="font-medium">Settings</span>
                {settingsOpen ? (
                  <ChevronDown className="ml-auto h-4 w-4 opacity-60" />
                ) : (
                  <ChevronRight className="ml-auto h-4 w-4 opacity-60" />
                )}
              </button>

              {settingsOpen && (
                <ul className="ml-9 mt-1 space-y-1 border-l-2 border-gray-200 pl-3 text-sm text-gray-700">
                  {settingsSubRoutes.map((sub) => {
                    return (
                      <li key={sub.path}>
                        <NavLink
                          to={sub.path}
                          className={({ isActive }) =>
                            `block w-full text-left rounded-md px-3 py-2 transition-colors ${
                              isActive
                                ? "bg-gray-900 text-white"
                                : "hover:bg-gray-100"
                            }`
                          }
                          onClick={() => setMobileOpen(false)}
                        >
                          {sub.label}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          </ul>

          <div className="mt-4 border-t pt-4">
            <button
              onClick={() => setConfirmOpen(true)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Log Out</span>
            </button>
          </div>
        </nav>
      </aside>

      <PlatformFeeModal
        isOpen={showEditFeeModal}
        onClose={() => setShowEditFeeModal(false)}
      />

      {/* Logout Confirmation Modal */}
      <LogOutModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
