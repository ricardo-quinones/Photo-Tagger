;(function (root) {
  var PT = root.PT = (root.PT || {});

  var Photo = PT.Photo = function (data) {
    this.attributes = _.extend({}, data)
  }

  Photo.all = [];

  Photo.prototype.create = function (callback) {
    var that = this;

    $.ajax({
      url: that.get("action"),
      type: "POST",
      data: that.attributes,
      success: function (response) {
        _.extend(that, response);
        callback(that);
      }
    })
  };

  Photo.fetchByUserId = function (userId, callback) {
    var $that = $(this)
    $.ajax({
      url: 'api/users/' + userId + '/photos',
      type: "GET",
      success: function (photoPojos) {
        Photo.all.push(function() {
          return _.map(photoPojos), function(photoPojo) { callback(photoPojo) }
        })
      }
    });
  };
})(this);