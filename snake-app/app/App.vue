<template>
    <div id="app">
        <topbar></topbar>

    </div>
</template>

<script>
    import Topbar from './components/topbar';

    export default {

        components: {
            Topbar
        }

    };
</script>

<style lang="scss">
    @import './styles/milligram';

    main {
        padding: 20px 20px 20px 20px;
    }

    // Animations

    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .scale-enter-active {
        animation: scale-in .3s;
    }
    .scale-leave-active {
        animation: scale-out .3s;
    }
    @keyframes scale-in {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }
    @keyframes scale-out {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0);
        }
    }

    .slide-left-enter-active {
        transition: all .3s;
    }
    .slide-left-enter {
        transform: translateX(50px);
        opacity: 0;
    }

    .slide-right-enter-active {
        transition: all .3s;
    }
    .slide-right-enter {
        transform: translateX(-50px);
        opacity: 0;
    }
</style>
