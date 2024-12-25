import { Card } from '@chakra-ui/react'

const CustomCard = ({children, title}:any) => {
  return (
    <Card.Root borderColor={'bordergrey'} bg="background" rounded={'2xl'}  variant={'outline'}>
        <Card.Body gap="2">
            <Card.Title lineHeight={'24px'} fontWeight={'bolder'} fontSize={'20px'} mb="3">{title}</Card.Title>
           {children}
        </Card.Body>
        </Card.Root>
  )
}

export default CustomCard