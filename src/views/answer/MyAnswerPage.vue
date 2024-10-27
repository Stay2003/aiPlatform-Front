<template>
  <el-form
    :model="formSearchParams"
    :style="{ marginBottom: '20px' }"
    inline
    @submit.prevent="doSearch"
  >
    <el-form-item label="结果名称" prop="resultName">
      <el-input
        v-model="formSearchParams.resultName"
        placeholder="请输入结果名称"
        clearable
      />
    </el-form-item>
    <el-form-item label="结果描述" prop="resultDesc">
      <el-input
        v-model="formSearchParams.resultDesc"
        placeholder="请输入结果描述"
        clearable
      />
    </el-form-item>
    <el-form-item label="应用 id" prop="appId">
      <el-input
        v-model="formSearchParams.appId"
        placeholder="请输入应用 id"
        clearable
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="doSearch" style="width: 100px">
        搜索
      </el-button>
    </el-form-item>
  </el-form>

  <el-table
    :data="dataList"
    :pagination="{
      showTotal: true,
      pageSize: searchParams.pageSize,
      current: searchParams.current,
      total,
    }"
    @page-change="onPageChange"
  >
    <el-table-column prop="id" label="id" />
    <el-table-column prop="choices" label="选项" />
    <el-table-column prop="resultId" label="结果 id" />
    <el-table-column prop="resultName" label="名称" />
    <el-table-column prop="resultDesc" label="描述" />
    <el-table-column label="图片">
      <template #default="{ row }">
        <el-image width="64" :src="row.resultPicture" />
      </template>
    </el-table-column>
    <el-table-column prop="resultScore" label="得分" />
    <el-table-column prop="appId" label="应用 id" />
    <el-table-column prop="appType" label="应用类型">
      <template #default="{ row }">
        {{ APP_TYPE_MAP[row.appType] }}
      </template>
    </el-table-column>
    <el-table-column prop="scoringStrategy" label="评分策略">
      <template #default="{ row }">
        {{ APP_SCORING_STRATEGY_MAP[row.scoringStrategy] }}
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间">
      <template #default="{ row }">
        {{ dayjs(row.createTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-space>
          <el-button type="danger" @click="doDelete(row)">删除</el-button>
        </el-space>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import {
  deleteUserAnswerUsingPost,
  listMyUserAnswerVoByPageUsingPost,
} from "@/api/userAnswerController";
import API from "@/api";
import message from "@arco-design/web-vue/es/message";
import { dayjs } from "@arco-design/web-vue/es/_utils/date";
import { APP_SCORING_STRATEGY_MAP, APP_TYPE_MAP } from "@/constant/app";

const formSearchParams = ref<API.UserAnswerQueryRequest>({});

// 初始化搜索条件（不应该被修改）
const initSearchParams = {
  current: 1,
  pageSize: 10,
};

const searchParams = ref<API.UserAnswerQueryRequest>({
  ...initSearchParams,
});
const dataList = ref<API.UserAnswerVO[]>([]);
const total = ref<number>(0);

/**
 * 加载数据
 */
const loadData = async () => {
  const res = await listMyUserAnswerVoByPageUsingPost(searchParams.value);
  if (res.data.code === 0) {
    dataList.value = res.data.data?.records || [];
    total.value = res.data.data?.total || 0;
  } else {
    message.error("获取数据失败，" + res.data.message);
  }
};

/**
 * 执行搜索
 */
const doSearch = () => {
  searchParams.value = {
    ...initSearchParams,
    ...formSearchParams.value,
  };
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

/**
 * 删除
 * @param record
 */
const doDelete = async (record: API.UserAnswer) => {
  if (!record.id) {
    return;
  }

  const res = await deleteUserAnswerUsingPost({
    id: record.id,
  });
  if (res.data.code === 0) {
    loadData();
  } else {
    message.error("删除失败，" + res.data.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发数据的重新加载
 */
watchEffect(() => {
  loadData();
});
</script>
