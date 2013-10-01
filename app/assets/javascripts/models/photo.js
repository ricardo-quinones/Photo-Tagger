;(function (root) {
  var PT = root.PT = (root.PT || {});

  var Photo = PT.Photo = function (data) {
    this.attributes = data;
  }

  Photo.all = [];

  Photo.prototype.create = function (callback) {
    var that = this;

    $.ajax({
      url: 'api/photos',
      type: "POST",
      data: { photo: that.attributes },
      dataType: "json",
      success: function (newAttrs) {
        _(that.attributes).extend(newAttrs);

        Photo.all.push(that);
        $('#content').find('input[type=text]').val("");
        Photo.trigger('add');

        callback();
      }
    })
  };

  Photo.prototype.get = function (attr) {
    return this.attributes[attr];
  };

  Photo.prototype.set = function (attr, value) {
    this.attributes[attr] = value;
  };

  Photo.fetchByUserId = function (userId, callback) {
    $.ajax({
      url: 'api/users/' + userId + '/photos',
      type: "GET",
      success: function (photoPojos) {
        var photos = _(photoPojos).map(function(photoPojo) { return new Photo(photoPojo); });

        Photo.all = Photo.all.concat(photos);

        if (callback) callback();
      }
    });
  };

  Photo.find = function (id) {
    return _(this.all).find(function (photo) { return photo.get('id') == id; });
  };

  Photo._events = {};

  Photo.on = function (eventName, callback) {
    var callbacks = this._events[eventName] || (this._events[eventName] = []);
    callbacks.push(callback);
  };

  Photo.trigger = function (eventName) {
    _(this._events[eventName]).each(function (callback) { callback(); });
  };
})(this);