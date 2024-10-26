<template>
  <a-layout style="height: 100%">
    <a-layout-sider style="background-color: transparent">
      <div class="sidebar-menu">
        <ul>
          <li @click="router.push('/')">
            <i class="icon icon-submission"></i>
            <span>首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</span>
            <i class="icon icon-arrow-right"></i>
          </li>
          <li @click="router.push('/user/profile')">
            <i class="icon icon-user"></i>
            <span>个人中心</span>
            <i class="icon icon-arrow-right"></i>
          </li>
          <li @click="router.push('/')">
            <i class="icon icon-submission"></i>
            <span>投稿管理</span>
            <i class="icon icon-arrow-right"></i>
          </li>
          <li @click="router.push('/user/profile')">
            <i class="icon icon-service"></i>
            <span>推荐服务</span>
            <i class="icon icon-arrow-right"></i>
          </li>
          <a-divider />
          <li @click="logOut">
            <i class="icon icon-logout"></i>
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
          auto-label-width
          label-align="left"
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
      <a-modal v-model:visible="visible" @close="visible = false" @ok="logOut">
        <template #title>
          <span>提示</span>
        </template>
        <div>是否要退出登录？</div>
      </a-modal>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import API from "@/api";
import message from "@arco-design/web-vue/es/message";
import {
  updateMyUserUsingPost,
  userLogoutUsingPost,
} from "@/api/userController";
import { useLoginUserStore } from "@/store/userStore";
import { useRouter } from "vue-router";

interface RouterKey {
  router: string;
}

const loginUserStore = useLoginUserStore();
const router = useRouter();

const visible = ref(false);

const form = reactive({
  ...loginUserStore.loginUser,
} as API.UserUpdateRequest);

const navigate = (key: RouterKey) => {
  router.push(key.router);
};

const updateProfile = async () => {
  updateMyUserUsingPost(form).then(() => {
    message.success("更新成功");
    router.push("/user/profile");
  });
};

const logOut = async () => {
  userLogoutUsingPost().then(() => {
    message.success("退出成功");
    router.push("/user/login");
  });
};
</script>

<style scoped>
.sidebar-menu ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.sidebar-menu li i.icon {
  margin-right: 10px;
  font-size: 20px;
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

hr {
  margin: 10px 0;
  border: none;
  border-top: 1px solid #e0e0e0;
}
</style>
