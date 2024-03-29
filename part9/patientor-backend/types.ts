export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}
export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;
export type NewPatientEntry = Omit<Patient, 'id'>;

export type PatientFormFields = { name : unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

export enum Gender {
    Male = 'male',
    Female = "female",
    Other = "other"
}