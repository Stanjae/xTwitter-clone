
import { Button } from "../button"

const AuthSubmitBtn = ({children, disabledStatus, loading, loadingText }:{children:any; loadingText:string ;disabledStatus:boolean; loading:boolean}) => {
  return (
    
        <Button css={{bg: "primary", color: "textlight", paddingY: "8px", paddingX:"12px", fontSize: "15px", lineHeight: "20px", fontWeight: "bold", rounded:'full',cursor: "pointer",
            transition:'all',transitionDuration:'slow'}} 
            _disabled={{bg:'primary/15', color:'textgray'}} disabled={disabledStatus} 
            loading={loading}
            loadingText={loadingText} type='submit' variant={'solid'}>
            {children}
        </Button> 
  )
}

export default AuthSubmitBtn