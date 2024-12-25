import { Spinner, Text, VStack } from "@chakra-ui/react"

export const CustomLoader = () => {
  return (
    <VStack colorPalette="blue">
      <Spinner color="colorPalette.600" />
      <Text color="colorPalette.600">Loading...</Text>
    </VStack>
  )
}
