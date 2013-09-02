/**
 * Very simple dojo store for PouchDB.
 */
define(["dojo/store/util/QueryResults", "dojo/_base/declare", "dojo/_base/lang", "dojo/store/util/SimpleQueryEngine", "dojo/Deferred", "http://download.pouchdb.com/pouchdb-nightly.js"],
        function(QueryResults, declare, lang, SimpleQueryEngine, Deferred){
 
    //  Declare the initial store
    return declare(null, {
        idProperty: "id",
        queryEngine: SimpleQueryEngine,

        // Pouch database
        pouch: null,

        // Pouch query view and options
        pouchQuery: null,

        constructor: function(options){
            lang.mixin(this, options || {});
            this.setTarget(this.target);
            this.setPouchQuery(this.pouchQuery);
        },
        
        /**
         * Used to set a pouch database. Can either be a string, or a PouchDB instance.
         */
        setTarget: function(dsn) {
          if (dsn) {
            if (typeof dsn === "string") {
              this.pouch = new PouchDB(dsn);
            } else {
              this.pouch = dsn;
            }
          }
        },

        /**
         * Associate the store to a particular view.
         */
        setPouchQuery: function(query) {
          if (query) {
            this.pouchQuery = query;
          }
        },

        /**
         * This is used to map CouchDB's response to expected data.
         */
        mapResponse: function(response) {
          var data = Array();

          response.rows.forEach(
            function(item) {
              data.push(item.value);
            }
          );

          return data;
        },

        /**
         * Query documents. If a view is associated to the store, returns
         * the view result.
         */
        query: function(query, options){
          var deferred = new Deferred(),
              self = this,

              // Apply query engine on returned documents
              callback = function (err, response) {
                if (err) {
                  deferred.reject(err);
                } else {
                  deferred.resolve(
                    QueryResults(
                      self.queryEngine(query, options))(self.mapResponse(response)
                    )
                  );
                }
              };

          if (this.pouchQuery === null) {
            this.pouch.allDocs({include_docs: true}, callback);
          } else {
            data = this.pouch.query(this.pouchQuery.view, this.pouchQuery.options, callback);
          }
          return deferred;
        },

        setData: function(data){
          this.pouch.bulkDocs(data);
        },
        
        // Get one record by id.
        get: function(id) {
          var deferred = new Deferred();
          this.pouch.get(id, function (err, doc) {
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve(doc);
            }
          });
          return deferred;
        },

        // Get item identity.
        getIdentity: function(object){
          return object[this.idProperty];
        }

        // TODO: Regarding http://dojotoolkit.org/documentation/tutorials/1.9/creating_stores/ put, add and remove functions
        // are missing.
    });
});

