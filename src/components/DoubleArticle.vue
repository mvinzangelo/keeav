<template>
    <div class="articles-container">
        <Article></Article>
        <Article></Article>
    </div>
</template>

<script setup>
import Article from './Article.vue';
</script>

<style>
.articles-container {
    height: 100%;
    width: 100%;
    background-color: grey;
    display: flex;
    justify-content: space-around;
}

.article-card {
    height: 60%;
    width: 48%;
    background-color: rgb(95, 95, 95);
}
</style>