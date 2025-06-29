function decodeUplink(input) {
  var payload = {};
  
  switch (input.fPort) {
	
    case 10:
  
      payload.BAT_Voltage = (input.bytes[0] * 10 + 1500) / 1000;
      payload.Temperature = (((input.bytes[1] & 0x80 ? input.bytes[1] - 0x100 : input.bytes[1]) << 8) + input.bytes[2]) / 100;
      payload.Humidity = input.bytes[3]/2;
      payload.Door_Status = input.bytes[4] & 0x01 ? "open" : "close";
      payload.Door_Opened_Times = ((input.bytes[5] << 16) + (input.bytes[6] << 8) + input.bytes[7]);
    
    break;
  
    default:
    throw Error("unknown FPort");
  }
  
  return {
    data: payload,
  };
}