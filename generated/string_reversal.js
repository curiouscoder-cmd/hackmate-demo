/**
 * Reverses a given string.
 *
 * @param {string} str The string to reverse.
 * @returns {string} The reversed string.  Returns an empty string if the input is null, undefined, or empty.
 * @throws {Error} If the input is not a string.
 */
function reverseString(str) {
  // Error handling for invalid input types
  if (typeof str !== 'string') {
    throw new Error('Invalid input: Input must be a string.');
  }

  // Handle null, undefined, and empty string cases
  if (str === null || str === undefined || str.length === 0) {
    return '';
  }

  // Efficient string reversal using built-in methods
  return str.split('').reverse().join('');
}


// Example usage (add more robust testing in a production environment)
try {
  console.log(reverseString("hello")); // Output: olleh
  console.log(reverseString("")); // Output: ""
  console.log(reverseString(null)); // Output: ""
  console.log(reverseString(undefined)); // Output: ""
  console.log(reverseString(123)); // Throws an error
} catch (error) {
  console.error(error.message);
}