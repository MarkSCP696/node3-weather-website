const request = require("request");

const geocode = (address, callback) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURIComponent(address) +
      ".json?access_token=pk.eyJ1IjoibWFyY292YWxkbyIsImEiOiJja2c1OXQ5ZWcwc2o0MnBxbjZwbmJnaDZyIn0.P7pRHFWioMoC190t0azpQA&limit=1";
  
    request({ url, json: true }, (error, {body}) => {
      if (error) {
        callback("Connectivity issue", undefined);
      } else if (body.message || body.features.length === 0) {
        callback("Can not find the location", undefined);
      } else {
        const data = {
          lat: body.features[0].center[1],
          long: body.features[0].center[0],
          location : body.features[0].place_name
        };
        callback(undefined, data)
      }
    });
  };

  module.exports = geocode