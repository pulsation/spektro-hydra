define (["dojo/_base/declare", "../data/PouchStore"],
        function(declare, PouchStore) {
          return declare(PouchStore, {
            pouchQuery:  {
              view: "data/by_sensor",
              options: {
                inclusive_end : false
              }
            },
          }
        );
      }
    );
