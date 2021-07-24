<template>
	
	<el-row>
		<el-col :span="24" :offset="0">
			<el-form ref="form" :rules="ruleForm" :model="form"  status-icon label-width="auto" label-position="top" :inline="false" :disabled="false" :inline-message="false" show-message validate-on-rule-change size="small">

				<el-form-item label="Mật khẩu mới" prop="new_password" align="left">
					<el-input @keyup.enter.native="confirm" placeholder="Nhập mật khẩu mới" show-password v-model="new_password" size="small":disabled="false" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="Nhập lại mật khẩu mới" prop="renew_password" align="left">

					<el-input @keyup.enter.native="confirm" placeholder="Nhập lại mật khẩu mới" show-password v-model="renew_password" size="small":disabled="false" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item align="right">
					<el-button @click="CancelShow" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="small" :disabled="false">Cancel</el-button>
					<el-button type="primary" @click="confirm" :loading="loading" size="small">Confirm</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
	
</template>
<script>
	import { mapState,mapGetters,mapMutations,mapActions } from 'vuex';
	export default {
		data(){
			var validate_password = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('Quý khách được yêu cầu nhập mật khẩu.'));
				} else {
					if (this.form.renew_password !== '') {
						this.$refs.form.validateField('renew_password');
					}
					callback();
				}
			};
			var validate_repassword = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('Quý khách được yêu cầu nhập lại mật khẩu.')); 
				} else if (value !== this.form.new_password) {
					callback(new Error('Mật khẩu nhập lại không trùng khớp.'));
				} else {
					callback();
				}
			};
			return {
				form:{
					new_password:'',
					renew_password:''
				},
				loading:false,
				ruleForm:{
					new_password:[{validator: validate_password,required:true}],
					renew_password:[{validator : validate_repassword,required:true}]
				}
			}
		},
		computed:{
			...mapState('change-password',['NewPassword','RenewPassword']),
//			...mapGetters('',[]);
            new_password:{
            	get:function(){
            		return this.NewPassword
            	},
            	set:function(value){
            		this.form.new_password = value;
            		return this.ChangeNewPassword(value)
            	}
            },
            renew_password:{
            	get:function(){
            		return this.RenewPassword
            	},
            	set:function(value){
            		this.form.renew_password = value;
            		return this.ChangeReNewPassword(value)
            	}
            }
},
methods:{
	...mapMutations('change-password',['CancelShow','ChangeNewPassword','ChangeReNewPassword']),
	...mapActions('change-password',['UpdatePass']),
	
	confirm(){
		let _ = this;
		_.$refs['form'].validate(async valid=>{
			if(valid){
				_.loading = true;
				try{
					await _.UpdatePass(_.form.new_password);
				}catch(message){
					_.$message({type:'error',message});
				}
				_.loading = false;
			}else{
				return false;
			}
		})
	}


}
}
</script>
<style scoped>

</style>