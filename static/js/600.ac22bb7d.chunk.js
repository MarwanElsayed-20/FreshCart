"use strict";(self.webpackChunksession=self.webpackChunksession||[]).push([[600],{6600:function(e,t,s){s.r(t),s.d(t,{default:function(){return N}});var r=s(3433),a=s(4165),n=s(5861),i=s(9439),c=s(2791),o=s(2204),l=s(4270),d=s(4916),u=s(812),m=s(7087),p=s(2),f=s(1087),x=s(3926),h=s(3402),g=s(6307),j=s(2551),v=s(184);function N(){var e,t,s=(0,c.useState)(!1),N=(0,i.Z)(s,2),w=N[0],Z=N[1],b=(0,c.useState)(!1),y=(0,i.Z)(b,2),C=y[0],P=y[1],S=(0,c.useState)(!1),k=(0,i.Z)(S,2),L=k[0],I=k[1],A=(0,c.useContext)(o.H),O=A.data,B=A.isLoading,E=(0,c.useContext)(p.M).login,J=(0,c.useContext)(x.A),W=J.addToCart,T=J.setCartNum,U=(0,c.useContext)(j.v),_=U.addToWishList,q=U.removeWishListProduct,z=U.setWishListNum,F=U.prod,G=U.setProd,H=function(){var e=(0,n.Z)((0,a.Z)().mark((function e(t){var s,r;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return I(!0),e.next=3,_(t);case 3:s=e.sent,I(!1),200===s.status?(h.ZP.success(s.data.message),z(null===s||void 0===s?void 0:s.data.data.length),I(!1)):(h.ZP.error(null===s||void 0===s||null===(r=s.response)||void 0===r?void 0:r.data.message),I(!1));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),M=function(){var e=(0,n.Z)((0,a.Z)().mark((function e(t){var s;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return I(!0),e.next=3,q(t);case 3:s=e.sent,I(!1),200===s.status?(h.ZP.success(s.data.message),z(null===s||void 0===s?void 0:s.data.data.length),I(!1)):(h.ZP.error(s.response.data.message),I(!1));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),D=function(){var e=(0,n.Z)((0,a.Z)().mark((function e(t){var s;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return P(!0),e.next=3,W(t);case 3:200===(s=e.sent).status?(h.ZP.success(s.data.message),T(s.data.numOfCartItems),P(!1)):(h.ZP.error(s.response.data.message),P(!1));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return(0,c.useEffect)((function(){localStorage.getItem("product")&&G(JSON.parse(localStorage.getItem("product")))}),[]),(0,c.useEffect)((function(){F&&localStorage.setItem("product",JSON.stringify(F))}),[F]),(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)(l.q,{children:[(0,v.jsx)("meta",{charSet:"utf-8"}),(0,v.jsx)("title",{children:"Products"})]}),(0,v.jsx)(d.Z,{text:"Products",path:"Products"}),B?(0,v.jsx)(u.Z,{}):(0,v.jsx)("div",{className:"my-5 py-5",children:(0,v.jsxs)("div",{className:"container text-center py-5",children:[(0,v.jsxs)("div",{className:"title-info d-flex justify-content-between align-items-center",children:[(0,v.jsxs)("div",{className:"title d-flex flex-column align-items-start",children:[(0,v.jsx)("h2",{className:"main-color ",children:"All Products"}),(0,v.jsxs)("p",{className:"text-muted",children:["About ",O.data.results," results"]})]}),(0,v.jsxs)("p",{className:"text-muted",children:["Sort by price:",(0,v.jsx)("button",{className:"border-0 rounded-0 p-3 main-bg-color text-white ms-3",onClick:function(){Z((function(e){return!e}))},children:w?(0,v.jsx)("i",{className:"fa-solid fa-arrow-up-short-wide"}):(0,v.jsx)("i",{className:"fa-solid fa-arrow-up-wide-short"})})]})]}),null===O||void 0===O||null===(e=O.data)||void 0===e||null===(t=e.data)||void 0===t?void 0:t.sort((function(e,t){return w?e.price-t.price:t.price-e.price})).map((function(e){return(0,v.jsx)("div",{className:"shadow my-5 p-3 cursor-pointer single-product",children:(0,v.jsxs)("div",{className:"row",children:[(0,v.jsx)("div",{className:"col-md-4",children:(0,v.jsx)(f.rU,{to:"/specificProduct/".concat(e.id),children:(0,v.jsx)(m.LazyLoadImage,{src:e.imageCover,className:"w-100"})})}),(0,v.jsxs)("div",{className:"col-md-8 d-flex justify-content-center flex-column align-items-start p-5 text-start",children:[(0,v.jsxs)(f.rU,{to:"/specificProduct/".concat(e.id),children:[(0,v.jsx)("h3",{className:"text-black",children:e.title}),(0,v.jsxs)("p",{className:"text-black price",children:["Price:"," ",(0,v.jsxs)("span",{className:"main-color",children:[e.price," EGP"]})," "]}),(0,v.jsxs)("p",{className:"text-muted",children:[(0,v.jsx)("i",{className:"fa-solid fa-star text-warning me-2"}),"( ".concat(e.ratingsAverage," )")]}),(0,v.jsx)("p",{className:"text-start text-muted",children:e.description})]}),E?(0,v.jsxs)("ul",{className:"list-unstyled d-flex align-items-center ",children:[(0,v.jsx)("li",{className:"proBtn rounded-circle shadow d-flex align-items-center justify-content-center me-3 cursor-pointer main-color",onClick:function(t){D(e._id)},children:C?(0,v.jsx)(g.g4,{height:"30",width:"30",radius:"9",color:"#212529bf",ariaLabel:"three-dots-loading",wrapperStyle:{},wrapperClassName:"",visible:!0}):(0,v.jsx)("i",{className:"fa-solid fa-cart-shopping"})}),F.includes(e.id)?(0,v.jsx)("li",{className:"proBtn rounded-circle shadow d-flex align-items-center justify-content-center cursor-pointer main-color  bg-danger text-white",onClick:function(){M(e.id),G((function(t){return t.filter((function(t){return t!==e.id}))})),console.log(F)},children:L?(0,v.jsx)(g.g4,{height:"20",width:"20",radius:"9",color:"#212529bf",ariaLabel:"three-dots-loading",wrapperStyle:{},wrapperClassName:"",visible:!0}):(0,v.jsx)("i",{className:"fa-solid fa-heart "})}):(0,v.jsx)("li",{className:"proBtn rounded-circle shadow d-flex align-items-center justify-content-center cursor-pointer main-color",onClick:function(){G([].concat((0,r.Z)(F),[e.id])),H(e.id),console.log(F),localStorage.setItem("product",JSON.stringify(F))},children:L?(0,v.jsx)(g.g4,{height:"20",width:"20",radius:"9",color:"#212529bf",ariaLabel:"three-dots-loading",wrapperStyle:{},wrapperClassName:"",visible:!0}):(0,v.jsx)("i",{className:"fa-regular fa-heart"})})]}):""]})]})},e._id)}))]})})]})}}}]);
//# sourceMappingURL=600.ac22bb7d.chunk.js.map