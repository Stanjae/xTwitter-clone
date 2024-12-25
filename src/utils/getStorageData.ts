export const sessionUserId = ()=>{
    const lop = sessionStorage.getItem("tokenId")
    if(!lop){
      return
    }
      const pern = JSON.parse(lop)
      return pern?.user?._id
  }