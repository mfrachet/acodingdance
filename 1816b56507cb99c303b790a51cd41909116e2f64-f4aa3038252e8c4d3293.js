(self.webpackChunkmfrachet_github_io=self.webpackChunkmfrachet_github_io||[]).push([[676],{2993:function(e){var t="undefined"!=typeof Element,n="function"==typeof Map,r="function"==typeof Set,o="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;function i(e,a){if(e===a)return!0;if(e&&a&&"object"==typeof e&&"object"==typeof a){if(e.constructor!==a.constructor)return!1;var u,c,s,l;if(Array.isArray(e)){if((u=e.length)!=a.length)return!1;for(c=u;0!=c--;)if(!i(e[c],a[c]))return!1;return!0}if(n&&e instanceof Map&&a instanceof Map){if(e.size!==a.size)return!1;for(l=e.entries();!(c=l.next()).done;)if(!a.has(c.value[0]))return!1;for(l=e.entries();!(c=l.next()).done;)if(!i(c.value[1],a.get(c.value[0])))return!1;return!0}if(r&&e instanceof Set&&a instanceof Set){if(e.size!==a.size)return!1;for(l=e.entries();!(c=l.next()).done;)if(!a.has(c.value[0]))return!1;return!0}if(o&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(a)){if((u=e.length)!=a.length)return!1;for(c=u;0!=c--;)if(e[c]!==a[c])return!1;return!0}if(e.constructor===RegExp)return e.source===a.source&&e.flags===a.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===a.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===a.toString();if((u=(s=Object.keys(e)).length)!==Object.keys(a).length)return!1;for(c=u;0!=c--;)if(!Object.prototype.hasOwnProperty.call(a,s[c]))return!1;if(t&&e instanceof Element)return!1;for(c=u;0!=c--;)if(("_owner"!==s[c]&&"__v"!==s[c]&&"__o"!==s[c]||!e.$$typeof)&&!i(e[s[c]],a[s[c]]))return!1;return!0}return e!=e&&a!=a}e.exports=function(e,t){try{return i(e,t)}catch(n){if((n.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw n}}},5414:function(e,t,n){"use strict";var r,o,i,a,u=n(5697),c=n.n(u),s=n(4839),l=n.n(s),f=n(2993),d=n.n(f),p=n(7294),h=n(6494),m=n.n(h),y="bodyAttributes",b="htmlAttributes",g="titleAttributes",v={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},w=(Object.keys(v).map((function(e){return v[e]})),"charset"),T="cssText",C="href",E="http-equiv",S="innerHTML",O="itemprop",A="name",k="property",x="rel",P="src",j="target",L={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},I="defaultTitle",M="defer",D="encodeSpecialCharacters",N="onChangeClientState",_="titleTemplate",q=Object.keys(L).reduce((function(e,t){return e[L[t]]=t,e}),{}),R=[v.NOSCRIPT,v.SCRIPT,v.STYLE],z="data-react-helmet",B="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},W=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},Z=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),H=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},F=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},U=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},K=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},Y=function(e){var t=X(e,v.TITLE),n=X(e,_);if(n&&t)return n.replace(/%s/g,(function(){return Array.isArray(t)?t.join(""):t}));var r=X(e,I);return t||r||void 0},V=function(e){return X(e,N)||function(){}},$=function(e,t){return t.filter((function(t){return void 0!==t[e]})).map((function(t){return t[e]})).reduce((function(e,t){return H({},e,t)}),{})},G=function(e,t){return t.filter((function(e){return void 0!==e[v.BASE]})).map((function(e){return e[v.BASE]})).reverse().reduce((function(t,n){if(!t.length)for(var r=Object.keys(n),o=0;o<r.length;o++){var i=r[o].toLowerCase();if(-1!==e.indexOf(i)&&n[i])return t.concat(n)}return t}),[])},J=function(e,t,n){var r={};return n.filter((function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&re("Helmet: "+e+' should be of type "Array". Instead found type "'+B(t[e])+'"'),!1)})).map((function(t){return t[e]})).reverse().reduce((function(e,n){var o={};n.filter((function(e){for(var n=void 0,i=Object.keys(e),a=0;a<i.length;a++){var u=i[a],c=u.toLowerCase();-1===t.indexOf(c)||n===x&&"canonical"===e[n].toLowerCase()||c===x&&"stylesheet"===e[c].toLowerCase()||(n=c),-1===t.indexOf(u)||u!==S&&u!==T&&u!==O||(n=u)}if(!n||!e[n])return!1;var s=e[n].toLowerCase();return r[n]||(r[n]={}),o[n]||(o[n]={}),!r[n][s]&&(o[n][s]=!0,!0)})).reverse().forEach((function(t){return e.push(t)}));for(var i=Object.keys(o),a=0;a<i.length;a++){var u=i[a],c=m()({},r[u],o[u]);r[u]=c}return e}),[]).reverse()},X=function(e,t){for(var n=e.length-1;n>=0;n--){var r=e[n];if(r.hasOwnProperty(t))return r[t]}return null},Q=(r=Date.now(),function(e){var t=Date.now();t-r>16?(r=t,e(t)):setTimeout((function(){Q(e)}),0)}),ee=function(e){return clearTimeout(e)},te="undefined"!=typeof window?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||Q:n.g.requestAnimationFrame||Q,ne="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||ee:n.g.cancelAnimationFrame||ee,re=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},oe=null,ie=function(e,t){var n=e.baseTag,r=e.bodyAttributes,o=e.htmlAttributes,i=e.linkTags,a=e.metaTags,u=e.noscriptTags,c=e.onChangeClientState,s=e.scriptTags,l=e.styleTags,f=e.title,d=e.titleAttributes;ce(v.BODY,r),ce(v.HTML,o),ue(f,d);var p={baseTag:se(v.BASE,n),linkTags:se(v.LINK,i),metaTags:se(v.META,a),noscriptTags:se(v.NOSCRIPT,u),scriptTags:se(v.SCRIPT,s),styleTags:se(v.STYLE,l)},h={},m={};Object.keys(p).forEach((function(e){var t=p[e],n=t.newTags,r=t.oldTags;n.length&&(h[e]=n),r.length&&(m[e]=p[e].oldTags)})),t&&t(),c(e,h,m)},ae=function(e){return Array.isArray(e)?e.join(""):e},ue=function(e,t){void 0!==e&&document.title!==e&&(document.title=ae(e)),ce(v.TITLE,t)},ce=function(e,t){var n=document.getElementsByTagName(e)[0];if(n){for(var r=n.getAttribute(z),o=r?r.split(","):[],i=[].concat(o),a=Object.keys(t),u=0;u<a.length;u++){var c=a[u],s=t[c]||"";n.getAttribute(c)!==s&&n.setAttribute(c,s),-1===o.indexOf(c)&&o.push(c);var l=i.indexOf(c);-1!==l&&i.splice(l,1)}for(var f=i.length-1;f>=0;f--)n.removeAttribute(i[f]);o.length===i.length?n.removeAttribute(z):n.getAttribute(z)!==a.join(",")&&n.setAttribute(z,a.join(","))}},se=function(e,t){var n=document.head||document.querySelector(v.HEAD),r=n.querySelectorAll(e+"["+"data-react-helmet]"),o=Array.prototype.slice.call(r),i=[],a=void 0;return t&&t.length&&t.forEach((function(t){var n=document.createElement(e);for(var r in t)if(t.hasOwnProperty(r))if(r===S)n.innerHTML=t.innerHTML;else if(r===T)n.styleSheet?n.styleSheet.cssText=t.cssText:n.appendChild(document.createTextNode(t.cssText));else{var u=void 0===t[r]?"":t[r];n.setAttribute(r,u)}n.setAttribute(z,"true"),o.some((function(e,t){return a=t,n.isEqualNode(e)}))?o.splice(a,1):i.push(n)})),o.forEach((function(e){return e.parentNode.removeChild(e)})),i.forEach((function(e){return n.appendChild(e)})),{oldTags:o,newTags:i}},le=function(e){return Object.keys(e).reduce((function(t,n){var r=void 0!==e[n]?n+'="'+e[n]+'"':""+n;return t?t+" "+r:r}),"")},fe=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,n){return t[L[n]||n]=e[n],t}),t)},de=function(e,t,n){switch(e){case v.TITLE:return{toComponent:function(){return e=t.title,n=t.titleAttributes,(r={key:e})[z]=!0,o=fe(n,r),[p.createElement(v.TITLE,o,e)];var e,n,r,o},toString:function(){return function(e,t,n,r){var o=le(n),i=ae(t);return o?"<"+e+' data-react-helmet="true" '+o+">"+K(i,r)+"</"+e+">":"<"+e+' data-react-helmet="true">'+K(i,r)+"</"+e+">"}(e,t.title,t.titleAttributes,n)}};case y:case b:return{toComponent:function(){return fe(t)},toString:function(){return le(t)}};default:return{toComponent:function(){return function(e,t){return t.map((function(t,n){var r,o=((r={key:n})[z]=!0,r);return Object.keys(t).forEach((function(e){var n=L[e]||e;if(n===S||n===T){var r=t.innerHTML||t.cssText;o.dangerouslySetInnerHTML={__html:r}}else o[n]=t[e]})),p.createElement(e,o)}))}(e,t)},toString:function(){return function(e,t,n){return t.reduce((function(t,r){var o=Object.keys(r).filter((function(e){return!(e===S||e===T)})).reduce((function(e,t){var o=void 0===r[t]?t:t+'="'+K(r[t],n)+'"';return e?e+" "+o:o}),""),i=r.innerHTML||r.cssText||"",a=-1===R.indexOf(e);return t+"<"+e+' data-react-helmet="true" '+o+(a?"/>":">"+i+"</"+e+">")}),"")}(e,t,n)}}}},pe=function(e){var t=e.baseTag,n=e.bodyAttributes,r=e.encode,o=e.htmlAttributes,i=e.linkTags,a=e.metaTags,u=e.noscriptTags,c=e.scriptTags,s=e.styleTags,l=e.title,f=void 0===l?"":l,d=e.titleAttributes;return{base:de(v.BASE,t,r),bodyAttributes:de(y,n,r),htmlAttributes:de(b,o,r),link:de(v.LINK,i,r),meta:de(v.META,a,r),noscript:de(v.NOSCRIPT,u,r),script:de(v.SCRIPT,c,r),style:de(v.STYLE,s,r),title:de(v.TITLE,{title:f,titleAttributes:d},r)}},he=l()((function(e){return{baseTag:G([C,j],e),bodyAttributes:$(y,e),defer:X(e,M),encode:X(e,D),htmlAttributes:$(b,e),linkTags:J(v.LINK,[x,C],e),metaTags:J(v.META,[A,w,E,k,O],e),noscriptTags:J(v.NOSCRIPT,[S],e),onChangeClientState:V(e),scriptTags:J(v.SCRIPT,[P,S],e),styleTags:J(v.STYLE,[T],e),title:Y(e),titleAttributes:$(g,e)}}),(function(e){oe&&ne(oe),e.defer?oe=te((function(){ie(e,(function(){oe=null}))})):(ie(e),oe=null)}),pe)((function(){return null})),me=(o=he,a=i=function(e){function t(){return W(this,t),U(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.shouldComponentUpdate=function(e){return!d()(this.props,e)},t.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case v.SCRIPT:case v.NOSCRIPT:return{innerHTML:t};case v.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},t.prototype.flattenArrayTypeChildren=function(e){var t,n=e.child,r=e.arrayTypeChildren,o=e.newChildProps,i=e.nestedChildren;return H({},r,((t={})[n.type]=[].concat(r[n.type]||[],[H({},o,this.mapNestedChildrenToProps(n,i))]),t))},t.prototype.mapObjectTypeChildren=function(e){var t,n,r=e.child,o=e.newProps,i=e.newChildProps,a=e.nestedChildren;switch(r.type){case v.TITLE:return H({},o,((t={})[r.type]=a,t.titleAttributes=H({},i),t));case v.BODY:return H({},o,{bodyAttributes:H({},i)});case v.HTML:return H({},o,{htmlAttributes:H({},i)})}return H({},o,((n={})[r.type]=H({},i),n))},t.prototype.mapArrayTypeChildrenToProps=function(e,t){var n=H({},t);return Object.keys(e).forEach((function(t){var r;n=H({},n,((r={})[t]=e[t],r))})),n},t.prototype.warnOnInvalidChildren=function(e,t){return!0},t.prototype.mapChildrenToProps=function(e,t){var n=this,r={};return p.Children.forEach(e,(function(e){if(e&&e.props){var o=e.props,i=o.children,a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,n){return t[q[n]||n]=e[n],t}),t)}(F(o,["children"]));switch(n.warnOnInvalidChildren(e,i),e.type){case v.LINK:case v.META:case v.NOSCRIPT:case v.SCRIPT:case v.STYLE:r=n.flattenArrayTypeChildren({child:e,arrayTypeChildren:r,newChildProps:a,nestedChildren:i});break;default:t=n.mapObjectTypeChildren({child:e,newProps:t,newChildProps:a,nestedChildren:i})}}})),t=this.mapArrayTypeChildrenToProps(r,t)},t.prototype.render=function(){var e=this.props,t=e.children,n=F(e,["children"]),r=H({},n);return t&&(r=this.mapChildrenToProps(t,r)),p.createElement(o,r)},Z(t,null,[{key:"canUseDOM",set:function(e){o.canUseDOM=e}}]),t}(p.Component),i.propTypes={base:c().object,bodyAttributes:c().object,children:c().oneOfType([c().arrayOf(c().node),c().node]),defaultTitle:c().string,defer:c().bool,encodeSpecialCharacters:c().bool,htmlAttributes:c().object,link:c().arrayOf(c().object),meta:c().arrayOf(c().object),noscript:c().arrayOf(c().object),onChangeClientState:c().func,script:c().arrayOf(c().object),style:c().arrayOf(c().object),title:c().string,titleAttributes:c().object,titleTemplate:c().string},i.defaultProps={defer:!0,encodeSpecialCharacters:!0},i.peek=o.peek,i.rewind=function(){var e=o.rewind();return e||(e=pe({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),e},a);me.renderStatic=me.rewind,t.Z=me},4839:function(e,t,n){"use strict";var r,o=n(7294),i=(r=o)&&"object"==typeof r&&"default"in r?r.default:r;function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u=!("undefined"==typeof window||!window.document||!window.document.createElement);e.exports=function(e,t,n){if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(r){if("function"!=typeof r)throw new Error("Expected WrappedComponent to be a React component.");var c,s=[];function l(){c=e(s.map((function(e){return e.props}))),f.canUseDOM?t(c):n&&(c=n(c))}var f=function(e){var t,n;function o(){return e.apply(this,arguments)||this}n=e,(t=o).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,o.peek=function(){return c},o.rewind=function(){if(o.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=c;return c=void 0,s=[],e};var a=o.prototype;return a.UNSAFE_componentWillMount=function(){s.push(this),l()},a.componentDidUpdate=function(){l()},a.componentWillUnmount=function(){var e=s.indexOf(this);s.splice(e,1),l()},a.render=function(){return i.createElement(r,this.props)},o}(o.PureComponent);return a(f,"displayName","SideEffect("+function(e){return e.displayName||e.name||"Component"}(r)+")"),a(f,"canUseDOM",u),f}}},6810:function(e,t,n){"use strict";n.d(t,{W:function(){return r}});var r=n(9).ZP.div.withConfig({displayName:"Container",componentId:"ff6vd5-0"})(["","{margin:0 auto;width:80ch;}"],(function(e){return e.theme.mq.tablet}))},7259:function(e,t,n){"use strict";n.d(t,{V:function(){return r}});var r=n(9).ZP.div.withConfig({displayName:"Content",componentId:"sc-1am9e3c-0"})(["padding:0 ",";max-width:100vw;background:",";","{padding:0 ",";border-radius:",";width:80ch;}"],(function(e){return e.theme.spaces[4]}),(function(e){return e.theme.colors.textInverse}),(function(e){return e.theme.mq.desktop}),(function(e){return e.theme.spaces[6]}),(function(e){return e.theme.radius[2]}))},9357:function(e,t,n){"use strict";n.d(t,{n:function(){return a}});var r,o,i,a=(0,n(9).vJ)(r||(o=['\n  /* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n  html,\n  body,\n  div,\n  span,\n  applet,\n  object,\n  iframe,\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6,\n  p,\n  blockquote,\n  pre,\n  a,\n  abbr,\n  acronym,\n  address,\n  big,\n  cite,\n  code,\n  del,\n  dfn,\n  em,\n  img,\n  ins,\n  kbd,\n  q,\n  s,\n  samp,\n  small,\n  strike,\n  strong,\n  sub,\n  sup,\n  tt,\n  var,\n  b,\n  u,\n  i,\n  center,\n  dl,\n  dt,\n  dd,\n  ol,\n  ul,\n  li,\n  fieldset,\n  form,\n  label,\n  legend,\n  table,\n  caption,\n  tbody,\n  tfoot,\n  thead,\n  tr,\n  th,\n  td,\n  article,\n  aside,\n  canvas,\n  details,\n  embed,\n  figure,\n  figcaption,\n  footer,\n  header,\n  hgroup,\n  menu,\n  nav,\n  output,\n  ruby,\n  section,\n  summary,\n  time,\n  mark,\n  audio,\n  video {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    vertical-align: baseline;\n  }\n  /* HTML5 display-role reset for older browsers */\n  article,\n  aside,\n  details,\n  figcaption,\n  figure,\n  footer,\n  header,\n  hgroup,\n  menu,\n  nav,\n  section {\n    display: block;\n  }\n  body {\n    line-height: 1;\n  }\n  ol,\n  ul {\n    list-style: none;\n  }\n  blockquote,\n  q {\n    quotes: none;\n  }\n  blockquote:before,\n  blockquote:after,\n  q:before,\n  q:after {\n    content: "";\n    content: none;\n  }\n  table {\n    border-collapse: collapse;\n    border-spacing: 0;\n  }\n\n  /* My styles */\n  *,\n  *:before,\n  *:after {\n    box-sizing: border-box;\n  }\n\n  body {\n    font-family: ',";\n  }\n\n  #___gatsby {\n    isolation: isolate;\n  }\n\n  /* Focusing the button with a keyboard will show a dashed black line. */\n  *:focus-visible {\n    outline: 3px dashed ",";\n    outline-offset: 3px;\n  }\n\n  /* Focusing the button with a mouse, touch, or stylus will show a subtle drop shadow. */\n  *:focus:not(:focus-visible) {\n    outline: none;\n    outline: 1px dashed ",";\n  }\n\n  code {\n    background: ",";\n    color: ",";\n    font-size: ",";\n    padding: ",";\n    border-radius: ",";\n    margin-right: 4px;\n  }\n\n  .gatsby-resp-image-wrapper {\n    border-radius: ","!important;\n    overflow: hidden;\n  }\n"],i||(i=o.slice(0)),o.raw=i,r=o),(function(e){return e.theme.fontFamilies.text}),(function(e){return e.theme.colors.secondary}),(function(e){return e.theme.colors.primary}),(function(e){return e.theme.colors.primaryLight}),(function(e){return e.theme.colors.primary}),(function(e){return e.theme.fontSizes[1]}),(function(e){return e.theme.spaces[0]}),(function(e){return e.theme.radius[0]}),(function(e){return e.theme.radius[2]}))},9777:function(e,t,n){"use strict";n.d(t,{o:function(){return i}});var r=n(7294),o=n(9).ZP.div.withConfig({displayName:"Main__MainWrapper",componentId:"h2rqrw-0"})(["padding-top:",";padding-bottom:",";","{padding-top:",";padding-bottom:",";}"],(function(e){return e.theme.spaces[4]}),(function(e){return e.theme.spaces[4]}),(function(e){return e.theme.mq.tablet}),(function(e){return e.theme.spaces[6]}),(function(e){return e.theme.spaces[6]})),i=function(e){return r.createElement(o,Object.assign({id:"main-content"},e))}},7372:function(e,t,n){"use strict";n.d(t,{F:function(){return r}});var r=n(9).ZP.div.withConfig({displayName:"PageWrapper",componentId:"sc-1139nv1-0"})(["background:",";padding:0;","{padding:"," 0;}"],(function(e){return e.theme.colors.text}),(function(e){return e.theme.mq.desktop}),(function(e){return e.theme.spaces[4]}))},6368:function(e,t,n){"use strict";n.d(t,{z:function(){return u}});var r=n(7294),o=n(9),i=n(1532),a=(0,o.ZP)(i.T).withConfig({displayName:"SkipToContent__AnchorWrapper",componentId:"sc-1rvhzn8-0"})(["&:focus{position:fixed;top:",";left:",";z-index:1;width:auto;height:auto;clip:auto;background:",";padding:",";border-radius:",";border:1px solid ",";color:",";}"],(function(e){return e.theme.spaces[2]}),(function(e){return e.theme.spaces[2]}),(function(e){return e.theme.colors.textInverse}),(function(e){return e.theme.spaces[2]}),(function(e){return e.theme.radius[1]}),(function(e){return e.theme.colors.primary}),(function(e){return e.theme.colors.primary})),u=function(){return r.createElement(a,{href:"#main-content",as:"a"},"Go to main content")}},8972:function(e,t,n){"use strict";n.d(t,{c:function(){return r}});var r=n(9).ZP.strong.withConfig({displayName:"Strong",componentId:"ec5xx4-0"})(["font-weight:",";"],(function(e){return e.theme.fontWeights.heading}))},6661:function(e,t,n){"use strict";n.d(t,{w:function(){return k}});var r=n(7294),o=n(9756),i=n(9),a="ArrowDown",u="ArrowUp",c="Escape",s="Enter",l=" ",f=(0,r.createContext)({expandedState:void 0,toggle:function(){}}),d=function(e,t){var n=e.querySelectorAll(t),r=document.activeElement;return[Array.from(n).findIndex((function(e){return e===r})),n]},p='[role="menuitemradio"]:not([disabled])',h=function(e,t){var n,r=t.toLowerCase(),o=null===(n=e.textContent)||void 0===n?void 0:n.toLowerCase();return null==o?void 0:o.startsWith(r)},m=function(){var e=(0,r.useRef)(null),t=(0,r.useContext)(f),n=t.expandedState,o=t.toggle;return(0,r.useEffect)((function(){var t;e.current&&("CLOSED"===n?null===(t=e.current)||void 0===t||t.previousSibling.focus():"DOWN"===n?function(e,t){var n=e.querySelectorAll(t);if(0!==(null==n?void 0:n.length)){var r=null==n?void 0:n.item(0);null==r||r.focus()}}(e.current,p):function(e,t){var n=e.querySelectorAll(t);if(0!==(null==n?void 0:n.length)){var r=null==n?void 0:n.item(n.length-1);null==r||r.focus()}}(e.current,p))}),[n]),(0,r.useEffect)((function(){var t=e.current;if(t){var n=function(e){var t=e.relatedTarget;t&&"menuitemradio"===t.getAttribute("role")||o("CLOSED")};return t.addEventListener("focusout",n),function(){t.removeEventListener("focusout",n)}}}),[o]),{onKeyDown:function(t){switch(t.key){case a:if(!e.current)return;t.preventDefault(),n=e.current,r=d(n,p),i=r[0],s=r[1],i+1===(null==s?void 0:s.length)?s.item(0).focus():null==s||s.item(i+1).focus();break;case u:if(!e.current)return;t.preventDefault(),function(e,t){var n=d(e,t),r=n[0],o=n[1];r-1<0?o.item(o.length-1).focus():o.item(r-1).focus()}(e.current,p);break;case c:o("CLOSED");break;default:if(t.key.length>1)return;if(!e.current)return;t.stopPropagation(),function(e,t){var n=Array.from(e.querySelectorAll(p)),r=n.findIndex((function(e){return h(e,t)})),o=n[r];if(o)if(o===document.activeElement){var i=o.nextSibling;h(i,t)&&i.focus()}else o.focus()}(e.current,t.key)}var n,r,i,s},menuListRef:e,expandedState:n}},y=n(2775),b=i.ZP.div.withConfig({displayName:"MenuButton__MenuWrapper",componentId:"z873pl-0"})(["position:relative;display:inline-block;"]),g=function(e){var t=e.children,n=(0,o.Z)(e,["children"]),i=(0,r.useState)(void 0),a=i[0],u=i[1];return r.createElement(b,n,r.createElement(f.Provider,{value:{expandedState:a,toggle:function(e){u(e)}}},t))},v=i.ZP.div.withConfig({displayName:"MenuButton__MenuListWrapper",componentId:"z873pl-1"})(["position:absolute;right:0;box-shadow:",";border-radius:",";background:",";width:max-content;"],(function(e){return e.theme.shadows.simple}),(function(e){return e.theme.radius[1]}),(function(e){return e.theme.colors.textInverse})),w=function(e){e.position;var t=(0,o.Z)(e,["position"]),n=m(),i=n.menuListRef,a=n.onKeyDown,u=n.expandedState,c=!u||"CLOSED"===u;return r.createElement(v,Object.assign({},t,{role:"menu",ref:i,onKeyDown:a,hidden:c}))},T=i.ZP.button.withConfig({displayName:"MenuButton__MenuButtonWrapper",componentId:"z873pl-2"})(["background:transparent;border:none;padding:",";display:flex;align-items:center;color:inherit;font-size:",";svg{margin-left:",";}"],(function(e){return e.theme.spaces[2]}),(function(e){return e.theme.fontSizes[1]}),(function(e){return e.theme.spaces[0]})),C=function(e){var t=e.children,n=(0,o.Z)(e,["children"]),i=(0,r.useContext)(f),c=i.expandedState,d=i.toggle,p="UP"===c||"DOWN"===c;return r.createElement(T,Object.assign({},n,{"aria-haspopup":!0,"aria-expanded":Boolean(p),onMouseDown:function(e){3!==e.nativeEvent.which&&2!==e.nativeEvent.button&&(e.target.focus(),d(c&&"CLOSED"!==c?"CLOSED":"DOWN"))},onKeyDown:function(e){switch(e.key){case a:e.preventDefault(),d("DOWN");break;case u:e.preventDefault(),d("UP");break;case s:case l:d("DOWN")}}}),r.createElement("span",null,t),r.createElement(y.Ix0,{"aria-hidden":!0}))},E=i.ZP.button.withConfig({displayName:"MenuButton__MenuItemWrapper",componentId:"z873pl-3"})(["padding:"," ",";background:transparent;border:none;display:flex;align-items:center;width:100%;text-align:left;font-size:",";svg{margin-left:",";}"],(function(e){return e.theme.spaces[2]}),(function(e){return e.theme.spaces[3]}),(function(e){return e.theme.fontSizes[1]}),(function(e){return e.theme.spaces[2]})),S=function(e){var t=e.onSelect,n=e.children,i=e.selected,a=(0,o.Z)(e,["onSelect","children","selected"]),u=(0,r.useContext)(f).toggle,c=function(){t&&t(),u("CLOSED")};return r.createElement(E,Object.assign({},a,{role:"menuitemradio",tabIndex:-1,onMouseDown:c,onKeyDown:function(e){switch(e.key){case s:case l:c()}},"aria-checked":i}),n," ",i&&r.createElement(y.HhX,{"aria-hidden":!0}))},O=n(3577),A=n(3356),k=function(){var e=(0,r.useContext)(A.u),t=e.actualTheme,n=e.setActualTheme;return r.createElement(g,null,r.createElement(C,null,"Change theme"),r.createElement(w,null,O.Z.map((function(e){return r.createElement(S,{key:e.name,onSelect:function(){return n(e)},selected:e.name===t.name},e.name)}))))}}}]);
//# sourceMappingURL=1816b56507cb99c303b790a51cd41909116e2f64-f4aa3038252e8c4d3293.js.map