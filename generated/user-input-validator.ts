/**
 * Validates user input to ensure it's a positive integer.
 * @param input The user input string.
 * @returns The validated positive integer, or null if validation fails.  Throws an error for invalid input types.
 */
function validatePositiveInteger(input: string): number | null {
  // Type checking: Throw error if input is not a string
  if (typeof input !== 'string') {
    throw new Error('Input must be a string.');
  }

  // Basic checks: empty string or contains non-digit characters
  if (input.trim() === "" || !/^\d+$/.test(input)) {
    return null; // Indicate invalid input without throwing an error for more graceful handling
  }

  const num = parseInt(input, 10);

  // Check for parsing errors and negative numbers.
  if (isNaN(num) || num < 0) {
    return null; 
  }

  return num;
}


// Example usage with error handling:
try {
  const userInput = "123";
  const validatedNumber = validatePositiveInteger(userInput);

  if (validatedNumber !== null) {
    console.log(`Validated number: ${validatedNumber}`);
  } else {
    console.error("Invalid input: Please enter a positive integer.");
  }

  const invalidInput = "-42";
  const validatedNumber2 = validatePositiveInteger(invalidInput);

  if (validatedNumber2 !== null) {
    console.log(`Validated number: ${validatedNumber2}`);
  } else {
    console.error("Invalid input: Please enter a positive integer.");
  }

  const invalidInput2 = "abc";
  const validatedNumber3 = validatePositiveInteger(invalidInput2);

  if (validatedNumber3 !== null) {
    console.log(`Validated number: ${validatedNumber3}`);
  } else {
    console.error("Invalid input: Please enter a positive integer.");
  }

  const invalidInputType = 123; //Int instead of string
  const validatedNumber4 = validatePositiveInteger(invalidInputType);

  if (validatedNumber4 !== null) {
    console.log(`Validated number: ${validatedNumber4}`);
  } else {
    console.error("Invalid input: Please enter a positive integer.");
  }

} catch (error) {
  console.error(`An error occurred: ${error.message}`);
}