/**
 * Validates an email address using a regular expression.
 *
 * @param {string | null | undefined} email The email address to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 * @throws {Error} If the input is not a string or is an empty string.  Throws an error if the email format is invalid.
 */
function validateEmail(email: string | null | undefined): boolean {
  // Error handling for null or undefined input
  if (email === null || email === undefined) {
    throw new Error("Email cannot be null or undefined.");
  }

  // Error handling for invalid input type
  if (typeof email !== 'string') {
    throw new Error("Invalid email type. Email must be a string.");
  }

  // Error handling for empty string
  if (email.trim() === "") {
    throw new Error("Email cannot be empty.");
  }

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate email using regex
  const isValid = emailRegex.test(email);

  //Explicitly return boolean
  return isValid;
}


// Example usage
try {
  console.log(validateEmail("test@example.com")); // true
  console.log(validateEmail("invalid-email")); // false - throws error because of invalid format.
  console.log(validateEmail(null)); // throws error - Email cannot be null or undefined
  console.log(validateEmail(123 as any)); // throws error - Invalid email type. Email must be a string.
  console.log(validateEmail("")); // throws error - Email cannot be empty.

} catch (error) {
  console.error("Error validating email:", error.message);
}