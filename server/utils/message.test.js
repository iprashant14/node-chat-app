var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');

describe('generate a message',() => {
  it('should generate a correct message object ',() => {
    var from = "Prashant";
    var text = "Hiiii!!!!!!";
    var createdAt = new Date().getTime();
    var message = generateMessage(from,text);
    expect(typeof message.createdAt).toEqual('number');
    expect(message).toMatchObject({
      from,
      text
    });
  });
});

describe('generate a location message',() => {
  it('should generate a correct location message object ',() => {
    var from = "Prashant";
    var latitude = 15;
    var longitude = 5;
    var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    var message = generateLocationMessage(from,latitude,longitude);
    expect(typeof message.createdAt).toEqual('number');
    expect(message).toMatchObject({
      from,
      url
    });
  });
});
