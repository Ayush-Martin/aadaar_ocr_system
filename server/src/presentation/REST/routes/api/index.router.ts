import { Router } from "express";
import { successResponse } from "../../../../shared/utils/responseCreator";
import ocrRouter from "./ocr.router";

const appRouter = Router();

appRouter.get("/", (_req, res) => {
  res.json(successResponse("api is working"));
});

appRouter.use("/ocr", ocrRouter);

// appRouter.get("/parse", (_req, res) => {
//   res.json(
//     successResponse("Aadhaar images parsed successfully.", {
//       name: "Prakash Gopichand Ralhod",
//       dob: "01/07/1974",
//       gender: "Male",
//       uid: "8538 7535 4900",
//       address:
//         "Ar& &- 3, Tar, 36a Fras No-14, Ward No-3, Ramnagar, U3, Arfaste Fg Faw, Déwasr, Deccan Collage Road, Near, Qor Ue, Aas, Qo, Heise, Balvikas Kendra, Yerwada, Pune, 411006",
//       pincode: "411006",
//       age: "",
//       maskedMobileNumber: "",
//       isUidSame: true,
//       age_band: "51-60",
//     }),
//   );
// });

export default appRouter;
