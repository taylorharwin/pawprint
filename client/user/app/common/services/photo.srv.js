/*global filepicker, angular*/

angular.module('user.common.services')

  .service('PhotoService', function () {

    function setKey() {
      filepicker.setKey('ALxfusWSjSIe0LAl7W5mQz');
    }

    function processPhoto() {
      filepicker.pickAndStore({mimetype: 'image/*', folders: true},
      {location: 'S3'}, function (photo) {
        console.log(JSON.stringify(photo));
      });
    }
    this.setKey = setKey;
    this.processPhoto = processPhoto;
  });
