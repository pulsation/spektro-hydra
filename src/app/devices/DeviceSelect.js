define(['dojo/_base/declare', 'dijit/registry',  'dijit/form/Select'], 
  function(declare, registry, Select) {
    return declare(Select, {
      postCreate: function () {
        this.inherited(arguments);
        this.options = [
         { label: "Über phone", value: "uber" },
         { label: "Terrible phone", value: "terrible"}
        ];
      }
    });
  });
