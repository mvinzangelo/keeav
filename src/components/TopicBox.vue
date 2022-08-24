<script>
export default {
    props: {
        topic: String,
        date: String,
        topicID: String,
    },
    data() {
        return {

        }
    },
    methods: {
    }
}
</script>

<template>
    <div class="topic-wrapper">
        <RouterLink :to="`/topic/${topicID}`">
            <h1>{{ topic }}</h1>
        </RouterLink>
        <p>{{ date }}</p>
    </div>
</template>

<style scoped>
</style>