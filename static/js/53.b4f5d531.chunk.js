"use strict";(self.webpackChunksession=self.webpackChunksession||[]).push([[53],{9053:function(e,a,r){r.r(a),r.d(a,{default:function(){return b}});var s=r(4165),n=r(5861),t=r(9439),o=r(2791),l=r(4916),d=r(635),m=r(7689),i=r(1087),c=r(5705),u=r(4270),h=r(6727),p=r(1243),g=r(6307),w=r(184);function b(){var e=(0,o.useState)(!1),a=(0,t.Z)(e,2),r=a[0],b=a[1],f=(0,o.useState)(""),x=(0,t.Z)(f,2),v=x[0],j=x[1],y=(0,o.useState)(""),k=(0,t.Z)(y,2),z=k[0],N=k[1],Z=(0,m.s0)(),q=function(){var e=(0,n.Z)((0,s.Z)().mark((function e(a){var r,n;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return b(!0),e.next=3,p.Z.post("".concat("https://ecommerce.routemisr.com","/api/v1/auth/signup"),a).catch((function(e){j(e.response.data.message),b(!1)}));case 3:r=e.sent,"success"===(n=r.data).message&&(j(""),N(n.message),setTimeout((function(){return Z("/login")}),3e3),b(!1));case 6:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),C=h.Ry({name:h.Z_().required("Name is required").min(3,"Minimum length is 5 characters").max(10,"Max length is 10 characters").matches(/^[a-zA-Z]+$/,"Your name should only contain characters"),email:h.Z_().required("Email is required").email("Email is not valid").matches(/([a-z0-9][-a-z0-9_\+\.]*[a-z0-9])@([a-z0-9][-a-z0-9\.]*[a-z0-9]\.(arpa|root|aero|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)|([0-9]{1,3}\.{3}[0-9]{1,3}))/,"your email must be a valid and real email"),password:h.Z_().required("Password is required").matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,"Your password must contain a special character, a number,and a capital character"),rePassword:h.Z_().required("Re password is required").oneOf([h.iH("password")],"Re password must be match your password"),phone:h.Z_().required("Phone number is required").matches(/^01[0-2,5]\d{8}$/,"Your phone must start with 010 / 011 / 012 / 015 and must be 11 numbers")}),P=(0,c.TA)({initialValues:{name:"",email:"",password:"",rePassword:"",phone:""},validationSchema:C,onSubmit:q});return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(u.q,{children:[(0,w.jsx)("meta",{charSet:"utf-8"}),(0,w.jsx)("title",{children:"Register"})]}),(0,w.jsx)(l.Z,{text:"Register",path:"Register"}),(0,w.jsxs)("div",{className:"w-75 m-auto shadow text-center my-5 p-5",children:[(0,w.jsx)("h3",{children:"SignUp"}),(0,w.jsx)("p",{className:"text-muted",children:"Please fill the bellow details to create an account."}),(0,w.jsxs)("form",{onSubmit:P.handleSubmit,action:"",className:"d-flex justify-content-center align-items-center flex-column",children:[v?(0,w.jsxs)("p",{className:"alert alert-danger rounded-0 w-100",children:[v,"."]}):"",z?(0,w.jsx)("p",{className:"alert alert-success rounded-0 w-100",children:"Account created successfully."}):"",(0,w.jsx)("input",{type:"text",className:"form-control mb-3 rounded-0",placeholder:"User name",name:"name",id:"name",onChange:P.handleChange,value:P.values.name,onBlur:P.handleBlur}),P.errors.name&&P.touched.name?(0,w.jsx)("p",{className:"alert alert-danger mt-0 rounded-0 w-100",children:P.errors.name}):"",(0,w.jsx)("input",{type:"email",className:"form-control mb-3 rounded-0",placeholder:"Email address",name:"email",id:"email",onChange:P.handleChange,value:P.values.email,onBlur:P.handleBlur}),P.errors.email&&P.touched.email?(0,w.jsx)("p",{className:"alert alert-danger mt-0 rounded-0 w-100",children:P.errors.email}):"",(0,w.jsx)("input",{type:"password",className:"form-control mb-3 rounded-0",placeholder:"Password",name:"password",id:"password",onChange:P.handleChange,value:P.values.password,onBlur:P.handleBlur}),P.errors.password&&P.touched.password?(0,w.jsx)("p",{className:"alert alert-danger mt-0 rounded-0 w-100",children:P.errors.password}):"",(0,w.jsx)("input",{type:"password",className:"form-control mb-3 rounded-0",placeholder:"Re-password",name:"rePassword",id:"rePassword",onChange:P.handleChange,value:P.values.rePassword,onBlur:P.handleBlur}),P.errors.rePassword&&P.touched.rePassword?(0,w.jsx)("p",{className:"alert alert-danger mt-0 rounded-0 w-100",children:P.errors.rePassword}):"",(0,w.jsx)("input",{type:"tele",className:"form-control mb-3 rounded-0",placeholder:"User number",name:"phone",id:"phone",onChange:P.handleChange,value:P.values.phone,onBlur:P.handleBlur}),P.errors.phone&&P.touched.phone?(0,w.jsx)("p",{className:"alert alert-danger mt-0 rounded-0 w-100",children:P.errors.phone}):"",(0,w.jsx)(d.Z,{text:r?(0,w.jsx)(g.g4,{height:"30",width:"80",radius:"9",color:"#212529bf",ariaLabel:"three-dots-loading",wrapperStyle:{},wrapperClassName:"",visible:!0}):"Sign Up",width:"w-100",type:"submit"}),(0,w.jsx)(i.rU,{to:"/login",className:"mt-3 text-muted login",children:"Already have an account? Login."})]})]})]})}}}]);
//# sourceMappingURL=53.b4f5d531.chunk.js.map