(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"8+s/":function(t,e,n){"use strict";var r,o=n("q1tI"),i=(r=o)&&"object"==typeof r&&"default"in r?r.default:r;function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var c=!("undefined"==typeof window||!window.document||!window.document.createElement);t.exports=function(t,e,n){if("function"!=typeof t)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof e)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(r){if("function"!=typeof r)throw new Error("Expected WrappedComponent to be a React component.");var u,s=[];function f(){u=t(s.map((function(t){return t.props}))),l.canUseDOM?e(u):n&&(u=n(u))}var l=function(t){var e,n;function o(){return t.apply(this,arguments)||this}n=t,(e=o).prototype=Object.create(n.prototype),e.prototype.constructor=e,e.__proto__=n,o.peek=function(){return u},o.rewind=function(){if(o.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var t=u;return u=void 0,s=[],t};var a=o.prototype;return a.UNSAFE_componentWillMount=function(){s.push(this),f()},a.componentDidUpdate=function(){f()},a.componentWillUnmount=function(){var t=s.indexOf(this);s.splice(t,1),f()},a.render=function(){return i.createElement(r,this.props)},o}(o.PureComponent);return a(l,"displayName","SideEffect("+function(t){return t.displayName||t.name||"Component"}(r)+")"),a(l,"canUseDOM",c),l}}},bmMU:function(t,e){var n="undefined"!=typeof Element,r="function"==typeof Map,o="function"==typeof Set,i="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;t.exports=function(t,e){try{return function t(e,a){if(e===a)return!0;if(e&&a&&"object"==typeof e&&"object"==typeof a){if(e.constructor!==a.constructor)return!1;var c,u,s,f;if(Array.isArray(e)){if((c=e.length)!=a.length)return!1;for(u=c;0!=u--;)if(!t(e[u],a[u]))return!1;return!0}if(r&&e instanceof Map&&a instanceof Map){if(e.size!==a.size)return!1;for(f=e.entries();!(u=f.next()).done;)if(!a.has(u.value[0]))return!1;for(f=e.entries();!(u=f.next()).done;)if(!t(u.value[1],a.get(u.value[0])))return!1;return!0}if(o&&e instanceof Set&&a instanceof Set){if(e.size!==a.size)return!1;for(f=e.entries();!(u=f.next()).done;)if(!a.has(u.value[0]))return!1;return!0}if(i&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(a)){if((c=e.length)!=a.length)return!1;for(u=c;0!=u--;)if(e[u]!==a[u])return!1;return!0}if(e.constructor===RegExp)return e.source===a.source&&e.flags===a.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===a.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===a.toString();if((c=(s=Object.keys(e)).length)!==Object.keys(a).length)return!1;for(u=c;0!=u--;)if(!Object.prototype.hasOwnProperty.call(a,s[u]))return!1;if(n&&e instanceof Element)return!1;for(u=c;0!=u--;)if(("_owner"!==s[u]&&"__v"!==s[u]&&"__o"!==s[u]||!e.$$typeof)&&!t(e[s[u]],a[s[u]]))return!1;return!0}return e!=e&&a!=a}(t,e)}catch(a){if((a.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw a}}},qhky:function(t,e,n){"use strict";(function(t){n.d(e,"a",(function(){return mt}));n("E9XD");var r,o,i,a,c=n("17x9"),u=n.n(c),s=n("8+s/"),f=n.n(s),l=n("bmMU"),p=n.n(l),d=n("q1tI"),h=n.n(d),m=n("YVoz"),y=n.n(m),b="bodyAttributes",g="htmlAttributes",T="titleAttributes",v={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},w=(Object.keys(v).map((function(t){return v[t]})),"charset"),A="cssText",O="href",S="http-equiv",C="innerHTML",E="itemprop",k="name",j="property",x="rel",P="src",I="target",L={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},z="defaultTitle",M="defer",N="encodeSpecialCharacters",q="onChangeClientState",R="titleTemplate",F=Object.keys(L).reduce((function(t,e){return t[L[e]]=e,t}),{}),_=[v.NOSCRIPT,v.SCRIPT,v.STYLE],H="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},B=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},D=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),U=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Y=function(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n},W=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},K=function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===e?String(t):String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},V=function(t){var e=Q(t,v.TITLE),n=Q(t,R);if(n&&e)return n.replace(/%s/g,(function(){return Array.isArray(e)?e.join(""):e}));var r=Q(t,z);return e||r||void 0},J=function(t){return Q(t,q)||function(){}},$=function(t,e){return e.filter((function(e){return void 0!==e[t]})).map((function(e){return e[t]})).reduce((function(t,e){return U({},t,e)}),{})},X=function(t,e){return e.filter((function(t){return void 0!==t[v.BASE]})).map((function(t){return t[v.BASE]})).reverse().reduce((function(e,n){if(!e.length)for(var r=Object.keys(n),o=0;o<r.length;o++){var i=r[o].toLowerCase();if(-1!==t.indexOf(i)&&n[i])return e.concat(n)}return e}),[])},G=function(t,e,n){var r={};return n.filter((function(e){return!!Array.isArray(e[t])||(void 0!==e[t]&&rt("Helmet: "+t+' should be of type "Array". Instead found type "'+H(e[t])+'"'),!1)})).map((function(e){return e[t]})).reverse().reduce((function(t,n){var o={};n.filter((function(t){for(var n=void 0,i=Object.keys(t),a=0;a<i.length;a++){var c=i[a],u=c.toLowerCase();-1===e.indexOf(u)||n===x&&"canonical"===t[n].toLowerCase()||u===x&&"stylesheet"===t[u].toLowerCase()||(n=u),-1===e.indexOf(c)||c!==C&&c!==A&&c!==E||(n=c)}if(!n||!t[n])return!1;var s=t[n].toLowerCase();return r[n]||(r[n]={}),o[n]||(o[n]={}),!r[n][s]&&(o[n][s]=!0,!0)})).reverse().forEach((function(e){return t.push(e)}));for(var i=Object.keys(o),a=0;a<i.length;a++){var c=i[a],u=y()({},r[c],o[c]);r[c]=u}return t}),[]).reverse()},Q=function(t,e){for(var n=t.length-1;n>=0;n--){var r=t[n];if(r.hasOwnProperty(e))return r[e]}return null},Z=(r=Date.now(),function(t){var e=Date.now();e-r>16?(r=e,t(e)):setTimeout((function(){Z(t)}),0)}),tt=function(t){return clearTimeout(t)},et="undefined"!=typeof window?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||Z:t.requestAnimationFrame||Z,nt="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||tt:t.cancelAnimationFrame||tt,rt=function(t){return console&&"function"==typeof console.warn&&console.warn(t)},ot=null,it=function(t,e){var n=t.baseTag,r=t.bodyAttributes,o=t.htmlAttributes,i=t.linkTags,a=t.metaTags,c=t.noscriptTags,u=t.onChangeClientState,s=t.scriptTags,f=t.styleTags,l=t.title,p=t.titleAttributes;ut(v.BODY,r),ut(v.HTML,o),ct(l,p);var d={baseTag:st(v.BASE,n),linkTags:st(v.LINK,i),metaTags:st(v.META,a),noscriptTags:st(v.NOSCRIPT,c),scriptTags:st(v.SCRIPT,s),styleTags:st(v.STYLE,f)},h={},m={};Object.keys(d).forEach((function(t){var e=d[t],n=e.newTags,r=e.oldTags;n.length&&(h[t]=n),r.length&&(m[t]=d[t].oldTags)})),e&&e(),u(t,h,m)},at=function(t){return Array.isArray(t)?t.join(""):t},ct=function(t,e){void 0!==t&&document.title!==t&&(document.title=at(t)),ut(v.TITLE,e)},ut=function(t,e){var n=document.getElementsByTagName(t)[0];if(n){for(var r=n.getAttribute("data-react-helmet"),o=r?r.split(","):[],i=[].concat(o),a=Object.keys(e),c=0;c<a.length;c++){var u=a[c],s=e[u]||"";n.getAttribute(u)!==s&&n.setAttribute(u,s),-1===o.indexOf(u)&&o.push(u);var f=i.indexOf(u);-1!==f&&i.splice(f,1)}for(var l=i.length-1;l>=0;l--)n.removeAttribute(i[l]);o.length===i.length?n.removeAttribute("data-react-helmet"):n.getAttribute("data-react-helmet")!==a.join(",")&&n.setAttribute("data-react-helmet",a.join(","))}},st=function(t,e){var n=document.head||document.querySelector(v.HEAD),r=n.querySelectorAll(t+"[data-react-helmet]"),o=Array.prototype.slice.call(r),i=[],a=void 0;return e&&e.length&&e.forEach((function(e){var n=document.createElement(t);for(var r in e)if(e.hasOwnProperty(r))if(r===C)n.innerHTML=e.innerHTML;else if(r===A)n.styleSheet?n.styleSheet.cssText=e.cssText:n.appendChild(document.createTextNode(e.cssText));else{var c=void 0===e[r]?"":e[r];n.setAttribute(r,c)}n.setAttribute("data-react-helmet","true"),o.some((function(t,e){return a=e,n.isEqualNode(t)}))?o.splice(a,1):i.push(n)})),o.forEach((function(t){return t.parentNode.removeChild(t)})),i.forEach((function(t){return n.appendChild(t)})),{oldTags:o,newTags:i}},ft=function(t){return Object.keys(t).reduce((function(e,n){var r=void 0!==t[n]?n+'="'+t[n]+'"':""+n;return e?e+" "+r:r}),"")},lt=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(t).reduce((function(e,n){return e[L[n]||n]=t[n],e}),e)},pt=function(t,e,n){switch(t){case v.TITLE:return{toComponent:function(){return t=e.title,n=e.titleAttributes,(r={key:t})["data-react-helmet"]=!0,o=lt(n,r),[h.a.createElement(v.TITLE,o,t)];var t,n,r,o},toString:function(){return function(t,e,n,r){var o=ft(n),i=at(e);return o?"<"+t+' data-react-helmet="true" '+o+">"+K(i,r)+"</"+t+">":"<"+t+' data-react-helmet="true">'+K(i,r)+"</"+t+">"}(t,e.title,e.titleAttributes,n)}};case b:case g:return{toComponent:function(){return lt(e)},toString:function(){return ft(e)}};default:return{toComponent:function(){return function(t,e){return e.map((function(e,n){var r,o=((r={key:n})["data-react-helmet"]=!0,r);return Object.keys(e).forEach((function(t){var n=L[t]||t;if(n===C||n===A){var r=e.innerHTML||e.cssText;o.dangerouslySetInnerHTML={__html:r}}else o[n]=e[t]})),h.a.createElement(t,o)}))}(t,e)},toString:function(){return function(t,e,n){return e.reduce((function(e,r){var o=Object.keys(r).filter((function(t){return!(t===C||t===A)})).reduce((function(t,e){var o=void 0===r[e]?e:e+'="'+K(r[e],n)+'"';return t?t+" "+o:o}),""),i=r.innerHTML||r.cssText||"",a=-1===_.indexOf(t);return e+"<"+t+' data-react-helmet="true" '+o+(a?"/>":">"+i+"</"+t+">")}),"")}(t,e,n)}}}},dt=function(t){var e=t.baseTag,n=t.bodyAttributes,r=t.encode,o=t.htmlAttributes,i=t.linkTags,a=t.metaTags,c=t.noscriptTags,u=t.scriptTags,s=t.styleTags,f=t.title,l=void 0===f?"":f,p=t.titleAttributes;return{base:pt(v.BASE,e,r),bodyAttributes:pt(b,n,r),htmlAttributes:pt(g,o,r),link:pt(v.LINK,i,r),meta:pt(v.META,a,r),noscript:pt(v.NOSCRIPT,c,r),script:pt(v.SCRIPT,u,r),style:pt(v.STYLE,s,r),title:pt(v.TITLE,{title:l,titleAttributes:p},r)}},ht=f()((function(t){return{baseTag:X([O,I],t),bodyAttributes:$(b,t),defer:Q(t,M),encode:Q(t,N),htmlAttributes:$(g,t),linkTags:G(v.LINK,[x,O],t),metaTags:G(v.META,[k,w,S,j,E],t),noscriptTags:G(v.NOSCRIPT,[C],t),onChangeClientState:J(t),scriptTags:G(v.SCRIPT,[P,C],t),styleTags:G(v.STYLE,[A],t),title:V(t),titleAttributes:$(T,t)}}),(function(t){ot&&nt(ot),t.defer?ot=et((function(){it(t,(function(){ot=null}))})):(it(t),ot=null)}),dt)((function(){return null})),mt=(o=ht,a=i=function(t){function e(){return B(this,e),W(this,t.apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e.prototype.shouldComponentUpdate=function(t){return!p()(this.props,t)},e.prototype.mapNestedChildrenToProps=function(t,e){if(!e)return null;switch(t.type){case v.SCRIPT:case v.NOSCRIPT:return{innerHTML:e};case v.STYLE:return{cssText:e}}throw new Error("<"+t.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},e.prototype.flattenArrayTypeChildren=function(t){var e,n=t.child,r=t.arrayTypeChildren,o=t.newChildProps,i=t.nestedChildren;return U({},r,((e={})[n.type]=[].concat(r[n.type]||[],[U({},o,this.mapNestedChildrenToProps(n,i))]),e))},e.prototype.mapObjectTypeChildren=function(t){var e,n,r=t.child,o=t.newProps,i=t.newChildProps,a=t.nestedChildren;switch(r.type){case v.TITLE:return U({},o,((e={})[r.type]=a,e.titleAttributes=U({},i),e));case v.BODY:return U({},o,{bodyAttributes:U({},i)});case v.HTML:return U({},o,{htmlAttributes:U({},i)})}return U({},o,((n={})[r.type]=U({},i),n))},e.prototype.mapArrayTypeChildrenToProps=function(t,e){var n=U({},e);return Object.keys(t).forEach((function(e){var r;n=U({},n,((r={})[e]=t[e],r))})),n},e.prototype.warnOnInvalidChildren=function(t,e){return!0},e.prototype.mapChildrenToProps=function(t,e){var n=this,r={};return h.a.Children.forEach(t,(function(t){if(t&&t.props){var o=t.props,i=o.children,a=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(t).reduce((function(e,n){return e[F[n]||n]=t[n],e}),e)}(Y(o,["children"]));switch(n.warnOnInvalidChildren(t,i),t.type){case v.LINK:case v.META:case v.NOSCRIPT:case v.SCRIPT:case v.STYLE:r=n.flattenArrayTypeChildren({child:t,arrayTypeChildren:r,newChildProps:a,nestedChildren:i});break;default:e=n.mapObjectTypeChildren({child:t,newProps:e,newChildProps:a,nestedChildren:i})}}})),e=this.mapArrayTypeChildrenToProps(r,e)},e.prototype.render=function(){var t=this.props,e=t.children,n=Y(t,["children"]),r=U({},n);return e&&(r=this.mapChildrenToProps(e,r)),h.a.createElement(o,r)},D(e,null,[{key:"canUseDOM",set:function(t){o.canUseDOM=t}}]),e}(h.a.Component),i.propTypes={base:u.a.object,bodyAttributes:u.a.object,children:u.a.oneOfType([u.a.arrayOf(u.a.node),u.a.node]),defaultTitle:u.a.string,defer:u.a.bool,encodeSpecialCharacters:u.a.bool,htmlAttributes:u.a.object,link:u.a.arrayOf(u.a.object),meta:u.a.arrayOf(u.a.object),noscript:u.a.arrayOf(u.a.object),onChangeClientState:u.a.func,script:u.a.arrayOf(u.a.object),style:u.a.arrayOf(u.a.object),title:u.a.string,titleAttributes:u.a.object,titleTemplate:u.a.string},i.defaultProps={defer:!0,encodeSpecialCharacters:!0},i.peek=o.peek,i.rewind=function(){var t=o.rewind();return t||(t=dt({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),t},a);mt.renderStatic=mt.rewind,e.b=mt}).call(this,n("yLpj"))},soUV:function(t,e,n){"use strict";n.d(e,"a",(function(){return f}));n("q1tI");var r=n("AeFk"),o=n("cSFU"),i={mobile:360,phablet:550,tablet:750,desktop:1e3,hd:1300},a=function(t){return"@media (min-width: "+t+"px)"},c={breakpoints:i,mq:{mobile:a(i.mobile),phablet:a(i.phablet),tablet:a(i.tablet),desktop:a(i.desktop),hd:a(i.hd)},spaces:[4,8,12,16,24,32,48,64,96].map((function(t){return t+"px"})),fontSizes:[.8,.9,1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9].map((function(t){return t+"rem"})),colors:{primary:"hsl(231, 48%, 48%)",text:"hsl(231, 48%, 22%)",background:"hsl(360, 100%, 100%)",background2:"hsl(231, 48%, 90%)"},fontWeights:{text:400,heading:600}},u=function(t){return Object(r.b)('html,body{margin:0;padding:0;}body{font-family:-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;background:',t.colors.background,";font-size:16px;line-height:1.7;}p{margin:0;padding:0;margin-bottom:",t.spaces[4],";color:",t.colors.text,";font-weight:",t.fontWeights.text,";}a{color:unset;font-weight:",t.colors.text,";}a:active{opacity:0.5;}ul{margin:0;padding:0;margin-bottom:",t.spaces[4],";margin-left:",t.spaces[2],";}",t.mq.desktop,"{ul{margin-left:",t.spaces[5],";}}.gatsby-highlight{margin-bottom:",t.spaces[4],";font-size:",t.fontSizes[0],";}li{margin:0;padding:0;margin-bottom:",t.spaces[2],";color:",t.colors.text,";font-weight:",t.fontWeights.text,";&:last-of-type{margin-bottom:0;}}h1,h2,h3,h4,h5,h6{margin:0;padding:0;font-weight:",t.fontWeights.heading,";}h1{color:",t.colors.primary,";margin-bottom:",t.spaces[2],";font-size:",t.fontSizes[5],";}h2{margin-bottom:",t.spaces[4],";font-size:",t.fontSizes[5],";}h3{margin-bottom:",t.spaces[3],";font-size:",t.fontSizes[3],";}",t.mq.desktop,"{h1{font-size:",t.fontSizes[8],";}h2{font-size:",t.fontSizes[7],";}h3{font-size:",t.fontSizes[5],";}}code.language-text{font-size:",t.fontSizes[0],";padding:",t.spaces[0]," ",t.spaces[1],"!important;vertical-align:middle!important;background:",t.colors.background2,"!important;color:",t.colors.text,";height:100%;}.token.script.language-javascript,.token.tag,.token.constant{color:#FF6347;}",t.mq.desktop,"{code.language-text{font-size:",t.fontSizes[1],";}}time{display:block;font-size:",t.fontSizes[1],";margin-bottom:",t.spaces[4],";}","")},s=Object(o.d)((function(t){var e=t.theme;return Object(r.c)(r.a,{styles:u(e)})})),f=function(t){var e=t.children;return Object(r.c)(o.c,{theme:c},Object(r.c)(s,null),e)}},uHth:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));n("q1tI");var r=n("AeFk"),o=function(t){var e=t.children;return Object(r.c)("div",{css:function(t){var e;return(e={marginTop:t.spaces[4],marginLeft:t.spaces[4],marginRight:t.spaces[4]})[t.mq.desktop]={margin:t.spaces[5]+" auto",width:"65ch"},e}},e)}}}]);
//# sourceMappingURL=6eb610abcce4d0fad5f5f9aaf8ec8b37041f2811-639a158acd09c1783239.js.map