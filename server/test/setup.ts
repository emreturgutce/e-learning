global.baseSuccessfulResponseAssertion = (res: any): void => {
  expect(res).toBeDefined();
  expect(res).toHaveProperty('message');
  expect(res).toHaveProperty('data');
};
