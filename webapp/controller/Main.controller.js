sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter"
], function(Controller, Filter, FilterOperator, Sorter) {
	"use strict";

	return Controller.extend("aweawesome.controller.Main", {
		_oFragContr: null,
		onInit: function() {
			var oModel = this.getOwnerComponent().getModel();
			this.oMyODataModel = oModel;
			oModel.read("/Categories", {
				success: function(oData, response) {
					console.log(oData);
				},
				error: function(oError) {
					console.log("Ein Fehler ist aufgetreten!")
					console.log(oError);
				}
			});
			this.getView().setModel(oModel);

			if (!this._oFragContr) {
				var oFragController = sap.ui.controller("aweawesome.controller.ProdukteFragment");
				oFragController.init(this);
				var oFragment = sap.ui.xmlfragment("aweawesome.view.Produkte", this);
				this.getView().byId("Homepage").insertContent(oFragment);
				this._oFragContr = oFragController;
			}
		}
	});
});