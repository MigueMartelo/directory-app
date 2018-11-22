const mongoose = require('mongoose');

mongoose.connect('mongodb://admin-directory:directory2018@ds039737.mlab.com:39737/directory-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));