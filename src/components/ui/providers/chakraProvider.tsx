
import { ColorModeProvider } from "@/components/ui/color-mode"
import { ChakraProvider} from "@chakra-ui/react"
import { system } from "./theme"


export const NewChakraProvider = ({children}:any) => {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </ChakraProvider>
  )
}

