"use strict";

var knex        = require('knex'),
    bookshelf   = require('bookshelf'),
    morgan      = require('morgan'),
    bodyParser  = require('body-parser');

var knex = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'pawprint',
    password: 'password',
    database: 'pawprint',
    charset: 'utf8',
  }
});

var db = bookshelf(knex);

db.knex.schema.hasTable('user').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('user', function (user) {
      user.increments('id').primary();
      user.string('email', 255);
      user.string('first_name', 255);
      user.string('last_name', 255);
      user.string('password', 255);
      user.string('salt', 255);
      user.string('street_address', 255);
      user.string('city', 255);
      user.string('state', 2);
      user.string('zip', 10);             // string/int
      user.string('phone', 11);           // string/int
      user.string('signature', 255);      // what is this?
      user.integer('vet_id')
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('user-pet').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('user-pet', function (join) {
      join.increments('id').primary();
      join.integer('user_id');
      join.integer('pet_id');
      join.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('pet').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('pet', function (pet) {
      pet.increments('id').primary();
      pet.string('name', 255);
      pet.string('birthdate', 255);       // maybe store as int?
      pet.string('gender', 255);
      pet.string('breed', 255);
      pet.string('color', 255); 
      pet.integer('weight');
      pet.string('contact_method', 255);
      pet.boolean('neuter');              // to confirm
      pet.string('microchip', 255);       // confirm string
      pet.string('profile_pic', 255);
      pet.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('vaccine').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('vaccine', function (vaccine) {
      vaccine.increments('id').primary();
      vaccine.string('name', 255);
      vaccine.string('expiration', 255);    // sting?
      vaccine.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('pet-vaccine').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('pet-vaccine', function (join) {
      join.increments('id').primary();
      join.integer('pet_id');
      join.integer('join_id');
      join.string('date_administered', 255);
      join.string('date_expired', 255);
      join.integer('request_id');
      join.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('requests').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('requests', function (requests) {
      requests.increments('id').primary();
      requests.integer('user_id');
      requests.integer('pet_id');
      requests.integer('vet_id');
      requests.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('pdf_records').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('pdf_records', function (pdf) {
      pdf.increments('id').primary();
      pdf.string('link', 255);
      pdf.integer('request_id');
      pdf.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('contact_history').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('contact_history', function (history) {
      history.increments('id').primary();
      history.integer('admin_id');
      history.string('type', 255);
      history.string('notes', 255);
      history.integer('request_id');
      history.string('vet_contact', 255);
      history.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('admin').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('admin', function (admin) {
      admin.increments('id').primary();
      admin.string('email', 255);
      admin.string('password', 255);
      admin.string('salt', 255);
      admin.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('vet').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('vet', function (vet) {
      vet.increments('id').primary();
      vet.string('practice_name', 255);
      vet.string('website', 255);
      vet.string('street_address', 255);
      vet.string('city', 255);
      vet.string('state', 2);               // added this 
      vet.string('zip', 10);                // string/int
      vet.string('phone', 11);              // string/int
      vet.string('contact_method', 255);    // integer instead?
      vet.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('vet_contact').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('vet_contact', function (vetcontact) {
      vetcontact.increments('id').primary();
      vetcontact.string('name', 255);
      vetcontact.string('title', 255);
      vetcontact.string('email', 255);
      vetcontact.string('phone', 11);
      vetcontact.integer('vet_id');
      vetcontact.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

// revisit whether this is the best way to export 
module.exports = exports = function (app) {
  app.set('db', db);
};
