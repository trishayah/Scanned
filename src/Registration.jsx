import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const InputField = ({ label, name, type = "text", placeholder, required }) => (
  <div>
    <label className="block text-black font-semibold font-poppins mb-2" htmlFor={name}>
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-md font poppins text-black"
    />
  </div>
);

const Section = ({ title, children }) => (
  <div>
    <div className="relative mb-6 pb-3 border-b-2 border-teal-600">
      <h2 className="text-2xl font-bold font-poppins text-black">{title}</h2>
    </div>
    <p className="text-sm text-black-600 mb-5 font-poppins">Provide the necessary details needed below, type 'N/A' if not applicable.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-poppins">{children}</div>
  </div>
);

const Registration = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
  
    // Log the data being passed to ensure it's correct
    console.log("Form Data being passed to Capture:", formData);
  
    // Pass data to the next page
    navigate('/capture', { state: { users: formData } });
  };
  
  const personalFields = [
    { label: "First Name", name: "firstName", required: true },
    { label: "Middle Name", name: "middleName" },
    { label: "Last Name", name: "lastName", required: true },
    { label: "Date of Birth", name: "dateOfBirth", type: "date", required: true },
    { label: "Place of Birth", name: "placeOfBirth", required: true },
    { label: "Contact Number", name: "contactNumber", type: "tel", required: true },
    { label: "Email Address", name: "email", type: "email" },
    { label: "Sex", name: "sex", type: "select", options: ["Male", "Female", "Other"] },
    { label: "Marital Status", name: "maritalStatus", type: "select", options: ["Single", "Married", "Widowed"] },
    { label: "Religion", name: "religion", required: true },
    { label: "Citizenship", name: "citizenship", required: true },
    { label: "Height", name: "height", required: true },
    { label: "Weight", name: "weight", required: true },
    { label: "Address", name: "address", required: true },
    { label: "Zip Code", name: "zipCode", required: true },
  ];

  const renderFields = (fields) =>
    fields.map(({ label, name, type = "text", required, options }) =>
      type === "select" ? (
        <div key={name}>
          <label className="block text-black-700 font-semibold mb-2 font-poppins" htmlFor={name}>
            {label}
          </label>
          <select
            id={name}
            name={name}
            className="w-full px-3 py-2 border border-gray-300 rounded-md font-poppins"
          >
            <option value="" disabled>
              Select {label}
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <InputField key={name} label={label} name={name} type={type} required={required} />
      )
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl p-8 space-y-10">
        <Section title="Personal Information">
          {renderFields(personalFields)}
        </Section>
        <Section title="Mother's Information">
          {renderFields([
            { label: "First Name", name: "MFname", required: true },
            { label: "Middle Name", name: "MMname" },
            { label: "Last Name", name: "MLname", required: true },
            { label: "Date of Birth", name: "MDOB", type: "date", required: true },
            { label: "Place of Birth", name: "MPOB", required: true },
            { label: "Occupation", name: "MOccupation", required: true },
            { label: "Contact Number", name: "MContact", type: "tel", required: true },
            { label: "Email Address", name: "MEmail", type: "email" },
          ])}
        </Section>
        <Section title="Father's Information">
          {renderFields([
            { label: "First Name", name: "FFname", required: true },
            { label: "Middle Name", name: "FMname" },
            { label: "Last Name", name: "FLname", required: true },
            { label: "Date of Birth", name: "FDOB", type: "date", required: true },
            { label: "Place of Birth", name: "FPOB", required: true },
            { label: "Occupation", name: "FOccupation" },
            { label: "Contact Number", name: "FContact", type: "tel", required: true },
            { label: "Email Address", name: "FEmail", type: "email" },
          ])}
        </Section>
        <div className="flex justify-end">
          <button type="submit" className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-md font-poppins">
            <span>Next</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
