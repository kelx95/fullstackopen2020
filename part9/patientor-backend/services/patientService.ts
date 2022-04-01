import patients from "../data/patients";
import { NonSensitivePatientEntry, Patient, NewPatientEntry } from "../types";
import { v4 as uuidv4 } from 'uuid';

const getAll = (): NonSensitivePatientEntry[] => {
    return patients.map(({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const generatedID: string = uuidv4() as string;
    const newPatientEntry = {
      id: generatedID,
      ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
  };

export default {
    getAll,
    addPatient
};