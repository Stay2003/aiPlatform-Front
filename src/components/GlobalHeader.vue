<template>
  <div id="globalHeader">
    <el-row type="flex" align="middle">
      <el-col :span="20">
        <el-menu
          mode="horizontal"
          :default-active="selectedKeys[0]"
          @select="doMenuClick"
        >
          <el-menu-item
            index="0"
            :style="{ padding: '0', marginRight: '38px' }"
            disabled
          >
            <div class="titleBar">
              <img class="logo" src="../assets/logo.png" />
              <div class="title">元答答</div>
            </div>
          </el-menu-item>
          <el-menu-item
            v-for="item in visibleRoutes"
            :key="item.path"
            :index="item.path"
          >
            {{ item.name }}
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4" style="display: flex; justify-content: flex-end; align-items: center;">
        <div v-if="loginUserStore.loginUser.id" style="display: flex; align-items: center;">
          <router-link :to="{ name: '用户信息' }">
            <el-avatar
              :style="{
                marginRight: '8px',
                verticalAlign: 'middle',
                backgroundColor: '#14a9f8'
              }"
            >
              {{ loginUserStore.loginUser.userName.charAt(0) }}
            </el-avatar>
          </router-link>
          <el-dropdown trigger="hover" style="margin-left: 8px;">
            <span class="el-dropdown-link">
              {{ loginUserStore.loginUser.userName ?? "无名" }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item><el-icon><UserFilled /></el-icon>用户信息</el-dropdown-item>
                <el-dropdown-item><el-icon><Tools /></el-icon>&nbsp;&nbsp;设置</el-dropdown-item>
                <el-dropdown-item type="danger" divided @click="logOut"><el-icon><Right /></el-icon>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div v-else>
          <el-button type="primary" @click="$router.push('/user/login')">登录</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import {
  ElRow,
  ElCol,
  ElMenu,
  ElMenuItem,
  ElAvatar,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElButton,
  ElMessage
} from "element-plus";
import { ArrowDown,UserFilled,Tools,Right } from '@element-plus/icons-vue';
import { routes } from "@/router/routes";
import { useLoginUserStore } from "@/store/userStore";
import checkAccess from "@/access/checkAccess";
import { userLogoutUsingPost } from "@/api/userController";

const loginUserStore = useLoginUserStore();
const router = useRouter();
const selectedKeys = ref(["/"]);

router.afterEach((to) => {
  selectedKeys.value = [to.path];
});

const visibleRoutes = computed(() => {
  return routes.filter((item) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    if (!checkAccess(loginUserStore.loginUser, item.meta?.access as string)) {
      return false;
    }
    return true;
  });
});

import { ElMessageBox } from 'element-plus'; // 确保引入 ElMessageBox

const logOut = async () => {
  ElMessageBox.confirm('确定退出登录？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      await userLogoutUsingPost();
      ElMessage({
        showClose: true,
        message: '退出登录成功！',
        type: 'success',
      });
      router.push('/user/login');
    })
    .catch(() => {
      // 用户点击取消时的处理
      ElMessage({
        message: '已取消退出登录',
        type: 'info',
      });
    });
};

const doMenuClick = (key: string) => {
  router.push(key);
};
</script>

<style scoped>
#globalHeader {
}

.titleBar {
  display: flex;
  align-items: center;
}

.title {
  margin-left: 16px;
  color: black;
}

.logo {
  height: 48px;
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>