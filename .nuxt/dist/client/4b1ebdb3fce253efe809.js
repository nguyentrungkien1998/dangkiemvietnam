(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{326:function(t,e,r){"use strict";r.r(e);r(28),r(29),r(12),r(7),r(27),r(25);var n,o=r(2),c={data:function(){return{vr_prior_show:!1,vr:0,vetc:0,code:0,confirm_save:!1,form_data:{vr_delay:"",vetc_delay:"",vr_time:"",vetc_time:""},prior_num:0,config_show:!1}},created:(n=Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.init();case 2:case"end":return t.stop()}}),t,this)}))),function(){return n.apply(this,arguments)}),methods:{init:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([t.count(),t.get_config(),t.getNumPrior()]);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))()},get_config:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var r,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.post("/api/delay/get");case 2:return r=e.sent,data=r.data,t.form_data=data,t.form_data.vr_delay=data.vr_delay,t.form_data.vetc_delay=data.vetc_delay,e.abrupt("return");case 8:case"end":return e.stop()}}),e)})))()},wait:function(time){return new Promise((function(t){setTimeout((function(){return t(time)}),time)}))},count:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var r,n,o,c,code;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.post("/api/crawl/count");case 2:return r=e.sent,n=r.data.count,o=n.vr,c=n.vetc,code=n.code,t.code=code,t.vr=o,t.vetc=c,e.next=12,t.wait(2e3);case 12:return e.next=14,t.count();case 14:return e.abrupt("return",e.sent);case 15:case"end":return e.stop()}}),e)})))()},finish_upload:function(t){this.$message({type:"success",message:"Quý khách đã tải lên "+t+" BKS thành công !"})},getNumPrior:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var r,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.post("/api/prior/count");case 2:return r=e.sent,data=r.data,t.prior_num=data.num,e.next=7,t.wait(2e3);case 7:return e.next=9,t.getNumPrior();case 9:return e.abrupt("return",e.sent);case 10:case"end":return e.stop()}}),e)})))()},setTime:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.confirm_save=!0,t.form_data.vr_delay=t.form_data.vr_delay.toString(),t.form_data.vetc_delay=t.form_data.vetc_delay.toString(),t.form_data.vr_time=t.form_data.vr_time.toString(),t.form_data.vetc_time=t.form_data.vetc_time.toString(),e.next=7,t.$axios.post("/api/delay/set",t.form_data);case 7:return r=e.sent,r.data,t.$message({type:"success",message:"Cấu hình thành công !"}),t.confirm_save=!1,t.config_show=!1,e.abrupt("return");case 13:case"end":return e.stop()}}),e)})))()},removeAll:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.post("/api/prior/removeAll");case 2:return e.abrupt("return",t.$message({type:"success",message:"Đã xoá tất cả BKS ưu tiên."}));case 3:case"end":return e.stop()}}),e)})))()}}},l=r(39),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-row",[r("el-col",{attrs:{span:24,offset:0}},[r("el-row",[r("el-col",{attrs:{span:12,offset:0}},[r("el-button",{attrs:{type:"primary",icon:"el-icon-s-tools",loading:!1,plain:!1,round:!1,circle:!1,autofocus:!1,size:"mini",disabled:!1},on:{click:function(e){t.config_show=!0}}},[t._v("Cấu Hình Request")]),t._v(" "),r("el-button",{attrs:{type:"danger",icon:"el-icon-upload2",loading:!1,plain:!1,round:!1,circle:!1,autofocus:!1,size:"mini",disabled:!1},on:{click:function(e){t.vr_prior_show=!0}}},[t._v("Quét VR ưu tiên")])],1),t._v(" "),r("el-col",{attrs:{align:"right",span:12,offset:0}},[r("el-tag",{attrs:{type:"primary",closable:!1,effect:"dark",size:"mini","disable-transitions":!1}},[t._v("BKS: "+t._s(t.code))]),t._v(" "),r("el-tag",{attrs:{type:"warning",closable:!1,effect:"dark",size:"mini","disable-transitions":!1}},[t._v("VR: "+t._s(t.vr))]),t._v(" "),r("el-tag",{attrs:{type:"success",closable:!1,effect:"dark",size:"mini","disable-transitions":!1}},[t._v("VETC: "+t._s(t.vetc))])],1)],1),t._v(" "),r("el-divider",{attrs:{direction:"horizontal"}}),t._v(" "),r("el-row",[r("el-col",{attrs:{span:10,offset:7}},[r("el-upload",{staticClass:"upload-demo",attrs:{drag:"",action:"/api/bks/up",name:"code","on-success":t.finish_upload,multiple:""}},[r("i",{staticClass:"el-icon-upload"}),t._v(" "),r("div",{staticClass:"el-upload__text"},[t._v("Nhấp vào đây để "),r("em",[t._v(" up file lên")])]),t._v(" "),r("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("Tải lên file .txt chứa biển số xe ô tô,mỗi biển số 1 dòng.")])])],1)],1),t._v(" "),r("el-dialog",{attrs:{title:"Cấu Hình REQUEST",visible:t.config_show,center:!1,fullscreen:!1,top:"15vh",width:"30%"},on:{"update:visible":function(e){t.config_show=e}}},[r("el-form",{attrs:{"status-icon":"","label-width":"auto","label-position":"top",inline:!1,disabled:!1,"inline-message":!1,"show-message":"","validate-on-rule-change":"",size:"small"}},[r("el-form-item",{attrs:{label:"Số biển kiểm soát mỗi lần chạy VR:",prop:"vr_time",align:"left"}},[r("el-input-number",{staticStyle:{width:"100%"},attrs:{"controls-position":"right",placeholder:"Số biển kiểm soát",min:1,max:100},model:{value:t.form_data.vr_time,callback:function(e){t.$set(t.form_data,"vr_time",e)},expression:"form_data.vr_time"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"Số biển kiểm soát mỗi lần chạy VETC:",prop:"vetc_time",align:"left"}},[r("el-input-number",{staticStyle:{width:"100%"},attrs:{"controls-position":"right",placeholder:"Số biển kiểm soát",min:1,max:100},model:{value:t.form_data.vetc_time,callback:function(e){t.$set(t.form_data,"vetc_time",e)},expression:"form_data.vetc_time"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"Khoảng cách thời gian giữa mỗi lần Chạy VR:",prop:"vr_delay",align:"left"}},[r("el-input-number",{staticStyle:{width:"85%"},attrs:{"controls-position":"right",placeholder:"Số biển kiểm soát",min:1,max:100},model:{value:t.form_data.vr_delay,callback:function(e){t.$set(t.form_data,"vr_delay",e)},expression:"form_data.vr_delay"}}),t._v("  ( giây )\n\n\t\t\t\t")],1),t._v(" "),r("el-form-item",{attrs:{label:"Khoảng cách thời gian giữa mỗi lần Chạy VETC:",prop:"vr_delay",align:"left"}},[r("el-input-number",{staticStyle:{width:"85%"},attrs:{"controls-position":"right",placeholder:"Số biển kiểm soát",min:1,max:100},model:{value:t.form_data.vetc_delay,callback:function(e){t.$set(t.form_data,"vetc_delay",e)},expression:"form_data.vetc_delay"}}),t._v("  ( giây )\n\n\t\t\t\t")],1)],1),t._v(" "),r("span",{attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(e){t.config_show=!1}}},[t._v("Cancel")]),t._v(" "),r("el-button",{attrs:{type:"primary",loading:t.confirm_save},on:{click:t.setTime}},[t._v("Xác Nhận")])],1)],1),t._v(" "),r("el-dialog",{attrs:{title:"Quét hạn đăng kiểm đối với BKS ưu tiên",visible:t.vr_prior_show,center:!1,fullscreen:!1,top:"15vh",width:"28%"},on:{"update:visible":function(e){t.vr_prior_show=e}}},[r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:12,offset:0}},[r("el-tag",{attrs:{size:"medium",type:"success"}},[t._v("Tổng BKS:  "+t._s(t.prior_num))])],1),t._v(" "),r("el-col",{attrs:{align:"right",span:12,offset:0}},[r("el-popconfirm",{attrs:{title:"Bạn có chắc chắn?",confirmButtonText:"OK",cancelButtonText:"Không,cảm ơn.",icon:"el-icon-info",iconColor:"red"},on:{confirm:t.removeAll}},[r("el-button",{attrs:{slot:"reference",type:"danger",icon:"el-icon-delete-solid",loading:!1,plain:!1,round:!1,circle:!1,autofocus:!1,size:"mini",disabled:!1},slot:"reference"},[t._v("Xoá tất cả")])],1)],1)],1),t._v(" "),r("br"),t._v(" "),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{align:"center",span:24,offset:0}},[r("el-upload",{staticClass:"upload-demo",attrs:{drag:"",action:"/api/prior/up",name:"code","on-success":t.finish_upload,multiple:""}},[r("i",{staticClass:"el-icon-upload"}),t._v(" "),r("div",{staticClass:"el-upload__text"},[t._v("Nhấp vào đây để "),r("em",[t._v(" up file lên")])]),t._v(" "),r("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("Tải lên file .txt chứa biển số xe ô tô ƯU TIÊN,mỗi biển số 1 dòng.")])])],1)],1),t._v(" "),r("br")],1)],1)],1)}),[],!1,null,"2df6a8a4",null);e.default=component.exports}}]);