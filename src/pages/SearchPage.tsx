import { CustomLoader } from '@/components/ui/customComponents/CustomLoader';
import TweetCard from '@/components/ui/customComponents/TweetCard';
import WhoToFollowCard from '@/components/ui/customComponents/WhoToFollowCard';
import { InputGroup } from '@/components/ui/input-group';
import AnimateLayout from '@/layout/AnimateLayout';
import { useGetSearchPostsQuery } from '@/services/tweets';
import { useGetSearchUsersQuery } from '@/services/users';
import { Box, HStack, IconButton, Input, Tabs, Text } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa6';
import { LuSearch } from 'react-icons/lu';
import { MdOutlineSettings } from 'react-icons/md';
import { Form, useLoaderData, useNavigate, useSubmit } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

const SearchPage = () => {
    const { q }:any = useLoaderData();
    const router = useNavigate()
    const submit = useSubmit()

    const {data, refetch, isSuccess, isFetching} = useGetSearchPostsQuery(q);

    const {data:users, isSuccess:usersSuccess, isFetching:usersFetching} = useGetSearchUsersQuery(q)

    const debounced = useDebouncedCallback((event) => {
            submit(`?q=${event.target.value}`);
            refetch()
        },
        // delay in ms
        1000
      );

  return (
    <AnimateLayout>
        <Box>
            <Tabs.Root position={'relative'} top={'140px'}  defaultValue="all" variant={'line'}>
                <Box px={'3'} top={'0'} py={'2'} w={'2xl'} css={{backdropFilter:'blur(5px)', zIndex:'1', background:'rgba(255, 255, 255, 0.65)', _dark:{background:'rgba(6, 6, 6, 0.65)'}}} position={'fixed'}>
                    <HStack gap={'3'}>
                        <IconButton onClick={()=> router(-1)} colorPalette={'blue'} rounded={'full'} variant={'ghost'}>
                            <FaArrowLeft />
                        </IconButton>
                        <Box spaceY={'1'}>
                            <Text color={'textlight'} fontWeight={'bold'}  lineHeight={'24px'} fontSize={'20px'}>
                                "{isSuccess && q}"
                            </Text>
                            <Text color={'textgray'} fontSize={'13px'} lineHeight={'16px'} fontWeight={'medium'}>
                                {data?.length} Search Results</Text>
                        </Box>  
                    </HStack>

                    <Box px={'3'} top={'0'} pt={'2'} w={'full'} css={{backdropFilter:'blur(5px)', zIndex:'1', background:'rgba(255, 255, 255, 0.65)', _dark:{background:'transparent'}}}>
                        <HStack>
                        <Form style={{display:'block', width:'95%'}} id="search-form" role="search">
                            <InputGroup  display={'block'} flex="1" startElement={<LuSearch />}>
                                <Input defaultValue={q} name="q" type="search" maxW={'xl'}
                                 placeholder="Search" size={'lg'} rounded={'full'} variant="subtle"
                                 onChange={(event) => debounced(event)} />
                            </InputGroup>
                        </Form>
                            <IconButton colorPalette={'blue'} variant={'ghost'}>
                                <MdOutlineSettings />
                            </IconButton>
                        </HStack> 
                    </Box>

                    <Tabs.List py={'1'} w={'2xl'} colorPalette={'blue'}>
                    <Tabs.Trigger value="all">All</Tabs.Trigger>
                    <Tabs.Trigger value="accounts">
                        Accounts
                    </Tabs.Trigger>
                </Tabs.List>   
                </Box>

            <Box position={'relative'} top={'0'}>
              <Tabs.Content value="all">
                {isFetching && <CustomLoader/>}
                {data?.length == 0 && <Text fontWeight={'bold'} mt={'5'} textAlign={'center'} fontSize={'2xl'}>No Search Results</Text>}
               {isSuccess && data?.map(item => <TweetCard key={item?._id} item={item}/>)}
              </Tabs.Content>
              <Tabs.Content value="accounts">
                {usersFetching && <CustomLoader/>}
                {usersSuccess && users?.map(item => <WhoToFollowCard key={item?._id} author={item}/>)}
              </Tabs.Content>
              <Tabs.Content value="tasks">
                Manage your tasks for freelancers
              </Tabs.Content>
            </Box>
            
          </Tabs.Root>
        </Box>
    </AnimateLayout>
  )
}

export default SearchPage