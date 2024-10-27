<template>
  <el-card class="app-card" shadow="hover" @click="doCardClick">
    <template #header>
      <div class="card-header">
        <img
          :src="app.appIcon"
          :alt="app.appName"
          class="app-icon"
        />
      </div>
    </template>
    <div class="card-content">
      <h3>{{ app.appName }}</h3>
      <p>{{ app.appDesc }}</p>
      <div class="user-info">
        <el-avatar
          :size="24"
          :src="app.user?.userAvatar"
        />
        <span>{{ app.user?.userName ?? "无名" }}</span>
      </div>
    </div>
    <template #footer>
      <div class="card-footer">
        <el-button type="text" :icon="Share">分享</el-button>
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { Share } from '@element-plus/icons-vue';
import { defineProps, withDefaults } from "vue";
import { useRouter } from "vue-router";
import type { AppVO } from "@/api/typings";

interface Props {
  app: AppVO;  // 根据你的 VO 定义
}

const props = withDefaults(defineProps<Props>(), {
  app: () => ({} as AppVO),  // 默认值
});

const router = useRouter();
const doCardClick = () => {
  router.push(`/app/detail/${props.app.id}`);  // 导航到应用详情页面
};
</script>

<style scoped>
.app-card {
  cursor: pointer;
  border-radius: 12px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.app-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.card-header {
  height: 204px;
  overflow: hidden;
}

.app-icon {
  width: 100%;
  transform: translateY(-20px);
}

.card-content {
  padding: 16px;
}

.card-content h3 {
  margin: 0 0 8px;
  font-size: 18px;
}

.card-content p {
  margin: 0 0 16px;
  color: #606266;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info span {
  margin-left: 8px;
  font-size: 14px;
  color: #1D2129;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
