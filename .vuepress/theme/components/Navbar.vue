<template>
    <header class="navbar">
        <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>

        <router-link :to="$localePath" class="home-link" v-if="!websiteUrl">
            <img class="logo" v-if="$site.themeConfig.logo" :src="$withBase($site.themeConfig.logo)" :alt="$siteTitle">
            <span ref="siteName" class="site-name tracking-tight font-brand" v-if="$siteTitle" :class="{ 'can-hide': $site.themeConfig.logo }">
              {{ $siteTitle }}
            </span>
        </router-link>

        <a :href="websiteUrl" class="home-link" v-else>
            <img class="logo" v-if="$site.themeConfig.logo" :src="$withBase($site.themeConfig.logo)" :alt="$siteTitle">
            <span ref="siteName" class="site-name tracking-tight font-brand" v-if="$siteTitle" :class="{ 'can-hide': $site.themeConfig.logo }">
              {{ $siteTitle }}
            </span>
        </a>

        <div class="links" :style="linksWrapMaxWidth ? {
        'max-width': linksWrapMaxWidth + 'px'
      } : {}"
        >
            <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia"></AlgoliaSearchBox>
            <SearchBox v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false"></SearchBox>
            <NavLinks class="can-hide"></NavLinks>
        </div>
    </header>
</template>

<script>
import AlgoliaSearchBox from '@AlgoliaSearchBox';
import SearchBox from '@SearchBox';
import SidebarButton from '@theme/components/SidebarButton.vue';
import NavLinks from '@theme/components/NavLinks.vue';

export default {
    props: {
        websiteUrl: {
            type: String,
            default: () => null,
        },
        transparent: {
            type: Boolean,
            default: () => false
        }
    },
    components: { SidebarButton, NavLinks, SearchBox, AlgoliaSearchBox },
    data() {
        return {
            linksWrapMaxWidth: null
        };
    },
    mounted() {
        const MOBILE_DESKTOP_BREAKPOINT = 719; // refer to config.styl
        const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'));
        const handleLinksWrapWidth = () => {
            if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
                this.linksWrapMaxWidth = null;
            } else {
                this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING
                    - (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0);
            }
        };
        handleLinksWrapWidth();
        window.addEventListener('resize', handleLinksWrapWidth, false);
    },
    computed: {
        algolia() {
            return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {};
        },

        isAlgoliaSearch() {
            return this.algolia && this.algolia.apiKey && this.algolia.indexName;
        }
    }
};

function css(el, property) {
    // NOTE: Known bug, will return 'auto' if style value is 'auto'
    const win = el.ownerDocument.defaultView;
    // null means not to return pseudo styles
    return win.getComputedStyle(el, null)[property];
}
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem

.navbar.bg-transparent
    border: none
    background-color transparent

    .site-name
        color white
        @apply font-brand

    .search-box input
        @apply bg-transparent text-white !important

    .links
        color white
        background-color transparent

        a
            @apply pt-0

        .nav-item > .nav-link
            color white

        .dropdown-wrapper
            .dropdown-title
                color white

            .nav-dropdown
                color grey


.navbar
    padding $navbar-vertical-padding $navbar-horizontal-padding
    line-height $navbarHeight - 1.4rem

    a, span, img
        display inline-block

    .logo
        height $navbarHeight - 1.4rem
        min-width $navbarHeight - 1.4rem
        vertical-align top

    .site-name
        @apply text-3xl tracking-tighter;
        font-family: Montserrat, sans-serif;
        color $textColor
        position relative

    .links
        padding-left 1.5rem
        box-sizing border-box
        background-color white
        white-space nowrap
        font-size 0.9rem
        position absolute
        right $navbar-horizontal-padding
        top $navbar-vertical-padding
        display flex

        .repo-link
            color  $textColor

        .search-box
            flex: 0 0 auto
            vertical-align top

        .search-box .suggestions
            border none
            @apply shadow mt-4

        .search-box .suggestions a, .search-box .suggestions a *
            @apply m-0 p-0 leading-none

@media (max-width: $MQMobile)
    .navbar
        padding-left 4rem

        .can-hide
            display none

        .links
            padding-left 1.5rem

        .site-name
            width calc(100vw - 9.4rem)
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
</style>
