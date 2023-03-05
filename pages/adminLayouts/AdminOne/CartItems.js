import React from "react";
import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import apiCall from "@/helper/apiCall";
const CartItemsDashBoard = () => {
  return (
    <div>
      <h1>Cart</h1>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  try {
    const getAdminOne = await apiCall(
      `${process.env.BASE_URL}/api/institute/adminHandler/adminOneHandler/adminOneByEmail?=${session.user.email}`,
      "GET",
      {},
      null
    );
    const allCartItems = await apiCall(
      `${process.env.BASE_URL}/api/adminOneRequests/cartHandler/getAllItem?AdminOneId=${getAdminOne.data.message._id}`
    );
    console.log(allItems.data.message);
    return {
      props: {
        cartItems: allCartItems.data.message,
      },
    };
  } catch (e) {
    console.log(e);
    return { props: { error: "something happened" } };
  }
}
