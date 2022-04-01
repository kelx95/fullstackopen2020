

import express from 'express';
import patientService from '../services/patientService';
import { NewPatientEntry, Patient, PatientFormFields } from '../types';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAll());
});

router.post('/', (_req, res) => {
  try {
    const newPatientEntry: NewPatientEntry = toNewPatientEntry(_req.body as PatientFormFields);
    const addedPatient: Patient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);  
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;