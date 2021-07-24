<template>
	
	<el-menu


	mode="horizontal"

	background-color="#545c64"
	text-color="#fff"
	active-text-color="#ffd04b">
	<el-menu-item style="margin-left:10px" index="1">
		<el-image style="width:50px;margin-top:12px" src="/logo.png" >
			 
		</el-image>
		HỆ THỐNG THÔNG TIN ĐĂNG KIỂM QUỐC GIA
	</el-menu-item>


	<el-menu-item style="float:right">
		<el-dropdown placement="bottom-end" size="small" trigger="click" :split-button="false" :hide-on-click="false">
			<span >

				<i  style="color:white" class="el-icon-s-tools"></i>

			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item v-if="admin" :divided="false" :disabled="false">
					
						
					 <el-link href="/dashboard/profile"icon="el-icon-magic-stick" style="color:#606266" type="text" :underline="false" :disabled="false" >Config</el-link>
				</el-dropdown-item>

				<el-dropdown-item v-if="admin" :divided="true" :disabled="false">
					   <el-link href="/dashboard/dang-ki"icon="el-icon-user" style="color:#606266" type="text" :underline="false" :disabled="false">Thành viên</el-link>
						
					
				</el-dropdown-item>

				<el-dropdown-item  :divided="admin" :disabled="false">
					<el-link icon="el-icon-key" type="primary" :underline="false" @click="turnOn_dialog" :disabled="false">Thay đổi mật khẩu</el-link>
				</el-dropdown-item>


				<el-dropdown-item :divided="true" :disabled="false">
					<el-link icon="el-icon-switch-button" @click="logout" type="warning" :underline="false" :disabled="false">Đăng xuất</el-link>
				</el-dropdown-item>

			</el-dropdown-menu>
		</el-dropdown>
	</el-menu-item>

	<DialogChangePassword/>
</el-menu>

</template>
<script>
	import { mapState,mapGetters,mapMutations,mapActions } from 'vuex';
	import DialogChangePassword from '~/components/dashboard/change-password';

	export default {
		
		components:{DialogChangePassword},
		data(){
			return {
				admin:false
			}
		},
		created:async function(){
			let {data} = await this.$axios.post('/api/account/permission/admin');
			//if(data.error) await this.$auth.logout()
			this.admin = data.admin;

		},
		
		methods:{
			...mapMutations('change-password',['turnOn_dialog']),
			async logout(){
				await this.$auth.logout()
			}
			
		}
	}
</script>
<style scoped>

</style>