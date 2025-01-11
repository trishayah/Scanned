import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

function UserProfile() {
  const location = useLocation();
  const profile = location.state?.data;
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const ProfileSection = ({ title, fields }) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((field, index) => (
          <div key={index}>
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              id={field.id}
              type={field.type}
              value={field.value}
              readOnly
              className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          type="button"
          onClick={handleBack}
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-lg">Back</span>
        </button>

        {profile ? (
          <div>
            <h1 className="text-3xl font-bold mb-8 text-center">User Profile</h1>
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
              <div className="flex flex-col items-center">
                <img
                  src={profile.image}
                  alt="Profile"
                  className="rounded-full w-64 h-64 object-cover border-4 border-white shadow-lg mb-4"
                />
                <h2 className="text-2xl font-semibold">{`${profile.firstName} ${profile.lastName}`}</h2>
              </div>
              <div>
                <ProfileSection
                  title="Personal Information"
                  fields={[
                    { id: "firstname", label: "First Name", type: "text", value: profile.firstName },
                    { id: "lastname", label: "Last Name", type: "text", value: profile.lastName },
                    { id: "middlename", label: "Middle Name", type: "text", value: profile.middleName },
                    { id: "birthdate", label: "Birthdate", type: "text", value: profile.dateOfBirth },
                    { id: "placeofbirth", label: "Place of Birth", type: "text", value: profile.placeOfBirth },
                    { id: "citizenship", label: "Citizenship", type: "text", value: profile.citizenship },
                    { id: "maritalstatus", label: "Marital Status", type: "text", value: profile.maritalStatus },
                    { id: "religion", label: "Religion", type: "text", value: profile.religion },
                    { id: "height", label: "Height", type: "number", value: profile.height },
                    { id: "weight", label: "Weight", type: "number", value: profile.weight },
                  ]}
                />
                <ProfileSection
                  title="Contact Information"
                  fields={[
                    { id: "address", label: "Address", type: "text", value: profile.address },
                    { id: "zipcode", label: "Zip Code", type: "text", value: profile.zipCode },
                    { id: "contact", label: "Phone Number", type: "tel", value: profile.contactNumber },
                    { id: "email", label: "Email Address", type: "email", value: profile.email },
                  ]}
                />
                <ProfileSection
                  title="Mother's Information"
                  fields={[
                    { id: "m-firstname", label: "First Name", type: "text", value: profile.MFname },
                    { id: "m-middlename", label: "Middle Name", type: "text", value: profile.MMname },
                    { id: "m-lastname", label: "Last Name", type: "text", value: profile.MLname },
                    { id: "m-dob", label: "Birthdate", type: "text", value: profile.MDOB },
                    { id: "m-pob", label: "Place of Birth", type: "text", value: profile.MPOB },
                    { id: "m-contact", label: "Phone Number", type: "tel", value: profile.MContact },
                    { id: "m-occupation", label: "Occupation", type: "text", value: profile.MOccupation },
                    { id: "m-email", label: "Email Address", type: "email", value: profile.MEmail },
                  ]}
                />
                <ProfileSection
                  title="Father's Information"
                  fields={[
                    { id: "f-firstname", label: "First Name", type: "text", value: profile.FFname },
                    { id: "f-middlename", label: "Middle Name", type: "text", value: profile.FMname },
                    { id: "f-lastname", label: "Last Name", type: "text", value: profile.FLname },
                    { id: "f-dob", label: "Birthdate", type: "text", value: profile.FDOB },
                    { id: "f-pob", label: "Place of Birth", type: "text", value: profile.FPOB },
                    { id: "f-contact", label: "Phone Number", type: "tel", value: profile.FContact },
                    { id: "f-occupation", label: "Occupation", type: "text", value: profile.FOccupation },
                    { id: "f-email", label: "Email Address", type: "email", value: profile.FEmail },
                  ]}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-center text-red-500">Profile data is not available.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;

