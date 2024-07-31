import { useEffect, useState, useContext } from "react";
import {
  FastForward,
  History,
  Bookmark,
  PiggyBank,
  Clock,
  MapPin,
  ContactRound,
} from "lucide-react";
import axios from "axios";
import "../../App.css";
import { Admincontext } from "../../App";
import JobSearchForm from "./Searchbar";
import Footer from "../Footer";
import UserNavBar from "./userNavbar";
import { useNavigate } from "react-router-dom";

export default function CompanyDetail() {
  const { jobName, location } = useContext(Admincontext);
  const [jobs, setJobs] = useState([]);
  const [dupjobs, setdupJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const navigater = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/job/getJob");
        console.log(response.data);
        setdupJobs(response.data);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const filterJobs = () => {
      const filteredJobs = dupjobs.filter((dupjob) => {
        return (
          (jobName === "" ||
            (dupjob.jobName &&
              dupjob.jobName.toLowerCase().includes(jobName.toLowerCase()))) &&
          (location === "" ||
            (dupjob.location &&
              dupjob.location.toLowerCase().includes(location.toLowerCase())))
        );
      });
      setJobs(filteredJobs);
    };
    filterJobs();
  }, [jobName, location, dupjobs]);

  const handleClick = (job) => {
    setSelectedJob(job);
  };

  return (
    <>
      <UserNavBar />
      <JobSearchForm />
      <div className="container mx-auto">
        <div className="mx-24 ">
          <div className="grid grid-cols-2  gap-4  p-2">
            <div className="h-[90vh] overflow-y-auto scroll overflow-hidden">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="border  rounded-lg my-8"
                  onClick={() => handleClick(job)}
                >
                  <div className="mx-8 my-7">
                    <h1 className="font-bold text-2xl my-3">{job.jobName}</h1>
                    <p className="text-lg font-normal">{job.companyName}</p>
                    <p className="text-lg font-normal">{job.location}</p>
                    <div className="flex flex-row my-3">
                      <p className="mr-8 bg-gray-300 rounded-md px-3 ">
                        ${job.salary}
                      </p>
                      <p className="mx-6 bg-gray-300 rounded-md px-3">
                        {job.jobType}
                      </p>
                      <p className="mx-8 bg-gray-300 rounded-md px-3">
                        {job.shiftTime}
                      </p>
                    </div>
                    <div className="flex flex-row mb-3">
                      <FastForward />
                      <p className="ml-2">Easily Access</p>
                    </div>
                    <p>{job.description}</p>
                    <div className="flex flex-row my-2">
                      <div className="mt-1">
                        <History size={24} strokeWidth={1.25} />
                      </div>
                      <p className="mt-0.5">posted 2 days ago</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className=" my-8 border">
              {selectedJob ? (
                <div className="h-[70vh] overflow-y-auto scroll overflow-hidden">
                  <div className="p-4">
                    <h1 className="font-bold text-2xl my-4 mx-2">
                      {selectedJob.jobName}
                    </h1>
                    <div className="mx-4 my-2">
                      <p>{selectedJob.location}</p>
                      <p>{selectedJob.salary}</p>
                      <p className="pt-2">
                        You must create an JOBIZZ account before continuing to
                        the company website to apply
                      </p>
                    </div>

                    <div className="flex flex-row p-2">
                      <button
                        className="bg-blue-500 text-white  mx-2  rounded-md py-2 px-4  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => {
                          navigater("/user/applyjob");
                        }}
                      >
                        Apply Now
                      </button>
                      <div className="">
                        <Bookmark size={40} strokeWidth={1.25} />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-2xl m-2">Description</p>
                    <p className="m-4">{selectedJob.description}</p>
                  </div>
                  <p className="font-semibold text-2xl px-8 py-2">
                    Job Details
                  </p>
                  <div className="px-8">
                    <div className="m-4">
                      <div className="flex flex-row ">
                        <PiggyBank size={32} strokeWidth={1.75} />
                        <p className=" mx-2 font-semibold text-2xl">Pay</p>
                      </div>
                      <p className="my-2 mx-10">{selectedJob.salary}</p>
                    </div>
                    <div className="m-4">
                      <div className="flex flex-row">
                        <div>
                          <ContactRound size={32} strokeWidth={1.5} />
                        </div>
                        <p className="font-semibold text-2xl ml-1">Job Type</p>
                      </div>
                      <p className="text-1xl ml-9">{selectedJob.jobType}</p>
                    </div>
                    <div className="m-4">
                      <div className="flex flex-row">
                        <div className="mt-1">
                          <Clock></Clock>
                        </div>
                        <p className="font-semibold text-2xl ml-2">Shift</p>
                      </div>
                      <p className="text-1xl mx-8">{selectedJob.shiftTime}</p>
                    </div>
                    <div className="m-4">
                      <div className="flex flex-row">
                        <div className="mt-1">
                          <MapPin></MapPin>
                        </div>
                        <p className="font-semibold text-2xl mx-2">Location</p>
                      </div>
                      <p className="text-1xl ml-9">{selectedJob.location}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-2xl m-2">
                      Brief Description
                    </p>
                    <p className="m-4">{selectedJob.briefDescription}</p>
                  </div>
                </div>
              ) : (
                <p className="text-center text-3xl font-bold my-10">
                  Select a job
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
