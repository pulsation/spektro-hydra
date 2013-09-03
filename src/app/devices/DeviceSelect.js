define(['dojo/_base/declare', 'dijit/form/Select', "dojo/data/ObjectStore", "dojo/store/Observable", "./DevicesStore", "dojo/topic"],
  function(declare, Select, ObjectStore, Observable, DevicesStore, topic) {
    return declare(Select, {
      labelAttr: "model",
      postCreate: function () {
        this.inherited(arguments);

        // Data store
        var store = Observable(
          new DevicesStore({
//            target: "https://www.pulsation.eu:6984/alarmsandbox"
          })
        );
        this.setStore(
          new ObjectStore({
            objectStore: store
          })
        );

        this.on("change", function () {
          topic.publish("spektro/deviceId", this.get("value"));
        });
      },
    });
  });
