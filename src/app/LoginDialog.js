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
