"use client";

import allGuestsAndTable from "@/utils/guest";
import Image from "next/image";
import { useState } from "react";

const LandingPage = () => {
  const [formData, setFormDta] = useState({
    firstName: "",
    lastName: "",
  });

  const [error, setError] = useState({
    firstName: "",
    lastName: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [guestFullName, setGuestFullName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDta((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      setError((prevError) => ({
        ...prevError,
        [name]: `${name} is required`,
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        [name]: "",
      }));
    }
  };
  const handleFocus = (e) => {
    const { name } = e.target;
    setError((prevError) => ({
      ...prevError,
      [name]: "",
    }));
  };

  const findGuestSitWithFullName = (fullName) => {
    allGuestsAndTable.map((table) => {
      const tableName = Object.keys(table)[0];
      const guests = table[tableName];
      const guestToLowerCase = guests.map((guest) =>
        guest.trim().toLowerCase()
      );

      // console.log("guestToLowerCase", guestToLowerCase);
      if (guestToLowerCase.includes(fullName)) {
        // console.log(
        //   "yes",
        //   `${tableName.slice(0, tableName.length - 1)} ${tableName.slice(-1)}`
        // );
        setIsAvailable(true);
        setMessage(
          `Hello ${fullName.toUpperCase()}, you are seated at ${tableName.slice(
            0,
            tableName.length - 1
          )} ${tableName.slice(-1)}`
        );

        return;
      }
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (formData.firstName === "" || formData.lastName === "") {
      setError({
        firstName: formData.firstName === "" ? "First name is required" : "",
        lastName: formData.lastName === "" ? "Last name is required" : "",
      });
      return;
    }

    let firstName = formData.firstName.trim().toLowerCase();
    let lastName = formData.lastName.trim().toLowerCase();

    let fullName = `${firstName} ${lastName}`;
    setGuestFullName(fullName.toUpperCase());
    findGuestSitWithFullName(fullName);
    setFormDta({ firstName: "", lastName: "" });
    setShowModal(!showModal);

    console.log("Form submitted successfully");
  };

  return (
    <>
      {showModal && (
        <div className="  ">
          <div className="fixed backdrop-blur-lg   top-0 left-0 w-full h-full   flex items-center justify-center">
            <div className="relative text-white mx-[1rem] rounded-2xl !bg-black text-center py-10 px-[5rem]">
              <h1 className="text-[1.2rem] font-bold">
                {isAvailable
                  ? message
                  : `Hello ${guestFullName}, you not seated at any table, please check the your again or contact the event organizer for more assistance .`}
              </h1>
              <p
                className="absolute cursor-pointer hover:text-[#000011] top-[.5rem] right-[1rem]"
                onClick={() => {
                  setShowModal(!showModal);
                  setMessage("");
                  setIsAvailable(false);
                }}
              >
                x
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-center h-screen ">
        <div className=" max-w-[50%] p-10 rounded-lg  shadow-2xl text-black">
          <div className="flex items-center justify-between gap-5">
            <div className="w-full  h-full">
              <div className="text-4xl text-center font-bold mb-4">
                <h1 className="text-[.8rem] sm:text-[green] md:text-[yellow] lg:text-[red]">Welcome !</h1>
                <p className="text-[.8rem] mt-[.5rem] font-light">
                  Kindly Enter you Name
                </p>
              </div>

              <div className="">
                <div className="w-full my-[1rem]">
                  <label className="text-[.8rem]" htmlFor="firstName">
                    First Name
                  </label>{" "}
                  <br></br>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    name="firstName"
                    placeholder="Enter your first name"
                    className="p-2 placeholder:text-[.8rem] rounded-lg border w-full border-gray-300 outline-none"
                  />
                  {error.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      First name is required
                    </p>
                  )}
                </div>

                <div className="w-full my-[1rem]">
                  <label className="text-[.8rem]" htmlFor="lastName">
                    Last Name
                  </label>{" "}
                  <br></br>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    name="lastName"
                    placeholder="Enter your last name"
                    className="p-2 rounded-lg placeholder:text-[.8rem]  border w-full border-gray-300 outline-none"
                  />
                  {error.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      Last name is required
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-[2rem]">
                <button
                  className="bg-blue-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
                  onClick={handleSubmitForm}
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="w-full h-full">
              {/* <img
                src="../assets/owambe.jpg"
                alt="people dancing image"
                className="w-full h-[fit] object-cover  mt-[2rem] rounded-lg"
              /> */}

              <Image 
                width={500}
                height={500}
                priority
                src="/owambe.jpg"
                alt="people dancing image"
                className="w-full h-[fit] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
