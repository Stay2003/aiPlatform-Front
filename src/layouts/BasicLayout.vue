<template>
  <div id="basicLayout">
    <el-container style="height: 100vh">
      <el-header class="header">
        <GlobalHeader />
      </el-header>
      <el-main class="content">
        <router-view />
      </el-main>
      <el-footer class="footer">
        <a href="https://github.com/Stay2003" target="_blank">
          编程 by 程序员思源
        </a>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>

<style scoped>
#basicLayout {
}

#basicLayout .header {
  margin-bottom: 16px;
  box-shadow: #d6d6d6 1px 1px 5px;
  z-index: 600;
  position: relative;
  overflow: visible;
}

#basicLayout .content {
  margin-bottom: 28px;
  padding: 20px;
  background: linear-gradient(to right, #fefefe, #fff);
  z-index: 500;
}

.footer {
  padding: 16px;
  text-align: center;
  background: #efefef;
}
</style>