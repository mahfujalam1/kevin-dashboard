/* eslint-disable no-unused-vars */
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import DashboardHome from "../page/DashboardHome/DashboardHome";
import ForgetPassword from "../page/Auth/ForgetPassword/ForgetPassword";
import SignIn from "../page/Auth/SignIn/SignIn";
import Otp from "../page/Auth/Otp/Otp";
import NewPassword from "../page/Auth/NewPassword/NewPassword";
import SettingsPage from "../page/Settings/SettingsPage";
import AboutUsPage from "../page/AboutUs/AboutUsPage";
import EditAboutUs from "../page/EditAboutUs/EditAboutUs";
import PrivacyPolicyPage from "../page/PrivacyPolicy/PrivacyPolicyPage";
import EditPrivacyPolicy from "../page/EditPrivacyPolicy/EditPrivacyPolicy";
import TermsConditions from "../page/TermsConditions/TermsConditions";
import EditTermsConditions from "../page/EditTermsConditions/EditTermsConditions";
import UsersPage from "../page/Users/UsersPage";
import SessionManage from "../component/Main/SessionManage/SessionManage";
import CoachManagement from "../component/Main/CoachManagement/CoachManagement";
import PlayerManagement from "../component/Main/PlayerManagement/PlayerManagement";
import CancelRequest from "../component/Main/CancelRequest/CancelRequest";
import ReportTable from "../component/Main/Report/Report";
import ProfilePage from "../component/Main/Profile/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout />
    ),
    errorElement: <h1>Error</h1>,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "users",
        element: <UsersPage />,
      }, 
      {
        path: "session-manage",
        element: <SessionManage />,
      }, 
      {
        path: "coach-management",
        element: <CoachManagement />,
      }, 
      {
        path: "player-management",
        element: <PlayerManagement />,
      }, 
      {
        path: "cancel-request",
        element: <CancelRequest />,
      }, 
      {
        path: "report",
        element: <ReportTable />,
      }, 
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "settings/profile",
        element: <ProfilePage />,
      },
      {
        path: "settings/privacy-policy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "/settings/edit-privacy-policy/:id",
        element: <EditPrivacyPolicy />,
      },
      {
        path: "settings/terms-conditions",
        element: <TermsConditions />,
      },
      {
        path: "/settings/edit-terms-conditions/:id",
        element: <EditTermsConditions />,
      },
      {
        path: "settings/about-us",
        element: <AboutUsPage />,
      },{
        path: "/settings/edit-about-us/:id",
        element: <EditAboutUs/>
      },
    ],
  },
  {
    path: "/auth",
    errorElement: <h1>Auth Error</h1>,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: "forgot-password",
        element: <ForgetPassword />,
      },
      {
        path: "otp/:email",
        element: <Otp />,
      },
      {
        path: "new-password/:email",
        element: <NewPassword />,
      },
    ],
  },
]);

export default router;
