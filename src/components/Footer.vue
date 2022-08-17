<template>
    <main>
        <div class="footer-info">
            <img src="../assets/hammer.svg" alt="Hammer logo" id="hammer-logo">
            <!-- <div class="footer-info-text">
            </div> -->
        </div>
    </main>
</template>

<style scoped>
main {
    display: flex;
    width: 100vw;
    background-color: var(--bright-lilac);
    height: 100px;
    justify-content: center;
    align-items: center;
    color: white;
}

#hammer-logo {
    filter: brightness(0) invert(1);
    height: 50px;
    width: auto;
}

.footer-info {
    display: flex;
    flex-direction: column;
}

.footer-info-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>