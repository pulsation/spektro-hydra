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

define(['dojo/_base/declare', 'dijit/form/Select', "dojo/data/ObjectStore", "dojo/store/Observable", "./SensorsStore", "dojo/topic"],
  function(declare, Select, ObjectStore, Observable, SensorsStore, topic) {
    return declare(Select, {
      labelAttr: "name",
      postCreate: function () {
        var self = this;

        this.database = null;

        this.inherited(arguments);
        
        topic.subscribe("spektro/dbConfigured", function(db) {
          this.database = db;
        });

        topic.subscribe("spektro/deviceId", function(deviceId) {
          self.setStore(
            new ObjectStore({
              objectStore: Observable(new SensorsStore({
                target: this.database,
                pouchQuery:  {
                  view: "selector/sensors",
                  options: {
                    inclusive_end : false,
                    group: true,
                    reduce: true,
                    startkey: [deviceId, null],
                    endkey: [deviceId + 1, null]
                    
                  }
                }

              }))
            })
          );
        });

        this.on("change", function () {
          topic.publish("spektro/sensorId", this.get("value"));
        });

        this.on("setStore", function () {
          topic.publish("spektro/sensorId", this.get("value"));
        });

      }
    });
  });
