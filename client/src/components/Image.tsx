import { FC } from "react";

interface IImageProps {
  side: string;
  image: File | null;
  changeImage: (image: File) => void;
}

const Image: FC<IImageProps> = ({ side, image, changeImage }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) changeImage(file);
  };

  return (
    <div className="w-full max-w-md mx-auto p-5 bg-white rounded-2xl shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md">
      <h1 className="text-lg font-semibold text-text-primary mb-3">
        {side} Side
      </h1>

      <div className="flex justify-center">
        <div className="bg-gray-200 rounded-xl w-full max-w-[400px] h-[220px] sm:h-[200px] flex items-center justify-center border border-gray-300 overflow-hidden">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt={`${side} preview`}
              className="object-contain w-full h-full"
            />
          ) : (
            <span className="text-gray-500 text-sm font-medium">Preview</span>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <label className="mt-4 bg-[#432dd7] hover:bg-[#3520b0] text-white font-medium px-6 sm:px-8 py-2 rounded-lg cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md">
          Change Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
};

export default Image;
