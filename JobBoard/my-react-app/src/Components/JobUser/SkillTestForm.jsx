import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import jobpic from "../../assets/skill.jpg";
import UserNavBar from "./userNavbar";
import { useNavigate } from "react-router-dom";
import { Admincontext } from "../../App";
const SkillTestForm = () => {
  const navigator = useNavigate();
  const [step, setStep] = useState(1);
  const [sectors, setSectors] = useState([]);
  const [options, setOptions] = useState([]);
  const {setSuggesion} = useContext(Admincontext);
  const [formData, setFormData] = useState({
    preferredSector: "",
    selectedSkills: [],
    knowledgePercentages: {},
    projectExperience: "",
    projectDetails: "",
    interestedCompanies: "",
    expectedSalary: "",
  });

  useEffect(() => {
    axios.get("http://localhost:8080/api/sectors").then((response) => {
      setSectors(response.data);
    });
  }, []);

  useEffect(() => {
    if (formData.preferredSector) {
      axios
        .get(
          `http://localhost:8080/api/skills/sector/${formData.preferredSector}`
        )
        .then((response) => {
          setOptions(response.data);
        });
    }
  }, [formData.preferredSector]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSkillChange = (e) => {
    const skill = e.target.value;
    setFormData((prevState) => {
      const selectedSkills = prevState.selectedSkills.includes(skill)
        ? prevState.selectedSkills.filter((s) => s !== skill)
        : [...prevState.selectedSkills, skill];

      const knowledgePercentages = { ...prevState.knowledgePercentages };
      if (!prevState.selectedSkills.includes(skill)) {
        knowledgePercentages[skill] = "";
      } else {
        delete knowledgePercentages[skill];
      }

      return {
        ...prevState,
        selectedSkills,
        knowledgePercentages,
      };
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    let canProceed = true;

    if (step === 1 && !formData.preferredSector) {
      toast.error("Please select a preferred sector.");
      canProceed = false;
    } else if (step === 2 && formData.selectedSkills.length === 0) {
      toast.error("Please select at least one skill.");
      canProceed = false;
    } else if (
      step === 3 &&
      Object.keys(formData.knowledgePercentages).some(
        (key) => !formData.knowledgePercentages[key]
      )
    ) {
      toast.error("Please select knowledge level for all selected skills.");
      canProceed = false;
    } else if (step === 4 && !formData.projectExperience) {
      toast.error("Please select your project experience.");
      canProceed = false;
    }

    if (canProceed) {
      setStep(step + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      selectedSkills: formData.selectedSkills.join(","),
      knowledgePercentages: JSON.stringify(formData.knowledgePercentages),
    };
    axios
      .post("http://localhost:8080/api/formData", payload)
      .then((response) => {
        toast.success("Data submitted successfully");
        setSuggesion(response.data)
        console.log(response.data);
        navigator("/skill/suggesion")
      })
      .catch((error) => {
        console.error("There was an error submitting the form!", error);
      });

  };

  return (
    <>
    <UserNavBar />
    <div className="container mx-auto min-h-screen  flex ">
      <div className="w-[50%] h-[100vh]  pl-28">
        <div className="mt-[20%]">
          <p className="text-7xl font-base">Welcome,</p>
          <p className="text-5xl font-base">Let us tell about Yourself</p>
        </div>
        <img src={jobpic} className="w-72 h-72 my-8 "></img>
      </div>
      <div className=" w-[50%] flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className=" p-28 rounded-3xl   shadow-2xl shadow-slate-600 w-full max-w-lg "
        >
          {step === 1 && (
            <div>
              <label className="block mb-4">
                Preferred Sector:
                <select
                  name="preferredSector"
                  value={formData.preferredSector}
                  onChange={handleChange}
                  className="block w-full mt-2 p-2 border rounded-lg"
                >
                  <option value="">Select</option>
                  {sectors.map((sector, index) => (
                    <option key={index} value={sector.name}>
                      {sector.name}
                    </option>
                  ))}
                </select>
              </label>
              <button
                onClick={handleNext}
                className="mt-4 bg-blue-500 text-white p-2 rounded-lg"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <label className="block mb-4">
                Related Skills:
                <div className="mt-2">
                  {formData.preferredSector &&
                    options.map((option, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id={option.name}
                          name="selectedSkills"
                          value={option.name}
                          checked={formData.selectedSkills.includes(
                            option.name
                          )}
                          onChange={handleSkillChange}
                          className="mr-2"
                        />
                        <label htmlFor={option.name}>{option.name}</label>
                      </div>
                    ))}
                </div>
              </label>
              <button
                onClick={handleNext}
                className="mt-4 bg-blue-500 text-white p-2 rounded-lg"
              >
                Next
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <label className="block mb-4">
                Knowledge Level:
                {formData.selectedSkills.map((skill, index) => (
                  <div key={index} className="mt-2">
                    <label className="block mb-1">{skill}:</label>
                    <select
                      name={skill}
                      value={formData.knowledgePercentages[skill] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          knowledgePercentages: {
                            ...formData.knowledgePercentages,
                            [skill]: e.target.value,
                          },
                        })
                      }
                      className="block w-full p-2 border rounded-lg"
                    >
                      <option value="">Select</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                ))}
              </label>
              <button
                onClick={handleNext}
                className="mt-4 bg-blue-500 text-white p-2 rounded-lg"
              >
                Next
              </button>
            </div>
          )}

          {step === 4 && (
            <div>
              <label className="block mb-4">
                Project Experience:
                <select
                  name="projectExperience"
                  value={formData.projectExperience}
                  onChange={handleChange}
                  className="block w-full mt-2 p-2 border rounded-lg"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </label>
              {formData.projectExperience === "Yes" && (
                <div>
                  <label className="block mb-4">
                    Project Details:
                    <textarea
                      name="projectDetails"
                      value={formData.projectDetails}
                      onChange={handleChange}
                      className="block w-full mt-2 p-2 border rounded-lg"
                    />
                  </label>
                </div>
              )}
              <button
                onClick={handleNext}
                className="mt-4 bg-blue-500 text-white p-2 rounded-lg"
              >
                Next
              </button>
            </div>
          )}

          {step === 5 && (
            <div>
              <label className="block mb-4">
                Interested Companies:
                <input
                  type="text"
                  name="interestedCompanies"
                  value={formData.interestedCompanies}
                  onChange={handleChange}
                  placeholder="Enter company names separated by commas"
                  className="block w-full mt-2 p-2 border rounded-lg"
                />
              </label>
              <label className="block mb-4">
                Expected Salary Package:
                <select
                  name="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={handleChange}
                  className="block w-full mt-2 p-2 border rounded-lg"
                >
                  <option value="">Select</option>
                  <option value="Less than $50,000">Less than $50,000</option>
                  <option value="$50,000 - $75,000">$50,000 - $75,000</option>
                  <option value="$75,000 - $100,000">$75,000 - $100,000</option>
                  <option value="More than $100,000">More than $100,000</option>
                </select>
              </label>
              <button
                type="submit"
                className="mt-4 bg-green-500 text-white p-2 rounded-lg"
              >
                Submit
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
    </>
  );
};

export default SkillTestForm;
