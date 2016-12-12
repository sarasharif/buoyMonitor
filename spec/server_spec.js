const request = require("request");
const buoyMonitor = require("../server.js");
const base_url = "http://localhost:8000/";

describe('buoyMonitor', function() {

  describe('GET /', function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("shows an html file", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(body).toContain(`<title>buoyMonitor</title>`);
        done();
      });
    });
  });


  describe('GET /favBuoys', function() {
    it("returns status code 200", function(done) {
      request.get(base_url + 'api/favBuoys', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("shows an html file", function(done) {
      request.get(base_url + 'api/favBuoys', function(error, response, body) {
        expect(body).toContain('{"_id":');
        buoyMonitor.closeServer();
        done();
      });
    });
  });


});
