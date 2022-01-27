! function(root, factory) {
	if (typeof exports == 'object' && typeof module != 'undefined') {
		module.exports = factory()
	} else if (typeof define == 'function' && define.amd) {
		define(factory)
	} else {
		document.addEventListener('plusready', function() {
			var moduleName = 'AndroidBridge';
			root.plus[moduleName] = factory()
		}, false);
	}
}(this, function() {
	var _BARCODE = 'AndroidBridge';
	var plugintest = {
		getNumber: function(num, successCallback, errorCallback) {
			var success = typeof successCallback !== 'function' ? null : function(args) {
					successCallback(args);
				},
				fail = typeof errorCallback !== 'function' ? null : function(code) {
					errorCallback(code);
				};
			var callbackID = plus.bridge.callbackId(success, fail);
			return plus.bridge.exec(_BARCODE, "callAppFunc", [callbackID, num]);
		}
	};
	return plugintest;
});
