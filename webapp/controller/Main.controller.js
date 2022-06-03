sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
	"sap/ui/core/Fragment"
], function(Controller, Filter, FilterOperator, Sorter, Fragment) {
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
		onSelectionChange: function(oEvent) {
			var sFilterValue = oEvent.getSource("Combobox0").getProperty("value");
			var oFilter = new sap.ui.model.Filter("Category/Name",
				sap.ui.model.FilterOperator.EQ,
				sFilterValue);
			var oTable = this.getView().byId(Fragment.createId("frag1", "table0"));
			oTable.getBinding("items").filter([oFilter]);
		},

		onPressFilter: function(oEvent) {
			var oFilter = new sap.ui.model.Filter("ID",
				sap.ui.model.FilterOperator.GE, "0");
			var oTable = this.getView().byId(Fragment.createId("frag1", "table0"));
			oTable.getBinding("items").filter([oFilter]);
			this.getView().byId("Combobox0").setValue(null);
		},

		onTableSettings: function(oEvent) {
			// Open the Table Setting dialog 
			this._oDialog = sap.ui.xmlfragment("aweawesome.view.SettingsDialog", this);
			this._oDialog.open();
		},
		onConfirm: function(oEvent) {
			var oView = this.getView();
			var oTable = oView.byId(Fragment.createId("frag1", "table0"));
			var mParams = oEvent.getParameters();
			var oBinding = oTable.getBinding("items");
			// apply grouping 
			var aSorters = [];
			// apply sorter 
			var sPath = mParams.sortItem.getKey();
			var bDescending = mParams.sortDescending;
			aSorters.push(new sap.ui.model.Sorter(sPath, bDescending));
			oBinding.sort(aSorters);
		},

		onItemPress: function(oEvent) {
			var oItem = oEvent.getParameter("listItem");
			var sPath = oItem.getBindingContext().getPath();
			var sPathIndex = sPath.substr(sPath.lastIndexOf("/") + 1);
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detailProduct", {
				prodId: sPathIndex
			});
		}
	});
});