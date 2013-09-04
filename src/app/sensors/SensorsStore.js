define (["dojo/_base/declare", "../data/PouchStore"],
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
