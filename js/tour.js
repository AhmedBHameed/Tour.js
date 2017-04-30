"use strict";
(function (window) {	
    function tour(selector) {
        if (!(this instanceof tour)) return new tour(selector);
        if (selector.nodeType == 1 || selector == window.document || selector == window) {
            this.push(selector);
            return;
        }
        var arr = document.querySelectorAll(selector);
        arr.forEach(function (ele) {
            this.push(ele);
        }.bind(this));
        return;
    }
    window.tour = tour;
    return;
})(window);

var fn = tour.prototype = [];
fn.extend = function (prop) {
    if (prop && typeof prop == "object") {
        for (var value in prop) {
            if (prop.hasOwnProperty(value)) {
                this.default[value] = prop[value];
            }
        }
    }
    return;
};
fn.liveEvent = function(){
    var args        =null,
        eventType   =null,
        parent      =null,
        child       =null,
        callback    =null,
        children    =null;

    args = Array.prototype.slice.call(arguments);
    if(typeof args[0] != "string" || typeof args[1] != "object"){
        throw new Error("Arguments in liveEvent is invalid");
    }
    if(typeof args[2] == "string"){
        child       = args[2];
    }else if(typeof args[2] == "function"){
        callback    = args[2];
    }
    if(typeof args[3] == "function"){
        callback    = args[3];
    }
    eventType       = args[0];
    if(args[1].nodeType == 1){
        parent      = [args[1]];
    }else{
        parent      = args[1];
    }
    for(var i=0; i < parent.length; i++){
        parent[i].addEventListener(eventType, function(e){
            var target      = e.target || e.srcElement;
            if(child != null){
                var id          = target.nodeName.toLowerCase(),
                    children    = parent[i-1].querySelectorAll(id),
                    index       = Array.prototype.indexOf.call(children, target);

                if(id == child){
                    callback(target, index, children);
                    return;
                }
            }else{
                callback(target);
                return;
            }
        }, false);
    }
    return;
}
fn.currPos = 0;
fn.oldPos = 0;
fn.cycle = false;
fn.loop = null;
fn.underAnimate = true;
fn.render = function(){
    // console.log(this.indicators);
	this.indicators[this.oldPos].classList.remove('active');
	this.indicators[this.currPos].classList.add('active'); // dont play with this
	var prevItem = this.items[this.oldPos];
	var currItem = this.items[this.currPos];
		if (this.slideToRight){
			prevItem.classList.add('prevright'+this.default.slideEffect);
			currItem.classList.add('nextright'+this.default.slideEffect);
			window.setTimeout(function(){
				prevItem.classList.remove('active');
				currItem.classList.add('active');
			}.bind(this), 20);
			window.setTimeout(function(){
				prevItem.classList.remove('prevright'+this.default.slideEffect);
				currItem.classList.remove('nextright'+this.default.slideEffect);
				this.underAnimate = true;
			}.bind(this), 600)
		}else{
			prevItem.classList.add('prevleft'+this.default.slideEffect);
			currItem.classList.add('nextleft'+this.default.slideEffect)
			window.setTimeout(function(){
				prevItem.classList.remove('active');
				currItem.classList.add('active');
			}.bind(this), 20);
			window.setTimeout(function(){
				prevItem.classList.remove('prevleft'+this.default.slideEffect);
				currItem.classList.remove('nextleft'+this.default.slideEffect);
				this.underAnimate = true;
			}.bind(this), 600);		
		}
	return;
}
fn.iteration = window.setInterval.bind(window);
fn.clearIteration = window.clearInterval.bind(window);
fn.stopIteration = function () {
    if (this.cycle && this.loop != null) {
        this.clearIteration(this.loop);
        this.cycle = false;
        this.loop = null;
        this.timeLine.classList.remove('animate');
    }
    return;
}
fn.startIteration = function () {
    if (!this.cycle && this.loop == null) {
        this.timeLine.classList.add('animate');
        this.cycle = true;
        this.loop = this.iteration(function () {
            this.to();
        }.bind(this), this.default.delay);
    }
    return;
}
fn.to = function () {
    var next = this.currPos;
	this.findPosition(++next);
    this.timeLine.classList.remove('animate');
    this.timeLine.classList.add('animate');
    return;
};
fn.slideToRight;
fn.findPosition = function (number) {
    var itemsLength = this.items.length;
    if(this.indicators.length != itemsLength){
        throw new Error("Indicators length are not equal with your items!");
    }
    this.oldPos = this.currPos;
    this.currPos = number;
    if (this.currPos != this.oldPos) {
        if (this.currPos > itemsLength - 1) {
            this.currPos = 0;
        } else if (this.currPos < 0) {
            this.currPos = itemsLength - 1;
        }
        if(number > this.oldPos) {this.slideToRight = true} else {this.slideToRight = false};
        this.render();
    };
    return;
}

fn.events = function () {
    var self = this;
    this.liveEvent('click', this.next , function(target){
        if(self.underAnimate){
			self.underAnimate = false;
        	self.findPosition(self.currPos + 1);
		}
    })
    this.liveEvent('click', this.prev , function(target){
        if(self.underAnimate){
			self.underAnimate = false;
        	self.findPosition(self.currPos - 1);
		}
    })
    this.liveEvent('click', this.indicatorsContainer , 'li', function(target, index, children){
        if(self.underAnimate){
            self.underAnimate = false;
            self.findPosition(index);
        }
    });
	document.addEventListener('keydown', function(e){
        this.keyPressed[e.keyCode == 39 ? e.keyCode: null || e.keyCode == 37 ? e.keyCode: null] = true;
		this.keyboardControll();
	}.bind(this));
	document.addEventListener('keyup', function(e){
		this.keyPressed[e.keyCode == 39 ? e.keyCode: null || e.keyCode == 37 ? e.keyCode: null] = false;
		this.keyboardControll();
	}.bind(this));
	
    if (this.default.startCycle == true) {
        this[0].addEventListener('mouseenter', function (e) {
            e.stopPropagation();
            this.stopIteration();
        }.bind(this), false);

        this[0].addEventListener('mouseleave', function (e) {
            e.stopPropagation();
            this.startIteration();
        }.bind(this), false);
    };
    return;
}
fn.keyPressed = {};
fn.keyboardControll = function(){
    if(this.underAnimate){
        this.underAnimate = false;
        if(this.keyPressed['39'] == true){
            var next = this.currPos;
            this.findPosition(++next);
            if(this.default.startCycle){
                this.stopIteration();
            }
        }else if(this.keyPressed['37'] == true){
            var prev = this.currPos;
            this.findPosition(--prev);
            if(this.default.startCycle){
                this.stopIteration();
            }
        }else{
            if(this.default.startCycle){
                this.startIteration();
            }
        }
    }
}

fn.cashing = function () {
    this.next = this[0].querySelectorAll('.tour-control.right')[0];
    this.prev = this[0].querySelectorAll('.tour-control.left')[0];
    this.indicatorsContainer = this[0].querySelector('.tour-indicators');
    this.indicators = this.indicatorsContainer.querySelectorAll("li");
    this.tourWidth = this[0].offsetWidth;
    this.tourInner = this[0].querySelector('.tour-inner');
    this.items = this[0].querySelectorAll('.tour-inner .item');
    this.nextSlide = this.next.click.bind(this.next);
    this.prevSlide = this.prev.click.bind(this.prev);
	this.default = {
		"delay": 6000,
		"startCycle": true,
		"showArrows": true,
		"slideEffect": 'sliding',
		"returnAPI": false
	};
    return;
}
fn.reCash = function(){
    this.indicators = this.indicatorsContainer.querySelectorAll("li");
    this.items = this[0].querySelectorAll('.tour-inner .item');
    this.changeTransition(this.default.slideEffect);
}
fn.watch = function(){
    var mutationObserver = window.MutationObserver || window.WebKitMutationObserver,spy;
    if( MutationObserver ){
        spy = new mutationObserver(function(mutation){
            this.reCash();
        }.bind(this));
        var config = { attributes: false, childList: true, characterData: false };
        spy.observe(this.tourInner, config);
        setTimeout(function(){spy.disconnect()} , this.default.delay);
    }else{
        this.liveEvent('DOMNodeInserted', this.tourInner , this.reCash);
    }
}
fn.addTimeLine = function () {
    var div = document.createElement('div');
    div.className = 'timeLine animate';
    this[0].appendChild(div);
    this.timeLine = div;
    this.timeLine.style.animationDuration = (this.default.delay / 1000) + 's';
    return;
};
fn.transitionEffects = ['sliding','rolling', 'fading'];
fn.changeTransition = function(prop){
	if(typeof prop != 'undefined'){
		var oldTrans = this.default['slideEffect'];
		if(this.transitionEffects.indexOf(prop) > -1){
			this.default['slideEffect'] = prop;
				this.items.forEach(function(el){
					el.classList.remove('item'+oldTrans);
					el.classList.add('item'+this.default.slideEffect);
				}.bind(this));
		}else{
			return 'error property! Transition must be one of the following: ('+this.transitionEffects.join(' or ')+')';
		}
		return 'Transition changed to '+this.default.slideEffect;
	}else{
		return 'Transition applied is '+this.default.slideEffect;
	}
};
fn.version = "v2.5";
fn.init = function (prop) {
    this.cashing();
    this.watch();
	this.extend(prop);
    this.changeTransition(this.default.slideEffect);
	
    this.events();
    if (this.default.startCycle == true) {
        this.addTimeLine();
        this.startIteration();
    }
    if (this.default.showArrows == false) {
        this.next.style.display = 'none';
        this.prev.style.display = 'none';
    }
    return this;
}


fn.apply = function (prop) {
    var self = [];
    this.forEach(function (ele) {
        self.push(new tour(ele).init(prop));
    }.bind(this));
	
	if(self[0].default.returnAPI){
		var obj = {};
		for(var i = 0 ; typeof self[i] == 'object'; i++){
			obj['tour'+i] = {
					"element": self[i][0],
					"next": self[i].nextSlide,
					"prev": self[i].prevSlide,
					"indeicators": self[i].indicators,
					"transition": self[i].changeTransition.bind(self[i])
				};
		}
		return obj;
	}else{
		return true;
	}
};