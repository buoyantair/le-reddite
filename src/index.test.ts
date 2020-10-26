const add = (a: number, b: number) => a + b

describe('Test!', () => {
  it('should pass', () => {
    expect(add(20, 5)).toEqual(25)
  })
})
