// constants/mockProfiles.ts
import type { Profile } from "../lib/match";

export const CURRENT_USER: Profile = {
  id: "me",
  name: "Taylor",
  age: 29,
  avatar: require("../assets/images/react-logo.png"), // base file (Metro picks @2x/@3x)
  interests: ["hiking", "campfires", "coffee", "dogs"],
  city: "Austin",
  lookingFor: "adventure",
};

export const CANDIDATES: Profile[] = [
  {
    id: "1",
    name: "Riley",
    age: 28,
    avatar: require("../assets/images/react-logo.png"), // ✅ base name
    interests: ["hiking", "trail running", "coffee"],
    city: "Austin",
    lookingFor: "adventure",
  },
  {
    id: "2",
    name: "Jordan",
    age: 33,
    avatar: require("../assets/images/icon.png"),
    interests: ["climbing", "dogs", "sunsets"],
    city: "Dallas",
    lookingFor: "friends",
  },
  {
    id: "3",
    name: "Sam",
    age: 27,
    avatar: require("../assets/images/splash-icon.png"),
    interests: ["coffee", "photography", "campfires", "dogs"],
    city: "Austin",
    lookingFor: "adventure",
  },
];
