(function (root) {
  var PT = root.PT = (root.PT || {});

  var TagSelectView = PT.TagSelectView = function(photo, event) {
  this.$el = $('<div>');
    this.photo = photo;

    var imgPos = $(event.currentTarget).position();
    this.tagPos = {
      xPos: $('.tag').position().left,
      yPos: $('.tag').position().top
    };

    this.$el.css({
      position: 'absolute',
      left: this.tagPos.xPos,
      top: this.tagPos.yPos
    });

    $('.tag').on('click', '.tag-select', this.selectTagOption.bind(this));
  };

  TagSelectView.prototype.render = function ($tag) {
    $tag.html(JST['photo_tag_options']({ users: USERS }));
    // this.$el.append($tag);
    return $tag;
  };

  TagSelectView.prototype.selectTagOption = function (event) {
    event.preventDefault();
    // console.log("clicking away")
    var userId = $(event.currentTarget).attr('data-id')

    var $photoTagging = new PT.PhotoTagging({
      photo_id: this.photo.get('id'),
      user_id: userId,
      x_pos: this.tagPos.xPos,
      y_pos: this.tagPos.yPos
    });

    $photoTagging.create();
    $('.tag-option').remove();
  };
})(this);