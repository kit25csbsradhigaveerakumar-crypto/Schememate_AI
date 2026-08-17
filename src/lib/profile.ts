export interface UserProfile {
  name?: string;
  age?: number;
  gender?: "male" | "female" | "other";
  state?: string;
  district?: string;
  occupation?: string;
  education_level?: string;
  course?: string;
  year?: string;
  family_income?: number;
  category?: string;
  notes?: string[];
}

export const PROFILE_FIELD_LABELS: Record<string, string> = {
  name: "Name",
  age: "Age",
  gender: "Gender",
  state: "State",
  district: "District",
  occupation: "Occupation",
  education_level: "Education level",
  course: "Course",
  year: "Year of study",
  family_income: "Annual family income",
  category: "Category",
};

export function mergeProfile(base: UserProfile, patch: Partial<UserProfile>): UserProfile {
  const next: UserProfile = { ...base };
  for (const [k, v] of Object.entries(patch)) {
    if (v === null || v === undefined || v === "") continue;
    if (k === "notes") {
      next.notes = Array.from(new Set([...(base.notes ?? []), ...(v as string[])])).slice(-10);
    } else {
      // @ts-expect-error dynamic assign
      next[k] = v;
    }
  }
  return next;
}