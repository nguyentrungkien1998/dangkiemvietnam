<template>
	
	
	<el-menu :router="true" :default-active="$route.path" menu-trigger="click" :collapse="false" mode="vertical" >
	  <el-menu-item v-if="permission.find(e=>(e === 'thong_tin_chu_so_huu') || (e === 'dang_kiem'))" :index="'/dashboard'">
	  	 <i class="el-icon-search"></i>
	  	 <span>Tra Cứu</span>
	  </el-menu-item>
	  <el-menu-item v-if="permission.find(e=>e === 'export_file')" :index="'/dashboard/phan-loai'">
	  	 <i class="el-icon-s-promotion"></i>
	  	 <span>Phân loại</span>
	  </el-menu-item>
	  <el-menu-item v-if="permission.find(e=>e === 'up_bks')" :index="'/dashboard/nap-bks'">
	  	 <i class="el-icon-document-copy"></i>
	  	 <span>Nạp BKS</span>
	  </el-menu-item>
	  
	</el-menu>
	
</template>
<script>
	export default {
		data(){
			return {
				permission:[]
			}
		},
		created:async function(){
			let {data} = await this.$axios.post('/api/account/permission');
			//if(data.error) await this.$auth.logout()
			this.permission = data.permission;
		},
		methods:{
			
		}
	}
</script>
<style scoped>

</style>
