import ReactJson from "@microlink/react-json-view";
import { FC } from "react";

interface IResponseProps {
  response?: {
    message: string;
    success: boolean;
    data?: any;
  };
  loading: boolean;
}

const Response: FC<IResponseProps> = ({ response, loading }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
      <h1 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
        Response
      </h1>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex justify-center items-center min-h-[200px]">
        {loading ? (
          <div className="flex flex-col items-center gap-3 text-gray-600">
            <div className="w-8 h-8 border-4 border-[#432dd7]/30 border-t-[#432dd7] rounded-full animate-spin"></div>
            <p className="text-sm font-medium">Parsing Aadhaar...</p>
          </div>
        ) : response ? (
          <div className="w-full overflow-x-auto">
            <ReactJson
              src={response}
              name={false}
              theme="rjv-default"
              collapsed={false}
              displayDataTypes={false}
              enableClipboard={false}
              displayObjectSize={false}
            />
          </div>
        ) : (
          <div className="text-gray-500 text-center">
            <p className="text-sm">
              No response yet. Click <b>Parse Aadhaar</b> to begin.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Response;
