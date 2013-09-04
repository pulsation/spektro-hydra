define (["dojo/_base/declare", "../data/SpektroPouchStore"],
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
