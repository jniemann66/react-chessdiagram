!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t(require("react"),require("react-dom"));else if("function"==typeof define&&define.amd)define(["react","react-dom"],t);else{var r="object"==typeof exports?t(require("react"),require("react-dom")):t(e.React,e.ReactDOM);for(var a in r)("object"==typeof exports?exports:e)[a]=r[a]}}(this,function(e,t){return function(e){function t(a){if(r[a])return r[a].exports;var s=r[a]={exports:{},id:a,loaded:!1};return e[a].call(s.exports,s,s.exports,t),s.loaded=!0,s.exports}var r={};return t.m=e,t.c=r,t.p="/",t(0)}([function(e,t,r){e.exports=r(6)},function(t,r){t.exports=e},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var r=this[t];r[2]?e.push("@media "+r[2]+"{"+r[1]+"}"):e.push(r[1])}return e.join("")},e.i=function(t,r){"string"==typeof t&&(t=[[null,t,""]]);for(var a={},s=0;s<this.length;s++){var n=this[s][0];"number"==typeof n&&(a[n]=!0)}for(s=0;s<t.length;s++){var o=t[s];"number"==typeof o[0]&&a[o[0]]||(r&&!o[2]?o[2]=r:r&&(o[2]="("+o[2]+") and ("+r+")"),e.push(o))}},e}},function(e,t,r){function a(e,t){for(var r=0;r<e.length;r++){var a=e[r],s=h[a.id];if(s){s.refs++;for(var n=0;n<s.parts.length;n++)s.parts[n](a.parts[n]);for(;n<a.parts.length;n++)s.parts.push(p(a.parts[n],t))}else{for(var o=[],n=0;n<a.parts.length;n++)o.push(p(a.parts[n],t));h[a.id]={id:a.id,refs:1,parts:o}}}}function s(e){for(var t=[],r={},a=0;a<e.length;a++){var s=e[a],n=s[0],o=s[1],i=s[2],l=s[3],p={css:o,media:i,sourceMap:l};r[n]?r[n].parts.push(p):t.push(r[n]={id:n,parts:[p]})}return t}function n(e,t){var r=_(),a=C[C.length-1];if("top"===e.insertAt)a?a.nextSibling?r.insertBefore(t,a.nextSibling):r.appendChild(t):r.insertBefore(t,r.firstChild),C.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");r.appendChild(t)}}function o(e){e.parentNode.removeChild(e);var t=C.indexOf(e);t>=0&&C.splice(t,1)}function i(e){var t=document.createElement("style");return t.type="text/css",n(e,t),t}function l(e){var t=document.createElement("link");return t.rel="stylesheet",n(e,t),t}function p(e,t){var r,a,s;if(t.singleton){var n=v++;r=y||(y=i(t)),a=u.bind(null,r,n,!1),s=u.bind(null,r,n,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(r=l(t),a=f.bind(null,r),s=function(){o(r),r.href&&URL.revokeObjectURL(r.href)}):(r=i(t),a=c.bind(null,r),s=function(){o(r)});return a(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;a(e=t)}else s()}}function u(e,t,r,a){var s=r?"":a.css;if(e.styleSheet)e.styleSheet.cssText=g(t,s);else{var n=document.createTextNode(s),o=e.childNodes;o[t]&&e.removeChild(o[t]),o.length?e.insertBefore(n,o[t]):e.appendChild(n)}}function c(e,t){var r=t.css,a=t.media;if(a&&e.setAttribute("media",a),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}function f(e,t){var r=t.css,a=t.sourceMap;a&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */");var s=new Blob([r],{type:"text/css"}),n=e.href;e.href=URL.createObjectURL(s),n&&URL.revokeObjectURL(n)}var h={},d=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},m=d(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),_=d(function(){return document.head||document.getElementsByTagName("head")[0]}),y=null,v=0,C=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=m()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var r=s(e);return a(r,t),function(e){for(var n=[],o=0;o<r.length;o++){var i=r[o],l=h[i.id];l.refs--,n.push(l)}if(e){var p=s(e);a(p,t)}for(var o=0;o<n.length;o++){var l=n[o];if(0===l.refs){for(var u=0;u<l.parts.length;u++)l.parts[u]();delete h[l.id]}}}};var g=function(){var e=[];return function(t,r){return e[t]=r,e.filter(Boolean).join("\n")}}()},function(e,r){e.exports=t},function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){var r=[],a=!0,s=!1,n=void 0;try{for(var o,i=e[Symbol.iterator]();!(a=(o=i.next()).done)&&(r.push(o.value),!t||r.length!==t);a=!0);}catch(l){s=!0,n=l}finally{try{!a&&i["return"]&&i["return"]()}finally{if(s)throw n}}return r}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),l=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),p=r(1),u=a(p),c=function(e){function t(){return s(this,t),n(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),l(t,[{key:"render",value:function(){var e=this.props.light?this.props.lightSquareColor:this.props.darkSquareColor;return u["default"].createElement("rect",{x:this.props.x,y:this.props.y,width:this.props.squareSize,height:this.props.squareSize,stroke:"black",fill:e,strokeWidth:"1"})}}]),t}(p.Component),f=function(e){function t(){return s(this,t),n(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),l(t,[{key:"render",value:function(){var e="yellow";return u["default"].createElement("rect",{x:this.props.x,y:this.props.y,width:this.props.squareSize,height:this.props.squareSize,stroke:e,fill:"none",strokeWidth:"3"})}}]),t}(p.Component),h=function(e){function t(){return s(this,t),n(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),l(t,[{key:"_fileRankToCoords",value:function(e,t){if(this.props.flip){var r=this.props.squareSize*(this.props.files-e),a=this.props.squareSize*t;return[r,a]}var s=this.props.squareSize*(1+e),n=this.props.squareSize*(this.props.ranks-t-1);return[s,n]}},{key:"render",value:function(){for(var e=this,t=[],r=0;r<this.props.ranks;r++){var a=this.props.flip?r:this.props.ranks-r-1;t.push({y:this.props.squareSize/2+a*this.props.squareSize,label:r+1})}return u["default"].createElement("g",null,t.map(function(t,r){return u["default"].createElement("text",{x:e.props.squareSize/2,y:t.y,key:r,fontFamily:"Verdana",fontSize:e.props.squareSize/3,textAnchor:"middle"},t.label)}))}}]),t}(p.Component),d=function(e){function t(){return s(this,t),n(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),l(t,[{key:"render",value:function(){for(var e=this,t=[],r=0;r<this.props.files;r++){var a=this.props.flip?this.props.files-r:1+r;t.push({x:this.props.squareSize/2+a*this.props.squareSize,label:String.fromCharCode(97+r)})}return u["default"].createElement("g",null,t.map(function(t,r){return u["default"].createElement("text",{x:t.x,y:e.props.squareSize/2+e.props.ranks*e.props.squareSize,key:r,fontFamily:"Verdana",fontSize:e.props.squareSize/3,textAnchor:"middle"},t.label)}))}}]),t}(p.Component),m=function(e){function t(){return s(this,t),n(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),l(t,[{key:"_squareToCoords",value:function(e){if(this.props.flip){var t=this.props.squareSize*(this.props.files-(e.toLowerCase().charCodeAt(0)-97)),r=(Number(e.slice(1))-1)*this.props.squareSize;return[t,r]}var a=this.props.squareSize*(1+e.toLowerCase().charCodeAt(0)-97),s=(this.props.ranks-Number(e.slice(1)))*this.props.squareSize;return[a,s]}},{key:"_fileRankToCoords",value:function(e,t){if(this.props.flip){var r=this.props.squareSize*(this.props.files-e),a=this.props.squareSize*t;return[r,a]}var s=this.props.squareSize*(1+e),n=this.props.squareSize*(this.props.ranks-t-1);return[s,n]}},{key:"shouldComponentUpdate",value:function(e){return e.selectedSquare!==this.props.selectedSquare||e.flip!==this.props.flip||e.squareSize!==this.props.squareSize||e.lightSquareColor!==this.props.lightSquareColor||e.darkSquareColor!==this.props.darkSquareColor||e.ranks!==this.props.ranks||e.files!==this.props.files}},{key:"render",value:function(){for(var e=this,t=[],r=0;r<this.props.files;r++)for(var a=0;a<this.props.ranks;a++){var s=this._fileRankToCoords(r,a),n=i(s,2),o=n[0],l=n[1];t.push({x:o,y:l,light:1&(r^a)})}var p=void 0,m=void 0;if(this.props.selectedSquare){var _=this._squareToCoords(this.props.selectedSquare),y=i(_,2);p=y[0],m=y[1]}return u["default"].createElement("svg",null,t.map(function(t,r){return u["default"].createElement(c,{x:t.x,y:t.y,key:r,light:t.light,squareSize:e.props.squareSize,lightSquareColor:e.props.lightSquareColor,darkSquareColor:e.props.darkSquareColor})}),u["default"].createElement(h,{ranks:this.props.ranks,files:this.props.files,squareSize:this.props.squareSize,flip:this.props.flip}),u["default"].createElement(d,{ranks:this.props.ranks,files:this.props.files,squareSize:this.props.squareSize,flip:this.props.flip}),function(){return e.props.selectedSquare?u["default"].createElement(f,{x:p,y:m,squareSize:e.props.squareSize}):u["default"].createElement("g",null)}())}}]),t}(p.Component);m.propTypes={squareSize:u["default"].PropTypes.number,ranks:u["default"].PropTypes.number,files:u["default"].PropTypes.number,lightSquareColor:u["default"].PropTypes.string,darkSquareColor:u["default"].PropTypes.string,flip:u["default"].PropTypes.bool},m.defaultProps={squareSize:45,ranks:8,files:8,lightSquareColor:"#2492FF",darkSquareColor:"#005EBB",flip:!1},t["default"]=m},function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){var r=[],a=!0,s=!1,n=void 0;try{for(var o,i=e[Symbol.iterator]();!(a=(o=i.next()).done)&&(r.push(o.value),!t||r.length!==t);a=!0);}catch(l){s=!0,n=l}finally{try{!a&&i["return"]&&i["return"]()}finally{if(s)throw n}}return r}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),l=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),p=r(1),u=a(p),c=r(4),f=a(c),h=r(5),d=a(h),m=r(7),_=a(m),y=function(e){function t(e){s(this,t);var r=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.state={selectedSquare:null,selectedPieceType:null,dragX:0,dragY:0,isDragging:!1,left:0,top:0,width:0,height:0},r}return o(t,e),l(t,[{key:"componentDidMount",value:function(){this._getClientPos(),addEventListener("resize",this._onResize.bind(this)),addEventListener("scroll",this._onScroll.bind(this))}},{key:"componentWillUnmount",value:function(){removeEventListener("resize",this._onResize.bind(this)),removeEventListener("scroll",this._onScroll.bind(this))}},{key:"_onResize",value:function(e){this._getClientPos()}},{key:"_onScroll",value:function(e){this._getClientPos()}},{key:"_onMouseDown",value:function(e){e.preventDefault();var t=e.clientX-this.state.left,r=e.clientY-this.state.top;this._grab(t,r)}},{key:"_onTouchStart",value:function(e){e.preventDefault();var t=e.touches[0].clientX-this.state.left,r=e.touches[0].clientY-this.state.top;this._grab(t,r)}},{key:"_onMouseMove",value:function(e){e.preventDefault();var t=e.clientX-this.state.left,r=e.clientY-this.state.top;this._move(t,r)}},{key:"_onTouchMove",value:function(e){e.preventDefault();var t=e.touches[0].clientX-this.state.left,r=e.touches[0].clientY-this.state.top;this._move(t,r)}},{key:"_onMouseUp",value:function(e){e.preventDefault();var t=e.clientX-this.state.left,r=e.clientY-this.state.top;this._release(t,r)}},{key:"_onTouchEnd",value:function(e){e.preventDefault();var t=[this.state.dragX,this.state.dragY],r=t[0],a=t[1];this._release(r,a)}},{key:"_squareToCoords",value:function(e){if(this.props.flip){var t=this.props.squareSize*(this.props.files-(e.toLowerCase().charCodeAt(0)-97)),r=(Number(e.slice(1))-1)*this.props.squareSize;return[t,r]}var a=this.props.squareSize*(1+e.toLowerCase().charCodeAt(0)-97),s=(this.props.ranks-Number(e.slice(1)))*this.props.squareSize;return[a,s]}},{key:"_fileRankToCoords",value:function(e,t){if(this.props.flip){var r=this.props.squareSize*(this.props.files-e),a=this.props.squareSize*t;return[r,a]}var s=this.props.squareSize*(1+e),n=this.props.squareSize*(this.props.ranks-t-1);return[s,n]}},{key:"_coordsToSquare",value:function(e,t){if(this.props.flip){var r=String.fromCharCode(97+this.props.files-e/this.props.squareSize+1),a=1+Math.floor(t/this.props.squareSize);return r+a}var s=String.fromCharCode(97+e/this.props.squareSize-1),n=1+Math.floor((this.props.ranks*this.props.squareSize-t)/this.props.squareSize);return s+n}},{key:"_grab",value:function(e,t){var r=this.props.squareSize*(1+this.props.files),a=this.props.squareSize*this.props.ranks;if(e<this.props.squareSize||e>r||t<0||t>a)return!1;var s=this._coordsToSquare(e,t),n=this._getPieceAtSquare(s);this.setState({selectedSquare:s,selectedPieceType:n?n.pieceType:null,dragX:n?n.x+this.props.squareSize/2:this.state.dragX,dragY:n?n.y+this.props.squareSize/2:this.state.dragY,isDragging:!0})}},{key:"_move",value:function(e,t){this.state.isDragging&&this.setState({dragX:e,dragY:t})}},{key:"_release",value:function(e,t){this.setState({isDragging:!1});var r=this._coordsToSquare(e,t);if(r!==this.state.selectedSquare)return this.props.onMovePiece&&this.props.onMovePiece(this.state.selectedPieceType,this.state.selectedSquare,r),void this.setState({selectedSquare:null})}},{key:"_getClientPos",value:function(){var e=f["default"].findDOMNode(this).getBoundingClientRect();this.setState({left:e.left,top:e.top,width:e.width,height:e.height})}},{key:"_getPieces",value:function(){var e=this;return this.props.pieces?this.props.pieces.map(function(t,r){var a=t.split("@",2),s=i(a,2),n=s[0],o=s[1];if(!o)return{pieceType:"invalid",square:"none",x:0,y:0};var l=e._squareToCoords(o),p=i(l,2),u=p[0],c=p[1];return isNaN(c)?{pieceType:"invalid",square:"none",x:0,y:0}:{pieceType:n,square:o.toLowerCase(),x:u,y:c}}):[]}},{key:"_getPiecesFromFEN",value:function(){for(var e=[],t=this.props.fen.split(" ",6),r=7,a=0,s=void 0,n=void 0,o=void 0,l=0;l<t[0].length;l++){var p=t[0].charAt(l);if(/[KQRBNPkqrbnp]/.test(p)){var u=this._fileRankToCoords(a,r),c=i(u,2);s=c[0],n=c[1],o=String.fromCharCode(97+a)+(r+1).toString(),e.push({pieceType:p,square:o,x:s,y:n}),a++}else"/"===p?(r-=1,a=0):/[1-8]/.test(p)&&(a+=Number(p))}return e}},{key:"_getPieceAtSquare",value:function(e){var t=this.props.fen?this._getPiecesFromFEN():this._getPieces();return t.filter(function(t){return t.square===e})[0]}},{key:"render",value:function(){var e=this,t=this.props.fen?this._getPiecesFromFEN():this._getPieces();return u["default"].createElement("svg",{width:"auto"===this.props.width?(1+this.props.files)*this.props.squareSize:this.props.width,height:"auto"===this.props.height?(1+this.props.ranks)*this.props.squareSize:this.props.height,onMouseDown:this._onMouseDown.bind(this),onTouchStart:this._onTouchStart.bind(this),onMouseMove:this._onMouseMove.bind(this),onTouchMove:this._onTouchMove.bind(this),onMouseUp:this._onMouseUp.bind(this),onTouchEnd:this._onTouchEnd.bind(this)},u["default"].createElement(d["default"],{squareSize:this.props.squareSize,ranks:this.props.ranks,files:this.props.files,selectedSquare:this.state.selectedSquare,lightSquareColor:this.props.lightSquareColor,darkSquareColor:this.props.darkSquareColor,flip:!!this.props.flip}),t.map(function(t,r){return u["default"].createElement(_["default"],{x:e.state.isDragging&&t.square===e.state.selectedSquare?e.state.dragX-e.props.squareSize/2:t.x,y:e.state.isDragging&&t.square===e.state.selectedSquare?e.state.dragY-e.props.squareSize/2:t.y,key:r,pieceType:t.pieceType,squareSize:e.props.squareSize})}))}}]),t}(p.Component);y.propTypes={squareSize:u["default"].PropTypes.number,ranks:u["default"].PropTypes.number,files:u["default"].PropTypes.number,lightSquareColor:u["default"].PropTypes.string,darkSquareColor:u["default"].PropTypes.string,flip:u["default"].PropTypes.bool,onMovePiece:u["default"].PropTypes.func,width:u["default"].PropTypes.oneOfType([u["default"].PropTypes.string,u["default"].PropTypes.number]),height:u["default"].PropTypes.oneOfType([u["default"].PropTypes.string,u["default"].PropTypes.number]),fen:u["default"].PropTypes.string,pieces:u["default"].PropTypes.array},y.defaultProps={width:"auto",height:"auto",squareSize:45,ranks:8,files:8,lightSquareColor:"#2492FF",darkSquareColor:"#005EBB",flip:!1},t["default"]=y},function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),l=r(1),p=a(l);r(9);var u=function(e){function t(){return s(this,t),n(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),i(t,[{key:"shouldComponentUpdate",value:function(e,t){return e.x!==this.props.x||e.y!==this.props.y||e.pieceType!==this.props.pieceType||e.squareSize!==this.props.squareSize}},{key:"render",value:function(){var e=this.props.squareSize/45,t="translate("+this.props.x+","+this.props.y+") scale("+e+")";switch(this.props.pieceType){case"K":return p["default"].createElement("svg",null,p["default"].createElement("g",{className:"g_0",transform:t},p["default"].createElement("path",{d:"M 22.5,11.63 L 22.5,6",className:"path_0"}),p["default"].createElement("path",{d:"M 20,8 L 25,8",className:"path_1"}),p["default"].createElement("path",{d:"M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25",className:"path_2"}),p["default"].createElement("path",{d:"M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z ",className:"path_3"}),p["default"].createElement("path",{d:"M 11.5,30 C 17,27 27,27 32.5,30",className:"path_4"}),p["default"].createElement("path",{d:"M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5",className:"path_5"}),p["default"].createElement("path",{d:"M 11.5,37 C 17,34 27,34 32.5,37",className:"path_6"})));case"Q":return p["default"].createElement("svg",null,p["default"].createElement("g",{className:"g_1",transform:t},p["default"].createElement("path",{d:"M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z",transform:"translate(-1,-1)"}),p["default"].createElement("path",{d:"M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z",transform:"translate(15.5,-5.5)"}),p["default"].createElement("path",{d:"M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z",transform:"translate(32,-1)"}),p["default"].createElement("path",{d:"M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z",transform:"translate(7,-4.5)"}),p["default"].createElement("path",{d:"M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z",transform:"translate(24,-4)"}),p["default"].createElement("path",{d:"M 9,26 C 17.5,24.5 30,24.5 36,26 L 38,14 L 31,25 L 31,11 L 25.5,24.5 L 22.5,9.5 L 19.5,24.5 L 14,10.5 L 14,25 L 7,14 L 9,26 z ",className:"path_7"}),p["default"].createElement("path",{d:"M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z ",className:"path_8"}),p["default"].createElement("path",{d:"M 11.5,30 C 15,29 30,29 33.5,30",className:"path_9"}),p["default"].createElement("path",{d:"M 12,33.5 C 18,32.5 27,32.5 33,33.5",className:"path_10"})));case"R":return p["default"].createElement("svg",null,p["default"].createElement("g",{className:"g_5",transform:t},p["default"].createElement("path",{d:"M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z ",className:"path_16"}),p["default"].createElement("path",{d:"M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z ",className:"path_17"}),p["default"].createElement("path",{d:"M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14",className:"path_18"}),p["default"].createElement("path",{d:"M 34,14 L 31,17 L 14,17 L 11,14"}),p["default"].createElement("path",{d:"M 31,17 L 31,29.5 L 14,29.5 L 14,17",className:"path_19"}),p["default"].createElement("path",{d:"M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5"}),p["default"].createElement("path",{d:"M 11,14 L 34,14",className:"path_20"})));case"B":return p["default"].createElement("svg",null,p["default"].createElement("g",{className:"g_2",transform:t},p["default"].createElement("g",{className:"g_3"},p["default"].createElement("path",{d:"M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z"}),p["default"].createElement("path",{d:"M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"}),p["default"].createElement("path",{d:"M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z"})),p["default"].createElement("path",{d:"M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18",className:"path_11"})));case"N":return p["default"].createElement("svg",null,p["default"].createElement("g",{className:"g_4",transform:t},p["default"].createElement("path",{d:"M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18",className:"path_12"}),p["default"].createElement("path",{d:"M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10",className:"path_13"}),p["default"].createElement("path",{d:"M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z",className:"path_14"}),p["default"].createElement("path",{d:"M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z",transform:"matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)",className:"path_15"})));case"P":return p["default"].createElement("svg",null,p["default"].createElement("g",{transform:t},p["default"].createElement("path",{d:"M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z ",className:"path_21"})));case"k":return p["default"].createElement("svg",null,p["default"].createElement("g",{className:"g_6",transform:t},p["default"].createElement("path",{d:"M 22.5,11.63 L 22.5,6",className:"path_22"}),p["default"].createElement("path",{d:"M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25",className:"path_23"}),p["default"].createElement("path",{d:"M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z ",className:"path_24"}),p["default"].createElement("path",{d:"M 20,8 L 25,8",className:"path_25"}),p["default"].createElement("path",{d:"M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.51,26.6 L 22.5,24.5 C 20,18 9.906,14 6.997,19.85 C 4.5,25.5 11.85,28.85 11.85,28.85",className:"path_26"}),p["default"].createElement("path",{d:"M 11.5,30 C 17,27 27,27 32.5,30 M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5 M 11.5,37 C 17,34 27,34 32.5,37",className:"path_27"})));case"q":return p["default"].createElement("svg",null,p["default"].createElement("g",{className:"g_7",transform:t},p["default"].createElement("g",{className:"g_8"},p["default"].createElement("circle",{cx:"6",cy:"12",r:"2.75"}),p["default"].createElement("circle",{cx:"14",cy:"9",r:"2.75"}),p["default"].createElement("circle",{cx:"22.5",cy:"8",r:"2.75"}),p["default"].createElement("circle",{cx:"31",cy:"9",r:"2.75"}),p["default"].createElement("circle",{cx:"39",cy:"12",r:"2.75"})),p["default"].createElement("path",{d:"M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z",className:"path_28"}),p["default"].createElement("path",{d:"M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z",className:"path_29"}),p["default"].createElement("path",{d:"M 11,38.5 A 35,35 1 0 0 34,38.5",className:"path_30"}),p["default"].createElement("path",{d:"M 10,28 A 20 10 1 0 1 35,28",className:"path_31"}),p["default"].createElement("path",{d:"M 11.5,30.5 C 15,29 30,29 33.5,30.5",className:"path_33"}),p["default"].createElement("path",{d:"M 12,33.5 C 18,32.5 27,32.5 33,33.5",className:"path_34"})));case"r":return p["default"].createElement("svg",null,p["default"].createElement("g",{className:"g_12",transform:t},p["default"].createElement("path",{d:"M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z ",className:"path_41"}),p["default"].createElement("path",{d:"M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z ",className:"path_42"}),p["default"].createElement("path",{d:"M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z ",className:"path_43"}),p["default"].createElement("path",{d:"M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z ",className:"path_44"}),p["default"].createElement("path",{d:"M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z ",className:"path_45"}),p["default"].createElement("path",{d:"M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z ",className:"path_46"}),p["default"].createElement("path",{d:"M 12,35.5 L 33,35.5 L 33,35.5",className:"path_47"}),p["default"].createElement("path",{d:"M 13,31.5 L 32,31.5",className:"path_48"}),p["default"].createElement("path",{d:"M 14,29.5 L 31,29.5",className:"path_49"}),p["default"].createElement("path",{d:"M 14,16.5 L 31,16.5",className:"path_50"}),p["default"].createElement("path",{d:"M 11,14 L 34,14",className:"path_51"})));case"b":return p["default"].createElement("svg",null,p["default"].createElement("g",{className:"g_9",transform:t},p["default"].createElement("g",{className:"g_10"},p["default"].createElement("path",{d:"M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z"}),p["default"].createElement("path",{d:"M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"}),p["default"].createElement("path",{d:"M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z"})),p["default"].createElement("path",{d:"M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18",className:"path_35"})));case"n":return p["default"].createElement("svg",null,p["default"].createElement("g",{className:"g_11",transform:t},p["default"].createElement("path",{d:"M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18",className:"path_36"}),p["default"].createElement("path",{d:"m 24,18 c 0.38,2.91 -5.55,7.37 -8,9 c -3,2 -2.82,4.34 -5,4 c -1.042,-0.94 2.508114,-2.95553 0.337881,-3.380116 c -2.170232,-0.424587 -1.45717,1.652351 -2.64717,2.422351 c -1,0 -2.693711,0.957765 -2.690711,-4.042235c0,-2 6,-12 6,-12 c 0,0 1.89,-1.9 2,-3.5 c -0.73,-0.994 -0.5,-2 -0.5,-3 c 1,-1 3,2.5 3,2.5 l2,0 c 0,0 0.78,-1.992 2.5,-3 c 1,0 1,3 1,3",className:"path_37"}),p["default"].createElement("path",{d:"M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z",className:"path_38"}),p["default"].createElement("path",{d:"M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z",transform:"matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)",className:"path_39"}),p["default"].createElement("path",{d:"M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 z ",className:"path_40"})));case"p":return p["default"].createElement("svg",null,p["default"].createElement("g",{transform:t},p["default"].createElement("path",{d:"M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z ",className:"path_52"})));default:return p["default"].createElement("svg",null)}}}]),t}(l.Component);u.propTypes={x:p["default"].PropTypes.number.isRequired,y:p["default"].PropTypes.number.isRequired,pieceType:p["default"].PropTypes.string.isRequired},t["default"]=u},function(e,t,r){t=e.exports=r(2)(),t.push([e.id,".g_0,.g_6{fill:none;fill-opacity:1;fill-rule:evenodd;stroke:#000;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1}.g_1,.g_5{fill:#fff;fill-opacity:1;fill-rule:evenodd}.g_1,.g_2,.g_5,.g_9{opacity:1;stroke:#000;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1}.g_2,.g_9{fill:none;fill-rule:evenodd;fill-opacity:1}.g_3{fill:#fff;stroke:#000;stroke-linecap:butt}.g_4{opacity:1;fill:none;fill-opacity:1;fill-rule:evenodd;stroke:#000;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1}.g_10{fill:#000;stroke:#000;stroke-linecap:butt}.g_11{fill:none;fill-opacity:1;fill-rule:evenodd}.g_7,.g_11,.g_12{opacity:1;stroke:#000;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1}.g_7,.g_12{fill:#000;fill-opacity:1;fill-rule:evenodd}.g_8{fill:#000;stroke:none}.path_0,.path_1,.path_11,.path_20,.path_22,.path_25{fill:none;stroke:#000;stroke-linejoin:miter}.path_2{fill:#fff;stroke:#000;stroke-linecap:butt;stroke-linejoin:miter}.path_3,.path_12,.path_13{fill:#fff;stroke:#000}.path_13{stroke-width:1.4}.path_4,.path_5,.path_6{fill:none;stroke:#000}.path_7,.path_8,.path_16,.path_17,.path_18,.path_29,.path_41,.path_42,.path_43,.path_45,.path_46{stroke-linecap:butt}.path_9,.path_10{fill:none}.path_14,.path_15,.path_24,.path_36,.path_37{fill:#000;stroke:#000}.path_37{stroke-width:1.4}.path_19{stroke-linecap:butt;stroke-linejoin:miter}.path_21{opacity:1;fill:#fff;fill-opacity:1;fill-rule:nonzero;stroke:#000;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1}.path_23{fill:#000;fill-opacity:1;stroke-linecap:butt;stroke-linejoin:miter}.path_26,.path_27,.path_31,.path_32,.path_33,.path_34{fill:none;stroke:#fff}.path_28,.path_30{stroke-linecap:butt;stroke:#000}.path_30,.path_35{fill:none}.path_35{stroke:#fff;stroke-linejoin:miter}.path_38,.path_39{fill:#fff;stroke:#fff}.path_40{fill:#fff;stroke:none}.path_44{stroke-linecap:butt;stroke-linejoin:miter}.path_47,.path_48,.path_49,.path_50,.path_51{fill:none;stroke:#fff;stroke-width:1;stroke-linejoin:miter}.path_52{opacity:1;fill:#000;fill-opacity:1;fill-rule:nonzero;stroke:#000;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1}",""]);
},function(e,t,r){var a=r(8);"string"==typeof a&&(a=[[e.id,a,""]]);r(3)(a,{});a.locals&&(e.exports=a.locals)}])});