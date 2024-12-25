import { createSystem, defineConfig, defaultConfig} from "@chakra-ui/react"

const config = defineConfig({
    globalCss: {
        "html, body": {
          margin: 0,
          padding: 0,
        },
      },
      theme: {
        breakpoints: {
          sm: "320px",
          md: "768px",
          lg: "960px",
          xl: "1200px",
          "2xl": "1536px",
        },
        tokens: {
          colors: {
            red: {
                DEFAULT: { value: "#EF4444" },
                100: { value: "#EE0F0F" },
            },
            blue:{
                DEFAULT: { value: "#1d9bf0" },
                100: { value: "#1a8cd8" },
            },
            black:{
                DEFAULT: { value: "#000000" },
                100: { value: "#0E0E0E" },
            },
            white:{
                DEFAULT: { value: "#FFFFFF" },
                100: { value: "#E5E5E5" },
                200:{value:"#e7e9ea"}
            },
            green:{
                DEFAULT: { value: "#10B981" },
                100: { value: "#0E7490" },
            },
            darkgreen:{
                DEFAULT: { value: "#059669" },
            },
            bordergray:{
                DEFAULT:{value:"#2F3336"},
                100: { value: "#71767B" },
                200:{value:"#202327"}
            },

          },
        },
        semanticTokens: {
          colors: {
            danger: { value: "{colors.red}" },
            success: {
                value: { base: "{colors.green}", _dark: "{colors.darkgreen}" },
            },
            primary:{
                value:{ base: "{colors.blue}", _dark: "{colors.blue.100}" }
            },
            background:{
                value:{base:"{colors.white}", _dark: "{colors.black}"}
            },
            foreground:{
                value:{base:"{colors.black}", _dark:"{colors.white}"}
            },
            bordergrey:{
                value:{base:"{colors.bordergray}", _dark:"{colors.bordergray}"}
            },
            muted:{
                value:{base:"{colors.bordergray.100}", _dark:"{colors.bordergray.200}"}
            },
            textlight:{value:{base:"{colors.black}", _dark:"{colors.white.200}"}},
            textgray:{
                value:{base:"{colors.bordergray.200}", _dark:"{colors.bordergray.100}"}
            }
          },
        },
        keyframes: {
          spin: {
            from: { transform: "rotate(0deg)" },
            to: { transform: "rotate(360deg)" },
          },
        },
      },
  })
  
  export const system = createSystem(defaultConfig, config)