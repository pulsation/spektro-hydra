define(['dojo/_base/declare', 'dijit/registry',  "dijit/layout/ContentPane", './sensors/SensorSelect'],
       function(declare, registry, ContentPane, SensorSelect) {
  return declare(ContentPane, {
    postCreate: function () {

      new SensorSelect({}).placeAt(registry.byId(this.id).containerNode);
     // TODO: Period Dropdown
    }
  });
});
