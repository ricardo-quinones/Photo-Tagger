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
  };

  TagSelectView.prototype.render = function ($tag) {
    $tag.html(JST['photo_tag_options']({ users: USERS }));
    return $tag;
  };
})(this);