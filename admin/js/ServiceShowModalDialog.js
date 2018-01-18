/**
 * Service Show Modal Dialog Wrapper to control dialog window pop-up and return value
 */
/**
 * Pop-up the Modal Dialog window
 * @param url
 * @param width
 * @param height
 * @param fn: the call-back function defined in parent window to process after pop-up window is closed
 */
function    serviceModalDialog(url, width, height, fn) {
    if (navigator.userAgent.indexOf("Chrome") > 0) {
        window.returnCallBackValue354865588 = fn;
        var paramsChrome = 'top=' + (((window.screen.height - height) / 2) - 50) +
            ',left=' + ((window.screen.width - width) / 2) + ',toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no';
        if(height == 0 && width == 0){
        	// default size if both height and width is 0 value
        }else{
        	paramsChrome = 'height=' + height + ', width=' + width + paramsChrome;
        }
        window.open(url, "_blank", paramsChrome);
    }
    else {
    	var params = 'status:no;dialogLeft:'
            + ((window.screen.width - width) / 2) + 'px;dialogTop:' + (((window.screen.height - height) / 2) - 50) + 'px;';
    	if(height == 0 && width == 0){
    		// default size if both height and width is 0 value
    	} else {
    		params = 'dialogWidth:' + width + 'px;dialogHeight:' + height + 'px;' + params;
    	}
        var tempReturnValue = window.showModalDialog(url, "", params);
        fn.call(window, tempReturnValue);
    }
}

function serviceModalDialogToolBar(url, width, height, fn) {
    if (navigator.userAgent.indexOf("Chrome") > 0) {
        window.returnCallBackValue354865588 = fn;
        var paramsChrome = 'top=' + (((window.screen.height - height) / 2) - 50) +
            ',left=' + ((window.screen.width - width) / 2) + ',toolbar=yes, menubar=no, scrollbars=no, resizable=no, location=no';
        if(height == 0 && width == 0){
        	// default size if both height and width is 0 value
        }else{
        	paramsChrome = 'height=' + height + ', width=' + width + paramsChrome;
        }
        window.open(url, "_blank", paramsChrome);
    }
    else {
    	var paramsChrome = 'top=' + (((window.screen.height - height) / 2) - 50) +
        ',left=' + ((window.screen.width - width) / 2) + ',toolbar=yes, menubar=no, scrollbars=no, resizable=no, location=no';
        if(height == 0 && width == 0){
    	       // default size if both height and width is 0 value
        }else{
    	     paramsChrome = 'height=' + height + ', width=' + width + paramsChrome;
        }
        window.open(url, "_blank", paramsChrome);
    }
}

/**
 * Pop-up window call this method to return the value to parent window
 * @param value
 */
function serviceReturnValue(value) {
    if (navigator.userAgent.indexOf("Chrome") > 0) {
        if(window.opener && window.opener.returnCallBackValue354865588){
            window.opener.returnCallBackValue354865588.call(window.opener, value);
        }
    }
    else {
        window.returnValue = value;
    }
}