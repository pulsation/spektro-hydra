define(['dojo/_base/declare', 'dijit/form/Select', "dojo/data/ObjectStore", "dojo/store/Observable", "./SensorsStore", "dojo/topic"],
  function(declare, Select, ObjectStore, Observable, SensorsStore, topic) {
    return declare(Select, {
      labelAttr: "name",
      postCreate: function () {
        var self = this;

        this.inherited(arguments);

        topic.subscribe("spektro/dbConfigured", function(db) {
          self.setStore(
            new ObjectStore({
              objectStore: Observable(new SensorsStore({target: db}))
            })
          );
        });

        this.on("change", function () {
          topic.publish("spektro/sensorId", this.get("value"));
        });
      }
    });
  });
