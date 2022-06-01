sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter"
], function(Controller, Fragment, Filter, FilterOperator, Sorter) {
	"use strict";

	return Controller.extend("aweawesome.controller.Detail.fragment", {

		// 		_oDialog: null,
	//	_oParent: null,

		//onInit: function() {}, //wird nie vom UI5-Framework abgerufen

		onSelectionChange: function(oEvent) {
			var oItem = oEvent.getParameter("selectedItem");
			var sPath = oItem.getBindingContext().getPath();
			var oTable = this.getView().byId("table0");
			oTable.bindElement(sPath);
		}

	});
});