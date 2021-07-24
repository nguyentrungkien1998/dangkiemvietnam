<template>
	<el-row>
		<el-col :span="24" :offset="0">
			<el-row>
				<el-col align="right" :span="3" :offset="21">
					<el-button type="primary" @click="register_show = true" icon="" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="mini" :disabled="false">Tạo Tài Khoản</el-button>
				</el-col>
			</el-row>
			

			<el-dialog title="Đăng kí Thành viên" :visible.sync="register_show" :center="true" :fullscreen="true">
				<transition name="el-zoom-in-center">
					<div class="transition-box">
						<el-col :span="6" :offset="9">
							<center>
								Tạo tài khoản
							</center>

							<el-form ref="register" :rules="register_form" :model="formData"  status-icon label-width="auto" label-position="top" :inline="false" :disabled="false" :inline-message="false" show-message validate-on-rule-change size="medium">

								
								<el-form-item class="field" label="Tên đăng nhập" prop="username" align="left">
									<el-input @keyup.enter.native="register" placeholder="Viết liền không dấu" v-model="formData.username" size="medium" clearable type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item class="field" label="Mật khẩu" prop="password" align="left">
									<el-input @keyup.enter.native="register" placeholder="Nhập mật khẩu" v-model="formData.password" size="medium"  show-password :disabled="false" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item class="field" label="Nhập lại mật khẩu" prop="repassword" align="left">
									<el-input @keyup.enter.native="register" placeholder="Nhập lại mật khẩu" v-model="formData.repassword" size="medium" show-password :disabled="false" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item label="Cấp quyền" prop="permission" align="left">
									<el-checkbox-group v-model="formData.permission">
										<el-checkbox v-for="({label,text},index) in permission_option" :key="index" :label="label" :border="false" >{{text}}</el-checkbox>					
									</el-checkbox-group>
								</el-form-item>
								<el-form-item label="." align="center">
									<el-button @click="register_show = false">Cancel</el-button>
									<el-button type="primary" @click="register" :loading="loading">Đăng kí</el-button>
								</el-form-item>
								<br> <br>
								(*) Admin cấp quyền cho thành viên truy cập vào hệ thống

							</el-form>

						</el-col>
					</div>
				</transition>

			</el-dialog>
			<el-row>
				<el-col :span="24" :offset="0">
					<el-table :data="users" height="500" :border="false" :highlight-current-row="false" :stripe="false" :lazy="false" :show-summary="false" tooltip-effect="light" style="width: 100%">
						<el-table-column type="index" align="left" :sortable="false" :fixed="false" width="90"/>
						<el-table-column label="Username" prop="username" align="left" :sortable="false" :fixed="false" width="220"/>
						<el-table-column label="Tính năng" align="left" :sortable="false" :fixed="false" width="650">
							<template slot-scope="scope">
								<el-checkbox-group @change="update_permission(scope.row)" v-model="scope.row.permission">
									<el-checkbox v-for="({label,text},index) in permission_option" :key="index" :label="label" :border="false" :disabled="scope.row.username === 'admin'">{{text}}</el-checkbox>					
								</el-checkbox-group>
							</template>
						</el-table-column>
						<el-table-column  align="right" :sortable="false" :fixed="false" width="190">
							<template slot-scope="scope">
								<el-popconfirm title="Bạn có chắc chắn?" @onConfirm="remove_user(scope.row.id)" confirmButtonText='OK' cancelButtonText='Không,cảm ơn.' icon="el-icon-info" iconColor="red">

									<el-button  slot="reference" type="danger" icon="el-icon-delete-solid" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="mini" :disabled="false"></el-button>
								</el-popconfirm>

							</template>
						</el-table-column>

					</el-table>

				</el-col>
			</el-row>
		</el-col>
	</el-row>

</template>
<script>
	export default {
		data(){
			var validate_password = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('Quý khách được yêu cầu nhập mật khẩu.'));
				} else {
					if (this.formData.repassword !== '') {
						this.$refs.register.validateField('repassword');
					}
					callback();
				}
			};
			var validate_repassword = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('Quý khách được yêu cầu nhập lại mật khẩu.')); 
				} else if (value !== this.formData.password) {
					callback(new Error('Mật khẩu nhập lại không trùng khớp.'));
				} else {
					callback();
				}
			};
			
			return {
				users:[],
				select:[],
				register_show:false,
				permission_option:[
				{label:'dang_kiem',text:'Tra cứu Đăng kiểm'},
				{label:'thong_tin_chu_so_huu',text:'Thông tin chủ sở hữu'},
				{label:'export_file',text:'Export File'},
				{label:'up_bks',text:'Upload biển kiểm soát'},

				],
				formData:{
					username:'',
					password:'',
					repassword:'',
					permission:[]

					
				},
				level:[],
				loading:false,
				register_form:{
					username:[{type:'string',required:true,message:'Quý khách được yêu cầu nhập Tên đăng nhập.'}],
					password:[{validator:validate_password,type:'string',required:true}],
					repassword:[{validator:validate_repassword,type:'string',required:true}],
					
				}


			}
		},
		created:async function(){
			let checkadmin = await this.$axios.post('/api/account/permission/admin');
			if(checkadmin.data.error) {
				this.$router.push('/')
			}else{
				let {data} = await this.$axios.get('/api/account');
				this.users = data;
			}
		},
		methods:{
			register(){
				let _ = this;
				_.loading = true;
				this.$refs['register'].validate(async (valid)=>{
					if(valid){
						
						
						let {data} = await _.$axios.post('/api/account/register',_.formData);
						
						if(data.id) {
							_.register_show = false;
							_.$message({type:'success',message:'Đăng kí thành công !'});
							_.users.push(data);
							
						}else{
							_.$message({type:'error',message:data.error});
						}
						
					}else{
						return false;
					};
					_.loading = false;
				})
			},
			async remove_user(id){
				let {data} = await this.$axios.delete('/api/account/'+id);
				this.users = this.users.filter(e=>e.id !== id);
				this.$message({type:'warning',message:'Tài khoản đã được loại bỏ.'})
			},
			async update_permission(row){
				let {data} = await this.$axios.post('/api/account/permission/update',{id_user:row.id,permission:row.permission});
				if(data === 'OK'){
					this.$message({type:'success',message:'Đã update thành công !'})
				}else if(data.error){
					this.$message({type:'error',message:data.error})

				}
			}
		}
	}
</script>
<style scoped>
.brand{
	color:#3c4f65;
	text-align: left;
	margin-bottom: 20px;
	margin-top:35px;
}
.field{
	margin-bottom: 16px
}
</style>