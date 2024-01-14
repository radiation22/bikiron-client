import { createBrowserRouter } from "react-router-dom";
import Main from "./Main";
import Root from "./Root";
import StartPage from "../components/StartPage/StartPage";
import Location from "../components/Location/Location";
import ChooseBus from "../components/ChooseBus/ChooseBus";
import TicketDetails from "../components/TicketDetails/TicketDetails";
import Delivered from "../components/Dashboard/Delivered";
import Supervisor1 from "./../components/Dashboard/Supervisor1";
import Manager from "../components/Dashboard/Manager";
import Login from "../components/Login/Login";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import ChooseAccount from "../components/ChooseAccount/ChooseAccount";
import Login2 from "../components/Login/Login2";
import DriverRoute from "../components/PrivateRoute/DriverRoute";
import TicketInfo from "../components/UserTicket/TicketInfo";
import SuperTicket from "../components/Dashboard/SuperTicket";
import ShowTicket from "../components/UserTicket/ShowTicket";
import Slider from "../components/Slider/Slider";
import Sliderb from "../components/Slider/Sliderb";
import Donation from "../components/Donation/Donation";
import Rewards from "../components/Rewards/Rewards";
import Profile from "../components/Profile/Profile";
import Setting from "../components/Setting/Setting";
import Message from "../components/Message/Message";
import More from "../components/More/More";
import Inbox from "../components/Message/Inbox";
import UserWelcome from "../components/Login/UserWelcome";
import Register from "../components/Login/Register";
import Notification from "../components/Notification/Notification";
import DriverReward from "../components/Rewards/DriverReward";
import DriverDonate from "../components/Donation/DriverDonate";
import DriverSetting from "../components/Setting/DriverSetting";
import DriverProfile from "../components/Profile/DriverProfile";
import Admin from "../components/Login/Admin";
import AdminRoute from "../components/PrivateRoute/AdminRoute";
import DriverMore from "../components/More/DriverMore";
import Homeb from "../components/Home/Homeb";
import ChooseAccountb from "../components/ChooseAccount/ChooseAccountb";
import Locationb from "../components/Location/Locationb";
import ChooseBusb from "../components/ChooseBus/ChooseBusb";
import TicketDetailsb from "../components/TicketDetails/TicketDetailsb";
import Settingb from "../components/Setting/Settingb";
import Moreb from "../components/More/Moreb";
import Language from "./../components/Language/Language";
import PrivateRouteb from "../components/PrivateRoute/PrivateRouteb";
import UserWelcomeb from "../components/Login/UserWelcomeb";
import Loginb from "../components/Login/Loginb";
import Registerb from "../components/Login/Registerb";
import Messageb from "../components/Message/Messageb";
import Inboxb from "../components/Message/Inboxb";
import TicketInfob from "../components/UserTicket/TicketInfob";
import Rewardsb from "../components/Rewards/Rewardsb";
import Donationb from "../components/Donation/Donationb";
import Notificationb from "../components/Notification/Notificationb";
import Claim from "../components/Claim/Claim";
import Supervisor1b from "../components/Dashboard/Supervisor1b";
import Tripb from "../components/Dashboard/Tripb";
import DriverDonateb from "../components/Donation/DriverDonateb";
import DriverRewardb from "../components/Rewards/DriverRewardb";
import DriverMoreb from "../components/More/DriverMoreb";
import DriverSettingb from "../components/Setting/DriverSettingb";
import DriverNotificationb from "../components/Notification/DriverNotificationb";
import DriverNotification from "../components/Notification/DriverNotification";
import DriverProfileb from "../components/Profile/DriverProfileb";
import Profileb from "../components/Profile/Profileb";
import DriverRouteb from "../components/PrivateRoute/DriverRouteb";
import Login2b from "../components/Login/Login2b";
import ShowTicketb from "../components/UserTicket/ShowTicketb";
import Claimb from "../components/Claim/Claimb";
import Notfound from "../components/Notfound/Notfound";
import Recharge from "../components/Recharge/Recharge";
import RechargeHome from "../components/Recharge/RechargeHome";
import Agent from "../components/Login/Agent";
import AllPackages from "../components/AllPackages/AllPackages";
import FullLibrary from "../components/FullLibrary/FullLibrary";
import ShowDetails from "../components/ShowDetails/ShowDetails";
import MemberShip from "../components/MemberShip/MemberShip";
import AddLibrary from "../components/AddLibrary/AddLibrary";
import MyLibrary from "../components/MyLibrary/MyLibrary";
import AllLibrary from "../components/AllLibrary/AllLibrary";
import UserAccount from "../components/UserAccount/UserAccount";
import Payment from "../components/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,

    errorElement: <Notfound></Notfound>,
    children: [
      {
        path: "/",
        element: <StartPage></StartPage>,
      },
      {
        path: "/allLibrary",
        element: <AllLibrary></AllLibrary>,
      },

      {
        path: "/home",
        element: <Main></Main>,
      },
      {
        path: "/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/allPackage",
        element: <AllPackages></AllPackages>,
      },
      {
        path: "/membership",
        element: <MemberShip></MemberShip>,
      },
      {
        path: "/fullLibrary/:email",
        element: <FullLibrary></FullLibrary>,
      },
      {
        path: "/details/:id",
        element: <ShowDetails></ShowDetails>,
      },
      {
        path: "/userAccount/:email",
        element: <UserAccount></UserAccount>,
      },

      {
        path: "/recharge",
        element: <RechargeHome></RechargeHome>,
      },
      {
        path: "/addLibrary",
        element: <AddLibrary></AddLibrary>,
      },
      {
        path: "/language",
        element: <Language></Language>,
      },
      {
        path: "/claim",
        element: (
          <PrivateRoute>
            <Claim></Claim>
          </PrivateRoute>
        ),
      },
      {
        path: "/claimb",
        element: (
          <PrivateRouteb>
            <Claimb></Claimb>
          </PrivateRouteb>
        ),
      },
      {
        path: "/homeb",
        element: <Homeb></Homeb>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/myLibrary",
        element: (
          <PrivateRoute>
            <MyLibrary></MyLibrary>
          </PrivateRoute>
        ),
      },
      {
        path: "/registerb",
        element: <Registerb></Registerb>,
      },
      {
        path: "/account",
        element: <ChooseAccount></ChooseAccount>,
      },
      {
        path: "/accountb",
        element: <ChooseAccountb></ChooseAccountb>,
      },
      {
        path: "/location",
        element: (
          <PrivateRoute>
            <Location></Location>
          </PrivateRoute>
        ),
      },
      {
        path: "/locationb",
        element: (
          <PrivateRouteb>
            <Locationb></Locationb>
          </PrivateRouteb>
        ),
      },

      {
        path: "/deliver",
        element: <Delivered></Delivered>,
      },

      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/loginb",
        element: <Loginb></Loginb>,
      },
      {
        path: "/login2",
        element: <Login2></Login2>,
      },
      {
        path: "/login2b",
        element: <Login2b></Login2b>,
      },

      {
        path: "/slider",
        element: <Slider></Slider>,
      },
      {
        path: "/sliderb",
        element: <Sliderb></Sliderb>,
      },
      {
        path: "/admin",
        element: <Admin></Admin>,
      },
      {
        path: "/agent",
        element: <Agent></Agent>,
      },

      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/profileb",
        element: (
          <PrivateRoute>
            <Profileb></Profileb>
          </PrivateRoute>
        ),
      },
      {
        path: "/setting",
        element: (
          <PrivateRoute>
            <Setting></Setting>
          </PrivateRoute>
        ),
      },
      {
        path: "/settingb",
        element: <Settingb></Settingb>,
      },
      {
        path: "/message",
        element: (
          <PrivateRoute>
            <Message></Message>
          </PrivateRoute>
        ),
      },
      {
        path: "/messageb",
        element: (
          <PrivateRouteb>
            <Messageb></Messageb>
          </PrivateRouteb>
        ),
      },
      {
        path: "/more",
        element: <More></More>,
      },
      {
        path: "/moreb",
        element: <Moreb></Moreb>,
      },
      {
        path: "/inbox",
        element: (
          <PrivateRoute>
            <Inbox></Inbox>
          </PrivateRoute>
        ),
      },
      {
        path: "/inboxb",
        element: (
          <PrivateRouteb>
            <Inboxb></Inboxb>
          </PrivateRouteb>
        ),
      },
      {
        path: "/welcome",
        element: <UserWelcome></UserWelcome>,
      },
      {
        path: "/welcomeb",
        element: <UserWelcomeb></UserWelcomeb>,
      },
      {
        path: "/notification",
        element: <Notification></Notification>,
      },
      {
        path: "/notificationb",
        element: <Notificationb></Notificationb>,
      },
    ],
  },
]);
