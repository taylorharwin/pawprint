angular.module('user.pages.controllers')
  .controller('MainCtrl', function ($scope) {
    console.log($scope);

    // @TODO retrieve properly though GET request
    $scope.pets = [
      {
        pet: {
          name: 'Apple',
          dob: '2010-03-19',
          gender: 'F',
          breed: 'maltese-poodle',
          color: 'cream',
          weight: '5lb',
          neuter: true,
          microchip: '1CWR4465HS424342EQ',
          profileUrl: 'http://cl.jroo.me/z3/Q/8/F/e/a.baa-Puppy-or-teddy-bear.jpg'
        },
        vet: {
          practice: 'Charlie loves Dogs',
          address: {
            line1: '123 Road',
            line2: 'Area',
            city: 'City',
            state: 'State',
            country: 'Country',
          },
          phone: '12345678910',
          email: 'vet@email.com',
          website: 'www.vet.com'
        },
        status: {
          vaccine: 'active',
          update: 'normal'
        },
        vaccine: [
          {
            name: 'vaccine1',
            date_administered: '2014-06-04',
            date_expired: '2016-10-09'
          },
          {
            name: 'vaccine2',
            date_administered: '2014-06-04',
            date_expired: '2016-10-09'
          },
          {
            name: 'vaccine3',
            date_administered: '2014-06-04',
            date_expired: '2016-10-09'
          }
        ]
      },
      {
        pet: {
          name: 'Bowser',
          dob: '2010-03-19',
          gender: 'F',
          breed: 'maltese-poodle',
          color: 'cream',
          weight: '5lb',
          neuter: true,
          microchip: '1CWR4465HS424342EQ',
          profileUrl: 'http://cl.jroo.me/z3/Q/8/F/e/a.baa-Puppy-or-teddy-bear.jpg'
        },
        vet: {
          practice: 'Charlie loves Dogs',
          address: {
            line1: '123 Road',
            line2: 'Area',
            city: 'City',
            state: 'State',
            country: 'Country',
          },
          phone: '12345678910',
          email: 'vet@email.com',
          website: 'www.vet.com'
        },
        status: {
          vaccine: 'active',
          update: 'normal'
        },
        vaccine: [
          {
            name: 'vaccine1',
            date_administered: '2014-06-04',
            date_expired: '2016-10-09'
          },
          {
            name: 'vaccine2',
            date_administered: '2014-06-04',
            date_expired: '2016-10-09'
          },
          {
            name: 'vaccine3',
            date_administered: '2014-06-04',
            date_expired: '2016-10-09'
          }
        ]
      },
      {
        pet: {
          name: 'Baci',
          dob: '2010-03-19',
          gender: 'F',
          breed: 'maltese-poodle',
          color: 'cream',
          weight: '5lb',
          neuter: true,
          microchip: '1CWR4465HS424342EQ',
          profileUrl: 'http://cl.jroo.me/z3/Q/8/F/e/a.baa-Puppy-or-teddy-bear.jpg'
        },
        vet: {
          practice: 'Charlie loves Dogs',
          address: {
            line1: '123 Road',
            line2: 'Area',
            city: 'City',
            state: 'State',
            country: 'Country',
          },
          phone: '12345678910',
          email: 'vet@email.com',
          website: 'www.vet.com'
        },
        status: {
          vaccine: 'active',
          update: 'normal'
        },
        vaccine: [
          {
            name: 'vaccine1',
            date_administered: '2014-06-04',
            date_expired: '2016-10-09'
          },
          {
            name: 'vaccine2',
            date_administered: '2014-06-04',
            date_expired: '2016-10-09'
          },
          {
            name: 'vaccine3',
            date_administered: '2014-06-04',
            date_expired: '2016-10-09'
          }
        ]
      },
    ];

    $scope.expand = function(pet) {
      pet.show = !pet.show;
    };

  });