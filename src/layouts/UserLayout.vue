<template>
  <div id="userLayout">
    <el-container style="height: 100vh">
      <el-header class="header">
        <el-space>
          <img class="logo" src="../assets/logo.png" />
          <div>元答答 AI 答题应用平台</div>
        </el-space>
      </el-header>
      <el-main class="content">
        <router-view />
      </el-main>
      <el-footer class="footer">
<!--        <a href="https://github.com/Stay2003" target="_blank">-->
<!--          <el-text class="mx-1" type="primary">编程导航 by 程序员思源</el-text>-->
<!--        </a>-->
        <el-link type="primary" href="https://github.com/Stay2003" target="_blank">编程导航 by 程序员思源</el-link>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
#userLayout {
  text-align: center;
  background: url("https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png")
  0% 0% / 100% 100%;
}

#userLayout .logo {
  width: 48px;
  height: 48px;
}

#userLayout .header {
  margin-top: 16px;
  font-size: 21px;
}

#userLayout .content {
  margin-bottom: 16px;
  padding: 20px;
}

.footer {
  padding: 16px;
  text-align: center;
  background: #efefef;
}
</style>