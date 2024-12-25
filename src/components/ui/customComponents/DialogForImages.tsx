import { DialogBackdrop, DialogBody, DialogCloseTrigger, DialogRoot, DialogTrigger } from '../dialog'
import { Button, DialogContent, Image } from '@chakra-ui/react'

const DialogForImages = ({item, open, setOpen}:any) => {
  return (
    <DialogRoot  size="lg" motionPreset="slide-in-bottom" lazyMount open={open} onOpenChange={(e)=> setOpen(e.open)} 
        placement={'center'}>
        <DialogBackdrop/>
        <DialogTrigger asChild>
            <Button variant={'outline'}>Hey</Button>
        </DialogTrigger>
        <DialogContent zIndex={'99'}>
            <DialogBody>
                <Image src={item}/>
            </DialogBody>
            <DialogCloseTrigger top={'0'} insetEnd={'-12'} bg={'bg'}/>
        </DialogContent>
    </DialogRoot>
  )
}

export default DialogForImages
