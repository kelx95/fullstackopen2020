import express from 'express';
import { bmiCalculator } from "./calculateBmi";
import { exerciseCalculator } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  return res.json(bmiCalculator(_req.query));
});


app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return res.json(exerciseCalculator(req.body));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});