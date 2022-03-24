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
  
  let rating = 0;
  let ratingDescription = "";
  if (average === target) {
    ratingDescription = 'try more';
    rating = 1;
  } else if (average > 0.9 * target) {
    ratingDescription = 'not to bad but could be better';
    rating = 2;
  } else {
    ratingDescription = "try more";
    rating = 3;
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

const test = calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2)
console.log(test)