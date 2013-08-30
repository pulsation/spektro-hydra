/**
 * This file is a very simple example of a class declaration in Dojo. It defines the `app/Dialog` module as a new
 * class that extends a dijit Dialog and overrides the default title and content properties.
 */

define([ 'dojo/_base/declare', 'dijit/layout/BorderContainer' , 'dijit/layout/ContentPane' , './TopPane', './LeadingPane' ],
       function (declare, BorderContainer, ContentPane, TopPane, LeadingPane) {
	return declare(BorderContainer, {
    id: "borderContainer",
    postCreate: function () {
      this.inherited(arguments);

      this.addChild(new TopPane({id: "topPane", region: "top"}));
      this.addChild(new LeadingPane({id: "leadingPane", region: "leading"}));
      this.addChild(new ContentPane({region: "center", content: "[Canvas]Graph"}));
      this.addChild(new ContentPane({region: "bottom", content: "Spektro Hydra v0.0"}));
    }
	});
});
