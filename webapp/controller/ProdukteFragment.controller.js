sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter"
], function(Controller, Fragment, Filter, FilterOperator, Sorter) {
	"use strict";

	return Controller.extend("aweawesome.controller.ProdukteFragment", {
		_oParent: null,
		onInit: function() {},

		init: function(oParent) {
			this._oParent = oParent;
			this._oParent.getView();
		},

		onItemPress: function(oEvent) {
			var oItem = oEvent.getParameter("listItem");
			var sPath = oItem.getBindingContext().getPath();
			var sPathIndex = sPath.substr(sPath.lastIndexOf("/") + 1);
			var oRouter = this._oParent.getOwnerComponent().getRouter();
			oRouter.navTo("detailProduct", {
				prodId: sPathIndex
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
		},

		onSelectionChange: function(oEvent) {
			var oItem = oEvent.getParameter("selectedItem");
			var sPath = oItem.getBindingContext().getPath();
			var oTable = this.getView().byId("table0");
			oTable.bindElement(sPath);
		}
	});
});