<template>
  <div id="homePage">
    <div class="search-bar">
      <el-input
        v-model="searchParams.searchText"
        placeholder="快速发现答题应用"
        class="input-with-select"
        style="width: 320px;"
      >
        <template #append>
          <el-button type="primary" @click="onSearch"><el-icon><Search /></el-icon>搜索</el-button>
        </template>
      </el-input>
    </div>
    <div class="button-container">
      <el-button round @click="goToCreateApp"><el-icon><Promotion /></el-icon>发布应用</el-button>
    </div>
    </div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="item in dataList" :key="item.id">
        <AppCard :app="item" />
      </el-col>
    </el-row>
  <div>
    <a-table
      :data="dataList"
      :pagination="{
      showTotal: true,
      pageSize: searchParams.pageSize,
      current: searchParams.current,
      total,
    }"
      @page-change="onPageChange"
    >
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect } from "vue";
import AppCard from "@/components/AppCard.vue";
import { listAppVoByPageUsingPost } from "@/api/appController";
import message from "@arco-design/web-vue/es/message";
import { Promotion,Search } from '@element-plus/icons-vue';
import router from "@/router";
interface AppQueryRequest {
  current: number;
  pageSize: number;
  id?: number;
  appName?: string;
  appDesc?: string;
  appIcon?: string;
  appType?: number;
  scoringStrategy?: number;
  reviewStatus?: number;
  reviewMessage?: string;
  reviewerId?: number;
  userId?: number;
  notId?: number;
  searchText?: string;
}

// 初始化搜索条件（不应该被修改）
const initSearchParams = {
  current: 1,
  pageSize: 12,
};

const searchParams = ref<API.AppQueryRequest>({
  ...initSearchParams,
});
const dataList = ref<API.AppVO[]>([]);
const total = ref<number>(0);

/**
 * 加载数据
 */
const loadData = async () => {
  const res = await listAppVoByPageUsingPost(searchParams.value);
  if (res.data.code === 0) {
    dataList.value = res.data.data?.records || [];
    total.value = res.data.data?.total || 0;
  } else {
    message.error("获取数据失败，" + res.data.message);
  }
};

/**
 * 当分页变化时，改变搜索条件，触发数据加载
 * @param page
 */
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const onSearch = () => {
  searchParams.value.current = 1;
  loadData();
};

// const goToCreateApp = () => {
//   router.back();
// }
/**
 * 监听 searchParams 变量，改变时触发数据的重新加载
 */
watchEffect(() => {
  loadData();
});
</script>

<style scoped>
#homePage {
  position: relative; /* 必需用于绝对定位的父容器 */
  padding: 20px;
}

.search-bar {
  position: absolute;
  right: 42%;
  top: 50%;
  transform: translateY(-90%);

}

.button-container {
  position: absolute;
  right: 0; /* 将按钮定位在右侧 */
  top: 50%; /* 垂直居中 */
  transform: translateY(-70%);
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>