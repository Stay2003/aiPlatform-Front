<template>
  <div id="addAppPage" class="form-container">
    <div class="back-button">
      <el-button round @click="goBack"><el-icon><Back /></el-icon>返回</el-button>
    </div>
    <h2>创建应用</h2>
    <el-form
      :model="form"
      :style="{ width: '480px' }"
      label-position="left"
      :label-width="'100px'"
      @submit.prevent="handleSubmit"
    >
      <el-form-item label="应用名称" prop="appName">
        <el-input v-model="form.appName" placeholder="请输入应用名称" />
      </el-form-item>
      <el-form-item label="应用描述" prop="appDesc">
        <el-input v-model="form.appDesc" placeholder="请输入应用描述" />
      </el-form-item>
      <el-form-item label="应用图标" prop="appIcon">
        <PictureUploader
          :value="form.appIcon"
          :onChange="(value) => (form.appIcon = value)"
          biz="app_icon"
        />
      </el-form-item>
      <el-form-item label="应用类型" prop="appType">
        <el-select v-model="form.appType" placeholder="请选择应用类型">
          <el-option
            v-for="(value, key) of APP_TYPE_MAP"
            :key="key"
            :value="Number(key)"
            :label="value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="评分策略" prop="scoringStrategy">
        <el-select v-model="form.scoringStrategy" placeholder="请选择评分策略">
          <el-option
            v-for="(value, key) of APP_SCORING_STRATEGY_MAP"
            :key="key"
            :value="Number(key)"
            :label="value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" html-type="submit" style="width: 120px">
          提交审核
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watchEffect, withDefaults } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import {
  addAppUsingPost,
  editAppUsingPost,
  getAppVoByIdUsingGet,
} from "@/api/appController";
import { APP_SCORING_STRATEGY_MAP, APP_TYPE_MAP } from "@/constant/app";
import PictureUploader from "@/components/PictureUploader.vue";
import { Back } from '@element-plus/icons-vue';

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => {
    return "";
  },
});

const router = useRouter();

const form = ref({
  appDesc: "",
  appIcon: "",
  appName: "",
  appType: 0,
  scoringStrategy: 0,
} as API.AppAddRequest);

const oldApp = ref<API.AppVO>();

const loadData = async () => {
  if (!props.id) {
    return;
  }
  const res = await getAppVoByIdUsingGet({
    id: props.id as any,
  });
  if (res.data.code === 0 && res.data.data) {
    oldApp.value = res.data.data;
    form.value = res.data.data;
  } else {
    message.error("获取数据失败，" + res.data.message);
  }
};

watchEffect(() => {
  loadData();
});

const handleSubmit = async () => {
  let res: any;
  if (props.id) {
    res = await editAppUsingPost({
      id: props.id as any,
      ...form.value,
    });
  } else {
    res = await addAppUsingPost(form.value);
  }
  if (res.data.code === 0) {
    message.success("操作成功，即将跳转到应用详情页");
    setTimeout(() => {
      router.push(`/app/detail/${props.id ?? res.data.data}`);
    }, 3000);
  } else {
    message.error("操作失败，" + res.data.message);
  }
};

// 返回功能
const goBack = () => {
  router.push("/");
};
</script>

<style scoped>
#addAppPage {
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平居中 */
  padding: 20px;
  margin-top: 20px; /* 添加这个属性，调整向下的距离 */
}

.back-button {
  align-self: flex-start; /* 将返回按钮定位到左上角 */
  margin-bottom: 16px; /* 设置返回按钮与标题之间的间距 */
}

h2 {
  margin-bottom: 32px;
}
</style>
