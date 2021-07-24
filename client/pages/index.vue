<template>
  <el-container>
    <el-header>
      <el-menu


      mode="horizontal"

      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item style="margin-left:10px" index="1">
        <el-image style="width:50px;margin-top:8px" src="/logo.png" >

        </el-image>
        HỆ THỐNG THÔNG TIN ĐĂNG KIỂM QUỐC GIA
      </el-menu-item>
    </el-menu>
  </el-header>

  <el-main>
    <br><br><br> <br> <br>
    <nuxt/>
  </el-main>
</el-container>
</template>
<script>
  export default {

    data(){
      return {

      }
    }
  }
</script>
<style scoped>
.link{
	float:right;
	margin-top:30px;
	margin-right:25px
}
.register{
	margin-left:20px;
	float:right;
	margin-top:20px;
	margin-right:25px
}
</style>
