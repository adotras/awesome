sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/ui/core/routing/History"
], function(Controller, Fragment, History) {
	"use strict";

	return Controller.extend("aweawesome.controller.Detail", {

		onInit: function() {
			var oRouter = this.getOwnerComponent().getRouter();
			var oRoute = oRouter.getRoute("detailProduct");
			oRoute.attachPatternMatched(this._onProductMatched, this);
		},

		_onProductMatched: function(oEvent) {
			var sProdPath = oEvent.getParameter("arguments").prodId;

			this.getView().bindElement({
				//				path: "/Products/" + sProdPath,
				path: "/" + sProdPath
					//				model: "undefined"
			});
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
				// var oVal = this.getView().byId("__xmlview1--frag2--labelPrice");
				// console.log(oVal);
				// oVal.valueOf();
				// console.log(oVal);

				var oVal = document.getElementById("__xmlview1--frag2--labelPrice").innerHTML;
				console.log(oVal);
				
				console.log(oVal);

				var gesamtPreis = myVal * oVal;
				gesamtPreis = (Math.round(gesamtPreis*100)/100).toFixed(2);
				// var prodPriceLabelLoc = this.byId(Fragment.createId("frag2", "labelPrice"));
				// // var prodPrice = prodPriceLabelLoc.
				// var oVal = this.getView().byId("__xmlview2--frag2--labelPrice").getText();
				// console.log(oVal);

				//	var coolput = this.getView().byId("__xmlview2--frag2--input2");
				//	var coolput = this.getView().byId("input2");
				var oInput2 = this.byId(Fragment.createId("frag2", "input2"));

				// console.log(oInput2);
				oInput2.setValue(gesamtPreis);
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