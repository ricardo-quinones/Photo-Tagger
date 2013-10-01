(function (root) {
  var PT = root.PT = (root.PT || {});

  var PhotoFormView = PT.PhotoFormView = function () {
    this.$el = $('<div>')
    this.$el.on("submit", "form", this.submit.bind(this));
  };

  PhotoFormView.prototype.render = function () {
    this.$el.html(JST["photo_form"]());

    return this.$el;
  };

  PhotoFormView.prototype.submit = function (event) {
    event.preventDefault();

    var formData = $(event.currentTarget).serializeJSON();
    var photo = new PT.Photo(formData.photo);

    photo.create(function () {
      console.log("Photo saved!!");
    });
  };
})(this);