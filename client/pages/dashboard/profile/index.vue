<template>
	<el-row>
		<el-col :span="24" :offset="0">
			<el-tabs @tab-click="" v-model="account_type" type="border-card" tab-position="top" :closable="false" :addable="false" :editable="false" :stretch="false">
			
				<el-tab-pane label="Liên kết">
					<el-row :gutter="20">
						<el-col align="left" :span="12" :offset="0">
							<el-card :body-style="{ padding: '0px' }" shadow="hover">
								<div slot="header">
									Đăng kiểm VR
								</div>
								<div style="padding: 14px;">
									
									    
									
									<el-dropdown style="margin-left:7px" @command="remove_crawl" v-for="(data,index) in vr_account" :key="index" :type="((data.scanned !== data.limit) && data.active) ? 'success' : 'danger'"  placement="bottom-end" size="mini" trigger="click"  :split-button="true" :hide-on-click="false">
										<el-tooltip effect="dark"  placement="bottom-start">
											<div slot="content">

												<h4  v-if="data.active">Limit: {{data.limit}} <br/> Scanned: {{data.scanned}}</h4>

												<h4 v-if="((data.scanned !== data.limit) && !data.active)">Tài khoản này không truy cập được</h4>

											</div>
									  <span>
									   {{data.username}}

									  </span>
									</el-tooltip>
									  <el-dropdown-menu slot="dropdown">
									    <el-dropdown-item :command="data" icon="" :divided="false" :disabled="false">Xóa</el-dropdown-item>
									    
									  </el-dropdown-menu>
									</el-dropdown>
									
									
									

									<el-button type="primary" @click="vr_show = true" icon="" :loading="false" :plain="true" :round="false" :circle="false" :autofocus="false" size="mini" :disabled="false">+</el-button>
								</div>
							</el-card>
						</el-col>
						<el-col align="left" :span="12" :offset="0">
							<el-card :body-style="{ padding: '0px' }" shadow="hover">
								<div slot="header">
									Thông tin cá nhân VETC
								</div>
								<div style="padding: 14px;">
									<el-dropdown style="margin-left:7px" @command="remove_crawl" v-for="(data,index) in vetc_account" :key="index" :type="data.status ? 'success' : 'danger'"   placement="bottom-end" size="mini" trigger="click"  :split-button="true" :hide-on-click="false">
									  <span>
									   {{data.username}}
									  </span>
									  <el-dropdown-menu slot="dropdown">
									    <el-dropdown-item :command="data" icon="" :divided="false" :disabled="false">Xóa</el-dropdown-item>
									    
									  </el-dropdown-menu>
									</el-dropdown>
									
									<el-button  v-show="vetc_account.length === 0" type="primary" icon="" @click="vetc_show = true" :loading="false" :plain="true" :round="false" :circle="false" :autofocus="false" size="mini" :disabled="false">+</el-button>
								</div>
							</el-card>
						</el-col>
					</el-row>
					
				</el-tab-pane>



			</el-tabs>
		</el-col>
		<el-dialog title="Nhập thông tin tài khoản Đăng kiểm VR" :visible.sync="vr_show" :center="false" :fullscreen="false" top="15vh" width="30%">
			<el-form ref="vr" :rules="vr_form" :model="vr"  status-icon label-width="auto" label-position="top" :inline="false" :disabled="false" :inline-message="false" show-message validate-on-rule-change size="small">
				<el-form-item label="Username" prop="username" align="left">
					<el-input placeholder="Tên đăng nhập" v-model="vr.username" size="small" clearable type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="Password" prop="password" align="left">
					<el-input placeholder="Mật khẩu" v-model="vr.password" size="small" show-password :disabled="false" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="Số biển kiểm soát Quét VR:" prop="limit" align="left">
					
					<el-input  v-model="vr.limit" size="small" clearable type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>

			<span slot="footer">
				<el-button size="small" @click="cancelVR">Cancel</el-button>
				<el-button type="primary" :loading="vr_loading" size="small" @click="add_vr">Confirm</el-button>
			</span>
		</el-dialog>
		<el-dialog title="Nhập tài khoản tra cứu VETC" :visible.sync="vetc_show" :center="false" :fullscreen="false" top="15vh" width="30%">
			<el-form ref="vetc" :rules="vetc_form" :model="vetc"  status-icon label-width="auto" label-position="top" :inline="false" :disabled="false" :inline-message="false" show-message validate-on-rule-change size="small">
				<el-form-item label="Username" prop="username" align="left">
					<el-input placeholder="Tên đăng nhập" v-model="vetc.username" size="small" clearable type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="Password" prop="password" align="left">
					<el-input placeholder="Mật khẩu" v-model="vetc.password" size="small" show-password :disabled="false" autocomplete="off"></el-input>
				</el-form-item>
				
			</el-form>

			<span slot="footer">
				<el-button size="small" @click="cancelVETC">Cancel</el-button>
				<el-button type="primary" :loading="vetc_loading" size="small" @click="add_vetc">Confirm</el-button>
			</span>
		</el-dialog>
	</el-row>
</template>
<script>
	import { mapState,mapGetters,mapMutations,mapActions } from 'vuex';
	export default {
		data(){
			return {
				account_type:'',
				loading:false,
				formData:{
					fullname:'',
					email:'',
					phone:'',
					
				},
				ruleForm:{
					fullname:[{type:'string',required:true,message:'Quý khách vui lòng nhập Họ và Tên.'}],
					email:[{type:'email',required:true}],
					phone:[{type:'string',min:10,max:10,message:'Số điện thoại không hợp lệ.'}],
					gender:[{type:'string',required:true,message:'Chọn giới tính'}],
					date_of_birth:[{type:'number',required:true,message:'Quý khách cần nhập thông tin ngày sinh.'}]
				},
				vr_show:false,
				crawl_account:[],
				vr:{
					username:'',
					password:'',
					limit:'500'
				},
				vr_form:{
					username:[{type:'string',required:true,message:'Quý khách vui lòng nhập username'}],
					password:[{type:'string',required:true,message:'Quý khách vui lòng nhập password'}],
					
				},
				vr_loading:false,
				
				vetc_show:false,
				vetc:{
					username:'',
					password:'',
					limit:'500'
				},
				vetc_form:{
					username:[{type:'string',required:true,message:'Quý khách vui lòng nhập username'}],
					password:[{type:'string',required:true,message:'Quý khách vui lòng nhập password'}],
					

				},
				vetc_loading:false


			}
		},
		created:async function(){
			let checkadmin = await this.$axios.post('/api/account/permission/admin');
			if(checkadmin.data.error) {
				this.$router.push('/')
			}else{
				await this.InIt();
			}
			
		},
		computed:{
//			...mapState('',[]);
//			...mapGetters('',[]);
vr_account(){
	return this.crawl_account.filter(e=>e.type === 'vr');
},
vetc_account(){
	return this.crawl_account.filter(e=>e.type === 'vetc');
}
},
methods:{
//			...mapMutations('',[]);
//			...mapActions('',[]);
async InIt(){
	await Promise.all([this.crawl(),this.RefreshInfo()])

},
wait(time){
	return new Promise(resolve=>{
		setTimeout(function(){
			resolve(time)
		},time)
	})
},
async crawl(){
	let {data} = await this.$axios.get('/api/crawl');
	this.crawl_account = data;
	await this.wait(1000);
	return await this.crawl();
},
async RefreshInfo(){
	try{
		let {data} = await this.$axios.post('/api/account/info');

		if(data.error) throw data.error;
		return this.formData = data;
	}catch(message){
		return this.$message({type:'error',message})
	}
},
async add_vr(){
	let _ = this;
	_.$refs['vr'].validate(async valid=>{
		if(valid){
			_.vr_loading = true;
			try{
				let form_data = _.vr;
				form_data.limit = parseInt(form_data.limit)
				let {data:{username,id,type,status,error,limit,scanned}} = await _.$axios.post('/api/crawl/add-vr',form_data);
				if(error) throw error;
				_.crawl_account.push({username,type,status,id,limit,scanned,active:true});
				_.cancelVR();
				_.$message({type:'success',message:'Quý khách thêm tài khoản VR thành công !'})
				
			}catch(message){
				_.$message({type:'error',message});
			}
			_.vr_loading = false;
		}else{
			return false;
		}
	})
},
async add_vetc(){
	let _ = this;
	_.$refs['vetc'].validate(async valid=>{
		if(valid){
			_.vetc_loading = true;
			try{
				
				
				 _.vetc.limit = parseInt( _.vetc.limit)
				let {data:{username,type,id,status,error}} = await _.$axios.post('/api/crawl/add-vetc', _.vetc);
				if(error) throw error;
				_.crawl_account.push({username,type,status,id});
				
				_.cancelVETC();
				_.$message({type:'success',message:'Quý khách thêm tài khoản VETC thành công !'})

				
			}catch(message){
				_.$message({type:'error',message});
			}
			_.vetc_loading = false;
		}else{
			return false;
		}
	})
},

cancelVR(){
	this.vr_show = false;
	this.vr.username = '';
	this.vr.password = '';
},
cancelVETC(){
	this.vetc_show = false;
	this.vetc.username = '';
	this.vetc.password = '';
},
async remove_crawl(obj){
	
	let {data} = await this.$axios.delete('/api/crawl/'+obj.id);
	await this.$axios.post('/api/crawl/remove-config',{username:obj.username});
	

	this.crawl_account = this.crawl_account.filter(e=>e.id !== obj.id)
	this.$message({type:'warning',message:'Đã xóa tài khoản '+obj.username+ ' !'})
}

}
}
</script>
<style scoped>

</style>