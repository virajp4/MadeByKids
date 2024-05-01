import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useRouteLoaderData, useNavigate, Form } from "react-router-dom";
import axios from "axios";

import { getAuthToken, parseJwt } from "../../utils/auth";
import Details1 from "./Details1";
import Details2 from "./Details2";

export default function TalentDetails() {
  const [talentData, setTalentData] = useState({
    name: "",
    dob: "",
    gender: "",
    class: "",
    school: "",
    location: "",
    sponsorship: "",
    skills: "",
    description: "",
    images: [],
    videos: [],
    certificates: [],
  });
  const [step, setStep] = useState(0);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  let link = pathname.split("/");
  const isNew = link[link.length - 1] === "new";

  // useEffect(() => {
  //   async function fetchData() {
  //     axios.get(`${import.meta.env.VITE_BACKEND_URL}/children/0`).then((res) => {
  //       const child = res.data.child;
  //       console.log("set data after recieving from backend", child);
  //     });
  //   }
  //   if (!isNew) {
  //     fetchData();
  //   }
  // }, []);

  function onChangeForm(e, isDate = false) {
    if (isDate) {
      const year = e.getFullYear();
      const month = e.getMonth() + 1;
      const day = e.getDate();
      const date = `${day}-${month}-${year}`;
      setTalentData({ ...talentData, dob: date });
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

  return (
    <>
      <div className="flex flex-col gap-5 p-5">
        <h1 className="text-2xl font-semibold text-gray-900">{isNew ? "Add" : "Edit"} Talent Details</h1>
        <div>
          <Form method="POST">
            {step === 0 && <Details1 handleSubmit={onNext} handleChange={onChangeForm} data={talentData} />}
            {step === 1 && <Details2 handleChange={onChangeForm} data={talentData} handleBack={onPrev} isNew={isNew} />}
          </Form>
        </div>
      </div>
    </>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const token = getAuthToken();
  const userId = parseJwt(token);

  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}/children/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    });

    if (response.status !== 200) {
      throw new Error("Failed to post data");
    }
    
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw new Error(error.response.data.message || "Unknown error");
  }
}
