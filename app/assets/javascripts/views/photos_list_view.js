(function(root) {

  var PT = root.PT = (root.PT || {});

  var PhotosListView = PT.PhotosListView = function() {
    this.$el = $("<ul>");
  };

  PhotosListView.prototype.render = function(photos) {
    this.$el.empty();
    var $ul = this.$el

    _.each(photos, function(photo) {
      $ul.append("<li>", { value: photo.url });
    });

    this.$el.append($ul);

    return this.$el;
  };
})(this);