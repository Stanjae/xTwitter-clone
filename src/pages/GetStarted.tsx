import { CompleteProfile } from "@/api/auth"
import { Field } from "@/components/ui/field"
import { InputGroup } from "@/components/ui/input-group"
import { StepsCompletedContent, StepsContent, StepsItem, StepsList, StepsNextTrigger, StepsPrevTrigger, StepsRoot } from "@/components/ui/steps"
import { toaster } from "@/components/ui/toaster"
import { ProfileType } from "@/lib/definitions"
import { ProfileSchema } from "@/lib/zod"
import { AbsoluteCenter, Button, Card, Container, createListCollection, GridItem, Group, Input, Separator, SimpleGrid, Stack, Textarea} from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { FaMapMarkerAlt } from "react-icons/fa";
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from "@/components/ui/select"
import { genderList } from "@/utils/navigation"
import { BiCalendar } from "react-icons/bi"
import { FaLink } from "react-icons/fa6"
import { FileUploadList, FileUploadRoot, FileUploadTrigger } from "@/components/ui/file-button"
import { HiUpload } from "react-icons/hi"
import { uploadFile } from '@uploadcare/upload-client'
import { CustomButton } from "@/components/ui/customComponents/CustomButton"
import { sessionUserId } from "@/utils/getStorageData"





const GetStarted = () => {
  const genders = createListCollection({items:genderList})
  const userId = sessionUserId();
  //const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { errors }, control } = useForm<ProfileType>({
      resolver: zodResolver(ProfileSchema),
      defaultValues:{
        userId:'', profilePicture:'',
        gender:'', dob:'',
        coverPicture:'',  bio:'',
        location:'', website: ''
      }
    })

   const handleUploadFiles = async(file:any)=>{
    const fileData = file.acceptedFiles.at(0)
    
    if(!fileData) return

    try{
      const result = await uploadFile(fileData,
        {
          publicKey: '72d090bc149255852c55',
          store: 'auto',
          metadata: {
            subsystem: 'js-client',
            pet: fileData?.name
          }
        }
      )
      return result?.cdnUrl  
    }catch(err){
      console.log(err)
    }
   }
   const setProfilePicture =async(file:any)=>{
    const imageUrl = await handleUploadFiles(file);
    setValue("profilePicture", imageUrl)
   }

   const setCoverPicture =async(file:any)=>{
    const imageUrl = await handleUploadFiles(file);
    setValue("coverPicture", imageUrl)
   }


    const onSubmit=async(data:ProfileType)=>{
      const response  = await CompleteProfile({...data, userId})
      if(response?.code == 201){
          toaster.create({title:response?.message, type:"success"})
          window.location.href ='/home';
      }else{
          toaster.create({title:response?.message, type:"error"})
      }
    }
  return (
    <Container position={'relative'} height={'100dvh'} >

      <AbsoluteCenter>
        <Card.Root w={'2xl'} variant={'elevated'}>
            <Card.Header>Complete your Profile</Card.Header>
              <Card.Body>
                <form onSubmit={handleSubmit(onSubmit)} >
                  <StepsRoot size={'lg'} count={3}>
                      <StepsList>
                        <StepsItem index={0} title="Step 1" />
                        <StepsItem index={1} title="Step 2" />
                        <StepsItem index={2} title="Step 3" />
                      </StepsList>

                      <StepsContent index={0}>
                        <Field label={'Bio'} display={'block'} textAlign={'left'}  w={'full'} invalid={!!errors?.bio?.message} errorText={errors?.bio?.message}>
                            <InputGroup display={'block'} flex="1" >
                                <Textarea  {...register('bio')} variant="subtle" size="xl" placeholder="Enter your Bio" />
                            </InputGroup>
                        </Field>

                        <Field label={'Location'} display={'block'} textAlign={'left'}  w={'full'} invalid={!!errors?.location?.message} errorText={errors?.location?.message}>
                            <InputGroup display={'block'} flex="1" startElement={<FaMapMarkerAlt/>}>
                                <Input {...register('location')} type='text' placeholder="Enter your Location" size={'lg'} rounded={'lg'} variant="subtle" />
                            </InputGroup>
                        </Field>
                      </StepsContent>
                      <StepsContent index={1}>
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: "24px" }}>
                        <GridItem colSpan={{ base: 1}}>
                        <Field label="Gender" invalid={!!errors.gender} errorText={errors.gender?.message}
                                width="full">
                                <Controller control={control} name="gender"
                                  render={({ field }:any) => (
                                    <SelectRoot size={'lg'}
                                      name={field.name} value={field.value}
                                      onValueChange={({ value }) => field.onChange(value[0])}
                                      onInteractOutside={() => field.onBlur()}
                                      collection={genders}
                                    >
                                      <SelectTrigger>
                                        <SelectValueText placeholder="Select Gender" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {genders.items.map((item) => (
                                          <SelectItem item={item} key={item.value}>
                                            {item.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </SelectRoot>
                                  )}
                                />
                              </Field>
                          </GridItem>
                          <GridItem position={'relative'} colSpan={{ base: 1}}>
                            <Field label="Date of Birth" invalid={!!errors.dob} errorText={errors.dob?.message}
                                  width="full">
                                  <InputGroup w={'full'} display={'block'} flex="1" startElement={<BiCalendar/>}>
                                        <Input w={'full'} h={'52px'} {...register('dob')} type='date' placeholder="Enter your Date of Birth" size={'lg'} rounded={'lg'} variant="subtle" />
                                    </InputGroup>
                            </Field>
                          </GridItem>
                          <GridItem colSpan={{ base: 1, md: 2 }}>
                            <InputGroup display={'block'} flex="1" startElement={<FaLink/>}>
                                  <Input {...register('website')} type='url' placeholder="Enter your Website Url" size={'lg'} rounded={'lg'} variant="subtle" />
                              </InputGroup>
                          </GridItem>
                        </SimpleGrid>

                      </StepsContent>
                      <StepsContent spaceY={'20px'} index={2}>
                        <Stack>
                        <input hidden {...register("profilePicture")}/>
                          <FileUploadRoot accept={["image/png", "image/jpeg"]} onFileChange={async(file:any)=> await setProfilePicture(file)}>
                            <FileUploadTrigger asChild>
                              <Button variant="outline" size="sm">
                                <HiUpload /> Upload Profile Picture
                              </Button>
                            </FileUploadTrigger>
                            <FileUploadList showSize clearable />
                          </FileUploadRoot>
                        </Stack>
                        <Separator />
                        <Stack>
                          <input hidden {...register("coverPicture")}/>
                          <FileUploadRoot accept={["image/png", "image/jpeg"]} onFileChange={async(file:any)=> await setCoverPicture(file)}>
                              <FileUploadTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <HiUpload /> Upload Cover Picture
                                </Button>
                              </FileUploadTrigger>
                              <FileUploadList showSize clearable />
                            </FileUploadRoot>
                        </Stack>
                      </StepsContent>
                      <StepsCompletedContent textAlign={'center'}>
                        <CustomButton type="submit" rounded={'md'} size={'md'} visual={'solidBlue'}>Let's Go</CustomButton>
                      </StepsCompletedContent>

                      <Group>
                        <StepsPrevTrigger asChild>
                          <Button type="button" variant="outline" size="sm">
                            Prev
                          </Button>
                        </StepsPrevTrigger>
                        <StepsNextTrigger asChild>
                          <Button type="button" variant="outline" size="sm">
                            Next
                          </Button>
                        </StepsNextTrigger>
                      </Group>
                    </StepsRoot>
                    
                </form>
              </Card.Body>
            <Card.Footer />
        </Card.Root>
      </AbsoluteCenter>
    </Container>
  )
}

export default GetStarted