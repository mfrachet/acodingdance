(self.webpackChunkmfrachet_github_io=self.webpackChunkmfrachet_github_io||[]).push([[678],{3751:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return J}});var r,i=n(7294),a=n(5414),o=n(1279),l=((r={}).posts={title:"Blog posts",links:[{title:"Choosing a rendering strategy",link:"/choosing-a-rendering-strategy"},{title:"Accessible font-size",link:"/accessibility/accessible-font-size"},{title:"Accessible forms",link:"/accessibility/accessible-forms"},{title:"Why I don't like Gitflow?",link:"/why-i-dont-like-gitflow"},{title:"A/B testing with the JamStack",link:"/a-b-testing-with-the-jamstack"}]},r),c=n(2497),u=n(7669),s=n(3941),m=n(5604),d=n(9777),f=n(6368),h=n(9357),p=n(2599),g=n(8972),v=n(9756),E=n(9),b=n(2775),w=E.ZP.ul.withConfig({displayName:"Timeline__TimelineWrapper",componentId:"sc-1oop0vd-0"})([""]),y=E.ZP.li.withConfig({displayName:"Timeline__TimelineItemWrapper",componentId:"sc-1oop0vd-1"})(["position:relative;padding:"," 0;line-height:",';&:not(&:first-of-type):before{content:"";position:absolute;width:1px;background:',";top:0;height:12px;left:6px;}&:not(&:last-of-type){",";}",";svg{font-size:13px;position:relative;margin-top:3px;}"," > li:first-of-type{margin-top:",';&:before{content:"";position:absolute;width:1px;background:',";height:34px;transform:rotateZ(-32deg) translate3d(8px,-29px,0);}}"," > li:last-of-type{margin-bottom:-",';&:after{content:"";position:absolute;width:1px;background:',";height:34px;transform:rotateZ(32deg) translate3d(-10px,0px,0);}}"],(function(e){return e.theme.spaces[2]}),(function(e){return e.theme.lineHeights.text}),(function(e){return e.theme.colors.secondary}),(function(e){var t=e.hasChildren,n=e.theme;return t?null:'\n      &:after {\n        content: "";\n        position: absolute;\n        width: 1px;\n        background: '+n.colors.secondary+";\n        bottom: 0;\n        height: 12px;\n        left: 6px;\n      }\n    "}),(function(e){return e.hasChildren?"\n    & + li:before {\n     content: unset!important;\n    }\n  ":null}),w,(function(e){return e.theme.spaces[2]}),(function(e){return e.theme.colors.secondary}),w,(function(e){return e.theme.spaces[2]}),(function(e){return e.theme.colors.secondary})),k=function(e){var t=e.children,n=(0,v.Z)(e,["children"]);return i.createElement(y,n,i.createElement(u.k,null,i.createElement(s.x,{marginRight:3},i.createElement(b.bSN,null)),t))},x=function(e){var t=e.children;return i.createElement(w,null,t)},C=function e(t){var n=t.links,r=t.LinkAs,a=void 0===r?p.r:r;return i.createElement(x,null,n.map((function(t){var n,r=(null==t||null===(n=t.children)||void 0===n?void 0:n.length)>0;return i.createElement(k,{key:t.link||t.title,hasChildren:r},i.createElement("div",null,t.link?i.createElement(a,{to:t.link},t.title):i.createElement(c.x,{as:"span"},t.title),r&&i.createElement(e,{links:t.children,LinkAs:a})))})))},S=n(7259),D=n(6810),I="ArrowDown",O="ArrowUp",L="Escape",_="Enter",A=" ",Z=(0,i.createContext)({expandedState:void 0,toggle:function(){}}),W=function(e,t){var n=e.querySelectorAll(t),r=document.activeElement;return[Array.from(n).findIndex((function(e){return e===r})),n]},N='[role="menuitemradio"]:not([disabled])',z=function(e,t){var n,r=t.toLowerCase(),i=null===(n=e.textContent)||void 0===n?void 0:n.toLowerCase();return null==i?void 0:i.startsWith(r)},M=function(){var e=(0,i.useRef)(null),t=(0,i.useContext)(Z),n=t.expandedState,r=t.toggle;return(0,i.useEffect)((function(){var t;e.current&&("CLOSED"===n?null===(t=e.current)||void 0===t||t.previousSibling.focus():"DOWN"===n?function(e,t){var n=e.querySelectorAll(t);if(0!==(null==n?void 0:n.length)){var r=null==n?void 0:n.item(0);null==r||r.focus()}}(e.current,N):function(e,t){var n=e.querySelectorAll(t);if(0!==(null==n?void 0:n.length)){var r=null==n?void 0:n.item(n.length-1);null==r||r.focus()}}(e.current,N))}),[n]),(0,i.useEffect)((function(){var t=e.current;if(t){var n=function(e){var t=e.relatedTarget;t&&"menuitemradio"===t.getAttribute("role")||r("CLOSED")};return t.addEventListener("focusout",n),function(){t.removeEventListener("focusout",n)}}}),[r]),{onKeyDown:function(t){switch(t.key){case I:if(!e.current)return;t.preventDefault(),n=e.current,i=W(n,N),a=i[0],o=i[1],a+1===(null==o?void 0:o.length)?o.item(0).focus():null==o||o.item(a+1).focus();break;case O:if(!e.current)return;t.preventDefault(),function(e,t){var n=W(e,t),r=n[0],i=n[1];r-1<0?i.item(i.length-1).focus():i.item(r-1).focus()}(e.current,N);break;case L:r("CLOSED");break;default:if(t.key.length>1)return;if(!e.current)return;t.stopPropagation(),function(e,t){var n=Array.from(e.querySelectorAll(N)),r=n.findIndex((function(e){return z(e,t)})),i=n[r];if(i)if(i===document.activeElement){var a=i.nextSibling;z(a,t)&&a.focus()}else i.focus()}(e.current,t.key)}var n,i,a,o},menuListRef:e,expandedState:n}},R=E.ZP.div.withConfig({displayName:"MenuButton__MenuWrapper",componentId:"z873pl-0"})(["position:relative;display:inline-block;"]),P=function(e){var t=e.children,n=(0,v.Z)(e,["children"]),r=(0,i.useState)(void 0),a=r[0],o=r[1];return i.createElement(R,n,i.createElement(Z.Provider,{value:{expandedState:a,toggle:function(e){o(e)}}},t))},T=E.ZP.div.withConfig({displayName:"MenuButton__MenuListWrapper",componentId:"z873pl-1"})(["position:absolute;right:0;box-shadow:",";border-radius:",";background:",";width:max-content;"],(function(e){return e.theme.shadows.simple}),(function(e){return e.theme.radius[1]}),(function(e){return e.theme.colors.textInverse})),B=function(e){e.position;var t=(0,v.Z)(e,["position"]),n=M(),r=n.menuListRef,a=n.onKeyDown,o=n.expandedState,l=!o||"CLOSED"===o;return i.createElement(T,Object.assign({},t,{role:"menu",ref:r,onKeyDown:a,hidden:l}))},j=E.ZP.button.withConfig({displayName:"MenuButton__MenuButtonWrapper",componentId:"z873pl-2"})(["background:transparent;border:none;padding:",";display:flex;align-items:center;color:inherit;font-size:",";svg{margin-left:",";}"],(function(e){return e.theme.spaces[2]}),(function(e){return e.theme.fontSizes[1]}),(function(e){return e.theme.spaces[0]})),q=function(e){var t=e.children,n=(0,v.Z)(e,["children"]),r=(0,i.useContext)(Z),a=r.expandedState,o=r.toggle,l="UP"===a||"DOWN"===a;return i.createElement(j,Object.assign({},n,{"aria-haspopup":!0,"aria-expanded":Boolean(l),onMouseDown:function(e){3!==e.nativeEvent.which&&2!==e.nativeEvent.button&&(e.target.focus(),o(a&&"CLOSED"!==a?"CLOSED":"DOWN"))},onKeyDown:function(e){switch(e.key){case I:e.preventDefault(),o("DOWN");break;case O:e.preventDefault(),o("UP");break;case _:case A:o("DOWN")}}}),i.createElement("span",null,t),i.createElement(b.Ix0,{"aria-hidden":!0}))},K=E.ZP.button.withConfig({displayName:"MenuButton__MenuItemWrapper",componentId:"z873pl-3"})(["padding:"," ",";background:transparent;border:none;display:flex;align-items:center;width:100%;text-align:left;font-size:",";svg{margin-left:",";}"],(function(e){return e.theme.spaces[2]}),(function(e){return e.theme.spaces[3]}),(function(e){return e.theme.fontSizes[1]}),(function(e){return e.theme.spaces[2]})),F=function(e){var t=e.onSelect,n=e.children,r=e.selected,a=(0,v.Z)(e,["onSelect","children","selected"]),o=(0,i.useContext)(Z).toggle,l=function(){t&&t(),o("CLOSED")};return i.createElement(K,Object.assign({},a,{role:"menuitemradio",tabIndex:-1,onMouseDown:l,onKeyDown:function(e){switch(e.key){case _:case A:l()}},"aria-checked":r}),n," ",r&&i.createElement(b.HhX,{"aria-hidden":!0}))},G=n(3577),H=n(3356),U=function(){var e=(0,i.useContext)(H.u),t=e.actualTheme,n=e.setActualTheme;return i.createElement(P,null,i.createElement(q,null,"Change theme"),i.createElement(B,null,G.Z.map((function(e){return i.createElement(F,{key:e.name,onSelect:function(){return n(e)},selected:e.name===t.name},e.name)}))))},J=function(){return i.createElement(m.f,null,i.createElement(a.Z,{title:"On my way to product engineering with React",meta:[]},i.createElement("html",{lang:"en"})),i.createElement(f.z,null),i.createElement(D.W,null,i.createElement(S.V,null,i.createElement(d.o,null,i.createElement(U,null),i.createElement(c.x,{as:"h1"},"On my way to product engineering with React"),i.createElement(c.x,{as:"p"},"I'm Marvin Frachet, a french software developer loving testing automation,",i.createElement(p.r,{href:"https://www.typescriptlang.org/"},"TypeScript"),", ",i.createElement(p.r,{href:"https://reactjs.org/"},"React")," and"," ",i.createElement(p.r,{href:"https://reactnative.dev/"},"React Native"),". I'm mostly doing ",i.createElement(g.c,null,"product engineering")," and I'm way more interested in runtime problems and clean coding than build time stuff."),i.createElement(c.x,{as:"p"},"I'm actually working on some pieces of"," ",i.createElement(p.r,{href:"https://strapi.io/"},"Strapi"),", the next generation of Headless CMS, and used to work on building"," ",i.createElement(p.r,{href:"https://www.gatsbyjs.com/"},"Gatsby Cloud"),"."),i.createElement(c.x,{as:"p"},"On this website, you will find a brain dump of all the stuff I've learned during my travel. Feel free to request a specific topic if you would like me to eventually write something about it."),i.createElement(c.x,{as:"p"},"Also, I'm committing to making this website as accessible as my knowledge allows me to do. If you face any trouble, please send me a request."),i.createElement(s.x,{marginTop:4,marginBottom:6},i.createElement(u.k,null,i.createElement(s.x,{marginRight:4},i.createElement(p.r,{href:"https://github.com/mfrachet"},i.createElement(o.RrF,{"aria-hidden":!0})," Github")),i.createElement(s.x,{marginRight:4},i.createElement(p.r,{href:"https://twitter.com/mfrachet"},i.createElement(o.h3E,{"aria-hidden":!0})," Twitter")),i.createElement(s.x,null,i.createElement(p.r,{href:"https://www.linkedin.com/in/marvin-frachet-49165365/"},i.createElement(o._iD,{"aria-hidden":!0})," LinkedIn")))),Object.keys(l).map((function(e){return i.createElement("article",{key:e,"aria-labelledby":e},i.createElement(c.x,{as:"h2",id:e},l[e].title),i.createElement(C,{links:l[e].links}))}))))),i.createElement(h.n,null))}}}]);
//# sourceMappingURL=component---src-pages-index-js-018e63e99215e61de7bf.js.map