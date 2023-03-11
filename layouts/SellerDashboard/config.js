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

export const items = [
  {
    title: "Home",
    path: "/SellerPages/Home",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Quotes",
    path: "/SellerPages/Quotes/AllQuotes",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Add Product",
    path: "/SellerPages/CreateProduct",
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Products",
    path: "/SellerPages/Products",
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingCartIcon />
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
  // {
  //   title: "Account",
  //   path: "/AdminPages/AdminOne/account",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserIcon />
  //     </SvgIcon>
  //   ),
  // },
];
