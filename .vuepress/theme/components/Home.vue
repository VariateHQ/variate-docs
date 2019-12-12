<template>
    <div class="home flex flex-col">
        <header class="relative flex flex-col flex-grow justify-center py-8">
            <!-- <div class="heroBackground"><span></span><span></span><span></span></div> -->
            <div class="text-center relative p-0 z-10">
                <h1 v-if="data.heroText !== null" id="main-title"
                    class="font-brand font-bold text-6xl mb-6 py-0 lowercase"
                >
                    {{ data.heroText || $title || 'Hello' }}
                </h1>

                <p class="description text-2xl mb-8 leading-relaxed">
                    {{ data.tagline || $description || 'Welcome to your VuePress site' }}
                </p>

                <p v-if="data.actionText && data.actionLink">
                    <NavLink class="bg-pink-500 hover:bg-pink-600 text-lg font-semibold text-white py-3 px-5 rounded"
                             :item="actionLink"/>
                </p>
            </div>
        </header>
        <section class="flex flex-col container mx-auto z-10 mt-8">
            <Content class="theme-default-content custom z-10"/>

            <div class="footer" v-if="data.footer">
                {{ data.footer }}
            </div>
        </section>
    </div>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue';

export default {
    components: { NavLink },

    computed: {
        data() {
            return this.$page.frontmatter;
        },

        actionLink() {
            return {
                link: this.data.actionLink,
                text: this.data.actionText
            };
        }
    }
};
</script>


<style>
.home {
    width: 100vw;
    position: relative;
    min-height: 100vh;
    background-color: transparent;
}

.heroBackground {
    width: 100%;
    height: 110%;
    top: 0;
    overflow: hidden;
    position: absolute;
    transform: skewY(-9deg);
    transform-origin: 0;
    background: linear-gradient(90deg, #fc5c7d, #6a82fb);
}

.header {
    @apply pt-24 pb-48 text-center z-10;
}

.features {
    @apply flex;
}

.features .feature {
    @apply w-1/2;
}

.features .feature:nth-child(2n) {
    @apply pl-6;
}

.features .feature:nth-child(2n + 1) {
    @apply pr-6;
}

.features .feature h2 {
    @apply text-2xl font-heading cursor-pointer mb-8;
}

.features .feature p {
    @apply mb-4
}

.features .feature a {
    color: theme('colors.pink.500');
}

.footer {
    @apply text-center text-xs my-6;
}
</style>
