define(['dojo/_base/declare', 'dijit/registry', 'dijit/Dialog', 'dijit/form/TextBox', 'dijit/form/Button', 'dojo/topic', "dojox/layout/TableContainer", "http://download.pouchdb.com/pouchdb-nightly.js"],
       function (declare, registry, Dialog, TextBox, Button, topic, TableContainer) {
  return declare(Dialog, {
    title: "Authentication",
    style: "width: 300px",
    postCreate: function () {
      var self = this;

      this.inherited(arguments);

      var container = new TableContainer();
      container.placeAt(registry.byId(this.id).containerNode);

      var serverTextBox = new TextBox({
        name: "serverTextBox",
        id: "serverTextBox",
        placeHolder: "Server",
        label: "Server:"
      });
      serverTextBox.placeAt(registry.byId(container.id).containerNode);

      var dbTextBox = new TextBox({
        name: "dbTextBox",
        id: "dbTextBox",
        placeHolder: "Database name",
        label: "Database:"
      });
      dbTextBox.placeAt(registry.byId(container.id).containerNode);

      var loginTextBox = new TextBox({
        name: "loginTextBox",
        id: "loginTextBox",
        placeHolder: "Login",
        label: "Login:"
      });
      loginTextBox.placeAt(registry.byId(container.id).containerNode);

      var passwdTextBox = new TextBox({
        name: "passwdTextBox",
        id: "passwdTextBox",
        placeHolder: "Password",
        label: "Password:",
        type: "password"
      });
      passwdTextBox.placeAt(registry.byId(container.id).containerNode);

      var loginButton = new Button({
        name: "loginButton",
        id: "loginButton",
        label: "Login",
        onClick: function () {
          var dsn = "https://";

          dsn += registry.byId("serverTextBox").get('value');
          dsn += ":6984/";
          dsn += registry.byId("dbTextBox").get('value');
          topic.publish('spektro/dbConfigured', 
                        new PouchDB(dsn, {auth: {
                          username: registry.byId("loginTextBox").get('value'),
                          password: registry.byId("passwdTextBox").get('value')
                        }}));
          self.hide();
        }
      });
      loginButton.placeAt(registry.byId(this.id).containerNode);
    }
  });
});
