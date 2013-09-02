// the parser is only needed, if you want
// to instantiate the widget declaratively (in markup)
define([
    "dojo/_base/declare", "dojo/dom-construct", "dojo/ready", "dojo/_base/window",
    "dijit/_WidgetBase", "dojox/charting/Chart", "dojox/charting/plot2d/Lines", "dojox/charting/axis2d/Default", "dojo/topic"
], function(declare, domConstruct, ready, win, _WidgetBase, Chart, Lines, Default, topic){

    return declare("SensorChart", [_WidgetBase], {
        buildRendering: function(){
          // create the DOM for this widget
          this.domNode = domConstruct.create("div");

          this.sensorChart = new Chart(this.domNode);
          this.sensorChart.addPlot("default", {type: Lines});
          this.sensorChart.addAxis("x");
          this.sensorChart.addAxis("y", {vertical: true});
          this.sensorChart.addSeries("Series 1", [1, 2, 2, 3, 4, 5, 5, 7]);
          this.sensorChart.render();
        },

        postCreate: function () {
          this.inherited(arguments);

        topic.subscribe("deviceId", function(deviceId) {
          console.log("Device id set to "+ deviceId);
        });


        topic.subscribe("sensorId", function(sensorId) {
          console.log("Sensor id set to "+ sensorId);
        });

        }
    });

 });
