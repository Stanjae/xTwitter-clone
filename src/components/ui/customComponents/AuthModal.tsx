import { DialogBackdrop, DialogRoot, DialogTrigger, DialogBody, DialogHeader, DialogTitle, DialogCloseTrigger, DialogContent } from '../dialog'
import { CustomButton } from './CustomButton'

const AuthModal = ({children, btnText, formTitle}:{btnText:string; formTitle:string; children:any}) => {
  return (
    <DialogRoot size="sm" motionPreset="slide-in-bottom" lazyMount placement={'top'}>
        <DialogBackdrop zIndex={'99'}/>
        <DialogTrigger asChild>
            <CustomButton size={'sm'} visual={'solidBlue'}>{btnText}</CustomButton>
        </DialogTrigger>
        <DialogContent rounded={'2xl'} zIndex={'999'}>
            <DialogHeader>
                <DialogTitle color={'primary'} fontWeight={'medium'} fontSize={'15px'}>{formTitle}</DialogTitle>
            </DialogHeader>
            <DialogBody>
                {children}
            </DialogBody>
            <DialogCloseTrigger />
        </DialogContent>
    </DialogRoot>
  )
}

export default AuthModal