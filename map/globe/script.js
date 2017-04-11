(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function() {
	var el = document.getElementsByClassName('a-enter-vr')[0]
	el.parentNode.removeChild(el)
}

},{}],2:[function(require,module,exports){
module.exports = function(planet, cam) { 
	var hammertime = new Hammer(document, {})
	var p = null
	hammertime.on('panstart', function(ev) {
		p = null
	})
	hammertime.on('pan', function(ev) {
		var c = ev.center
		var diff = null
		if(p) { diff = [p[0]-c.x, p[1]-c.y] }
		p = [c.x, c.y]
		if(diff) {
			rotate(0, -diff[0]/3,diff[1]/3)
		}
	});


	hammertime.get('pinch').set({ enable: true })
	hammertime.on('pinchstart', function(ev) { 
		p = ev.scale
	})
	hammertime.on('pinchend', function(ev) { 
		p = null
	})
	hammertime.on('pinch', function(ev) { 
		if(p) {
			var diff = p-ev.scale
			zoom(diff/10)
		}
	})

	function rotate(x,y,z) {
		var r = planet.getAttribute('rotation')
		r.x = r.x + x
		r.y = r.y + y
		r.z = r.z + z
		if(r.x > 360) { r.x = r.x - 360 }
		if(r.y > 360) { r.y = r.x - 360 }
		if(r.z > 360) { r.z = r.x - 360 }
		planet.setAttribute('rotation', r)
	}

	function zoom(z) {
		var p = cam.getAttribute('position')
		p.z = p.z + z
		if(p.z < 1.2) { p.z = 1.2 }
		if(p.z > 5) { p.z = 5 }
		cam.setAttribute('position', p)
	}

}




},{}],3:[function(require,module,exports){
var rmVr = require('./lib/rm-vr')
var touch = require('./lib/touch')

var planet = document.getElementById('planet')
var scene = document.getElementById('scene')
var sphere = document.getElementById('sphere')
var switchBtn = document.getElementById('switch')
var texture = document.getElementById('texture')

var current = 0
var imgs = ['countries', 'physical','night']

window.onload = function() {

	setTimeout(function() {
		rmVr()
	},500)
	touch(planet, cam)
	switchBtn.onclick = function() {
		current = current + 1
		if(current === 3) { current = 0 }
		var attrs = sphere.attributes
		for(i=0;i<attrs.length;i++) {
			if(attrs[i].name === 'material') { attrs[i].value = 'src: #' + imgs[current] }
		}
	}
}

},{"./lib/rm-vr":1,"./lib/touch":2}]},{},[3]);
