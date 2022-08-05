<template>
    <div class="articles-container">
        <Article />
    </div>
</template>

<script>
import Article from './Article.vue'

</script>

<style>
.articles-container {
    height: 100%;
    width: 100%;
    background-color: grey;
    display: flex;
    gap: 10px;
    justify-content: space-around;
}

.article-card {
    height: 60%;
    width: 48%;
    background-color: rgb(95, 95, 95);
}
</style>