/**
 * Calculates the age in years based on the given date of birth.
 *
 * @param dob
 * @returns
 */
export const getAge = (dob: Date): number => {
  if (!(dob instanceof Date) || isNaN(dob.getTime())) {
    throw new Error("Invalid Date of Birth provided.");
  }

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
};
