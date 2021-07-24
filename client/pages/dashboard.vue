<template>
	<el-container>
		<el-header>
			<Header/>
		</el-header>
		<el-container>
			<el-aside style="margin-left:20px" width="200px">
				<Aside/>
			</el-aside>
			<el-main>
				<nuxt/>
			</el-main>
		</el-container>
	</el-container>

</template>
<script>
	import Header from '~/components/dashboard/container/header';
	import Aside from '~/components/dashboard/container/aside';

	export default {
		components:{Header,Aside}
	}
</script>
<style scoped>

</style>