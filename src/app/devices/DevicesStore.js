define (["dojo/_base/declare", "../data/SpektroPouchStore"],
        function(declare, SpektroPouchStore) {
          return declare(SpektroPouchStore, {
            pouchQuery:  { view: "selector/devices", options: { group: true, reduce: true } },
          }
        );
      }
    );
