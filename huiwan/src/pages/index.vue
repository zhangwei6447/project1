<template>
    <div class="application-container">
        <component :is="name"></component>
    </div>
</template>
<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
const name = computed(() => {
    return route.meta.layout || 'main-layout'
})
</script>
