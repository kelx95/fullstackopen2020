

import express from 'express';
import patientService from '../services/patientService';
import { NewPatientEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAll());
});

router.post('/', (_req, res) => {
  const newPatientEntry = _req.body as NewPatientEntry;
  const addedPatient = patientService.addPatient(newPatientEntry);
  res.json(addedPatient);
});

export default router;