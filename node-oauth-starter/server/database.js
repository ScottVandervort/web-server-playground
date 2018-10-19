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
Database.prototype.insert = function ( userId, entryId, photoRepoId, date, title, text ) {

    var self = this;

    return new Promise (function(resolve,reject) {
            
        var collection = self.db.collection('documents');
            
        collection.insertMany([
            { "userId" : userId, "entryId" : entryId, "photoRepoId" : photoRepoId, "date" : date, "title" : title, "text" : text }], 
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

Database.prototype.getDetail = function ( id ) {};

Database.prototype.getRepoIdForPhoto = function ( userId, photoId ) {
    return new Promise (function(resolve,reject) {
        // TODO : Implement DB; Return Photo Repository Id for Photo Id.
        resolve(photoId);
    });
}

Database.prototype.getSummary = function ( date ) {};

Database.prototype.update = function ( id, userId, entryId, googlePhotoId, date, title, text ) {};

Database.prototype.delete = function ( id, userId ) {};
    
module.exports = Database;


