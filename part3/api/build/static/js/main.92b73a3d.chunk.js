(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{44:function(e,n,t){},45:function(e,n,t){"use strict";t.r(n);var c=t(1),r=t.n(c),o=t(18),a=t.n(o),u=t(9),i=t(8),s=t.n(i),l=t(19),d=t(3),b=t(0),f=function(e){var n=e.search,t=e.handleFilter;return Object(b.jsxs)("div",{children:["filter shown with ",Object(b.jsx)("input",{value:n,onChange:t})]})},j=function(e){var n=e.notification;if(!n)return null;var t=function(){return"success"===n.status?"green":"red"},c={color:t(),background:"grey",fontSize:20,border:"solid 5px ".concat(t()),padding:10};return console.log(c),Object(b.jsx)("div",{style:c,children:n&&n.message})},h=function(e){var n=e.handleSubmit,t=e.handleNewName,c=e.handleNewNumber,r=e.newName,o=e.newNumber;return Object(b.jsxs)("form",{onSubmit:n,children:[Object(b.jsxs)("div",{children:["name: ",Object(b.jsx)("input",{value:r,onChange:t}),"number: ",Object(b.jsx)("input",{value:o,onChange:c})]}),Object(b.jsx)("div",{children:Object(b.jsx)("button",{type:"submit",children:"add"})})]})},m=function(e){var n=e.searchMatch,t=e.deleteContact;return Object(b.jsx)("div",{children:Object(b.jsx)("ul",{children:n.map((function(e){return Object(b.jsxs)("li",{children:[e.name,"-",e.number,Object(b.jsx)("button",{onClick:function(){return t(e.id,e.name)},children:"Delete"})]},e.id)}))})})},O=t(4),v=t.n(O),p="/api/persons",x=function(){return v.a.get(p).then((function(e){return e.data}))},w=function(e){return v.a.post(p,e).then((function(e){return e.data}))},g=function(e){return v.a.delete("".concat(p,"/").concat(e)).then((function(e){return e.data}))},N=function(e,n){return v.a.put("".concat(p,"/").concat(e),n).then((function(e){return e.data}))},C=(t(44),function(){var e=Object(c.useState)([]),n=Object(d.a)(e,2),t=n[0],r=n[1],o=Object(c.useState)(""),a=Object(d.a)(o,2),i=a[0],O=a[1],v=Object(c.useState)(""),p=Object(d.a)(v,2),C=p[0],S=p[1],k=Object(c.useState)(""),y=Object(d.a)(k,2),D=y[0],L=y[1],T=Object(c.useState)(null),M=Object(d.a)(T,2),E=M[0],F=M[1],I=function(){var e=Object(l.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x().then((function(e){r(e),console.log(e),console.log(t)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(c.useEffect)((function(){I()}),[]);var J=t.filter((function(e){return e.name.toLowerCase().includes(D.toLowerCase())}));return Object(b.jsxs)("div",{children:[Object(b.jsx)("h2",{children:"Phonebook"}),Object(b.jsx)(j,{notification:E}),Object(b.jsx)(f,{handleFilter:function(e){L(e.target.value)},search:D}),Object(b.jsx)(h,{handleNewName:function(e){O(e.target.value)},handleNewNumber:function(e){S(e.target.value)},newName:i,newNumber:C,handleSubmit:function(e){e.preventDefault();var n={name:i,number:C},c=t.find((function(e){return e.name.toLowerCase()===i.toLowerCase()}));if(console.log(i),console.log(n),console.log(c),c){var o=Object(u.a)(Object(u.a)({},c),{},{number:C});return window.confirm("".concat(c.name," is already added to phonebook. Replace old number with new one?")),N(c.id,o).then((function(e){return r(t.map((function(n){return n.id!==c.id?n:e})))})).then((function(){F({message:"Number updated for ".concat(i),status:"success"}),setTimeout((function(){F(null)}),5e3)})).catch((function(e){F({message:"Information for ".concat(i," has already been removed from the server"),status:"error"})})),setTimeout((function(){F(null)}),4e3),O(""),void S("")}w(n).then((function(e){r(t.concat(e)),F({message:"Added ".concat(n.name),status:"success"}),setTimeout((function(){F(null)}),4e3),O(""),S("")}))}}),Object(b.jsx)("h2",{children:"Numbers"}),Object(b.jsx)(m,{searchMatch:J,deleteContact:function(e,n){if(window.confirm("Delete ".concat(n,"?"))){var c=t.filter((function(n){return n.id!==e}));F({message:"Deleted ".concat(n),status:"success"}),setTimeout((function(){F(null)}),4e3),g(e).then(r(c))}}})]})});a.a.render(Object(b.jsx)(r.a.StrictMode,{children:Object(b.jsx)(C,{})}),document.getElementById("root"))}},[[45,1,2]]]);
//# sourceMappingURL=main.92b73a3d.chunk.js.map