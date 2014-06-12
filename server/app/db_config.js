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
      user.string('email', 100);
      user.string('firstName', 50);
      user.string('lastName', 50);
      user.string('password', 255);
      user.string('salt', 255);
      user.string('streetAddress', 100);
      user.string('city', 100);
      user.string('state', 2);
      user.string('zip', 10);             // string/int
      user.string('phone', 11);           // string/int
      user.string('signature', 255);      // what is this?
      user.integer('vet_id');
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('user_pet').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('user_pet', function (join) {
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
      pet.string('name', 50);
      pet.date('birthdate');
      pet.string('gender', 1);
      pet.string('breed', 255);
      pet.string('color', 50); 
      pet.integer('weight');
      pet.boolean('neuter');
      pet.string('microchip', 255);
      pet.string('profilePic', 255);
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
      vaccine.string('name', 100);
      vaccine.date('expiration');
      vaccine.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('pet_vaccine').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('pet_vaccine', function (join) {
      join.increments('id').primary();
      join.integer('pet_id');
      join.integer('vaccine_id');
      join.date('dateAdministered');
      join.date('dateExpired');
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

db.knex.schema.hasTable('pdfRecords').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('pdfRecords', function (pdf) {
      pdf.increments('id').primary();
      pdf.string('link', 255);
      pdf.integer('request_id');
      pdf.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('contactHistory').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('contactHistory', function (history) {
      history.increments('id').primary();
      history.integer('admin_id');
      history.string('type', 100);
      history.string('notes', 255);
      history.integer('request_id');
      history.string('vetContact_id');
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
      admin.string('email', 100);
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
      vet.string('practiceName', 255);
      vet.string('website', 255);
      vet.string('streetAddress', 100);
      vet.string('city', 100);
      vet.string('state', 2);               // added this 
      vet.string('zip', 10);                // string/int
      vet.string('phone', 11);              // string/int
      vet.string('contactMethod', 100);    // integer instead?
      vet.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('vetContact').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('vetContact', function (vetContact) {
      vetContact.increments('id').primary();
      vetContact.string('name', 50);
      vetContact.string('title', 255);
      vetContact.string('email', 100);
      vetContact.string('phone', 11);
      vetContact.integer('vet_id');
      vetContact.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

// revisit whether this is the best way to export 
module.exports = exports = db;

// module.exports = exports = function (app) {
//   app.set('db', db);
// };
