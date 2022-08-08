<script>

</script>

<template>
    <div class="container">
        <input type="range" min="1" max="100" value="50" class="slider">
    </div>
</template>

<style>
    .container {
        width: 100%;
    }

    .slider {
        -webkit-appearance: none;
        width: 100%;
        height: 15px;
        outline: none;
        background-color: blue;
        border-radius: 5px;
        opacity: 0.7;
        -webkit-transition: .2s;
        transition: opacity .2s;

    }

    .slider:hover {
        opacity: 1;
    }
    
    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: lightgrey;
        cursor: pointer;
    }

    .slider::-moz-range-thumb {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: lightgrey;
        cursor: pointer;
    }

    .slider::-moz-range-track {
        background-color: blue;
    }

    .slider::-moz-range-progress {
        background-color: red;
        height: 15px;
        border-radius: 5px;
    }
</style>