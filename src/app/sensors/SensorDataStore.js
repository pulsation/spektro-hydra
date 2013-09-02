define (["dojo/_base/declare", "../data/PouchStore"],
        function(declare, PouchStore) {
          return declare(PouchStore, {
            pouchQuery:  {
              view: "data/by_sensor",
              options: {
                startkey: ["356216040203533",1,null],
                endkey: ["356216040203533",2,null]
              }
            },
          }
        );
      }
    );
