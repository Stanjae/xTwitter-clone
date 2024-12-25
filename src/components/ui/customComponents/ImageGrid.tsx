import { Card, GridItem, Image, SimpleGrid } from "@chakra-ui/react"


const ImageGrid = ({imagesArray}:any) => {
  return (
    <Card.Root border={'none'} bg={'transparent'}>
        <SimpleGrid overflow={'hidden'} bg={'transparent'} border={'none'}  rounded={'4xl'} gap={'1'} columns={{base:2}}>
        {imagesArray?.map((item:any, index:number)=>{
          if((index == 0 && imagesArray.length == 3) || (index == 0 && imagesArray.length == 1)){
           return( 
           <GridItem rowSpan={2} colSpan={index == 0 && imagesArray.length == 1 ? 2 : 1}  key={item?.id}>
                <Image w={'full'} height={index == 0 && imagesArray.length == 1 ? 'auto':'full'} 
                rounded={index == 0 && imagesArray.length == 1 ? 'md':'none'}
                 src={item?.imageUrl} alt="new image"/>   
            </GridItem>)
          }else{
            return (
              <GridItem  key={index}>
                <Image w={'full'} height={'150px'} roundedEnd={'none'} src={item?.imageUrl} alt="new image"/>   
            </GridItem>
            )
          }
            
        })}
        </SimpleGrid>

    </Card.Root>
    
  )
}

export default ImageGrid
