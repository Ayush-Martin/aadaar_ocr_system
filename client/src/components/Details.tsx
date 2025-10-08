import { FC } from "react";

interface IDetailsProps {
  loading: boolean;
  success: boolean;
  parsed: boolean;
  data?: {
    name: string;
    dob: string;
    gender: string;
    uid: string;
    address: string;
    pincode: number;
    age: number;
    maskedMobileNumber: string;
    isUidSame: boolean;
    age_band: string;
  };
}

const Details: FC<IDetailsProps> = ({ loading, parsed, success, data }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
      <h1 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
        Aadhaar Details
      </h1>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-600">
          <div className="w-8 h-8 border-4 border-[#432dd7]/30 border-t-[#432dd7] rounded-full animate-spin mb-3"></div>
          <p className="text-sm font-medium">Extracting Aadhaar details...</p>
        </div>
      ) : !parsed ? (
        <div className="text-gray-500 text-center py-10">
          <p className="text-sm">
            No data parsed yet. Upload Aadhaar images and click{" "}
            <b>Parse Aadhaar</b> to continue.
          </p>
        </div>
      ) : !success ? (
        <div className="text-center py-10">
          <p className="text-red-500 font-medium">
            ⚠️ Failed to parse Aadhaar. Please try again.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm animate-fadeIn">
          <div>
            <h2 className="text-text-secondary font-semibold">
              Aadhaar Number
            </h2>
            <p className="mt-1 text-text-primary border-b border-gray-300 pb-1 tracking-wider">
              {data?.uid || "N/A"}
            </p>
          </div>

          <div>
            <h2 className="text-text-secondary font-semibold">
              Name on Aadhaar
            </h2>
            <p className="mt-1 text-text-primary border-b border-gray-300 pb-1">
              {data?.name || "N/A"}
            </p>
          </div>

          <div>
            <h2 className="text-text-secondary font-semibold">Date of Birth</h2>
            <p className="mt-1 text-text-primary border-b border-gray-300 pb-1">
              {data?.dob || "N/A"}
            </p>
          </div>

          <div>
            <h2 className="text-text-secondary font-semibold">Gender</h2>
            <p className="mt-1 text-text-primary border-b border-gray-300 pb-1 uppercase">
              {data?.gender || "N/A"}
            </p>
          </div>

          <div className="sm:col-span-2">
            <h2 className="text-text-secondary font-semibold">Address</h2>
            <p className="mt-1 text-text-primary border-b border-gray-300 pb-1 leading-snug">
              {data?.address || "N/A"}
            </p>
          </div>

          <div>
            <h2 className="text-text-secondary font-semibold">Pincode</h2>
            <p className="mt-1 text-text-primary border-b border-gray-300 pb-1">
              {data?.pincode || "N/A"}
            </p>
          </div>

          <div>
            <h2 className="text-text-secondary font-semibold">Age</h2>
            <p className="mt-1 text-text-primary border-b border-gray-300 pb-1">
              {data?.age || "N/A"}
            </p>
          </div>

          <div>
            <h2 className="text-text-secondary font-semibold">
              Mobile (Masked)
            </h2>
            <p className="mt-1 text-text-primary border-b border-gray-300 pb-1">
              {data?.maskedMobileNumber || "N/A"}
            </p>
          </div>

          <div>
            <h2 className="text-text-secondary font-semibold">Age Band</h2>
            <p className="mt-1 text-text-primary border-b border-gray-300 pb-1">
              {data?.age_band || "N/A"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
