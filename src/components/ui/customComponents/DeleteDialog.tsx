import { Button } from "@/components/ui/button"
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MenuItem } from "../menu"
import {useState} from 'react'
import { useDeletePostMutation } from "@/services/tweets"
import { useDeleteCommentMutation } from "@/services/comment"
import { useNavigate } from "react-router-dom"


export const DeleteDialog = ({id, type, currentUserId, location}:
  {id:string | undefined; location:string|undefined; currentUserId:string | undefined; type:string | undefined}) => {
  const [open, setOpen] = useState<boolean>(false)

  const [deletePost] = useDeletePostMutation()
  const [deleteComment] = useDeleteCommentMutation()

  const navigate = useNavigate()
  const handleDelete = async(e:any) => {
    e.preventDefault()
    if(type == "tweet"){
      await deletePost(id);
      if(location == 'detail'){
        navigate(-1)
      }
    }else{
      await deleteComment({commentId:id, authorId:currentUserId})
    }
    
    setOpen(false)
  }

  //console.log(isLoading, status, isSuccess, isError)
  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)} role="alertdialog">
      <DialogTrigger asChild>
        <MenuItem value="delete" color="fg.error" _hover={{ bg: "bg.error", color: "fg.error" }}>
            Delete...
        </MenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>
            This action cannot be undone. This will permanently delete this tweet from your account.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <form onSubmit={handleDelete}>
            <Button type="submit" colorPalette="red">Delete</Button>
          </form> 
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}
