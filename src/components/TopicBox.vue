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
    <RouterLink :to="`/topic/${topicID}`">
        <h1 class="topic-text">{{ topic }}</h1>
        <p class="date-text">{{ date }}</p>
    </RouterLink>
</template>

<style scoped>
a {
    height: 100px;
    width: 50%;
    text-decoration: none;
    border-radius: 4px;
    padding: 10px;
    color: var(--dark-byzantium);
    margin-bottom: 50px;
}

h1:hover {
    color: var(--french-lilac);
}

.topic-text {
    text-align: left;
    margin: 0 0;
}

.date-text {
    margin-top: 10px;
    font-size: 2rem;
    color: rgb(87, 87, 87);
}
</style>