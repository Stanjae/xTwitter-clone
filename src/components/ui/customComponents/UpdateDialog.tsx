
import { useState } from 'react'
import { DialogBackdrop, DialogBody, DialogCloseTrigger, DialogContent, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from '../dialog'
import { MenuItem } from '../menu'
import { CreateTweetForm } from './CreateTweetForm'
import { MernTweetType } from '@/lib/definitions'
const UpdateDialog = ({tweet}:{tweet:MernTweetType}) => {
    const [open, setOpen] = useState<boolean>(false)
  return (
    <DialogRoot size="lg" motionPreset="slide-in-bottom" lazyMount open={open} 
        onOpenChange={(e) => setOpen(e.open)} placement={'top'}>
        <DialogBackdrop zIndex={'99'}/>
        <DialogTrigger asChild>
            <MenuItem value="edit">Edit</MenuItem>
        </DialogTrigger>
        <DialogContent zIndex={'999'}>
            <DialogHeader>
                <DialogTitle color={'primary'} fontWeight={'medium'} fontSize={'15px'}>Update Tweet</DialogTitle>
            </DialogHeader>
            <DialogBody>
                <CreateTweetForm setOpen={setOpen} oldTweet={tweet} btnText={'Update Post'}/>
            </DialogBody>
            <DialogCloseTrigger />
        </DialogContent>
    </DialogRoot>
  )
}

export default UpdateDialog
