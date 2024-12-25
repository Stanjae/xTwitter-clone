import { HStack, Stack } from "@chakra-ui/react"
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton"

const AvatarSkeleton = () => {
  return (
    <HStack gap="5">
      <SkeletonCircle size="12" />
      <Stack flex="1">
        <Skeleton height="5" />
        <Skeleton height="5" width="80%" />
      </Stack>
    </HStack>
  )
}
export default AvatarSkeleton