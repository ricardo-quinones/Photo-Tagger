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

    $('.photo-tag').remove();
    $photo = $('.photo');

    var tagSelectView = new PT.TagSelectView(this.photo, event);

    return this.$el.append(tagSelectView.render());
  };

  PhotoDetailView.prototype.render = function () {
    this.$el.html(JST["photo_detail"]({ photo: this.photo }));
    return this.$el;
  };
})(this);