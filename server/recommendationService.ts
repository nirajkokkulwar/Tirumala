import { Product } from '../src/types';

export class RecommendationService {
  /**
   * Rule-based recommendations based on product category, occasion, style, and price tier
   */
  static getRecommendationsForProduct(targetProduct: Product, allProducts: Product[], limit: number = 4): Product[] {
    const candidates = allProducts.filter(p => p.id !== targetProduct.id);

    const scored = candidates.map(product => {
      let score = 0;

      // Same category (women, men, kids)
      if (product.category === targetProduct.category) {
        score += 30;
      }

      // Same gender
      if (product.gender === targetProduct.gender) {
        score += 15;
      }

      // Same style (traditional, royal, festive, etc.)
      if (product.style === targetProduct.style) {
        score += 25;
      }

      // Overlapping occasions
      const sharedOccasions = product.occasion.filter(occ => targetProduct.occasion.includes(occ));
      score += sharedOccasions.length * 15;

      // Price similarity (within 30% difference)
      const priceDiffRatio = Math.abs(product.price - targetProduct.price) / Math.max(product.price, targetProduct.price);
      if (priceDiffRatio < 0.3) {
        score += 20;
      } else if (priceDiffRatio < 0.6) {
        score += 10;
      }

      // Shared tags
      const sharedTags = product.tags.filter(t => targetProduct.tags.includes(t));
      score += sharedTags.length * 10;

      // Rating boost
      score += product.rating * 3;

      return { product, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit).map(item => item.product);
  }
}
