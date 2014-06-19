NOTE: You need to build the directory to be specific to your computer where dirname is the directory pawprint is found.

Copy and paste the following lines into psql to initialize the test data.

copy "pet_vaccine" from '/Users/taylorharwin/Desktop/pawprint/server/test/seedData/pet_vaccine.csv' delimiters ',' csv;
copy "pet" from '/Users/taylorharwin/Desktop/pawprint/server/test/seedData/pet.csv' delimiters ',' csv;
copy "user_pet" from '/Users/taylorharwin/Desktop/pawprint/server/test/seedData/user_pet.csv' delimiters ',' csv;
copy "user" from '/Users/taylorharwin/Desktop/pawprint/server/test/seedData/user.csv' delimiters ',' csv;
copy "request" from '/Users/taylorharwin/Desktop/pawprint/server/test/seedData/request.csv' delimiters ',' csv;
copy "vaccine" from '/Users/taylorharwin/Desktop/pawprint/server/test/seedData/vaccine.csv' delimiters ',' csv;
copy "vet" from '/Users/taylorharwin/Desktop/pawprint/server/test/seedData/vet.csv' delimiters ',' csv;
copy "admin" from '/Users/taylorharwin/Desktop/pawprint/server/test/seedData/admin.csv' delimiters ',' csv;
copy "contactHistory" from '/Users/taylorharwin/Desktop/pawprint/server/test/seedData/contactHistory.csv' delimiters ',' csv;
copy "pdfRecord" from '/Users/taylorharwin/Desktop/pawprint/server/test/seedData/pdfRecord.csv' delimiters ',' csv;
copy "vetContact" from '/Users/taylorharwin/Desktop/pawprint/server/test/seedData/vetContact.csv' delimiters ',' csv;



