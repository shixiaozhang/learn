/*
 * @Author: your name
 * @Date: 2020-11-25 17:33:46
 * @LastEditTime: 2020-12-24 17:26:23
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \learn\vue_ts_router_store\src\views\GetData.ts
 */
// 封装部分功能

import { ref, reactive, onMounted, computed } from "vue";
export  const useGetData = function () {
    const api = ref("/login");
    const apiUrl = ref("xxxxxxxx");
    const plusOne = computed(() => api.value + apiUrl.value);
    const data = reactive({
      state: 200,
      res: "2313132132131",
    });
    function ajax() {
      console.log(api.value);
      console.log(apiUrl.value);
      console.log(plusOne.value);
      console.log(data);
    }
  
    onMounted(() => {
      // console.log(arguments)
      ajax();
    });
  
    return data;
  };