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

define([ 'dojo/_base/declare', 'dijit/layout/BorderContainer' , 'dijit/layout/ContentPane' , './TopPane', './LeadingPane', "./CenterPane", "./sensors/SensorChart", "./LoginDialog" ],
       function (declare, BorderContainer, ContentPane, TopPane, LeadingPane, CenterPane, SensorChart, LoginDialog) {
	return declare(BorderContainer, {
    id: "borderContainer",
    postCreate: function () {
      this.inherited(arguments);

      this.addChild(new TopPane({id: "topPane", region: "top"}));
      this.addChild(new LeadingPane({id: "leadingPane", region: "leading"}));
      this.addChild(new CenterPane({id: "centerPane", region: "center"}));
      this.addChild(new ContentPane({region: "bottom", content: "Spektro Hydra v0.0"}));

      loginDialog = new LoginDialog();
      loginDialog.show();
    }
	});
});
