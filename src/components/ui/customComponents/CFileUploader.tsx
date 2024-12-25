import { chakra, IconButton } from '@chakra-ui/react'
import { useRef } from 'react'
import { FiImage } from 'react-icons/fi'
import { toaster } from '../toaster'
import imageToBase64 from 'image-to-base64'

const Fileimage = chakra("input", {
    base: {
      position:'absolute', 
      opacity:0, width:'100%', top:"0px", left:"0px",
      cursor:'pointer'
    },
  })

const CFileUploader = ({setImages}:any) => {
    const imgRef = useRef<any>()

    const handleBase64=(file:any)=>{
        imageToBase64(file) // Path to the image
        .then((response:any) => {
            console.log(response); 
            return response  // "cGF0aC90by9maWxlLmpwZw=="
        }
        ).catch((error:any) => {
                console.log(error); // Logs an error if there was one
            }
        )
    }
    
    const handleKnow=(e:any)=>{
        let yun:any = []
        const files = imgRef?.current.files
        console.log(files)
        if(files.length > 4){
            toaster.create({title:"Cannot accept more than 4 images", type:'error'})
            return
        }

        /* const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result
        }; */
        const newBase64Array = Array.from(files).forEach((item:any, index:number)=>{
            return {id:index, image:handleBase64(item)}
        })
        console.log("base:", yun, newBase64Array)


    }

  return (
    <IconButton type='button' position={'relative'} color='primary' size={'sm'} colorPalette={'blue'} 
    rounded="full" variant={'ghost'}>
        <FiImage />
        <Fileimage id="justin" ref={imgRef} multiple onChange={handleKnow} type='file' />
    </IconButton>
  )
}

export default CFileUploader