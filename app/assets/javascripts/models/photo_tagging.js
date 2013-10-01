;(function (root) {
  var PT = root.PT = (root.PT || {});

  var PhotoTagging = PT.PhotoTagging = function (data) {
    this.attributes = data;
  }

  PhotoTagging.all = [];

  PhotoTagging.prototype.create = function (callback) {
    var that = this;

    $.ajax({
      url: 'api/photo_taggings',
      type: "POST",
      data: { photo_tagging: that.attributes },
      dataType: "json",
      success: function (newAttrs) {
        _(that.attributes).extend(newAttrs);

        PhotoTagging.all.push(that);
        $('#content').find('input[type=text]').val("");
        // PhotoTagging.trigger('add');

        if (callback) callback();
      }
    })
  };

  PhotoTagging.prototype.get = function (attr) {
    return this.attributes[attr];
  };

  PhotoTagging.prototype.set = function (attr, value) {
    this.attributes[attr] = value;
  };

  PhotoTagging.fetchByPhotoId = function (photoId, callback) {
    $.ajax({
      url: 'api/photos/' + photoId + '/photo_taggings',
      type: "GET",
      success: function (tagsdata) {
        var photoTags = _(tagsdata).map(function(tagdata) { return new PhotoTagging(tagdata); });

        PhotoTagging.all = PhotoTagging.all.concat(photoTags);

        callback();
      }
    });
  };

  PhotoTagging.find = function (id) {
    return _(this.all).find(function (photoTag) { return photoTag.get('id') == id; });
  };

  PhotoTagging._events = {};

  PhotoTagging.on = function (eventName, callback) {
    var callbacks = this._events[eventName] || (this._events[eventName] = []);
    callbacks.push(callback);
  };

  PhotoTagging.trigger = function (eventName) {
    _(this._events[eventName]).each(function (callback) { callback(); });
  };
})(this);