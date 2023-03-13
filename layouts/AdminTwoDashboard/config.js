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
import ChatBubbleBottomIcon from "@heroicons/react/24/solid/ChatBubbleBottomIcon";

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
        <ChatBubbleBottomIcon />
      </SvgIcon>
    ),
  },

  // {
  //   title: "Department Items",
  //   path: "/AdminPages/AdminOne/Items",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <ShoppingBagIcon />
  //     </SvgIcon>
  //   ),
  // },
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
