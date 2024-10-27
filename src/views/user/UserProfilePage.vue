<template>
  <a-layout style="height: 100%">
    <a-layout-sider style="background-color: transparent">
      <div class="sidebar-menu">
        <ul>
          <li @click="router.push('/')">
            <a-icon type="home" />
            <span>首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</span>
            <a-icon type="arrow-right" />
          </li>
          <li @click="router.push('/user/profile')">
            <a-icon type="user" />
            <span>个人中心</span>
            <a-icon type="arrow-right" />
          </li>
          <li @click="router.push('/')">
            <a-icon type="appstore" />
            <span>我的应用</span>
            <a-icon type="arrow-right" />
          </li>
          <li @click="router.push('/user/profile')">
            <a-icon type="star" />
            <span>推荐服务</span>
            <a-icon type="arrow-right" />
          </li>
          <a-divider />
          <li @click="logOut">
            <a-icon type="logout" />
            <span>退出登录</span>
          </li>
        </ul>
      </div>
    </a-layout-sider>
    <a-layout-content>
      <div>
        <a-form
          :model="form"
          :style="{ width: '480px', margin: '0 auto' }"
          label-col="{ span: 6 }"
          wrapper-col="{ span: 18 }"
        >
          <a-form-item label="用户名">
            <a-input v-model="form.userName" />
          </a-form-item>
          <a-form-item label="简介">
            <a-textarea v-model="form.userProfile" />
          </a-form-item>
        </a-form>
        <a-button type="primary" @click="updateProfile">保存</a-button>
      </div>
      <a-modal :visible="visible" @cancel="visible = false" @ok="logOut">
        <template #title>
          <span>提示</span>
        </template>
        <div>是否要退出登录？</div>
      </a-modal>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import API from '@/api';
import { message } from 'ant-design-vue';
import {
  updateMyUserUsingPost,
  userLogoutUsingPost,
} from '@/api/userController';
import { useLoginUserStore } from '@/store/userStore';
import { useRouter } from 'vue-router';

const loginUserStore = useLoginUserStore();
const router = useRouter();

const visible = ref(false);

const form = reactive({
  ...loginUserStore.loginUser,
} as API.UserUpdateRequest);

const updateProfile = async () => {
  await updateMyUserUsingPost(form);
  message.success('更新成功');
  router.push('/user/profile');
};

const logOut = async () => {
  await userLogoutUsingPost();
  message.success('退出成功');
  router.push('/user/login');
};
</script>

<style scoped>
.sidebar-menu ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.sidebar-menu li {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.sidebar-menu li:hover {
  background-color: #f0f0f0;
}

.sidebar-menu li span {
  flex-grow: 1;
}
</style>
