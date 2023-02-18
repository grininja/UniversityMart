import React from 'react';
import apiCall
 from '@/helper/apiCall';


 export default function TestingPage(props){
    console.log(props)
    return (
        <div>
            <h1>Hello world</h1>
        </div>
    )
 }

export async function getServerSideProps(context) {
    try {
      const res = await apiCall(
        "http://localhost:3000/api/institute/getAllInstitutes",
        "GET",
        {},
        ""
      );
      const institutes = await res.data.message;
      console.log(institutes);
      return {
        props: {
          institutes: institutes,
        },
      };
    } catch (e) {
      console.log(e);
      return { props: { error: "something happened" } };
    }
  }
  