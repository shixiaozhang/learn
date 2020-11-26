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