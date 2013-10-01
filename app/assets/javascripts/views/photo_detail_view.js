(function (root) {
  var PT = root.PT = (root.PT || {});

  var PhotoDetailView = PT.PhotoDetailView = function (photo) {
    this.$el = $('<div>');
    this.photo = photo;

    this.$el.on('click', 'a', this.back.bind(this));
    this.$el.on('click', '.photo', this.popTagSelectView.bind(this))
  };

  PhotoDetailView.prototype.back = function (event) {
    event.preventDefault();
    PT.showPhotosIndex();
  };

  PhotoDetailView.prototype.popTagSelectView = function (event) {
    event.preventDefault;
    $photo = $('.photo');
    $tag = $photo.find('.tag');

    $photo.addClass('is-tagged');

    var x = event.offsetX / $photo.outerWidth() * 100
    var y = event.offsetY / $photo.outerHeight() * 100

    $tag.css({
      left: x + "%",
      top: y + "%"
    });

    var tagSelectView = new PT.TagSelectView(this.photo, event);
    tagSelectView.render($tag)

    return this.$el;
  };

  PhotoDetailView.prototype.render = function () {
    this.$el.html(JST["photo_detail"]({ photo: this.photo }));
    return this.$el;
  };
})(this);