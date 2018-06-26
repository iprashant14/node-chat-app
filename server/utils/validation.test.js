var expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString',() => {

  it('should reject non-string values',() => {
    var a = 1;
    var res = isRealString(a);
    expect(res).toBe(false);
  });

  it('should reject string with only spaces',() => {
    var a = "     ";
    var res = isRealString(a);
    expect(res).toBe(false);
  });


  it('should allow strings with non space characters',() => {
    var str = " Hiiii ";
    var res = isRealString(str);
    expect(res).toBe(true);
  });
});
