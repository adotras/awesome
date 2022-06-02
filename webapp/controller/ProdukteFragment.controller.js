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

		onTableSettings: function(oEvent) {
			// Open the Table Setting dialog 
			this._oDialog = sap.ui.xmlfragment("tablesettings.SettingsDialog", this);
			this._oDialog.open();
		}

	});
});