(function(window){
	
	function __(selector){
		if(!(this instanceof __)) return new __(selector);
		
		if(selector.nodeType == 1 || selector == window.document || selector == window){
			return this.push(selector);
		}
		
		if(typeof selector == 'object'){
			selector.forEach(function(ele){
				this.push(ele);
			}.bind(this))
			return;
		}
		
		var arr = document.querySelectorAll(selector);
		arr.forEach(function(ele){
		    this.push(ele);
		}.bind(this))
	}
	
	__.fn = __.prototype = [];
	
	
	__.extend = function(){
			for(var prop in arguments[1]){
				if(arguments[1].hasOwnProperty(prop)){
					arguments[0][prop] = arguments[1][prop];
				}
			}
		return arguments[0];
		}

	__.fn.each = function(callback){
		this.forEach(callback);
		return;
	}
	__.fn.parent = function(){
		if(!this) return;
		var arr=[],l = this.length, p,parents=[];
		for(var i = 0; i < l; i++){
			this[i] = this[i].offsetParent;
		}
		
		return this;
	}
	__.fn.addClass = function(name){
		this.forEach(function(ele){
			ele.classList.add(name);
		})
		return;
	}
	__.fn.removeClass = function(name){
		
		this.forEach(function(ele){
			if(ele.classList.contains(name)){
				ele.classList.remove(name);
			}
		})
		return;
	}
	__.fn.toggle = function(name){
		this.forEach(function(ele){
			ele.classList.toggle(name);
		})
		return;
	}
	__.fn.prev = function(){
		if(!this) return;
		var arr=[];
		this.forEach(function(ele){
			arr.push(ele.previousElementSibling)
		})
		return __(arr);
	}
	__.fn.next = function(){
		if(!this) return;
		var arr=[];
		this.forEach(function(ele){
			arr.push(ele.nextElementSibling)
		})
		return __(arr);
	}
	__.fn.index = function(selector){
		if(!selector) return;
		var i=this.indexOf(selector);
		if(i > -1){
			return i;
		}
		return;
	}
	__.fn.width = function(){
		return this[0].offsetWidth;
	}
	__.fn.height = function(){
		return this[0].offsetHeight;
	}
	__.fn.offset = function(){
		if(!this) return;	
		__.fn.offset.left = this[0].offsetLeft != 0 ? this[0].offsetLeft: this[0].offsetParent.offsetLeft;
		__.fn.offset.top = this[0].offsetTop != 0 ? this[0].offsetTop: this[0].offsetParent.offsetTop;
		return {
			left: __.fn.offset.left,
			top: __.fn.offset.top
		}
	}
	__.fn.eq = function(num){
		if(num < 0){
			return new __(this[this.length + num])
		}
		return new __(this[num])
	}
	__.fn.on = function(type, callback){
		for(var i = 0; i < this.length; i++){
			this[i]['on'+type] = callback;	
		}
		return;
	}
	__.fn.hover = function(callback1,callback2){
		this.each(function(ele){ele.onmouseover = callback1; });
		this.each(function(ele){ele.onmouseleave = callback2; });
		return;
		
	}
	__.fn.css = function(){
		var l = this.length;
		if(typeof arguments[0] == 'string' && arguments.length == 1){
			return getComputedStyle(this[0], null)[arguments[0]].toString();
		}
		if(arguments.length > 1){
			for(i=0; i<l; i++){
				
				this[i].style[arguments[0]] = arguments[1];
				
			}
		}else if(arguments.length == 1){
			prop = JSON.parse(JSON.stringify(arguments[0]));
			for(i=0; i<l; i++){
				for(var key in prop){
					if(prop.hasOwnProperty(key)){
						this[i].style[key] = prop[key];
					}
				}
			}
		}
		return;
	}
	__.fn.ready = function(callback){
		if(this[0] == window.document){
			document.addEventListener('DOMContentLoaded', callback, false)
			document.removeEventListener('DOMContentLoaded', arguments.callee);
				return;	
		}
		return;
	}
	
	window.__ = __
})(this);
// =========================== end of framework ============== //

__(document).ready(function(){
	
	__('ol li').on('click', function(){
		__(this).addClass('active');
	})
})
