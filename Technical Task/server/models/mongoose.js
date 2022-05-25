const mongoose = require('mongoose');

// main().catch(err => console.log(err));

exports.MongooseConnect = async function main() {
    try {
        await mongoose.connect(process.env.DATABASE)
        console.log('Mongoose connected ')
    } catch (err) {
        console.log(err, 'mongoose error ')
    }
}


