<template>
	<el-dialog @close="CancelShow" :close-on-click-modal="false" :title="title" :visible="dialog" :center="false" :fullscreen="false" top="15vh" width="30%">
		<el-row>
			<el-col :span="24" :offset="0">
				<el-steps :space="200"  direction="horizontal" :active="step" align-center process-status="finish" finish-status="success">
					<el-step tilte="Bước 1"></el-step>
					<el-step title="Bước 2"></el-step>
					<el-step title="Hoàn thành"></el-step>

				</el-steps>
			</el-col>
		</el-row>


		<OldPassword v-show="show.OldPassword"/>
		<NewPassword v-show="show.NewPassword"/>			
		<VerifyPassword v-show="show.VerifyPassword"/>

	</el-dialog>
</template>
<script>

	import OldPassword from './old-password';
	import NewPassword from './new-password';
	import VerifyPassword from './verify-password';
	import { mapState,mapGetters,mapMutations,mapActions } from 'vuex';
	export default {
		components:{OldPassword,NewPassword,VerifyPassword},
		data(){
			return {
				
			}
		},
		computed:{
			...mapState('change-password',['title','step','show','dialog'])
		},
		methods:{
			...mapMutations('change-password',['CancelShow']),
			...mapActions('change-password',['CheckPass'])
			

		}
	}
</script>
<style scoped>

</style>