declare function baseSuccessfulResponseAssertion(res: data): void;
declare type MockType<T> = {
  [P in keyof T]?: jest.Mock;
};
