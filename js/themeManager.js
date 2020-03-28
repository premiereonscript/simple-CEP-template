var themeManager = (function () {
	'use strict';
	var cs = new CSInterface();

	function updateThemeWithAppSkinInfo(appSkinInfo){
		var styleID = 'myStyle';
		var panelBackgroundColor = appSkinInfo.panelBackgroundColor.color;
		newRule(styleID, "body","background-color: #"+toHex(panelBackgroundColor,0)+";");
		newRule(styleID, "body","color: #F7FFF8;");


	}

	function newRule(styleID, selector, rule){
		var stylesheet = document.getElementById(styleID);
		if(stylesheet){
			stylesheet = stylesheet.sheet;
			stylesheet.insertRule(selector + ' { ' + rule + ' }', stylesheet.cssRules.length);
		}
	}

	function onAppThemeColorChanged(event){
		var appSkinInfo = cs.getHostEnvironment().appSkinInfo;
		updateThemeWithAppSkinInfo(appSkinInfo);	
	}

	function init() {
		var appSkinInfo = cs.getHostEnvironment().appSkinInfo;
		updateThemeWithAppSkinInfo(appSkinInfo);
		cs.addEventListener(CSInterface.THEME_COLOR_CHANGED_EVENT, onAppThemeColorChanged);
	}

  /* Convert the Color object to string in hexadecimal format; */
  function toHex(color, delta) {
    function computeValue(value, delta) {
      var computedValue = !isNaN(delta) ? value + delta : value;
      if (computedValue < 0) {
        computedValue = 0;
      } else if (computedValue > 255) {
        computedValue = 255;
      }            
      computedValue = Math.floor(computedValue);
      computedValue = computedValue.toString(16);
      return computedValue.length === 1 ? "0" + computedValue : computedValue;
    } 
    var hex = "";
    if (color) {
      hex = computeValue(color.red, delta) + computeValue(color.green, delta) + computeValue(color.blue, delta);
    }
    return hex;
  }
	return {
		init: init
	}


}());