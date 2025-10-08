import Image from "./components/Image";
import ParsedData from "./components/Details";
import Response from "./components/Response";
import useOCR from "./hooks/useOCR";

const App = () => {
  const { backImage, frontImage, loading, response, submit, uploadImage } =
    useOCR();

  return (
    <main className="min-h-screen bg-[#f6f6f6] flex flex-col">
      <header className="py-5 shadow-sm bg-white border-b border-gray-200">
        <h1 className="text-3xl text-text-primary text-center font-extrabold tracking-tight">
          Aadhaar OCR System
        </h1>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 overflow-auto">
        <aside className="lg:w-2/5 w-full bg-white border-r lg:border-r border-b lg:border-b-0 px-6 py-8 flex flex-col justify-between shadow-sm">
          <div className="space-y-6">
            <Image
              side="Front"
              changeImage={(img) => uploadImage(img, "front")}
              image={frontImage}
            />
            <Image
              side="Back"
              changeImage={(img) => uploadImage(img, "back")}
              image={backImage}
            />
          </div>

          <button
            className="w-full mt-8 py-3 bg-[#432dd7] hover:bg-[#3520b0] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-snappy"
            onClick={submit}
          >
            Parse Aadhaar
          </button>
        </aside>

        <section className="flex-1 px-6 lg:px-10 py-8 overflow-auto bg-[#f9fafb]">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-text-primary">
                Parsed Information
              </h2>
              <p className="text-gray-500 text-sm">
                Extracted Aadhaar data from uploaded images
              </p>
            </div>

            <ParsedData
              loading={loading}
              parsed={!!response}
              success={response?.success || false}
              data={response?.data}
            />

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                API Response
              </h2>
              <Response loading={loading} response={response || undefined} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default App;
