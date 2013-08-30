define (["dojo/_base/declare", "./PouchStore"],
        function(declare, PouchStore) {
          return declare(PouchStore, {
            pouchQuery:  { view: "selector/devices", options: { group: true } },
          }
        );
      }
    );
