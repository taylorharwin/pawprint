Pawprint
========


Pawprint provides pet owners and veterinarians with an online source of truth for pet medical records. Pawprint stores records from vets in a secure online database, letting pet owners fetch them at any time.

Pet medical records are a requirement for travel, boarding, and grooming, so the time savings of having a record on-hand are huge. Pawprint also notifies pet owners when a vaccination is nearing expiration and it's time to make a vet appointment. For more of our marketing and business information, please visit [www.getpawprint.com](www.getpawprint.com).

###Team

The Pawprint team consists of:

* Emily Dong: Product Manager
* Ben Lee: Front-end (user client)
* Taylor Harwin: Front-end (admin tools)
* Jonathan Huang: Server and Database administration

###Tech Stack

Our technical stack consists of a PostgreSQL database, an AngularJS front-end, and a Node/Express server. We refer to this as "The PANE stack". We chose this stack because we wanted to have a lightning-fast database that will scale, and because building a robust app necessitated a structured database schema for use by multiple client applications. At Pawprint's core is a RESTful API that provides distinct features for users and site administrators. We've built two apps on the Pawprint API:

1. A core app for customers which allows them to manage their pet and vet information
2. An admin CRM allowing site administrators to upload medical records, manage the global vaccine database, and correspond with users.

###Installation

Installing this repo requires forking it and cloning a local copy. Running "npm install" will install necessary dependencies for the server, and then it will automatically install Bower dependencies for the client. Note that there are two client applications --"admin" and "user". A client testing folder provides end-to-end testing in Jasmine-Karma, and a server testing framework provides full test coverage in Mocha. We chose to use two testing frameworks in order to explore test-driven development from different angles. You will also need to install Postgres on your machine. Instructions are included below:

###Postgres Installation

1. Install Postgres from Homebrew: "brew install postgresql"
2. Complete the Installation: In the brew text there will be some directions to finish the installation. In my case it was: 

3. Initialize a database (creates a db with your username): 
"createdb"

4. Test the install by running psql:
psql

5. Install Instrumentation:
psql postgres -c 'CREATE EXTENSION "adminpack";'

6. Create a local pawprint database:
(from psql)
CREATE Database pawprint;

7. Create superuser pawprint:
(from psql)
CREATE user pawprint with createdb createuser password  'INSERTPASSWORD'

(Note: You must contact a Pawprint Admin to receive this password. It is not posted on Github)

8. Easy start and stop of postgres server:
  
- Install Lunchy
  gem install lunchy
- To Start Postgres
  lunchy start postgres
- To Stop Postgres
  lunch stop postgres

Helpful commands: 
\q      - quit
\c dbname     - use database
\l      - show databases
\d      - show tables 
drop schema public cascade; create schema public; - drop all tables and re initialize publc schema


Thanks!

The Pawprint Team

