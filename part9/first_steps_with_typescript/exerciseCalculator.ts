interface ReviewResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
const calculateExercises = (
  exercises: number[],
  target: number
): ReviewResult => {
  const totalHours = exercises.reduce((total, hours) => total + hours, 0);
  const periodLength = exercises.length;
  const trainingDays = exercises.reduce(
    (total, day) => total + (day > 0 ? 1 : 0),
    0
  );
  const average = totalHours / periodLength;
  
  let rating;
  let ratingDescription;

  if (average > target) {
      rating = 3;
      ratingDescription = 'Great work!';
  } else if (target - average < 0.5) {
      console.log(target - average);
      rating = 2;
      ratingDescription = 'not too bad but could be better';
  } else {
      rating = 1;
      ratingDescription = 'Not bad, but you can do better';
  }

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseInputCalculateExercises = (
    targetRaw: string,
    exercisesRaw: string[]
  ) => {
    if (!targetRaw || exercisesRaw.length === 0) {
      throw "parameters missing";
    }
    const exercises = exercisesRaw.map((e) => parseFloat(e));
    const target = parseFloat(targetRaw);
    if (Number.isNaN(target) || exercises.some((e) => isNaN(e))) {
      throw "bad parameters";
    }
    return calculateExercises(exercises, target);
  };
  if (process.argv.length > 2) {
    const [, , target, ...exercises] = process.argv;
    console.log(parseInputCalculateExercises(target, exercises));
  }


