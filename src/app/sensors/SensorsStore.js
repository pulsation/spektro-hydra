define (["dojo/_base/declare", "dojo-pouchdb-store/PouchStore"],
        function(declare, SpektroPouchStore) {
          return declare(SpektroPouchStore, {
            pouchQuery:  {
              view: "selector/sensors",
              options: {
                group: true,
                reduce: true
              }
            },
          }
        );
      }
    );
