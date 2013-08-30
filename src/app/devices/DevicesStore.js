define (["dojo/_base/declare", "../data/PouchStore"],
        function(declare, PouchStore) {
          return declare(PouchStore, {
            pouchQuery:  { view: "selector/devices", options: { group: true, reduce: true } },
          }
        );
      }
    );
