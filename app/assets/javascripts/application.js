// This is a manifest file that'll be compiled into application.js,
// which will include all the files listed below.
//
// Any JavaScript/Coffee file within this directory,
// lib/assets/javascripts, vendor/assets/javascripts, or
// vendor/assets/javascripts of plugins, if any, can be referenced
// here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll
// appear at the bottom of the the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE
// PROCESSED, ANY BLANK LINE SHOULD GO AFTER THE REQUIRES BELOW.

//= require jquery
//= require jquery_ujs
//= require underscore
//= require jquery.serializeJSON
//= require_tree ./models
//= require_tree ../templates
//= require_tree ./views
//= require_tree .



(function(root) {
  var PT = root.PT = (root.PT || {});
  PT.initialize = function() {
    PT.Photo.fetchByUserId(CURRENT_USER_ID, function () {
      PT.showPhotosIndex();
    });
  };

  PT.showPhotosIndex = function () {
    var $content = $('#content');
    $content.empty();

    photosListView = new PT.PhotosListView();
    photoFormView = new PT.PhotoFormView();

    $content.html(photosListView.render());
    $content.append(photoFormView.render());
  };

  PT.showPhotoDetail = function (photo) {
    var $content = $('#content');

    var photoDetailView = new PT.PhotoDetailView(photo);
    $content.html(photoDetailView.render());
  }
})(this);