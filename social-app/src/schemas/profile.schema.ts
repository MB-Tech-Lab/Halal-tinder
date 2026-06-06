import { z } from "zod";
import { GENDERS, LOOKING_FOR } from "@/src/types/domain";

export const profileSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  age: z.coerce.number().min(18, "Must be at least 18"),
  bio: z.string().min(20, "Bio must be at least 20 characters"),
  education: z.string().min(2, "Education is required"),
  profession: z.string().min(2, "Profession is required"),
  business: z.string().optional().default(""),
  location: z.string().min(2, "Location is required"),
  gender: z.enum(GENDERS),
  lookingFor: z.enum(LOOKING_FOR),
  interests: z.array(z.string()).min(2, "Add at least 2 interests"),
  languages: z.array(z.string()).min(1, "Add at least 1 language"),
  instagram: z.string().optional().default(""),
  linkedin: z.string().optional().default(""),
  website: z.string().optional().default(""),
});

export const sectionSchema = z.object({
  value: z.string().min(1, "This field is required"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
