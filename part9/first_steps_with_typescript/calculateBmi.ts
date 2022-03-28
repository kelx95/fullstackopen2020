interface HeightAndWeight {
  weight: number, 
  height: number
}
interface Query {
  weight?: number;
  height?: number;
}
interface BmiResult {  
  weight: number;
  height: number;
  bmi: string;
}
interface ErrorObject {
  error: string;
}

const calculateBmi = (height: number, weight: number): string => {
  const bmiResult: number = weight / Math.pow(height / 100, 2);
  if (bmiResult < 16) {
    return "Underweight (Severe thinness)";
  } else if (bmiResult < 16.9) {
    return "Underweight (Moderate thinness)";
  } else if (bmiResult < 18.4) {
    return "Underweight (Mild thinness)";
  } else if (bmiResult < 24.9) {
    return "Normal (healthy weight)";
  } else if (bmiResult < 29.9) {
    return "Overweight (Pre-obese)";
  } else if (bmiResult < 34.9) {
    return "Obese (Class I)";
  } else if (bmiResult < 39.9) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};

const parseAndCalculateBmi = (args: Array<string>) => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    const height = parseFloat(args[2]);
    const weight = parseFloat(args[3]);
    return calculateBmi(height, weight);
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

if (process.argv.length > 2) {
  console.log(parseAndCalculateBmi(process.argv));
}

const parseRequestQuery = (query: Query): HeightAndWeight => {
  const weight = query.weight;
  const height = query.height;
  if (!weight || !height || isNaN(weight) || isNaN(height)) {
    throw new Error("malformatted parameters");
  }
  return {
    weight: Number(weight),
    height: Number(height),
  };
};

export const bmiCalculator = (query: Query): BmiResult | ErrorObject => {
  try {
    const { weight, height } = parseRequestQuery(query);
    const bmi = calculateBmi(height, weight);
    return {
      weight,
      height: height,
      bmi,
    };
  } catch (err) {
    const errorMessage = (err as Error).message;
    return {
      error: errorMessage,
    };
  }
};

