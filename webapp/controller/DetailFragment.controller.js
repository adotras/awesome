sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment"
], function(Controller, Fragment) {
	"use strict";

	return Controller.extend("aweawesome.controller.DetailFragment", {
		_oParent: null,
		onInit: function() {
			var oFragController = sap.ui.controller("aweawesome.controller.DetailFragment");
			oFragController.init(this);
			var oFragment = sap.ui.xmlfragment("aweawesome.view.Detail", oFragController);
			this.getView().byId("Detailpage").insertContent(oFragment);
			this._oFragContr = oFragController;
		},

		init: function(oParent) {
			this._oParent = oParent;
			this._oParent.getView();
		},

		_onProductMatched: function(oEvent) {
			var sProdPath = oEvent.getParameter("arguments").prodId;
			this.getView().bindElement({
				//				path: "/Products/" + sProdPath,
				path: "/" + sProdPath,
				model: "undefined"
			});
		}
	});
});