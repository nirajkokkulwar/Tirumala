import { ClothingCategory, ClothingOccasion, ClothingStyle } from '../src/types';

export interface ParsedParameters {
  category?: ClothingCategory;
  gender?: 'men' | 'women' | 'boys' | 'girls' | 'unisex';
  style?: ClothingStyle;
  occasion?: ClothingOccasion;
  budgetMin?: number;
  budgetMax?: number;
  color?: string;
  fabric?: string;
  ageGroup?: string;
  keywords?: string[];
}

export interface IntentParseResult {
  params: ParsedParameters;
  confidence: number;
  explanation: string;
}

/**
 * Modular Rule-Based Intent Parser for Tirumala Style Assistant.
 * Translates natural language into structured search parameters.
 */
export function parseStyleQuery(rawQuery: string): IntentParseResult {
  const query = rawQuery.toLowerCase().trim();
  const params: ParsedParameters = {};
  const explanationParts: string[] = [];

  // 1. Budget extraction
  // e.g., "under ₹2,000", "below 3000", "around 1500", "between 2000 and 5000", "under 1000"
  const underMatch = query.match(/(?:under|below|less than|within|upto|up to|max)\s*(?:₹|rs\.?|inr)?\s*([\d,]+)/i);
  if (underMatch) {
    const val = parseInt(underMatch[1].replace(/,/g, ''), 10);
    if (!isNaN(val)) {
      params.budgetMax = val;
      explanationParts.push(`under ₹${val.toLocaleString('en-IN')}`);
    }
  }

  const aroundMatch = query.match(/(?:around|approx|approximately)\s*(?:₹|rs\.?|inr)?\s*([\d,]+)/i);
  if (aroundMatch && !params.budgetMax) {
    const val = parseInt(aroundMatch[1].replace(/,/g, ''), 10);
    if (!isNaN(val)) {
      params.budgetMin = Math.max(0, val - 800);
      params.budgetMax = val + 800;
      explanationParts.push(`around ₹${val.toLocaleString('en-IN')}`);
    }
  }

  const betweenMatch = query.match(/(?:between|from)\s*(?:₹|rs\.?|inr)?\s*([\d,]+)\s*(?:to|and|-)\s*(?:₹|rs\.?|inr)?\s*([\d,]+)/i);
  if (betweenMatch) {
    const minVal = parseInt(betweenMatch[1].replace(/,/g, ''), 10);
    const maxVal = parseInt(betweenMatch[2].replace(/,/g, ''), 10);
    if (!isNaN(minVal) && !isNaN(maxVal)) {
      params.budgetMin = minVal;
      params.budgetMax = maxVal;
      explanationParts.push(`₹${minVal.toLocaleString('en-IN')}–₹${maxVal.toLocaleString('en-IN')}`);
    }
  }

  // 2. Gender & Category & Age
  if (/\b(?:boy|boys|10 year old boy|young boy|son)\b/i.test(query)) {
    params.category = 'kids';
    params.gender = 'boys';
    explanationParts.push("boys'");
  } else if (/\b(?:girl|girls|daughter|little princess)\b/i.test(query)) {
    params.category = 'kids';
    params.gender = 'girls';
    explanationParts.push("girls'");
  } else if (/\b(?:kid|kids|child|children)\b/i.test(query)) {
    params.category = 'kids';
    explanationParts.push("kids'");
  } else if (/\b(?:men|mens|man|gentlemen|groom|father|husband|boy's father)\b/i.test(query)) {
    params.category = 'men';
    params.gender = 'men';
    explanationParts.push("men's");
  } else if (/\b(?:women|womens|woman|lady|ladies|bride|mother|sister)\b/i.test(query)) {
    params.category = 'women';
    params.gender = 'women';
    explanationParts.push("women's");
  }

  // Age group check
  const ageMatch = query.match(/(\d+)\s*(?:year|yr|years)\s*(?:old)?/i);
  if (ageMatch) {
    params.ageGroup = `${ageMatch[1]} years`;
    if (!params.category) params.category = 'kids';
  }

  // 3. Occasion
  if (/\b(?:wedding|shaadi|marriage|reception|haldi|mehendi|sangeet|bride|groom)\b/i.test(query)) {
    params.occasion = 'wedding';
    explanationParts.push('wedding');
  } else if (/\b(?:festive|festival|diwali|pongal|navratri|dusshra|onam|puja|pooja)\b/i.test(query)) {
    params.occasion = 'festive';
    explanationParts.push('festive');
  } else if (/\b(?:family function|function|gathering|anniversary|get together)\b/i.test(query)) {
    params.occasion = 'family-function';
    explanationParts.push('family function');
  } else if (/\b(?:traditional|temple|ceremony|ritual)\b/i.test(query)) {
    params.occasion = 'traditional';
    explanationParts.push('traditional');
  } else if (/\b(?:casual|daily|everyday|simple)\b/i.test(query)) {
    params.occasion = 'casual';
    explanationParts.push('simple & everyday');
  }

  // 4. Style
  if (/\b(?:traditional|ethnic|heritage|classic)\b/i.test(query)) {
    params.style = 'traditional';
  } else if (/\b(?:royal|regal|sherwani|bandhgala)\b/i.test(query)) {
    params.style = 'royal-ethnic';
  } else if (/\b(?:modern|contemporary|fusion)\b/i.test(query)) {
    params.style = 'modern-ethnic';
  } else if (/\b(?:handloom|khadi|organic|jamdani)\b/i.test(query)) {
    params.style = 'handloom';
  }

  // 5. Fabric
  const fabrics = ['silk', 'cotton', 'chanderi', 'tussar', 'velvet', 'brocade', 'kanchipuram', 'banarasi', 'modal'];
  for (const f of fabrics) {
    if (query.includes(f)) {
      params.fabric = f;
      explanationParts.push(f.charAt(0).toUpperCase() + f.slice(1));
      break;
    }
  }

  // 6. Color
  const colors = ['maroon', 'gold', 'cream', 'ivory', 'green', 'emerald', 'blue', 'red', 'rose', 'blush', 'white', 'indigo'];
  for (const c of colors) {
    if (new RegExp(`\\b${c}\\b`, 'i').test(query)) {
      params.color = c;
      explanationParts.push(c);
      break;
    }
  }

  // Generate pleasant, customer-facing boutique explanation
  let explanation = '';
  if (explanationParts.length > 0) {
    const details = explanationParts.join(' ');
    explanation = `Here are suitable ${details} selections handpicked from our Tirumala boutique collection.`;
  } else {
    explanation = `Here are popular pieces curated from our Tirumala collection matching your request.`;
  }

  return {
    params,
    confidence: 0.9,
    explanation
  };
}
