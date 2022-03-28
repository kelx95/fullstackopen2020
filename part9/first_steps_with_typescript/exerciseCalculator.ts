interface ReviewResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Request {
  daily_exercises?: number[],
  target?: number
}

interface ErrorObject {
  error: string;
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
      rating = 2;
      ratingDescription = 'not too bad but could be better';
  } else {
      rating = 1;
      ratingDescription = 'bad';
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

const parseRequest = ( requestBody: Request )  => {
  const daily_exercises = requestBody?.daily_exercises??[];
  const target = requestBody?.target;

  if (!target || daily_exercises?.length === 0) {
    throw new Error("parameters missing");
  }
  if (isNaN(target) || daily_exercises.some((e) => {
    if(typeof e === "string") return true;
    return isNaN(e);
  })) {
    throw new Error("malformatted parameters");
  }
  return {
    daily_exercises,
    target
  };
};

export const exerciseCalculator = (request: Request): ReviewResult | ErrorObject => {
  try {
    const { daily_exercises, target } = parseRequest(request);
    return calculateExercises(daily_exercises, target);
  } catch (err) {
    const errorMessage = (err as Error).message;
    return {
      error: errorMessage,
    };
  }
};


