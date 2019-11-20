<template>
    <main class="page">
        <slot name="top"/>

        <div class="container mx-auto pt-24">
            <Content></Content>
            <PageEdit></PageEdit>


            <PageNav v-bind="{ sidebarItems }"></PageNav>

            <slot name="bottom"></slot>
        </div>
    </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue';
import PageNav from '@theme/components/PageNav.vue';

export default {
    components: { PageEdit, PageNav },
    props: ['sidebarItems']
};
</script>
