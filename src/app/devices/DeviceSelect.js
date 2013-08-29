define(['dojo/_base/declare', 'dijit/registry',  'dijit/form/Select', 'dojo/store/Memory', "dojo/data/ObjectStore"], 
  function(declare, registry, Select, Memory, ObjectStore) {
    return declare(Select, {
      postCreate: function () {
        this.inherited(arguments);
        var store = new Memory({
          data: [
            { label: "Über phone", id: "uber" },
            { label: "Terrible phone", id: "terrible"}
          ]
        });

        this.setStore( new ObjectStore({objectStore: store}));
      }
    });
  });
