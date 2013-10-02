(function (root) {
  var PT = root.PT = (root.PT || {});

  var TagSelectView = PT.TagSelectView = function(photo, event) {
  this.$el = $('<div>').addClass('photo-tag');
    this.photo = photo;

    this.tagPos = {
      xPos: event.offsetX,
      yPos: event.offsetY
    };

    this.$el.css({
      position: 'absolute',
      left: event.pageX,
      top: event.pageY
    });

    this.$el.on('click', '.tag-select', this.selectTagOption.bind(this));
  };

  TagSelectView.prototype.render = function () {
    this.$el.html(JST['photo_tag_options']({ users: USERS }));
    return this.$el;
  };

  TagSelectView.prototype.selectTagOption = function (event) {
    event.preventDefault();
    var userId = $(event.currentTarget).attr('data-id')

    var $photoTagging = new PT.PhotoTagging({
      photo_id: this.photo.get('id'),
      user_id: userId,
      x_pos: this.tagPos.xPos,
      y_pos: this.tagPos.yPos
    });

    $photoTagging.create();
    this.$el.remove();
    $('.photo').addClass('is-tagged');
  };
})(this);