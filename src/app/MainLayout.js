/**
 * This file is a very simple example of a class declaration in Dojo. It defines the `app/Dialog` module as a new
 * class that extends a dijit Dialog and overrides the default title and content properties.
 */

define([ 'dojo/_base/declare', 'dijit/layout/BorderContainer', "dijit/layout/ContentPane", "pouchdb/dist/pouchdb-nightly.js"], function (declare, BorderContainer, ContentPane, PouchDB) {
	return declare(BorderContainer, {
    id: "borderContainer",
    postCreate: function () {
      this.addChild(new ContentPane({region: "top", content: "[Dropdown]Device [Button]Sensors [Button]Location"}));
      this.addChild(new ContentPane({region: "leading", content: "[Dropdown]Sensor<br /> [Dropdown]Period"}));
      this.addChild(new ContentPane({region: "center", content: "[Canvas]Graph"}));
      this.addChild(new ContentPane({region: "bottom", content: "Spektro Hydra v0.0"}));
      var db = new Pouch("pouchtest");
    }
	});
});
