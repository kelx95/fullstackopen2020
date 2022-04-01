import { Gender, NewPatientEntry, PatientFormFields } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const parseText = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error("Incorrect or missing text");
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

export const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing weather: " + gender);
  }
  return gender;
};

export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation } : PatientFormFields): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
      name: parseText(name),
      dateOfBirth: parseDate(dateOfBirth),
      ssn: parseText(ssn),
      gender: parseGender(gender),
      occupation: parseText(occupation)
    };
    return newEntry;
  };
