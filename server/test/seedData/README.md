NOTE: You need to build the directory to be specific to your computer where dirname is the directory pawprint is found.

Copy and paste the following lines into psql to initialize the test data.

copy "pet_vaccine" from 'dirname/pawprint/server/test/seedData/pet_vaccine.csv' delimiters ',' csv;
copy "pet" from 'dirname/pawprint/server/test/seedData/pet.csv' delimiters ',' csv;
copy "user_pet" from 'dirname/pawprint/server/test/seedData/user_pet.csv' delimiters ',' csv;
copy "user" from 'dirname/pawprint/server/test/seedData/user.csv' delimiters ',' csv;
copy "request" from 'dirname/pawprint/server/test/seedData/request.csv' delimiters ',' csv;
copy "vaccine" from 'dirname/pawprint/server/test/seedData/vaccine.csv' delimiters ',' csv;
copy "vet" from 'dirname/pawprint/server/test/seedData/vet.csv' delimiters ',' csv;



