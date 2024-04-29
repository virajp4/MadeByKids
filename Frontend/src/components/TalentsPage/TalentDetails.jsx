import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import Details1 from "./Details1";
import Details2 from "./Details2";

function TalentDetails() {
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
  const [step, setStep] = useState(1);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/children/0`).then((res) => {
      const child = res.data.child;
      console.log("set data after recieving from backend", child);
    });
  }, []);

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

  function onSubmitForm(e) {
    e.preventDefault();
    console.log(talentData);
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
      {step === 0 && <Details1 handleSubmit={onNext} handleChange={onChangeForm} data={talentData} />}
      {step === 1 && <Details2 handleSubmit={onSubmitForm} handleChange={onChangeForm} data={talentData} handleBack={onPrev} />}
    </>
  );
}

export default TalentDetails;
