import { z, ZodType } from "zod"; // Add new import
import { AddCommentFormType, CreateTweetType, EmailSignInType, EmailSignUpType, ProfileType } from "./definitions";

export const TweetSchema:ZodType<CreateTweetType> = z.object({
    tweet:z.string({required_error:"A tweet is required"}).min(2, { message: "A tweet is required" })
})

export const SignUpSchema: ZodType<EmailSignUpType> = z.object({
  email: z.string().email(),
  username:z.string({required_error:'username is required'}).min(1, { message: "Username is too short" }),
  type:z.string(),
  password: z.string().min(6, { message: "Password is too short" }).max(20, { message: "Password is too long" }),
   confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // path of error
});

export const SignInSchema: ZodType<EmailSignInType> = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Password is too short" }).max(20, { message: "Password is too long" }),
});

export const ProfileSchema : ZodType<ProfileType> = z.object({
    userId: z.string(),
    profilePicture:z.string(),
    gender:z.string(),
    dob:z.string(),
    coverPicture:z.string(),
    bio: z.string(),
    location: z.string(),
    website: z.string()
})
/* export const UserSchema: ZodType<FormData> = z
 .object({
   email: z.string().email(),
   githubUrl: z
     .string()
     .url()
     .includes("github.com", { message: "Invalid GitHub URL" }),
   yearsOfExperience: z
     .number({
       required_error: "required field",
       invalid_type_error: "Years of Experience is required",
     })
     .min(1)
     .max(10),
   password: z
     .string()
     .min(8, { message: "Password is too short" })
     .max(20, { message: "Password is too long" }),
   confirmPassword: z.string(),
 })
 .refine((data) => data.password === data.confirmPassword, {
   message: "Passwords do not match",
   path: ["confirmPassword"], // path of error
 });
 */

 export const AddCommentFormSchema : ZodType<AddCommentFormType>=z.object({
  comment:z.string().min(2, {message:"comment is too short"}),
 })