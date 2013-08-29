define(['dojo/_base/declare', 'dijit/registry',  "dijit/layout/ContentPane", './devices/DeviceSelect', 'dijit/form/Button'],
       function(declare, registry, ContentPane, DeviceSelect, Button) {
  return declare(ContentPane, {
    postCreate: function () {

      new DeviceSelect().placeAt(registry.byId(this.id).containerNode);
      new Button({label: "Sensors"}).placeAt(registry.byId(this.id).containerNode);
      new Button({label: "Location"}).placeAt(registry.byId(this.id).containerNode);
    }
  });
});
