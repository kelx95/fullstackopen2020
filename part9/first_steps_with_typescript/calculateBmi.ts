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
//   console.log(calculateBmi(180, 74))
export const parseAndCalculateBmi = (args: Array<string>) => {
    console.log(args)
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    let height = parseFloat(args[2]);
    let weight = parseFloat(args[3]);
    return calculateBmi(height, weight);
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

console.log(parseAndCalculateBmi(process.argv))

