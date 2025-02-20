# Test Writing Prompts

## Context

We are writing unit tests for our project using the Jest framework. The project primarily uses JavaScript and follows a Test-Driven Development (TDD) approach.

## Response

1. **Test Structure**:
   - Each test file should be placed in the `__tests__` directory and should follow the naming convention `*.test.js`.
   - Use descriptive names for test cases to clearly indicate what is being tested.

2. **Writing Tests**:
   - Import the module or function to be tested at the beginning of the test file.
   - Use `describe` blocks to group related tests together.
   - Use `it` or `test` blocks to define individual test cases.
   - Use `expect` statements to define the expected outcomes.

3. **Mocking and Stubbing**:
   - Use Jest's built-in mocking and stubbing capabilities to mock external dependencies.
   - Ensure that mocks and stubs are properly reset or cleared after each test to avoid test pollution.

4. **Sample Test Case**:

   ```javascript
   // __tests__/example.test.js
   const { myFunction } = require('../src/myModule');

   describe('myFunction', () => {
       it('should return the correct value when input is valid', () => {
           const input = 'valid input';
           const expectedOutput = 'expected output';
           const result = myFunction(input);
           expect(result).toBe(expectedOutput);
       });

       it('should throw an error when input is invalid', () => {
           const input = 'invalid input';
           expect(() => myFunction(input)).toThrow('Invalid input error');
       });
   });
   ```

5. **Best Practices**:
   - Write tests that are independent and do not rely on the state or outcome of other tests.
   - Aim for high test coverage, but focus on meaningful tests that validate the core functionality.
   - Regularly run tests to ensure that the codebase remains stable and free from regressions.

6. **Running Tests**:
   - Use the command `npm test` to run all tests.
   - Use the command `npm test -- --coverage` to generate a test coverage report.

By following these instructions, you can ensure that tests are consistently written and maintained across the project.
