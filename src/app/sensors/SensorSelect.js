define(['dojo/_base/declare', 'dijit/form/Select', "dojo/data/ObjectStore", "dojo/store/Observable", "./SensorsStore"],
  function(declare, Select, ObjectStore, Observable, SensorsStore) {
    return declare(Select, {
      labelAttr: "name",
      postCreate: function () {
        this.inherited(arguments);

        // Data store
        var store = Observable(
          new SensorsStore({
            target: "https://www.pulsation.eu:6984/alarmsandbox"
          })
        );
        this.setStore(
          new ObjectStore({
            objectStore: store
          })
        );
      }
    });
  });
