define(['dojo/_base/declare', 'dijit/registry',  "dijit/layout/ContentPane", './sensors/SensorSelect', 'dijit/form/Button'],
       function(declare, registry, ContentPane, SensorSelect, Button) {
  return declare(ContentPane, {
    postCreate: function () {

     new SensorSelect().placeAt(registry.byId(this.id).containerNode);
     // TODO: Period Dropdown
    }
  });
});
