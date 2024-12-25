import { Link } from "react-router-dom";

const FIxTweetHashtags = ({ text }:{text:string | undefined}) => {
    // Regex to match hashtags (including multiple concatenated hashtags)
    //const hashtagRegex = /#\w+/g;

    const styledText = text?.split(' ')?.map((item:string, index)=>{
        if(item.startsWith('#')){
            return (<Link key={`${index}`} style={{color:'blue', textDecoration:'none'}} to={`/search?q=${item?.substring(1)}`}>
                {item + " "}
                </Link>)
        }
        return item + " ";
    });
  
    return <>{styledText}</>;
  };
  

export default FIxTweetHashtags