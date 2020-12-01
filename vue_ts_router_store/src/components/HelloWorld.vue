<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <slot></slot>
    <h1>{{ msg }}</h1>
    <slot name="slot2" :slotprop="nameString"></slot>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
// vue-class-component 使用

@Options({
  props: {
    msg: String,
  },
  watch: {
    
  },

  computed: {
    //主要用来接收store

    fullName() {
      return this.msg;
    },
  },

  methods: {},

  mixins: [],

  components: {},
})
export default class HelloWorld extends Vue {

  msg!: string;
  //初始data
  nameString = {
    aa: "slot传参",
  };
  //computed 属性,这个也可以放在上面的修饰器写，上面不需要带get，
  get fullName() {
    return this.msg;
  }
  //method

  hello() {
    console.log(`Hello ${this.fullName}!`);
    
  }
  //钩子
  mounted() {
    this.hello();
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
