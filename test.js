import {pow, zip} from './example.js';

describe("pow", function() {

  it("2 raised to power 3 is 8", function() {
    assert.equal(pow(2, 3), 8);
  });

  it("3 raised to power 4 is 81", function() {
    assert.equal(pow(3, 4), 81);
  });

});

describe("zip", function() {

  it("zip two equally long arrays", function() {
    let arr1 = [1,2,3,4];
    let arr2 = ['a', 'b', 'c', 'd'];
    let expected = [[1, 'a'], [2, 'b'], [3, 'c'], [4, 'd']];

    assert.equal(zip(arr1, arr2), expected);
  })
});
