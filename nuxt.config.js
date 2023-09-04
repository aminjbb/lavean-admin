import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '',
    title: 'پنل ادمین لاوین',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: "~/assets/css/container.css", ssr: false },
    { src: "~/assets/css/main.css", ssr: false },
    { src: "~/assets/css/font.css", ssr: false },
    { src: "~/assets/css/typography.css", ssr: false },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: "~/plugins/vue-cooki.js", ssr: false},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    'nuxt-graphql-request',
    '@nuxtjs/dotenv'
  ],
  graphql: {
    /**
     * An Object of your GraphQL clients
     */
    clients: {
      default: {
        /**
         * The client endpoint url
         */
        endpoint: process.env.gqUrl,
        /**
         * Per-client options overrides
         * See: https://github.com/prisma-labs/graphql-request#passing-more-options-to-fetch
         */
        options: {},
      },
      secondClient: {
        // ...client config
      },
      // ...your other clients
    },

    /**
     * Options
     * See: https://github.com/prisma-labs/graphql-request#passing-more-options-to-fetch
     */
    options: {
      method: 'get', // Default to `POST`
    },

    /**
     * Optional
     * default: true (this includes cross-fetch/polyfill before creating the graphql client)
     */
    useFetchPolyfill: true,

    /**
     * Optional
     * default: false (this includes graphql-tag for node_modules folder)
     */
    includeNodeModules: true,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    rtl: true,
    theme: {
      dark: false,

      themes: {
        dark: {

        },
        light: {
          primary: "#12924F",
          primary2: "#2AC59F",
          secondary: "#21313C",
          Secondary2: "#00654C",
          accent: "#F39C12",
          error: "#E74C3C",
          error2: "#EE4343",
          warning: "#FEDC49",
          warning2: "#008CE0",
          info: "#0082FD",
          info2: "#008CE0",
          info3: "#0023DD",
          success: "#13AA52",
          success2: "#1BA94C",
          text1: "#181818",
          Gunmetal: "#263742",
          OuterSpace: "#424950",
          DimGray: "#636D77",
          Cultured: "#F5F5F5",
          Gainsboro: "#DFDFDF",
          FunGreen: "#096437",
          PigmentGreen: "#03A756",
          Azure: "#0082FD",
          EerieBlack: "#1A1A1A",
          BananaMania: "#FFEEA9",
          LavenderBlue: "#D6D3FF",
          LightSlateBlue: "#766BFF",
          Nero: "#1A1A1A",
          MagicMint: "#ACE6C4",
          CosmicLatte: "#DBFDE9",
          Honeydew: "#E5FFEE",
          Honeydew2: "#E6FFEE",
          PowderBlue: "#B4EDDF",
          MediumAquamarine: "#60D4B8",
          Water: "#DAF1FF",
          DarkCornflowerBlue: "#1F3D83",
          AeroBlue: "#C3FFD8",
          ForestGreen: "#004E1B",
          AntiqueWhite: "#FFE7D9",
          Rust: "#AB3E00",
          MistyRose: "#FFE7E7",
          DarkCandyAppleRed: "#A40000",
          ChineseWhite: "#E0E0E0",
          SpanishGray: "#9E9E9E",
          GraniteGray: "#616161",
          Black: "#000000",
          OldLace: "#FFF5E4",
          Gray02: "#424242",
          DeepGreen: "#21725E",
          successFocus: "#12e573",
          Cultured02: "#F5F6F7",
          DeepCarminePink: "#FF2C2C",
          LightSilver: "#D9D9D9",
          black2: "#0A0A0A",
          mainError: '#A82525',
          collectionGray: '#EDEDED'

        },

      }
    }
  },


  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-leaflet',
  ],


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
