test('test1', () => {
  expect(2 + 2).toBe(4);
  expect(2 + 2).not.toBe(5)
})

test('test2', () => {
  expect(1).toBeTruthy()
  expect(0).toBeFalsy();
})

test('test3', () => {
  expect(5).toBeGreaterThan(3)
  expect(2).toBeLessThan(4)
})

test('test obj', () => {
  //对象不能用toBe toBe是完全相等
  expect({ name: 'weibin' }).toEqual({ name: 'weibin' })
})