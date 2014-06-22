var Request = require('../app/models/request.js'),
    Requests = require('../app/collections/requests.js'),
    Q    = require('q');

var deleteRequest = function(req, res) {
  var requestid = req.params.requestid;

  Request.forge({id : requestid}).fetch().then(function(request) {
    // TODO: verify
    request.attributes.status = 'canceled';
    request.save(request.attributes, {patch: true});
    res.send(200, request);
  });
};

module.exports = exports = {
  deleteRequest : deleteRequest
};
