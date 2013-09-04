define (["dojo/_base/declare", "dojo-pouchdb-store/PouchStore"],
        function(declare, SpektroPouchStore) {
          return declare(SpektroPouchStore, {
            pouchQuery:  {
              view: "data/by_sensor",
              options: {
                inclusive_end : false
              }
            }
          }
        );
      }
    );
