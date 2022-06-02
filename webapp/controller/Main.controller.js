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
			oModel.read("/Categories", {
				success: function(oData, response) {
					console.log(oData);
				},
				error: function(oError) {
					console.log("Ein Fehler ist aufgetreten!")
					console.log(oError);
				}
			});
		},

		onTableSettings: function(oEvent) {
			// Open the Table Setting dialog 
			this._oDialog = sap.ui.xmlfragment("aweawesome.view.SettingsDialog", this);
			this._oDialog.open();
		},
		onConfirm: function(oEvent) {
			var oView = this.getView();
			var oTable = oView.byId("table0");
			var mParams = oEvent.getParameters();
			var oBinding = oTable.getBinding("items");
			// apply grouping 
			var aSorters = [];
			/*		if (mParams.groupItem) {
						var sPath = mParams.groupItem.getKey();
						var bDescending = mParams.groupDescending;
						var vGroup = function(oContext) {
							var name = oContext.getProperty("/Categories");
							return {
								key: name,
								text: name
							};
						};
						aSorters.push(new sap.ui.model.Sorter(sPath, bDescending, vGroup));
					}*/
			// apply sorter 
			var sPath = mParams.sortItem.getKey();
			var bDescending = mParams.sortDescending;
			aSorters.push(new sap.ui.model.Sorter(sPath, bDescending));
			oBinding.sort(aSorters);
			// apply filters 
			/*			var aFilters = [];
						for (var i = 0, l = mParams.filterItems.length; i < l; i++) {
							var oItem = mParams.filterItems[i];
							var aSplit = oItem.getKey().split("___");
							var sPath = aSplit[0];
							var vOperator = aSplit[1];
							var vValue1 = aSplit[2];
							var vValue2 = aSplit[3];
							var oFilter = new sap.ui.model.Filter(sPath, vOperator, vValue1, vValue2);
							aFilters.push(oFilter);
						}
						oBinding.filter(aFilters);*/
		},

		onItemPress: function(oEvent) {
			var oItem = oEvent.getParameter("listItem");
			var sPath = oItem.getBindingContext().getPath();
			var sPathIndex = sPath.substr(sPath.lastIndexOf("/") + 1);
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detailProduct", {
				prodId: sPathIndex
			});
		},

		onSelectionChange: function(oEvent) {
			var oItem = oEvent.getParameter("selectedItem");
			var sPath = oItem.getBindingContext().getPath();
			var oTable = this.getView().byId("table0");
			oTable.bindElement(sPath);
		}

	});
});