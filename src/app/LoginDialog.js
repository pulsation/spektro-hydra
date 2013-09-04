define(['dojo/_base/declare', 'dijit/registry', 'dijit/Dialog', 'dijit/form/TextBox', 'dijit/form/Button', 'dojo/topic', "http://download.pouchdb.com/pouchdb-nightly.js"],
       function (declare, registry, Dialog, TextBox, Button, topic) {
  return declare(Dialog, {
    title: "Login",
    style: "width: 300px",
    postCreate: function () {
      var self = this;

      this.inherited(arguments);
      var serverTextBox = new TextBox({
        name: "serverTextBox",
        id: "serverTextBox",
        placeHolder: "Server"
      });
      serverTextBox.placeAt(registry.byId(this.id).containerNode);

      var dbTextBox = new TextBox({
        name: "dbTextBox",
        id: "dbTextBox",
        placeHolder: "Database"
      });
      dbTextBox.placeAt(registry.byId(this.id).containerNode);

      var loginTextBox = new TextBox({
        name: "loginTextBox",
        id: "loginTextBox",
        placeHolder: "Login"
      });
      loginTextBox.placeAt(registry.byId(this.id).containerNode);

      var passwdTextBox = new TextBox({
        name: "passwdTextBox",
        id: "passwdTextBox",
        placeHolder: "Password",
        type: "password"
      });
      passwdTextBox.placeAt(registry.byId(this.id).containerNode);

      var loginButton = new Button({
        name: "loginButton",
        id: "loginButton",
        label: "Login",
        onClick: function () {
          var dsn = "https://";

/*          dsn += registry.byId("loginTextBox").get('value');
          dsn += ":";
          dsn += registry.byId("passwdTextBox").get('value');
          dsn += "@";*/
          dsn += registry.byId("serverTextBox").get('value');
          dsn += ":6984/";
          dsn += registry.byId("dbTextBox").get('value');
          topic.publish('spektro/dbConfigured', 
                        new PouchDB(dsn, {auth: {
                          username: registry.byId("loginTextBox").get('value'),
                          password: registry.byId("passwdTextBox").get('value')
                        }}));
        }
      });
      loginButton.placeAt(registry.byId(this.id).containerNode);
    }
  });
});
