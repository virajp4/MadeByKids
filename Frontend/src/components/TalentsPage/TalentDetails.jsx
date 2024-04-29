import React from "react";
import { useState } from "react";

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
  });
  const [step, setStep] = useState(0);

  function onChangeForm(e, isDate = false) {
    if (isDate) {
      setTalentData({ ...talentData, dob: e });
      return;
    } else {
      setTalentData({ ...talentData, [e.target.name]: e.target.value });
    }
  }

  function onSubmit(data) {
    setTalentData(data);
    onNext();
  }

  function onNext() {
    if (step < 1) {
      setStep(step + 1);
    }
  }

  function onPrev() {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  return (
    <>
      {step === 0 && <Details1 handleSubmit={onSubmit} inputData={talentData} />}
      {step === 1 && <Details2 />}
    </>
  );
}

export default TalentDetails;
