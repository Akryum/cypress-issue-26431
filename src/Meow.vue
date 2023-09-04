<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const { result } = useQuery(gql`query {
  meows {
    id
    text
  }
}`)

const meows = () => result.value?.meows ?? []
</script>

<template>
  <h1>Meows</h1>

  <ul>
    <li v-for="meow in meows()" :key="meow.id">
      {{ meow.text }}
    </li>
  </ul>
</template>
