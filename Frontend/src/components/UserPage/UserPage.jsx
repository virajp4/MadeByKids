import React from "react";
import { useState, useEffect } from "react";
import ChildSection from "./ChildSection";
import { useUserContext } from "../../store/UserContext";
import { useRouteLoaderData } from "react-router-dom";

const userName = 'John Doe';
const childrenList = [
  {
    childName: 'Child 1'
  },
  {
    childName: 'Child 2'
  },
  {
    childName: 'Child 3'
  }
]

export default function UserPage() {
  const { userId } = useUserContext();
  const token  = useRouteLoaderData("user");
  const [userData, setUserData]  = useState();
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setUserData(data);
    }
    fetchData();
  }, []);
  return (
      <>
        <div className="bg-white shadow rounded-lg border">
          <div className="m-3">
              <div className="relative flex">
                <img src="https://readymadeui.com/team-1.webp" className="rounded-full w-20 md:w-32 shadow-md border-4 border-stone-400"/>
                <div className="m-3">
                  <h3 className="text-lg font-bold text-gray-900 h-fit"> {userName} </h3>
                  <button className="text-sm text-gray-900 hover:text-gray-500 h-fit">Edit Profile</button>
                </div>
              </div>
          </div>
          <div className="m-3">
            <a href="" className="text-gray-800 font-medium text-sm w-1/3 px-1">Add Talent</a>
            <a href="" className="text-gray-800 font-medium text-sm w-1/3 px-1">Marketplace</a>
            <a href="" className="text-gray-800 font-medium text-sm w-1/3 px-1">Browse</a>
          </div>
          <div className="bg-white shadow-[0_2px_15px_-6px_rgba(0,0,0,0.2)] px-6 py-8 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
            <div className="flex items-center">
              <h3 className="text-xl font-bold flex-1 text-black">Heading</h3>
            </div>
            {childrenList.map((child, index) => (
               <ChildSection key={index} childName={child.childName} />
              ))  
            }
            </div>
        </div>
      </>
  );
}
