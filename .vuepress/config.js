module.exports = {
    title: 'variate',
    description: 'The developer-friendly A/B testing tool',
    head: [
        ['link', { rel: 'icon', href: `/logo.png` }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#FB5C7D' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
        ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#FB5C7D' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    themeConfig: {
        sidebarDepth: 2,
        websiteUrl: 'https://variate.ca',
        repo: 'VariateApp/variate-docs',
        editLinks: true,
        smoothScroll: true,
        displayAllHeaders: true,
        locales: {
            '/': {
                label: 'English',
                selectText: 'Languages',
                ariaLabel: 'Select language',
                editLinkText: 'Edit this page on GitHub',
                lastUpdated: 'Last Updated',
                nav: require('./nav/en'),
                sidebar: {
                    '/overview/': getOverviewSidebar(),
                    '/engine/': getVariateEngineSidebar(),
                    '/react/': getVariateReactSidebar(),
                    '/vue/': getVariateVueSidebar(),
                    // '/guide/': getGuideSidebar('Guide', 'Advanced'),
                    // '/plugin/': getPluginSidebar('Plugin', 'Introduction', 'Official Plugins'),
                    // '/theme/': getThemeSidebar('Theme', 'Introduction'),
                }
            },
        }
    },
    postcss: {
        plugins: [
            require("autoprefixer"),
            require("tailwindcss")("./tailwind.config.js")
        ]
    }
};

function getOverviewSidebar() {
    return [
        {
            title: 'Getting Started',
            collapsable: false,
            children: [
                '',
                'why'
            ]
        }
    ]
}

function getVariateEngineSidebar() {
    return [
        {
            title: 'Getting Started',
            collapsable: false,
            children: [
                '',
                'configuration',
            ]
        }
    ];
}

function getVariateReactSidebar() {
    return [
        {
            title: 'Getting Started',
            collapsable: false,
            children: [
                '',
                'installation',
                'core-concepts',
                'faq',
                'changelogs',
            ]
        }
    ];
}

function getVariateVueSidebar() {
    return [
        {
            title: 'Variate For Vue',
            collapsable: false,
            children: [
                '',
                'nuxt',
                'tracking',
            ]
        }
    ];

}
