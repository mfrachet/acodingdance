(self.webpackChunkmfrachet_github_io=self.webpackChunkmfrachet_github_io||[]).push([[158],{2171:function(e,t,i){"use strict";i.r(t),i.d(t,{_frontmatter:function(){return r},default:function(){return p}});var a=i(9756),o=(i(7294),i(4983)),n=i(5865),s=i(2276),l=i(4367),r={},d={_frontmatter:r},h=n.Z;function p(e){var t=e.components,i=(0,a.Z)(e,["components"]);return(0,o.kt)(h,Object.assign({},d,i,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"When designing forms on the web, one common pattern is to display each field with the possibility to validates their content and to put the eventual errors next to the fields themselves."),(0,o.kt)("p",null,"For instance, let's imagine a login form with an email field, a password field, and a submit button. For each of these elements, there is a set of rules to apply:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"the email should have a valid format"),(0,o.kt)("li",{parentName:"ul"},"the password should be at least 12 characters long"),(0,o.kt)("li",{parentName:"ul"},"the submit button is disabled until the email and password fields are valid")),(0,o.kt)("p",null,"The following Codesandbox is an example of such a login form you can play with. It's built using ",(0,o.kt)("a",{parentName:"p",href:"https://formik.org/"},"Formik"),"."),(0,o.kt)("iframe",{src:"https://codesandbox.io/embed/not-accessible-f8txu?fontsize=14&hidenavigation=1&theme=dark",style:{width:"100%",height:"500px",border:"0",borderRadius:"4px",overflow:"hidden"},title:"Not accessible",allow:"accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking",sandbox:"allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"}),(0,o.kt)("p",null,"While this seems to follow the rules set before and that the UI seems to fill the designers' expectations, there is an issue. Let's check what happens when using this form with a screen reader in this video."),(0,o.kt)(s.default,{mdxType:"NotAccessibleVideo"}),(0,o.kt)("p",null,"In this video, I'm using VoiceOver (the official OSX screen reader). While being able to navigate using it, ",(0,o.kt)("strong",{parentName:"p"},"I don't have direct feedback about the invalid fields"),". In order to get informed, ",(0,o.kt)("strong",{parentName:"p"},"I need to scan the whole form again")," and check every text content in it."),(0,o.kt)("p",null,"With the intent tfo provide a better experience to screen reader users, we can:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"put an ",(0,o.kt)("inlineCode",{parentName:"li"},"aria-invalid")," attribute on fields that are in an invalid state so that screen readers can provide that information"),(0,o.kt)("li",{parentName:"ul"},"put an ",(0,o.kt)("inlineCode",{parentName:"li"},"aria-describedby"),' attribute on the error element (in the example, the one showing "Invalid email address") so that when focusing the input, screen readers also announce the error content'),(0,o.kt)("li",{parentName:"ul"},"remove the ",(0,o.kt)("inlineCode",{parentName:"li"},"disabled")," attribute on the submit button so that the user can click on it. When pressing it, the browser will focus on the first field that is in an invalid state or submit the data if every field is valid.")),(0,o.kt)("p",null,"The following video shows how making these modifications help to provide feedback to screen reader users."),(0,o.kt)(l.default,{mdxType:"AccessibleVideo"}),(0,o.kt)("p",null,"In addition to this video, the following is a Codesandbox providing an example of the login form built in a more accessible way, also using ",(0,o.kt)("a",{parentName:"p",href:"https://formik.org/"},"Formik"),"."),(0,o.kt)("iframe",{src:"https://codesandbox.io/embed/accessible-2-6p98s?fontsize=14&hidenavigation=1&theme=dark",style:{width:"100%",height:"500px",border:"0",borderRadius:"4px",overflow:"hidden"},title:"Accessible 2",allow:"accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking",sandbox:"allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"}))}p.isMDXComponent=!0}}]);
//# sourceMappingURL=component---courses-accessibility-accessible-forms-index-mdx-e92cf6ff6804f0fd0eec.js.map