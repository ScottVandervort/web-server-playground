var Promise = require("bluebird");

function BusinessLogicLayer (opts) {    

    if (!(this instanceof BusinessLogicLayer))
        return new BusinessLogicLayer(opts);
    
    this.config = opts.config;        
    this.database = opts.database;
}

BusinessLogicLayer.prototype.addEntry = function( userId, date, title, text ) {

    var self = this;

    return new Promise(function(resolve,reject){
        self.database.insert(userId, date, title, text)
                        .then(resolve)
                        .catch(reject);
    });
};

BusinessLogicLayer.prototype.getEntries = function( userId ) {

    var self = this;

    return new Promise(function(resolve,reject){    
        self.database.getEntries(userId)
                        .then(resolve)
                        .catch(reject);
    });
};

module.exports = BusinessLogicLayer;


