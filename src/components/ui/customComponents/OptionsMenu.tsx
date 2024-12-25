import {
  MenuContent,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu"
import { IconButton } from "@chakra-ui/react"
import { IoIosMore } from "react-icons/io"


const OptionsMenu = ({children, btnSize, rounded, mL, contentWidth}:any) => {
  return (
    <MenuRoot positioning={{ placement: "bottom-end" }}>
      <MenuTrigger asChild>
        <IconButton colorPalette={'blue'} marginLeft={mL} rounded={rounded} size={btnSize} variant="ghost">
            <IoIosMore/>
        </IconButton>
      </MenuTrigger>
      <MenuContent width={contentWidth}>
        {children}
      </MenuContent>
    </MenuRoot>
  )
}

export default OptionsMenu
