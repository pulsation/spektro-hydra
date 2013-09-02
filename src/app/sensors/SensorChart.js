// the parser is only needed, if you want
// to instantiate the widget declaratively (in markup)
define([
    "dojo/_base/declare", "dojo/dom-construct", "dojo/ready", "dojo/_base/window",
    "dijit/_WidgetBase", "dojox/charting/Chart", "dojox/charting/plot2d/Lines", "dojox/charting/axis2d/Default", "dojo/topic",
    "./SensorDataStore", "dojo/store/Observable"
], function(declare, domConstruct, ready, win, _WidgetBase, Chart, Lines, Default, topic, SensorDataStore, Observable){

    return declare("SensorChart", [_WidgetBase], {
        buildRendering: function(){
          // create the DOM for this widget
          this.domNode = domConstruct.create("div");

          this.sensorChart = new Chart(this.domNode);
          this.sensorChart.addPlot("default", {type: Lines});
          this.sensorChart.addAxis("x");
          this.sensorChart.addAxis("y", {vertical: true});
          this.sensorChart.addSeries("Series 1", [], {stroke: {color: "blue"}});
          this.sensorChart.addSeries("Series 2", [], {stroke: {color: "green"}});
          this.sensorChart.addSeries("Series 3", [], {stroke: {color: "purple"}});
          this.sensorChart.render();
        },

        postCreate: function () {
          var self = this;

          this.inherited(arguments);

          var store = new SensorDataStore({
            target: "https://www.pulsation.eu:6984/alarmsandbox"
          });

          var updateChart = function(docs) {
            var values = [[],[],[]];
            docs.forEach(function (element) {
              values[0].push(element.values[0]);
              if (element.values[1]) {
                values[1].push(element.values[1]);
              }
              if (element.values[2]) {
                values[2].push(element.values[2]);
              }
            });
            self.sensorChart.updateSeries("Series 1", values[0]);
            self.sensorChart.updateSeries("Series 2", values[1]);
            self.sensorChart.updateSeries("Series 3", values[2]);
            self.sensorChart.render();
          };

          topic.subscribe("deviceId", function(deviceId) {
            console.log("Device id set to "+ deviceId);
            store.query({}).then(updateChart);
          });

          topic.subscribe("sensorId", function(sensorId) {
            console.log("Sensor id set to "+ sensorId);
            store.query({}).then(updateChart);
          });
        }
    });
 });
