export enum OCRResponseMessages {
  //Success message
  AADHAAR_DETAILS_EXTRACTED = "Aadhaar details extracted successfully",

  //Error message
  IMAGE_NOT_ADDED = "Images are not added",
  TEXT_EXTRACTION_FAILED = "Failed to extract text from images",
  INVALID_AADHAAR_FRONT_IMAGE = "You have provided invalid aadhaar front image",
  INVALID_AADHAAR_BACK_IMAGE = "You have provided invalid aadhaar back image",
  UID_DONT_MATCH = "UID doesn't match",
}
