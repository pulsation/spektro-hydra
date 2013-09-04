define (["dojo/_base/declare", "./PouchStore", "dojo/topic"],
        function(declare, PouchStore, topic) {
          return declare(PouchStore, {
            pouchQuery:  {
              view: "data/by_sensor",
              options: {
                inclusive_end : false
              }
            },
            constructor: function (options) {
              var self = this;

              topic.subscribe("spektro/dbConfigured", function(db) {
                self.setTarget(db);
              });
            }
          }
        );
      }
    );

