define(['dojo/_base/declare', 'dijit/registry',  'dijit/form/Select', 'dojo/store/Memory', "dojo/data/ObjectStore", "dojo/store/Observable", "./DevicesStore"],
  function(declare, registry, Select, Memory, ObjectStore, Observable, DevicesStore) {
    return declare(Select, {
      postCreate: function () {
        this.inherited(arguments);

        // Data store
        var store = Observable(
          new DevicesStore({
            target: "https://www.pulsation.eu:6984/alarmsandbox"
          })
        );
        this.setStore(
          new ObjectStore({
            objectStore: store,
            labelProperty: "model"
          })
        );
      }
    });
  });
