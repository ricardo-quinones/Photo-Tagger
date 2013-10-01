(function (root) {
  var PT = root.PT = (root.PT || {});

  var PhotosListView = PT.PhotosListView = function() {
    this.$el = $('<div>');
    this.$el.on('click', 'a', this.showDetail.bind(this))

    PT.Photo.on('add', this.render.bind(this));
  };

  PhotosListView.prototype.showDetail = function (event) {
    event.preventDefault();

    var $currentTarget = $(event.currentTarget);
    var photo = PT.Photo.find($currentTarget.attr('data-id'));

    PT.showPhotoDetail(photo);
  };

  PhotosListView.prototype.render = function() {
    var $ul = $('<ul>');

    _(PT.Photo.all).each(function(photo) {
      var $li = $('<li>');
      var $a = $('<a>');
      $a.text(photo.get('title'));
      $a.attr('href', '#');
      $a.attr('data-id', photo.get('id'));

      $ul.append($li.html($a));
    });

    this.$el.html($ul);

    return this.$el;
  };
})(this);