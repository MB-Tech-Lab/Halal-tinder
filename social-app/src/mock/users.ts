import { Gender, LookingFor, User } from "@/src/types/domain";

const firstNames = [
  "Aarav",
  "Isha",
  "Kabir",
  "Meera",
  "Rohan",
  "Ananya",
  "Vivaan",
  "Saanvi",
  "Arjun",
  "Diya",
  "Karan",
  "Naina",
  "Rahul",
  "Priya",
  "Aditya",
  "Kavya",
  "Yash",
  "Aditi",
  "Sahil",
  "Pooja",
];

const cities = [
  "Mumbai",
  "Bengaluru",
  "Delhi",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Indore",
];

const professions = [
  "Product Designer",
  "Software Engineer",
  "Brand Strategist",
  "Photographer",
  "Doctor",
  "Architect",
  "Founder",
  "Consultant",
  "Content Creator",
  "Marketing Lead",
];

const interestsPool = [
  "Coffee",
  "Travel",
  "Fitness",
  "Books",
  "Music",
  "Food",
  "Design",
  "Movies",
  "Hiking",
  "Yoga",
  "Startups",
  "Gaming",
  "Photography",
  "Art",
];

const languagesPool = ["English", "Hindi", "Marathi", "Tamil", "Telugu", "Bengali"];

const photos = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&q=80",
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1200&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&q=80",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=1200&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1200&q=80",
];

const bios = [
  "Building a calm life with good coffee, better playlists, and honest conversation.",
  "Into design systems, spontaneous road trips, and finding the best ramen in town.",
  "Movie nights, early morning runs, and a strong bias toward people who laugh easily.",
  "Founder by day, amateur chef by night, and always planning the next weekend escape.",
  "A little ambitious, a little playful, and very serious about meaningful connections.",
];

function pick<T>(items: T[], index: number): T {
  return items[index % items.length];
}

function createInterests(index: number) {
  return [0, 1, 2, 3].map((offset) => pick(interestsPool, index + offset));
}

function createLanguages(index: number) {
  return [0, 1].map((offset) => pick(languagesPool, index + offset));
}

function genderForIndex(index: number): Gender {
  return index % 3 === 0 ? "male" : index % 3 === 1 ? "female" : "other";
}

function lookingForForIndex(index: number): LookingFor {
  return index % 4 === 0 ? "everyone" : index % 2 === 0 ? "female" : "male";
}

export const mockUsers: User[] = Array.from({ length: 50 }, (_, index) => {
  const firstName = pick(firstNames, index);
  const city = pick(cities, index);
  const profession = pick(professions, index);
  const age = 21 + (index % 11);
  const isFemale = genderForIndex(index) === "female";

  return {
    id: `user-${index + 1}`,
    name: `${firstName} ${isFemale ? "Sharma" : "Patel"}`,
    age,
    gender: genderForIndex(index),
    lookingFor: lookingForForIndex(index),
    location: city,
    profession,
    business: index % 5 === 0 ? `${profession} Studio` : "",
    education: index % 2 === 0 ? "National Institute of Design" : "University of Delhi",
    interests: createInterests(index),
    languages: createLanguages(index),
    photos: [pick(photos, index), pick(photos, index + 1), pick(photos, index + 2)],
    bio: `${pick(bios, index)} Based in ${city} and currently working as a ${profession.toLowerCase()}.`,
    shortBio: pick(bios, index),
    distanceKm: 1 + (index % 18),
    status: index % 3 === 0 ? "New here" : index % 3 === 1 ? "Recently active" : "Exploring",
    online: index % 4 !== 0,
    lastSeen: index % 4 === 0 ? "2h ago" : "Online now",
    profileCompleted: true,
    socialLinks: {
      instagram: "instagram.com/",
      linkedin: "linkedin.com/in/",
    },
  };
});

export const currentUserSeed = {
  id: "me",
  name: "Alex Mercer",
  email: "alex@example.com",
};
