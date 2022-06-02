sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/ui/core/routing/History"
], function(Controller, Fragment, History) {
	"use strict";

	return Controller.extend("aweawesome.controller.Detail", {

		onInit: function() {
			var oFragController = sap.ui.controller("aweawesome.controller.DetailFragment");
			oFragController.init(this);
			var oFragment = sap.ui.xmlfragment("aweawesome.view.Detail", oFragController);
			this.getView().byId("Detailpage").insertContent(oFragment);
			this._oFragContr = oFragController;

			var oRouter = this.getOwnerComponent().getRouter();
			var oRoute = oRouter.getRoute("detailProduct");
			oRoute.attachPatternMatched(this._onProductMatched, this);
		},

		onNavBack: function() {
			var oHistory = History.getInstance();
			var oPrevHash = oHistory.getPreviousHash();

			if (oPrevHash !== undefined) {
				window.history.go(-1);
			} else {
				this.toMaster();
			}
		},
		onLiveChangeInputValidate: function(oEvent) {
			var inputValue = oEvent.getParameter('value').trim();
			var newValue = inputValue;

			//determine the value range that should be allowed
			var sCondition = oEvent.getSource().data()["liveChangeAllow"];
			sCondition = sCondition ? sCondition : "";

			newValue = newValue.replace(/[^\d]/g, "");

			//determine max length to be allowed
			var maxLength = oEvent.getSource().data()["liveChangeMaxLength"];
			if (maxLength) {
				newValue = newValue.substring(0, maxLength);
			}

			var msgOnInvalidInput = oEvent.getSource().data()["liveChangeMsgOnInvalidInput"];
			if (msgOnInvalidInput && (newValue !== inputValue)) {
				for (var i = 0; i < inputValue.length; i++) {
					if (newValue[i] !== inputValue[i]) {
						msgOnInvalidInput = msgOnInvalidInput.replace('#', inputValue[i]);
						if (i === maxLength) {
							msgOnInvalidInput = "Exceeds max length:" + maxLength;
						}
						//alert(msgOnInvalidInput);
						oEvent.getSource().setValue(newValue);
						oEvent.getSource().setValueState("Warning");
						oEvent.getSource().setValueStateText(msgOnInvalidInput);
						break;
					}
				}
			} else {

				var myVal = event.target.value;
				console.log(myVal);

				var coolput = this.getView().byId("input2");
				console.log(coolput);
				coolput.setText(myVal);
				// var input = document.getElementById("input2");
				// console.log(input);

				//	this.getView().byId("input2").setText(this.getView().byId("input1").getValue());
				// this.getView().byId("input2").valueOf(myVal);
				// this.getView().byId("input2").value = myVal;
				// this.getView().byId("input2").setText(myVal);

				oEvent.getSource().setValue(newValue);
				oEvent.getSource().setValueState("None");
				oEvent.getSource().setValueStateText("");
			}
		}
	});
});