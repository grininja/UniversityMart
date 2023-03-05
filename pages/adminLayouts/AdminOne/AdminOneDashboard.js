import React from "react";
import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import apiCall from "@/helper/apiCall";
const AdminOneDashboard = () => {
  return (
    <div>
      <h1>AdminOneDashboard</h1>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  //   console.log(session);
  try {
    const getAdminOne = await apiCall(
      `${process.env.BASE_URL}/api/institute/adminHandler/adminOneHandler/adminOneByEmail?=${session.user.email}`,
      "GET",
      {},
      null
    );
    const allItems = await apiCall(
      `${process.env.BASE_URL}/api/adminOneRequests/productHandler/getAllItems?departmentId=${getAdminOne.data.message.department}`
    );
    console.log(allItems.data.message);
    return {
      props: {
        itemsList: allItems.data.message,
        Institute: getAdminOne.data.message.Institute,
        Department: getAdminOne.data.message.department,
      },
    };
  } catch (e) {
    console.log(e);
    return { props: { error: "something happened" } };
  }
}

export default AdminOneDashboard;
