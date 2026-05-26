const mongoose = require('mongoose');
const dns = require('dns');

// Temporary: set public DNS servers to ensure SRV resolution works in this environment.
// Remove or adjust this if your system DNS is fixed or you prefer not to override system DNS.
try{
    dns.setServers(['8.8.8.8','8.8.4.4']);
    console.log('Using DNS servers:', dns.getServers());
}catch(e){
    // ignore if setServers is not allowed
}

function connectToDB(){
    const uri = process.env.MONGO_URI ? process.env.MONGO_URI.trim() : '';
    if(!uri){
        console.log('MONGO_URI is not set or empty');
        return;
    }
    console.log('Connecting to MongoDB...');
    mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB:', err);
    });
}

module.exports = connectToDB;
