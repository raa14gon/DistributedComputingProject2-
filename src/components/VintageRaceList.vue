<template>
  <ul class="race-list">
    <li
      v-for="race in races"
      :key="race.round"
      @click="$emit('select', race)"
    >
      ROUND {{ race.round }} — {{ race.raceName }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    races: Array
  }
}
</script>

<style>
.race-list li {
  cursor: pointer;
  padding: 8px;
  border-bottom: 1px dashed #00ff66;
}

.race-list li:hover {
  background: #00ff66;
  color: black;
}
</style>