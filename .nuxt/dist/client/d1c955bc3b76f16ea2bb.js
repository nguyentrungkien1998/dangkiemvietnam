(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{323:function(e,t,r){"use strict";r.r(t);r(127),r(26),r(12),r(7),r(51);var n=r(66),o=(r(25),r(2)),c=r(88);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var f={data:function(){return{formData:{password:""},loading:!1,ruleForm:{password:[{type:"string",required:!0,message:"Quý khách được yêu cầu nhập mật khẩu cũ."}]}}},computed:d(d({},Object(c.d)("change-password",["OldPassword"])),{},{password:{get:function(){return this.OldPassword},set:function(e){return this.formData.password=e,this.ChangePassword(e)}}}),methods:d(d(d({},Object(c.c)("change-password",["CancelShow","ChangePassword"])),Object(c.b)("change-password",["CheckPass"])),{},{cancel:function(){this.password="",this.CancelShow()},confirm:function(){var e=this,t=this;this.$refs.formData.validate(function(){var r=Object(o.a)(regeneratorRuntime.mark((function r(n){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!n){r.next=11;break}return r.prev=1,r.next=4,t.CheckPass(t.formData.password);case 4:r.next=9;break;case 6:r.prev=6,r.t0=r.catch(1),e.$message({type:"error",message:r.t0});case 9:r.next=12;break;case 11:return r.abrupt("return",!1);case 12:case"end":return r.stop()}}),r,null,[[1,6]])})));return function(e){return r.apply(this,arguments)}}())}})},m=r(39),h=Object(m.a)(f,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-row",[r("el-col",{attrs:{span:24,offset:0}},[r("el-form",{ref:"formData",attrs:{rules:e.ruleForm,model:e.formData,"status-icon":"","label-width":"auto","label-position":"top",inline:!1,disabled:!1,"inline-message":!1,"show-message":"","validate-on-rule-change":"",size:"small"}},[r("el-form-item",{attrs:{label:"Mật khẩu cũ",prop:"password",align:"left"}},[r("el-input",{attrs:{placeholder:"Nhập mật khẩu cũ",size:"small","show-password":"",disabled:!1,autocomplete:"off"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.confirm(t)}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),e._v(" "),r("el-form-item",{attrs:{align:"right"}},[r("el-button",{attrs:{loading:!1,plain:!1,round:!1,circle:!1,autofocus:!1,size:"small",disabled:!1},on:{click:e.cancel}},[e._v("Cancel")]),e._v(" "),r("el-button",{attrs:{type:"primary",loading:e.loading,size:"small"},on:{click:e.confirm}},[e._v("Confirm")])],1)],1)],1)],1)}),[],!1,null,"775c8630",null).exports;function w(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function v(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?w(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):w(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var O={data:function(){var e=this;return{form:{new_password:"",renew_password:""},loading:!1,ruleForm:{new_password:[{validator:function(t,r,n){""===r?n(new Error("Quý khách được yêu cầu nhập mật khẩu.")):(""!==e.form.renew_password&&e.$refs.form.validateField("renew_password"),n())},required:!0}],renew_password:[{validator:function(t,r,n){""===r?n(new Error("Quý khách được yêu cầu nhập lại mật khẩu.")):r!==e.form.new_password?n(new Error("Mật khẩu nhập lại không trùng khớp.")):n()},required:!0}]}}},computed:v(v({},Object(c.d)("change-password",["NewPassword","RenewPassword"])),{},{new_password:{get:function(){return this.NewPassword},set:function(e){return this.form.new_password=e,this.ChangeNewPassword(e)}},renew_password:{get:function(){return this.RenewPassword},set:function(e){return this.form.renew_password=e,this.ChangeReNewPassword(e)}}}),methods:v(v(v({},Object(c.c)("change-password",["CancelShow","ChangeNewPassword","ChangeReNewPassword"])),Object(c.b)("change-password",["UpdatePass"])),{},{confirm:function(){var e=this;e.$refs.form.validate(function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(r){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!r){t.next=13;break}return e.loading=!0,t.prev=2,t.next=5,e.UpdatePass(e.form.new_password);case 5:t.next=10;break;case 7:t.prev=7,t.t0=t.catch(2),e.$message({type:"error",message:t.t0});case 10:e.loading=!1,t.next=14;break;case 13:return t.abrupt("return",!1);case 14:case"end":return t.stop()}}),t,null,[[2,7]])})));return function(e){return t.apply(this,arguments)}}())}})},y=Object(m.a)(O,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-row",[r("el-col",{attrs:{span:24,offset:0}},[r("el-form",{ref:"form",attrs:{rules:e.ruleForm,model:e.form,"status-icon":"","label-width":"auto","label-position":"top",inline:!1,disabled:!1,"inline-message":!1,"show-message":"","validate-on-rule-change":"",size:"small"}},[r("el-form-item",{attrs:{label:"Mật khẩu mới",prop:"new_password",align:"left"}},[r("el-input",{attrs:{placeholder:"Nhập mật khẩu mới","show-password":"",size:"small",disabled:!1,autocomplete:"off"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.confirm(t)}},model:{value:e.new_password,callback:function(t){e.new_password=t},expression:"new_password"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"Nhập lại mật khẩu mới",prop:"renew_password",align:"left"}},[r("el-input",{attrs:{placeholder:"Nhập lại mật khẩu mới","show-password":"",size:"small",disabled:!1,autocomplete:"off"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.confirm(t)}},model:{value:e.renew_password,callback:function(t){e.renew_password=t},expression:"renew_password"}})],1),e._v(" "),r("el-form-item",{attrs:{align:"right"}},[r("el-button",{attrs:{loading:!1,plain:!1,round:!1,circle:!1,autofocus:!1,size:"small",disabled:!1},on:{click:e.CancelShow}},[e._v("Cancel")]),e._v(" "),r("el-button",{attrs:{type:"primary",loading:e.loading,size:"small"},on:{click:e.confirm}},[e._v("Confirm")])],1)],1)],1)],1)}),[],!1,null,"b5a65d36",null).exports;function _(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function j(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?_(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):_(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var k={data:function(){return{formData:{option:"1"},ruleForm:{option:[{required:!0,message:"Bạn phải chọn lựa thiết bị ."}]},loading:!1}},computed:{},methods:j(j({},Object(c.b)("change-password",["Logout"])),{},{logout:function(){var e=this;e.$refs.formData.validate(function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(r){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!r){t.next=14;break}return e.loading=!0,t.prev=2,t.next=5,e.Logout(e.formData.option);case 5:window.location.href="/",t.next=11;break;case 8:t.prev=8,t.t0=t.catch(2),e.$message({type:"error",message:t.t0});case 11:e.loading=!1,t.next=15;break;case 14:return t.abrupt("return",!1);case 15:case"end":return t.stop()}}),t,null,[[2,8]])})));return function(e){return t.apply(this,arguments)}}())}})};function P(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function x(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?P(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):P(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var D={components:{OldPassword:h,NewPassword:y,VerifyPassword:Object(m.a)(k,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("transition",{attrs:{name:"el-zoom-in-bottom"}},[r("el-row",[r("el-col",{attrs:{span:24,offset:0}},[r("el-divider",{attrs:{direction:"horizontal"}}),e._v(" "),r("el-form",{ref:"formData",attrs:{rules:e.ruleForm,model:e.formData,"status-icon":"","label-width":"auto","label-position":"top",inline:!1,disabled:!1,"inline-message":!1,"show-message":"","validate-on-rule-change":"",size:"small"}},[r("el-form-item",{attrs:{label:"Quý khách cần thực hiện đăng nhập lại để tiếp tục sử dụng : ",prop:"option",align:"center"}},[r("el-radio-group",{model:{value:e.formData.option,callback:function(t){e.$set(e.formData,"option",t)},expression:"formData.option"}},[r("el-radio",{attrs:{label:"1"}},[e._v("Chỉ riêng thiết bị này")]),e._v(" "),r("el-radio",{attrs:{label:"2"}},[e._v("Tất cả thiết bị")])],1)],1),e._v(" "),r("el-form-item",{attrs:{align:"center"}},[r("el-button",{attrs:{type:"primary",size:"small",loading:e.loading},on:{click:e.logout}},[e._v("Đăng xuất")])],1)],1)],1)],1)],1)}),[],!1,null,"f4b673e0",null).exports},data:function(){return{}},computed:x({},Object(c.d)("change-password",["title","step","show","dialog"])),methods:x(x({},Object(c.c)("change-password",["CancelShow"])),Object(c.b)("change-password",["CheckPass"]))};function C(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function S(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?C(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):C(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var E,N={components:{DialogChangePassword:Object(m.a)(D,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-dialog",{attrs:{"close-on-click-modal":!1,title:e.title,visible:e.dialog,center:!1,fullscreen:!1,top:"15vh",width:"30%"},on:{close:e.CancelShow}},[r("el-row",[r("el-col",{attrs:{span:24,offset:0}},[r("el-steps",{attrs:{space:200,direction:"horizontal",active:e.step,"align-center":"","process-status":"finish","finish-status":"success"}},[r("el-step",{attrs:{tilte:"Bước 1"}}),e._v(" "),r("el-step",{attrs:{title:"Bước 2"}}),e._v(" "),r("el-step",{attrs:{title:"Hoàn thành"}})],1)],1)],1),e._v(" "),r("OldPassword",{directives:[{name:"show",rawName:"v-show",value:e.show.OldPassword,expression:"show.OldPassword"}]}),e._v(" "),r("NewPassword",{directives:[{name:"show",rawName:"v-show",value:e.show.NewPassword,expression:"show.NewPassword"}]}),e._v(" "),r("VerifyPassword",{directives:[{name:"show",rawName:"v-show",value:e.show.VerifyPassword,expression:"show.VerifyPassword"}]})],1)}),[],!1,null,"496cfc51",null).exports},data:function(){return{admin:!1}},created:(E=Object(o.a)(regeneratorRuntime.mark((function e(){var t,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.$axios.post("/api/account/permission/admin");case 2:t=e.sent,data=t.data,this.admin=data.admin;case 5:case"end":return e.stop()}}),e,this)}))),function(){return E.apply(this,arguments)}),methods:S(S({},Object(c.c)("change-password",["turnOn_dialog"])),{},{logout:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$auth.logout();case 2:case"end":return t.stop()}}),t)})))()}})},header=Object(m.a)(N,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-menu",{attrs:{mode:"horizontal","background-color":"#545c64","text-color":"#fff","active-text-color":"#ffd04b"}},[r("el-menu-item",{staticStyle:{"margin-left":"10px"},attrs:{index:"1"}},[r("el-image",{staticStyle:{width:"50px","margin-top":"12px"},attrs:{src:"/logo.png"}}),e._v("\n\t\tHỆ THỐNG THÔNG TIN ĐĂNG KIỂM QUỐC GIA\n\t")],1),e._v(" "),r("el-menu-item",{staticStyle:{float:"right"}},[r("el-dropdown",{attrs:{placement:"bottom-end",size:"small",trigger:"click","split-button":!1,"hide-on-click":!1}},[r("span",[r("i",{staticClass:"el-icon-s-tools",staticStyle:{color:"white"}})]),e._v(" "),r("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[e.admin?r("el-dropdown-item",{attrs:{divided:!1,disabled:!1}},[r("el-link",{staticStyle:{color:"#606266"},attrs:{href:"/dashboard/profile",icon:"el-icon-magic-stick",type:"text",underline:!1,disabled:!1}},[e._v("Config")])],1):e._e(),e._v(" "),e.admin?r("el-dropdown-item",{attrs:{divided:!0,disabled:!1}},[r("el-link",{staticStyle:{color:"#606266"},attrs:{href:"/dashboard/dang-ki",icon:"el-icon-user",type:"text",underline:!1,disabled:!1}},[e._v("Thành viên")])],1):e._e(),e._v(" "),r("el-dropdown-item",{attrs:{divided:e.admin,disabled:!1}},[r("el-link",{attrs:{icon:"el-icon-key",type:"primary",underline:!1,disabled:!1},on:{click:e.turnOn_dialog}},[e._v("Thay đổi mật khẩu")])],1),e._v(" "),r("el-dropdown-item",{attrs:{divided:!0,disabled:!1}},[r("el-link",{attrs:{icon:"el-icon-switch-button",type:"warning",underline:!1,disabled:!1},on:{click:e.logout}},[e._v("Đăng xuất")])],1)],1)],1)],1),e._v(" "),r("DialogChangePassword")],1)}),[],!1,null,"705e7200",null).exports,$={data:function(){return{permission:[]}},created:function(){var e=Object(o.a)(regeneratorRuntime.mark((function e(){var t,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.$axios.post("/api/account/permission");case 2:t=e.sent,data=t.data,this.permission=data.permission;case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),methods:{}},z={components:{Header:header,Aside:Object(m.a)($,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-menu",{attrs:{router:!0,"default-active":e.$route.path,"menu-trigger":"click",collapse:!1,mode:"vertical"}},[e.permission.find((function(e){return"thong_tin_chu_so_huu"===e||"dang_kiem"===e}))?r("el-menu-item",{attrs:{index:"/dashboard"}},[r("i",{staticClass:"el-icon-search"}),e._v(" "),r("span",[e._v("Tra Cứu")])]):e._e(),e._v(" "),e.permission.find((function(e){return"export_file"===e}))?r("el-menu-item",{attrs:{index:"/dashboard/phan-loai"}},[r("i",{staticClass:"el-icon-s-promotion"}),e._v(" "),r("span",[e._v("Phân loại")])]):e._e(),e._v(" "),e.permission.find((function(e){return"up_bks"===e}))?r("el-menu-item",{attrs:{index:"/dashboard/nap-bks"}},[r("i",{staticClass:"el-icon-document-copy"}),e._v(" "),r("span",[e._v("Nạp BKS")])]):e._e()],1)}),[],!1,null,"59325a0d",null).exports}},R=Object(m.a)(z,(function(){var e=this.$createElement,t=this._self._c||e;return t("el-container",[t("el-header",[t("Header")],1),this._v(" "),t("el-container",[t("el-aside",{staticStyle:{"margin-left":"20px"},attrs:{width:"200px"}},[t("Aside")],1),this._v(" "),t("el-main",[t("nuxt")],1)],1)],1)}),[],!1,null,"4b34d598",null);t.default=R.exports}}]);