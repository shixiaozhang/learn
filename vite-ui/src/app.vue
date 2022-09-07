<script setup lang="ts">
import { JSXButton } from './entry'
</script>

<template>
  <div>
    <JSXButton color="blue">蓝色按钮</JSXButton>
    <JSXButton color="green">绿色按钮</JSXButton>
    <JSXButton color="gray">灰色按钮</JSXButton>
    <JSXButton color="yellow">黄色按钮</JSXButton>
    <JSXButton color="red">红色按钮</JSXButton>
  </div>
  <div>
    <JSXButton color="blue" round plain icon="search"></JSXButton>
    <JSXButton color="green" round plain icon="edit"></JSXButton>
    <JSXButton color="gray" round plain icon="check"></JSXButton>
    <JSXButton color="yellow" round plain icon="message"></JSXButton>
    <JSXButton color="red" round plain icon="delete"></JSXButton>
  </div>
</template>

<style scoped lang="less"></style>
