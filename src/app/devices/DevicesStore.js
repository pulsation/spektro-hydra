define (["dojo/_base/declare", "../data/PouchStore"],
        function(declare, SpektroPouchStore) {
          return declare(SpektroPouchStore, {
            pouchQuery:  { view: "selector/devices", options: { group: true, reduce: true } },
          }
        );
      }
    );
