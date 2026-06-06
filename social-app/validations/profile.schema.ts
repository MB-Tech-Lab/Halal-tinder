import { z } from "zod";

export const ProfileSchema =
 z.object({
  fullName:
   z.string().min(3),

  age:
   z.string().min(1),

  gender:
   z.string(),

  height:
   z.string(),

  maritalStatus:
   z.string(),

  bio:
   z.string().min(20),

  occupation:
   z.string(),

  company:
   z.string(),

  education:
   z.string(),

  hobbies:
   z.string(),

  interests:
   z.string(),

  city:
   z.string(),

  state:
   z.string(),

  country:
   z.string(),
 });