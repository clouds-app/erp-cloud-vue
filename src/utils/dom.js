import Vue from 'vue';
const isServer = Vue.prototype.$isServer;

/* istanbul ignore next */
export const on = (function() {
    if (!isServer && document.addEventListener) {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();

/* istanbul ignore next */
export const off = (function() {
    if (!isServer && document.removeEventListener) {
        return function(element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler);
            }
        };
    }
})();

export const parentNode = function (nodeName,origiNode){
	if(!nodeName || !origiNode){
		return null;
	}
	let node = origiNode.parentNode;
	let i = 0;
	while(i <100){//避免出现死循环
		if(node == null){
			return node;
		}else if(node.nodeName == nodeName.toUpperCase()){
			return node;
		}else{
			node = node.parentNode;
			i++;
		}
	}
	return null;
}

export const childNode = function(tagName,origiNode){
	if(!tagName || !origiNode){
		return null;
	}
	let node = origiNode.getElementsByTagName(tagName);
	if(node.length == 0){
		return null;
	}
	return node;
}


export const getElementIsDR = function(element){
	if(element.getAttribute('type') == 'hidden'){
		element = element.parentNode;
	}
	return element.hasAttribute('disabled') || element.hasAttribute('readonly');
}