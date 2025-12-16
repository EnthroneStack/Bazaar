"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { productDummyData } from "@/assets/assets";

interface ProductView {
  productId: string;
  timestamp: number;
  category: string;
  price: number;
  views: number;
}

interface CustomerBehavior {
  productId: string;
  views: number;
  purchases: number;
  category: string;
  lastViewed: number;
}

interface ProductTrackingContextType {
  // Recently Viewed
  recentlyViewed: any[];
  addToRecentlyViewed: (productId: string) => void;
  clearRecentlyViewed: () => void;

  // Customers Also Viewed
  customersAlsoViewed: any[];

  // Recommendations
  getPersonalizedRecommendations: () => any[];
  getSimilarProducts: (productId: string) => any[];

  // Analytics
  trackProductView: (productId: string) => void;
  trackProductPurchase: (productId: string) => void;

  // Management
  isTrackingEnabled: boolean;
  toggleTracking: () => void;
}

const ProductTrackingContext = createContext<
  ProductTrackingContextType | undefined
>(undefined);

// Constants
const STORAGE_KEYS = {
  RECENTLY_VIEWED: "bazaar-recently-viewed",
  CUSTOMER_BEHAVIOR: "bazaar-customer-behavior",
  TRACKING_ENABLED: "bazaar-tracking-enabled",
  USER_PREFERENCES: "bazaar-user-preferences",
} as const;

const CONFIG = {
  MAX_RECENT_VIEWS: 20,
  BEHAVIOR_HISTORY_DAYS: 30,
  MIN_VIEWS_FOR_RECOMMENDATION: 2,
  SIMILARITY_THRESHOLD: 0.6,
} as const;

class ProductTrackingService {
  private isTrackingEnabled = true;

  constructor() {
    this.initializeTrackingStatus();
  }

  private initializeTrackingStatus() {
    try {
      const trackingEnabled = localStorage.getItem(
        STORAGE_KEYS.TRACKING_ENABLED
      );
      this.isTrackingEnabled = trackingEnabled
        ? JSON.parse(trackingEnabled)
        : true;
    } catch (error) {
      console.warn("Failed to initialize tracking status:", error);
      this.isTrackingEnabled = true;
    }
  }

  // Recently Viewed Operations
  async getRecentlyViewed(): Promise<ProductView[]> {
    if (!this.isTrackingEnabled) return [];

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED);
      if (!stored) return [];

      const views: ProductView[] = JSON.parse(stored);
      const now = Date.now();
      const cutoffTime =
        now - CONFIG.BEHAVIOR_HISTORY_DAYS * 24 * 60 * 60 * 1000;

      const validViews = views.filter((view) => view.timestamp > cutoffTime);

      if (validViews.length !== views.length) {
        await this.saveRecentlyViewed(validViews);
      }

      return validViews;
    } catch (error) {
      console.error("Error reading recently viewed:", error);
      return [];
    }
  }

  async addToRecentlyViewed(productId: string): Promise<void> {
    if (!this.isTrackingEnabled) return;

    try {
      const views = await this.getRecentlyViewed();
      const product = productDummyData.find((p) => p.id === productId);

      if (!product) return;

      // Remove existing entry if it exists
      const filteredViews = views.filter(
        (view) => view.productId !== productId
      );

      const newView: ProductView = {
        productId,
        timestamp: Date.now(),
        category: product.category,
        price: product.price,
        views: 1,
      };

      const updatedViews = [newView, ...filteredViews].slice(
        0,
        CONFIG.MAX_RECENT_VIEWS
      );

      await this.saveRecentlyViewed(updatedViews);

      // Also update customer behavior
      await this.updateCustomerBehavior(productId, "view");
    } catch (error) {
      console.error("Error adding to recently viewed:", error);
    }
  }

  async clearRecentlyViewed(): Promise<void> {
    try {
      localStorage.removeItem(STORAGE_KEYS.RECENTLY_VIEWED);
    } catch (error) {
      console.error("Error clearing recently viewed:", error);
    }
  }

  private async saveRecentlyViewed(views: ProductView[]): Promise<void> {
    try {
      localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(views));
    } catch (error) {
      console.error("Error saving recently viewed:", error);
    }
  }

  // Customer Behavior Analytics
  private async getCustomerBehavior(): Promise<CustomerBehavior[]> {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CUSTOMER_BEHAVIOR);
      if (!stored) return [];

      const behavior: CustomerBehavior[] = JSON.parse(stored);
      const now = Date.now();
      const cutoffTime =
        now - CONFIG.BEHAVIOR_HISTORY_DAYS * 24 * 60 * 60 * 1000;

      return behavior.filter((item) => item.lastViewed > cutoffTime);
    } catch (error) {
      console.error("Error reading customer behavior:", error);
      return [];
    }
  }

  private async updateCustomerBehavior(
    productId: string,
    action: "view" | "purchase"
  ): Promise<void> {
    if (!this.isTrackingEnabled) return;

    try {
      const behavior = await this.getCustomerBehavior();
      const product = productDummyData.find((p) => p.id === productId);

      if (!product) return;

      const existingIndex = behavior.findIndex(
        (item) => item.productId === productId
      );
      const now = Date.now();

      if (existingIndex >= 0) {
        // Update existing behavior
        behavior[existingIndex].lastViewed = now;
        if (action === "view") {
          behavior[existingIndex].views += 1;
        } else if (action === "purchase") {
          behavior[existingIndex].purchases += 1;
        }
      } else {
        // Add new behavior entry
        behavior.push({
          productId,
          views: action === "view" ? 1 : 0,
          purchases: action === "purchase" ? 1 : 0,
          category: product.category,
          lastViewed: now,
        });
      }

      await this.saveCustomerBehavior(behavior);
    } catch (error) {
      console.error("Error updating customer behavior:", error);
    }
  }

  private async saveCustomerBehavior(
    behavior: CustomerBehavior[]
  ): Promise<void> {
    try {
      localStorage.setItem(
        STORAGE_KEYS.CUSTOMER_BEHAVIOR,
        JSON.stringify(behavior)
      );
    } catch (error) {
      console.error("Error saving customer behavior:", error);
    }
  }

  // Recommendation Algorithms
  async getCustomersAlsoViewed(
    currentProductId: string,
    limit: number = 6
  ): Promise<any[]> {
    if (!this.isTrackingEnabled) return this.getFallbackRecommendations(limit);

    try {
      const behavior = await this.getCustomerBehavior();
      const currentProduct = productDummyData.find(
        (p) => p.id === currentProductId
      );

      if (!currentProduct) return this.getFallbackRecommendations(limit);

      // Find products that are frequently viewed together
      const productAssociations = new Map<string, number>();

      behavior.forEach((entry) => {
        if (
          entry.productId !== currentProductId &&
          entry.views >= CONFIG.MIN_VIEWS_FOR_RECOMMENDATION
        ) {
          // Calculate association score based on views, recency, and category similarity
          const product = productDummyData.find(
            (p) => p.id === entry.productId
          );
          if (product) {
            const categoryMatch =
              product.category === currentProduct.category ? 2 : 1;
            const recencyScore = this.calculateRecencyScore(entry.lastViewed);
            const popularityScore = Math.log(entry.views + 1);

            const associationScore =
              categoryMatch * recencyScore * popularityScore;
            productAssociations.set(entry.productId, associationScore);
          }
        }
      });

      // Sort by association score and get top products
      const sortedProducts = Array.from(productAssociations.entries())
        .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
        .slice(0, limit)
        .map(([productId]) => productDummyData.find((p) => p.id === productId))
        .filter(Boolean);

      return sortedProducts.length > 0
        ? sortedProducts
        : this.getFallbackRecommendations(limit);
    } catch (error) {
      console.error("Error getting customers also viewed:", error);
      return this.getFallbackRecommendations(limit);
    }
  }

  async getPersonalizedRecommendations(limit: number = 8): Promise<any[]> {
    if (!this.isTrackingEnabled) return this.getFallbackRecommendations(limit);

    try {
      const recentlyViewed = await this.getRecentlyViewed();
      const behavior = await this.getCustomerBehavior();

      if (recentlyViewed.length === 0) {
        return this.getPopularProducts(limit);
      }

      // Get user's preferred categories
      const categoryPreferences = this.calculateCategoryPreferences(behavior);

      // Get recommendation candidates - create copy to avoid mutation
      const candidates = [...productDummyData].filter(
        (product) =>
          !recentlyViewed.some((view) => view.productId === product.id)
      );

      // Score each candidate
      const scoredProducts = candidates.map((product) => {
        const categoryScore = categoryPreferences.get(product.category) || 1;
        const priceScore = this.calculatePriceAffinityScore(
          product.price,
          behavior
        );
        const popularityScore = this.calculatePopularityScore(
          product.id,
          behavior
        );

        const totalScore = categoryScore * priceScore * popularityScore;

        return { product, score: totalScore };
      });

      // Sort by score and return top products - create copy before sorting
      return [...scoredProducts]
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map((item) => item.product);
    } catch (error) {
      console.error("Error getting personalized recommendations:", error);
      return this.getFallbackRecommendations(limit);
    }
  }

  async getSimilarProducts(
    productId: string,
    limit: number = 4
  ): Promise<any[]> {
    const product = productDummyData.find((p) => p.id === productId);
    if (!product) return this.getFallbackRecommendations(limit);

    // Find products in same category with similar price range - create copy
    const similarProducts = [...productDummyData]
      .filter(
        (p) =>
          p.id !== productId &&
          p.category === product.category &&
          Math.abs(p.price - product.price) / product.price < 0.5 // Within 50% price difference
      )
      .slice(0, limit);

    return similarProducts.length > 0
      ? similarProducts
      : this.getFallbackRecommendations(limit);
  }

  // Helper Methods
  private calculateRecencyScore(timestamp: number): number {
    const now = Date.now();
    const daysAgo = (now - timestamp) / (24 * 60 * 60 * 1000);
    return Math.max(0, 1 - daysAgo / CONFIG.BEHAVIOR_HISTORY_DAYS);
  }

  private calculateCategoryPreferences(
    behavior: CustomerBehavior[]
  ): Map<string, number> {
    const categoryCounts = new Map<string, number>();

    behavior.forEach((entry) => {
      const currentCount = categoryCounts.get(entry.category) || 0;
      categoryCounts.set(
        entry.category,
        currentCount + entry.views + entry.purchases
      );
    });

    // Normalize scores
    const total = Array.from(categoryCounts.values()).reduce(
      (sum, count) => sum + count,
      0
    );
    const preferences = new Map<string, number>();

    categoryCounts.forEach((count, category) => {
      preferences.set(category, total > 0 ? count / total : 1);
    });

    return preferences;
  }

  private calculatePriceAffinityScore(
    price: number,
    behavior: CustomerBehavior[]
  ): number {
    if (behavior.length === 0) return 1;

    const viewedPrices = behavior
      .map((entry) => {
        const product = productDummyData.find((p) => p.id === entry.productId);
        return product ? product.price : 0;
      })
      .filter((price) => price > 0);

    if (viewedPrices.length === 0) return 1;

    const avgPrice =
      viewedPrices.reduce((sum, p) => sum + p, 0) / viewedPrices.length;
    const priceDifference = Math.abs(price - avgPrice) / avgPrice;

    return Math.max(0, 1 - priceDifference);
  }

  private calculatePopularityScore(
    productId: string,
    behavior: CustomerBehavior[]
  ): number {
    const productBehavior = behavior.find(
      (entry) => entry.productId === productId
    );
    if (!productBehavior) return 0.5; // Neutral score for unseen products

    const totalViews = productBehavior.views;
    const purchaseRate = productBehavior.purchases / Math.max(1, totalViews);

    return Math.log(totalViews + 1) * (1 + purchaseRate);
  }

  private getPopularProducts(limit: number): any[] {
    // Fallback: return products with highest ratings or most reviews - create copy
    return [...productDummyData]
      .sort((a, b) => b.mrp - b.price - (a.mrp - a.price)) // Sort by discount
      .slice(0, limit);
  }

  private getFallbackRecommendations(limit: number): any[] {
    // Return random products as fallback - create copy first
    return [...productDummyData]
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);
  }

  // Tracking Management
  enableTracking() {
    this.isTrackingEnabled = true;
    localStorage.setItem(STORAGE_KEYS.TRACKING_ENABLED, "true");
  }

  disableTracking() {
    this.isTrackingEnabled = false;
    localStorage.setItem(STORAGE_KEYS.TRACKING_ENABLED, "false");
  }

  getTrackingStatus(): boolean {
    return this.isTrackingEnabled;
  }

  async trackProductPurchase(productId: string): Promise<void> {
    if (!this.isTrackingEnabled) return;
    await this.updateCustomerBehavior(productId, "purchase");
  }
}

// Service instance
const productTrackingService = new ProductTrackingService();

export const ProductTrackingProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);
  const [customersAlsoViewed, setCustomersAlsoViewed] = useState<any[]>([]);
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      const views = await productTrackingService.getRecentlyViewed();
      const viewedProducts = views
        .map((view) => productDummyData.find((p) => p.id === view.productId))
        .filter(Boolean);

      setRecentlyViewed(viewedProducts);
      setIsTrackingEnabled(productTrackingService.getTrackingStatus());
      setIsLoaded(true);
    };

    loadInitialData();
  }, []);

  const addToRecentlyViewed = useCallback(async (productId: string) => {
    await productTrackingService.addToRecentlyViewed(productId);

    // Update local state
    const views = await productTrackingService.getRecentlyViewed();
    const viewedProducts = views
      .map((view) => productDummyData.find((p) => p.id === view.productId))
      .filter(Boolean);

    setRecentlyViewed(viewedProducts);
  }, []);

  const clearRecentlyViewed = useCallback(async () => {
    await productTrackingService.clearRecentlyViewed();
    setRecentlyViewed([]);
  }, []);

  const trackProductView = useCallback(async (productId: string) => {
    await productTrackingService.addToRecentlyViewed(productId);

    // Update customers also viewed for this product
    const alsoViewed = await productTrackingService.getCustomersAlsoViewed(
      productId,
      6
    );
    setCustomersAlsoViewed(alsoViewed);
  }, []);

  const trackProductPurchase = useCallback(async (productId: string) => {
    await productTrackingService.trackProductPurchase(productId);
  }, []);

  const getPersonalizedRecommendations = useCallback(() => {
    return productTrackingService.getPersonalizedRecommendations(8);
  }, []);

  const getSimilarProducts = useCallback((productId: string) => {
    return productTrackingService.getSimilarProducts(productId, 4);
  }, []);

  const toggleTracking = useCallback(() => {
    if (isTrackingEnabled) {
      productTrackingService.disableTracking();
      setIsTrackingEnabled(false);
      clearRecentlyViewed();
    } else {
      productTrackingService.enableTracking();
      setIsTrackingEnabled(true);
    }
  }, [isTrackingEnabled, clearRecentlyViewed]);

  return (
    <ProductTrackingContext.Provider
      value={{
        recentlyViewed,
        addToRecentlyViewed,
        clearRecentlyViewed,
        customersAlsoViewed,
        getPersonalizedRecommendations,
        getSimilarProducts,
        trackProductView,
        trackProductPurchase,
        isTrackingEnabled,
        toggleTracking,
      }}
    >
      {children}
    </ProductTrackingContext.Provider>
  );
};

export const useProductTracking = () => {
  const context = useContext(ProductTrackingContext);
  if (context === undefined) {
    throw new Error(
      "useProductTracking must be used within a ProductTrackingProvider"
    );
  }
  return context;
};

// "use client";

// import { productDummyData } from "@/assets/assets";
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useCallback,
//   useEffect,
// } from "react";

// interface ProductView {
//   productId: string;
//   timestamp: number;
//   category: string;
//   price: number;
//   views: number;
// }

// interface CustomerBehavior {
//   productId: string;
//   views: number;
//   purchases: number;
//   category: string;
//   lastViewed: number;
// }

// interface ProductTrackingContextType {}

// const STORAGE_KEYS = {
//   RECENTLY_VIEWED: "bazaar-recently-viewed",
//   CUSTOMER_BEHAVIOR: "bazaar-customer-behavior",
//   TRACKING_ENABLED: "bazaar-tracking-enabled",
//   USER_PREFERENCES: "bazaar-user-preferences",
// } as const;

// const CONFIG = {
//   MAX_RECENT_VIEWS: 20,
//   BEHAVIOR_HISTORY_DAYS: 30,
//   MIN_VIEWS_FOR_RECOMMENDATION: 2,
//   SIMILARITY_THRESHOLD: 0.6,
// } as const;

// class ProductTrackingService {
//   private isTrackingEnabled = true;

//   constructor() {
//     this.initializeTrackingStatus();
//   }

//   private initializeTrackingStatus() {
//     try {
//       const trackingEnabled = localStorage.getItem(
//         STORAGE_KEYS.TRACKING_ENABLED
//       );

//       this.isTrackingEnabled = trackingEnabled
//         ? JSON.parse(trackingEnabled)
//         : true;
//     } catch (error) {
//       console.warn("Failed to initialize tracking status:", error);
//       this.isTrackingEnabled = true;
//     }
//   }

//   async getRecentlyViewed(): Promise<ProductView[]> {
//     if (!this.isTrackingEnabled) return [];

//     try {
//       const stored = localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED);
//       if (!stored) return [];

//       const views: ProductView[] = JSON.parse(stored);
//       const now = Date.now();
//       const cutoffTime =
//         now - CONFIG.BEHAVIOR_HISTORY_DAYS * 24 * 60 * 60 * 1000;

//       const validViews = views.filter((view) => view.timestamp > cutoffTime);

//       if (validViews.length !== views.length) {
//         await this.saveRecentlyViewed(validViews);
//       }

//       return validViews;
//     } catch (error) {
//       console.error("Error reading recently viewed:", error);
//       return [];
//     }
//   }

//   async addToRecentlyViewed(productId: string): Promise<void> {
//     if (!this.isTrackingEnabled) return;

//     try {
//       const views = await this.getRecentlyViewed();
//       const product = productDummyData.find((p) => p.id === productId);

//       if (!product) return;

//       const filteredViews = views.filter(
//         (view) => view.productId !== productId
//       );

//       const newView: ProductView = {
//         productId,
//         timestamp: Date.now(),
//         category: product.category,
//         price: product.price,
//         views: 1,
//       };

//       const updatedViews = [newView, ...filteredViews].slice(
//         0,
//         CONFIG.MAX_RECENT_VIEWS
//       );

//       await this.saveRecentlyViewed(updatedViews);
//     } catch (error) {}
//   }

//   private async saveRecentlyViewed(views: ProductView[]): Promise<void> {
//     try {
//       localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(views));
//     } catch (error) {
//       console.error("Error saving recently viewed", error);
//     }
//   }

//   async clearRecentlyViewed(): Promise<void> {
//     try {
//       localStorage.removeItem(STORAGE_KEYS.RECENTLY_VIEWED);
//     } catch (error) {
//       console.error("Error clearing recently viewed:", error);
//     }
//   }

//   private async getCustomerBehavior(): Promise<CustomerBehavior[]> {
//     try {
//       const stored = localStorage.getItem(STORAGE_KEYS.CUSTOMER_BEHAVIOR);
//       if (!stored) return [];

//       const behavior: CustomerBehavior[] = JSON.parse(stored);
//       const now = Date.now();
//       const cutoffTime =
//         now - CONFIG.BEHAVIOR_HISTORY_DAYS * 24 * 60 * 60 * 1000;

//       return behavior.filter((item) => item.lastViewed > cutoffTime);
//     } catch (error) {
//       console.error("Error reading customer behavior:", error);
//       return [];
//     }
//   }

//   private async updateCustomerBehavior(
//     productId: string,
//     action: "view" | "purchase"
//   ): Promise<void> {
//     if (!this.isTrackingEnabled) return;

//     try {
//       const behavior = await this.getCustomerBehavior();
//     } catch (error) {}
//   }
// }

// const ProductTrackingContext = createContext(undefined);

// export const ProductTrackingProvider = () => {
//   return (
//     <div>
//       <p>Product Tracking</p>
//     </div>
//   );
// };
