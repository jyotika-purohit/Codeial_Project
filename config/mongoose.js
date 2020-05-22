const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Project_Codeial', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind('Error while connecting to the DB'));
db.once('open', function() {
  console.log("Connected to DB :: Mongoose");
});

module.exports=db;
