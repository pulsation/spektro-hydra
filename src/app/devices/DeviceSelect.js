define(['dojo/_base/declare', 'dijit/form/Select', "dojo/data/ObjectStore", "dojo/store/Observable", "./DevicesStore"],
  function(declare, Select, ObjectStore, Observable, DevicesStore) {
    return declare(Select, {
      labelAttr: "model",
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
            objectStore: store
          })
        );
      }
    });
  });
