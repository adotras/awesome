sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter"
], function(Controller, Filter, FilterOperator, Sorter) {
	"use strict";

	return Controller.extend("aweawesome.controller.Main", {
		onInit: function() {
			var oModel = this.getOwnerComponent().getModel();

			this.oMyODataModel = oModel;

			oModel.read("/Products", {

				success: function(oData, response) {
					console.log(oData);
				},
				error: function(oError) {
					console.log("Ein Fehler ist aufgetreten!");
					console.log(oError);
				}
			});
		},
		onPress: function() {
			var oSomeCategory = this.oMyODataModel.getProperty("/Products");
			console.log("Ergebnis von getProperty()");
			console.log(oSomeCategory);

		}

	});
});