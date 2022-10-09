test("测试jest.fn调用", () => {
  let mockFn = jest.fn();
  let result = mockFn(1, 2, 3);

  // 断言mockFn返回值为undefined
  expect(result).toBeUndefined();
  // 断言mockFn被调用
  expect(mockFn).toBeCalled();
  // 断言mockFn被执行一次
  expect(mockFn).toBeCalledTimes(1);
  // 断言mockFn传入的参数为1 2 3
  expect(mockFn).toHaveBeenCalledWith(1, 2, 3);
});
