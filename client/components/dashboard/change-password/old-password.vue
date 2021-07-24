<template>
	
	<el-row>
		<el-col :span="24" :offset="0">
			<el-form ref="formData" :rules="ruleForm" :model="formData"  status-icon label-width="auto" label-position="top" :inline="false" :disabled="false" :inline-message="false" show-message validate-on-rule-change size="small">
				<el-form-item label="Mật khẩu cũ" prop="password" align="left">
					<el-input @keyup.enter.native="confirm"  placeholder="Nhập mật khẩu cũ" v-model="password" size="small" show-password :disabled="false" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item align="right">
					<el-button @click="cancel" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="small" :disabled="false">Cancel</el-button>
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
			return {
				formData:{
					password:''
				},
				loading:false,
				ruleForm:{
					password:[{type:'string',required:true,message:'Quý khách được yêu cầu nhập mật khẩu cũ.'}]
				}
			}
		},
		
		computed:{
			...mapState('change-password',['OldPassword']),
//			...mapGetters('',[]);
password: {
	get() {
		return this.OldPassword;
	},
	set(value) {
		this.formData.password = value;
		return this.ChangePassword(value);
		
	}
}
},
methods:{
	...mapMutations('change-password',['CancelShow','ChangePassword']),
	...mapActions('change-password',['CheckPass']),
	cancel(){
		this.password = '';
		this.CancelShow();
	},
	confirm(){

		let _ = this;
		this.$refs['formData'].validate(async valid=>{
			if(valid){
				try{
					await _.CheckPass(_.formData.password);
				}catch(message){
					this.$message({type:'error',message})
				}
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