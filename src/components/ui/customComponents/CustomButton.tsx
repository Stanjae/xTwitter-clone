import { chakra, defineRecipe } from "@chakra-ui/react"

export const buttonRecipe = defineRecipe({
  base: {
    rounded:'full',
    cursor: "pointer",
    transition:'all',
    transitionDuration:'slow'
  },
  variants: {
    visual: {
      solidBlue: { bg: "primary", color: "white" },
      solidLight: { bg:"foreground", color:"background"},
      solidBorder:{borderWidth:'0.1px', _hover:{bg:'bg.muted'}, color:"textlight", bg:"background", borderColor:'textlight' }
    },
    size: {
      xs:{ paddingY: "8px", paddingX:"16px", fontSize: "13px", lineHeight: "16px", fontWeight: "bold"},
      sm: { paddingY: "8px", paddingX:"12px", fontSize: "15px", lineHeight: "20px", fontWeight: "bold" },
      md: {padding:"16px", fontSize:"17px", lineHeight:"20px", fontWeight:"bold" },
      lg: { padding: "8", fontSize: "24px" },
    },
  },
})

export const CustomButton = chakra("button", buttonRecipe)