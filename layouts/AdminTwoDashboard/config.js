import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import LockClosedIcon from "@heroicons/react/24/solid/LockClosedIcon";
import ShoppingBagIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UserPlusIcon from "@heroicons/react/24/solid/UserPlusIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import ShoppingCartIcon from "@heroicons/react/24/solid/ShoppingCartIcon";
import { SvgIcon } from "@mui/material";
import ChatBubbleBottomCenterIcon from "@heroicons/react/24/solid/ChatBubbleBottomCenterIcon";

export const items = [
  {
    title: "Home",
    path: "/AdminPages/AdminTwo/Home",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "OrderRequests",
    path: "/AdminPages/AdminTwo/OrderRequestsAdminOne",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Shop",
    path: "/AdminPages/AdminTwo/Ecommerce",
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Chats",
    path: "/AdminPages/AdminTwo/Chats",
    icon: (
      <SvgIcon fontSize="small">
        <ChatBubbleBottomCenterIcon />
      </SvgIcon>
    ),
  },

  {
    title: "Order Placed",
    path: "/AdminPages/AdminTwo/AllOrdersPlaced",
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Account",
    path: "/AdminPages/AdminTwo/account",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
];
