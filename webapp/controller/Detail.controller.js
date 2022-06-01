sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("aweawesome.controller.Detail", {
		
		onInit: function() {
			var oRouter = this.getOwnerComponent().getRouter();
			var oRoute = oRouter.getRoute("detail");
			oRoute.attachPatternMatched(this._onProductMatched, this);
		},
		
		_onProductMatched: function(oEvent){
			var sProdPath = oEvent.getParameter("arguments").prodId;
			
			this.getView().bindElement({
				path: "/Products/" + sProdPath,
				model: "Default"
			});
		}


	});

});