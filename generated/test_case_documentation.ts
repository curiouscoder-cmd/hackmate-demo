/// <reference path="./types.d.ts" /> //Assuming types are defined in a separate file

/**
 * Manages test case documentation.
 */
class TestCaseDocumentation {
  private testCases: TestCase[];

  constructor() {
    this.testCases = [];
  }

  /**
   * Adds a new test case to the documentation.
   * @param testCase - The test case to add.
   * @throws Error if testCase is invalid.
   */
  addTestCase(testCase: TestCase): void {
    if (!testCase.id || !testCase.purpose || !testCase.expectedResult) {
      throw new Error("Invalid test case: ID, purpose, and expected result are required.");
    }
    this.testCases.push(testCase);
  }


  /**
   * Updates an existing test case.
   * @param testCase - The updated test case.  Must include a valid ID.
   * @throws Error if the test case with the given ID is not found.
   */
  updateTestCase(testCase: TestCase): void {
    const index = this.testCases.findIndex((tc) => tc.id === testCase.id);
    if (index === -1) {
      throw new Error(`Test case with ID ${testCase.id} not found.`);
    }
    this.testCases[index] = testCase;
  }

  /**
   * Retrieves a test case by its ID.
   * @param id - The ID of the test case to retrieve.
   * @returns The test case, or null if not found.
   */
  getTestCase(id: string): TestCase | null {
    return this.testCases.find((tc) => tc.id === id) || null;
  }

  /**
   * Retrieves all test cases.
   * @returns An array of all test cases.
   */
  getAllTestCases(): TestCase[] {
    return this.testCases;
  }

    /**
   * Deletes a test case by its ID.
   * @param id - The ID of the test case to delete.
   * @throws Error if the test case with the given ID is not found.
   */
  deleteTestCase(id: string): void {
    const index = this.testCases.findIndex((tc) => tc.id === id);
    if (index === -1) {
      throw new Error(`Test case with ID ${id} not found.`);
    }
    this.testCases.splice(index, 1);
  }
}


// Example usage
const doc = new TestCaseDocumentation();

const testCase1: TestCase = {
  id: 'test1',
  purpose: 'Verify addition functionality',
  expectedResult: 5,
  actualResult: 5,
  notes: "Passed successfully"
};

doc.addTestCase(testCase1);

const allTestCases = doc.getAllTestCases();
console.log(allTestCases);

//update
testCase1.actualResult = 6;
doc.updateTestCase(testCase1);
console.log(doc.getTestCase('test1'));

//delete
doc.deleteTestCase('test1');
console.log(doc.getAllTestCases());


export default TestCaseDocumentation;