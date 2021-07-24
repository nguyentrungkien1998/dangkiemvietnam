<template>
	<transition name="el-zoom-in-bottom">

		<el-row>
			<el-col :span="24" :offset="0">
				<el-divider direction="horizontal"></el-divider>
				<el-form ref="formData" :rules="ruleForm" :model="formData"  status-icon label-width="auto" label-position="top" :inline="false" :disabled="false" :inline-message="false" show-message validate-on-rule-change size="small">
					<el-form-item label="Quý khách cần thực hiện đăng nhập lại để tiếp tục sử dụng : " prop="option" align="center">
						
						<el-radio-group v-model="formData.option">
							<el-radio label="1">Chỉ riêng thiết bị này</el-radio>
							<el-radio label="2">Tất cả thiết bị</el-radio>
						</el-radio-group>
					</el-form-item>


					<el-form-item align="center">
						<el-button type="primary" size="small" @click="logout" :loading="loading">Đăng xuất</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</transition>
	
</template>
<script>
	import { mapState,mapGetters,mapMutations,mapActions } from 'vuex';
	export default {
		data(){
			return {
				formData:{
					option:'1'
				},
				ruleForm:{
					option:[{required:true,message:'Bạn phải chọn lựa thiết bị .'}]
				},
				loading:false
			}
		},
		computed:{
//			...mapState('',[]);
//			...mapGetters('',[]);
},
methods:{
//			...mapMutations('',[]);
...mapActions('change-password',['Logout']),
logout(){
	let _ = this;
	_.$refs['formData'].validate(async valid=>{
		if(valid){
			_.loading = true;
			try{
				await _.Logout(_.formData.option);
				window.location.href = "/";
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