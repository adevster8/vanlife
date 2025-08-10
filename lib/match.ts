export type Profile = {
  id: string;
  name: string;
  age: number;
  bio?: string;
  avatar: any;
  photos?: any[];
  interests: string[];
  city?: string;
  lookingFor?: "friends" | "adventure" | "dating";
};

type Weights = { interest: number; ageGap: number; city: number; lookingFor: number };

const DEFAULT_WEIGHTS: Weights = { interest: 3, ageGap: 1, city: 2, lookingFor: 2 };

export function matchScore(me: Profile, candidate: Profile, weights: Weights = DEFAULT_WEIGHTS) {
  let score = 0;

  const a = new Set((me.interests || []).map(s => s.toLowerCase()));
  const b = new Set((candidate.interests || []).map(s => s.toLowerCase()));
  const inter = [...a].filter(x => b.has(x)).length;
  const union = new Set([...a, ...b]).size || 1;
  score += (inter / union) * 100 * weights.interest;

  const gap = Math.abs((me.age ?? 0) - (candidate.age ?? 0));
  const agePart = Math.max(0, 1 - Math.min(gap, 20) / 20);
  score += agePart * 100 * weights.ageGap;

  if (me.city && candidate.city && me.city === candidate.city) score += 100 * weights.city;
  if (me.lookingFor && candidate.lookingFor && me.lookingFor === candidate.lookingFor) score += 100 * weights.lookingFor;

  return Math.round(score);
}
