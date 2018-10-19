var Promise = require("bluebird");

function BusinessLogicLayer (opts) {    

    if (!(this instanceof BusinessLogicLayer))
        return new BusinessLogicLayer(opts);
    
    this.config = opts.config;        
    this.database = opts.database;
}

// Entries ...
BusinessLogicLayer.prototype.addEntry = function( userId, date, title, text ) {

    var self = this;

    return new Promise(function(resolve,reject){
        self.database.insert(userId, date, title, text)
                        .then(resolve)
                        .catch(reject);
                })
};

BusinessLogicLayer.prototype.getEntries = function() {
    return new Promise(function(resolve,reject){
        resolve();
    })
};

module.exports = BusinessLogicLayer;


