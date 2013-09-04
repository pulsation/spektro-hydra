define(['dojo/_base/declare', 'dijit/form/Select', "dojo/data/ObjectStore", "dojo/store/Observable", "./DevicesStore", "dojo/topic"],
  function(declare, Select, ObjectStore, Observable, DevicesStore, topic) {
    return declare(Select, {
      labelAttr: "model",
      postCreate: function () {

        var self = this;

        this.inherited(arguments);

        topic.subscribe("spektro/dbConfigured", function(db) {
          self.setStore(
            new ObjectStore({
              objectStore: Observable(new DevicesStore({target: db}))
            })
          );
        });

        this.on("change", function () {
          topic.publish("spektro/deviceId", this.get("value"));
        });
      },
    });
  });
