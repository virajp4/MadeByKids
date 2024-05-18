import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { getAuthToken, parseJwt } from "../../utils/auth";

const childImage = "https://readymadeui.com/profile_2.webp";

export default function ChildSection({ data }) {
  async function deleteChild() {
    const token = getAuthToken();
    const userId = parseJwt(token);

    await axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}/children/${data.childId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Deleted child.");
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5">
      <div className="flex flex-col items-center">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={childImage} alt="Bonnie image" />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{data.childName}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">Age {data.childClass}</span>
        <div className="flex mt-4 md:mt-6 gap-1">
          <Link
            to={`/user/children/${data.childId}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            View
          </Link>
          <Link
            to={`/user/children/${data.childId}/edit`}
            className="py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
          >
            Edit
          </Link>
          <button
            onClick={deleteChild}
            className="py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
