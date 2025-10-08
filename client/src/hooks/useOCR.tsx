import appApi from "@/config/axios";
import { IApiResponseError, IResponse } from "@/types/responseType";
import { errorPopup } from "@/utils/popup";
import { useState } from "react";

const useOCR = () => {
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [response, setResponse] = useState<IResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const uploadImage = (image: File, type: "front" | "back") => {
    if (type === "front") {
      setFrontImage(image);
    } else {
      setBackImage(image);
    }
  };

  const submit = async () => {
    if (!frontImage || !backImage) {
      errorPopup("Upload both front and back images to parse data");
      return;
    }

    setLoading(true);

    try {
      const res = await appApi.get("/parse");
      if (!res) return;
      setResponse(res.data);
    } catch (err) {
      console.log(err);
      const apiError = err as IApiResponseError;
      errorPopup(apiError?.response?.data?.error || "Some error Occurred");
      setResponse(apiError.response.data);
    } finally {
      setLoading(false);
    }
  };

  return { uploadImage, frontImage, backImage, response, loading, submit };
};

export default useOCR;
