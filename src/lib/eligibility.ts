import type { EligibilityRule, Opportunity } from "./knowledge";
import type { UserProfile } from "./profile";

export type Verdict = "POTENTIALLY_ELIGIBLE" | "NOT_ELIGIBLE" | "NEEDS_VERIFICATION";

export interface RuleResult {
  label: string;
  status: "pass" | "fail" | "unknown";
  detail: string;
}

export interface EligibilityResult {
  verdict: Verdict;
  results: RuleResult[];
  missing: string[];
  summary: string;
}

function fmtINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

function evaluate(rule: EligibilityRule, p: UserProfile): RuleResult {
  switch (rule.field) {
    case "age": {
      if (p.age === undefined) return { label: "Age", status: "unknown", detail: "Age not provided yet" };
      if (rule.op === "between") {
        const ok = p.age >= rule.min && p.age <= rule.max;
        return { label: "Age", status: ok ? "pass" : "fail", detail: `Required ${rule.min}–${rule.max}, you are ${p.age}` };
      }
      const ok = rule.op === "gte" ? p.age >= rule.value : p.age <= rule.value;
      return {
        label: "Age",
        status: ok ? "pass" : "fail",
        detail: `Required ${rule.op === "gte" ? "at least" : "at most"} ${rule.value}, you are ${p.age}`,
      };
    }
    case "family_income": {
      if (p.family_income === undefined)
        return { label: "Family income", status: "unknown", detail: "Annual family income not provided yet" };
      const ok = p.family_income <= rule.value;
      return {
        label: "Family income",
        status: ok ? "pass" : "fail",
        detail: `Limit ${fmtINR(rule.value)} per year, yours is ${fmtINR(p.family_income)}`,
      };
    }
    case "state": {
      if (!p.state) return { label: "State", status: "unknown", detail: "State not provided yet" };
      const ok = rule.values.some((v) => v.toLowerCase() === p.state!.toLowerCase());
      return { label: "State", status: ok ? "pass" : "fail", detail: `Available in ${rule.values.join(", ")}` };
    }
    case "occupation": {
      if (!p.occupation) return { label: "Occupation", status: "unknown", detail: "Occupation not provided yet" };
      const ok = rule.values.some((v) => p.occupation!.toLowerCase().includes(v));
      return { label: "Occupation", status: ok ? "pass" : "fail", detail: `Meant for ${rule.values.join(", ")}` };
    }
    case "education_level": {
      if (!p.education_level)
        return { label: "Education level", status: "unknown", detail: "Education level not provided yet" };
      const ok = rule.values.some((v) => p.education_level!.toLowerCase().includes(v));
      return { label: "Education level", status: ok ? "pass" : "fail", detail: `Applies to ${rule.values.join(", ")}` };
    }
    case "category": {
      if (!p.category) return { label: "Category", status: "unknown", detail: "Category not provided yet" };
      const ok = rule.values.some((v) => p.category!.toLowerCase().includes(v.toLowerCase()));
      return { label: "Category", status: ok ? "pass" : "fail", detail: `Applies to ${rule.values.join(", ")}` };
    }
    case "gender": {
      if (!p.gender) return { label: "Gender", status: "unknown", detail: "Gender not provided yet" };
      const ok = rule.values.includes(p.gender);
      return { label: "Gender", status: ok ? "pass" : "fail", detail: `Applies to ${rule.values.join(", ")}` };
    }
  }
}

export function checkEligibility(o: Opportunity, p: UserProfile): EligibilityResult {
  const results = o.eligibility_rules.map((r) => evaluate(r, p));
  const missing = results.filter((r) => r.status === "unknown").map((r) => r.label);
  const failed = results.filter((r) => r.status === "fail");

  let verdict: Verdict;
  if (failed.length > 0) verdict = "NOT_ELIGIBLE";
  else if (missing.length > 0) verdict = "NEEDS_VERIFICATION";
  else verdict = "POTENTIALLY_ELIGIBLE";

  const summary =
    verdict === "NOT_ELIGIBLE"
      ? `Basic criteria do not match: ${failed.map((f) => f.detail).join("; ")}.`
      : verdict === "NEEDS_VERIFICATION"
        ? `Looks promising, but still need: ${missing.join(", ")}.`
        : "Basic eligibility matches. Final approval happens after official verification.";

  return { verdict, results, missing, summary };
}

export interface Recommendation {
  opportunity: Opportunity;
  eligibility: EligibilityResult;
  score: number;
}

export function rank(opportunities: Opportunity[], p: UserProfile): Recommendation[] {
  return opportunities
    .map((o) => {
      const eligibility = checkEligibility(o, p);
      const base =
        eligibility.verdict === "POTENTIALLY_ELIGIBLE" ? 100 : eligibility.verdict === "NEEDS_VERIFICATION" ? 60 : 10;
      const stateBonus = p.state && o.state === p.state ? 15 : 0;
      const passes = eligibility.results.filter((r) => r.status === "pass").length * 5;
      return { opportunity: o, eligibility, score: base + stateBonus + passes };
    })
    .sort((a, b) => b.score - a.score);
}