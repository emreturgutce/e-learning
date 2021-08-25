declare function successCaseBaseAssertion(res: any): void;
declare function errorCaseAssertion(res: any): void;
declare function createTestUser(createUserDto: any): any;
declare type MockType<T> = {
  [P in keyof T]?: jest.Mock;
};
