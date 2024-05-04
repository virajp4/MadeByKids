import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useLoaderData, useNavigate, Form, redirect } from "react-router-dom";
import axios from "axios";

import { getAuthToken, parseJwt } from "../../utils/auth";
import Details1 from "./Details1";
import Details2 from "./Details2";

export default function TalentDetails() {
  const [talentData, setTalentData] = useState({
    childName: "",
    childDOB: "",
    childGender: "",
    childClass: "",
    childSchool: "",
    location: "",
    childRequireSponsor: "",
    childSkillCategory: "",
    childWriteUp: "",
    images: [],
    videos: [],
    certificates: [],
  });

  const [step, setStep] = useState(0);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  let link = pathname.split("/");
  const isNew = link[link.length - 1] === "create";
  const childId = link[link.length - 2];

  useEffect(() => {
    async function fetchData() {
      const token = getAuthToken();
      const userId = parseJwt(token);

      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}/children/${childId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status !== 200) {
          throw new Error("Failed to get data");
        }
        setTalentData(response.data.child);
      } catch (error) {
        console.error("Error getting data:", error);
        throw new Error(error.response.data.message || "Unknown error");
      }
    }

    if (!isNew) {
      fetchData();
    }
  }, []);

  function onChangeForm(e, isDate = false) {
    if (isDate) {
      const year = e.getFullYear();
      const month = e.getMonth() + 1;
      const day = e.getDate();
      const date = `${day}-${month}-${year}`;
      setTalentData({ ...talentData, childDOB: date });
      return;
    } else {
      setTalentData({ ...talentData, [e.target.name]: e.target.value });
    }
  }

  function onNext(e) {
    e.preventDefault();
    if (step < 1) {
      setStep(step + 1);
    }
  }

  function onPrev(e) {
    e.preventDefault();
    if (step > 0) {
      setStep(step - 1);
    }
  }

  async function submitTalent(e) {
    e.preventDefault();
    const token = getAuthToken();
    const userId = parseJwt(token);

    const childData = talentData;

    try {
      let response;

      if (isNew) {
        response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}/children/`, childData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}/children/${childId}`, childData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (response.status !== 200) {
        throw new Error("Failed to post data");
      }
      console.log("Data posted successfully");
      navigate("/user");
    } catch (error) {
      console.error("Error posting data:", error);
      throw new Error(error.response.data.message || "Unknown error");
    }
  }

  return (
    <>
      <div className="flex flex-col gap-5 p-5">
        <h1 className="text-2xl font-semibold text-gray-900">{isNew ? "Add" : "Edit"} Talent Details</h1>
        <div>
          <form onSubmit={submitTalent}>
            {step === 0 && <Details1 handleSubmit={onNext} handleChange={onChangeForm} data={talentData} />}
            {step === 1 && <Details2 handleChange={onChangeForm} data={talentData} handleBack={onPrev} isNew={isNew} />}
            {step === 1 && (
              <div className="flex gap-4 justify-center items-center">
                <button
                  onClick={onPrev}
                  className="text-black bg-slate-300 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  {isNew ? "Save" : "Update"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
