/* 
 * Copyright (c) 2013, Philippe Sam-Long aka pulsation
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met: 
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer. 
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution. 
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

define([
    "dojo/_base/declare", "dojo/dom-construct", "dojo/ready", "dojo/_base/window",
    "dijit/_WidgetBase", "dojox/charting/Chart", "dojox/charting/plot2d/Lines", "dojox/charting/axis2d/Default", "dojo/topic",
    "./SensorDataStore"
], function(declare, domConstruct, ready, win, _WidgetBase, Chart, Lines, Default, topic, SensorDataStore){

    return declare("SensorChart", [_WidgetBase], {

      resize: function(box){
  	    this.sensorChart.resize.apply(this.sensorChart, arguments);
    	},

      deviceId: null,
      sensorId: null,
      dataStore: null,
      
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

      setDataStore: function(store) {
        this.dataStore = store;
      },

      postCreate: function () {
        var self = this;

        this.inherited(arguments);

        topic.subscribe("spektro/dbConfigured", function(db) {
          self.setDataStore(new SensorDataStore({target: db}));
        });
        
        var queryDb = function() {
          if ((this.deviceId !== null) && (this.sensorId !== null) && (self.dataStore !== null)) {
            return self.dataStore.query({}, {}, {
              options: {
                startkey: [self.deviceId, self.sensorId, null],
                endkey: [self.deviceId, self.sensorId + 1, null],
                inclusive_end : false
              }
            });
          }
        };

        var updateChart = function(docs) {
          var values = [[],[],[]];
          docs.forEach(function (element) {

            element.values.forEach(function(item, index) {
              values[index].push(item);
            });
          });
          self.sensorChart.updateSeries("Series 1", values[0]);
          self.sensorChart.updateSeries("Series 2", values[1]);
          self.sensorChart.updateSeries("Series 3", values[2]);
          self.sensorChart.render();
        };

        topic.subscribe("spektro/deviceId", function(deviceId) {
          console.log("Device id set to "+ deviceId);
          self.deviceId = deviceId;
          queryDb().then(updateChart);
        });

        topic.subscribe("spektro/sensorId", function(sensorId) {
          console.log("Sensor id set to "+ sensorId);
          self.sensorId = sensorId;
          queryDb().then(updateChart);
        });
      }
    });
 });
