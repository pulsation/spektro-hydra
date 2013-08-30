define (["dojo/_base/declare", "../data/PouchStore"],
        function(declare, PouchStore) {
          return declare(PouchStore, {
            pouchQuery:  { view: "selector/sensors", options: { group: true } },
          }
        );
      }
    );
