var Promise = require("bluebird");
var MongoClient = require('mongodb').MongoClient; 
var Assert = require('assert');

function Database (opts) {    

    var self = this;
      
    if (!(self instanceof Database))
        return new Database(opts);

    self.config = opts.config;
    self.db = null;
    self.isConnectedCallback = opts.isConnectedCallback;
    self.isConnected;

    // Use connect method to connect to the server
    MongoClient.connect(self.config.url, function(err, db) {        
        Assert.equal(null, err);                    
        self.db = db;    

        // Notify whoever instantiated the database that it is ready.
        if (self.isConnectedCallback !== 'undefined' && self.isConnectedCallback != null && typeof self.isConnectedCallback === 'function' )
            self.isConnectedCallback.call(self);
            
        console.log("Database is ready!");
    });

}

// Inserts a record and returns a database key.
Database.prototype.insert = function ( userId, date, title, text ) {

    var self = this;

    return new Promise (function(resolve,reject) {
            
        var collection = self.db.collection('documents');
            
        collection.insertMany([
            { "userId" : userId, "date" : date, "title" : title, "text" : text }], 
            function(err, result) {
                try {
                    Assert.equal(err, null);
                    Assert.equal(1, result.result.n);
                    Assert.equal(1, result.ops.length);              
                    resolve(result.insertedIds[0]);
                }
                catch (ex) {
                    reject(ex);                
                }                
            }
        );
    });    
};

// Returns all records for the user.
Database.prototype.getEntries = function ( userId ) {

    var self = this;

    return new Promise (function(resolve,reject) {
            
        var collection = self.db.collection('documents');

        var query = { "userId": userId };

        collection.find(query).toArray(function(err, result) {

            try {
                Assert.equal(err, null);                            

                let response = [];

                if (result.length > 0) {
                    response = result.map( function( entry ) {
                                            return  {   "date" : entry.date, 
                                                        "text" : entry.text, 
                                                        "title" : entry.title};
                    })                
                }

                resolve(response);
            }
            catch (ex) {
                reject(ex);                
            }  
        });
    });    
};

module.exports = Database;


