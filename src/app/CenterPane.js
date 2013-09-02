define(['dojo/_base/declare', 'dijit/registry',  "dijit/layout/ContentPane", "./sensors/SensorChart" ],
       function(declare, registry, ContentPane, SensorChart) {
  return declare(ContentPane, {
    postCreate: function () {
      this.inherited(arguments);

      var sensorChart = new SensorChart();
      sensorChart.placeAt(registry.byId(this.id).containerNode);

    }
  });
});

