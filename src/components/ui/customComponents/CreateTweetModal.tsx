import { DialogBackdrop, DialogBody, DialogCloseTrigger, DialogContent, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from '../dialog'
import { CreateTweetForm } from './CreateTweetForm'
import { CustomButton } from './CustomButton'

const CreateTweetModal = () => {
  return (
    <DialogRoot size="lg" motionPreset="slide-in-bottom" lazyMount placement={'top'}>
        <DialogBackdrop zIndex={'99'}/>
        <DialogTrigger asChild>
            <CustomButton size={'md'} visual={'solidBlue'}>Post</CustomButton>
        </DialogTrigger>
        <DialogContent zIndex={'999'}>
            <DialogHeader>
                <DialogTitle color={'primary'} fontWeight={'medium'} fontSize={'15px'}>Drafts</DialogTitle>
            </DialogHeader>
            <DialogBody>
                <CreateTweetForm btnText={'Post'} setOpen={null} oldTweet={null}/>
            </DialogBody>
            <DialogCloseTrigger />
        </DialogContent>
    </DialogRoot>
  )
}

export default CreateTweetModal
