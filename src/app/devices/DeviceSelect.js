define(['dojo/_base/declare', 'dijit/registry',  'dijit/form/Select', 'dojo/store/Memory', "dojo/data/ObjectStore", "./Devices", "dojo/store/Observable"], 
  function(declare, registry, Select, Memory, ObjectStore, Devices, Observable) {
    return declare(Select, {
      postCreate: function () {
        this.inherited(arguments);
        var store = Observable(new Memory());
        this.setStore( new ObjectStore({objectStore: store}));
        Devices.populateStore(store);
      }
    });
  });
