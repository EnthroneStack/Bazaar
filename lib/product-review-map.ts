import { productDummyData, reviewData } from "@/assets/assets";
import { StaticImageData } from "next/image";

type ProductsType = typeof productDummyData;
type ReviewsType = typeof reviewData;

interface Review {
  productId: string | number;
  rating: number;
  comment?: string;
  user?: { name: string; avatar: string | StaticImageData };
  createdAt?: string;
}

const mapReviewsToProducts = (products: ProductsType, reviews: ReviewsType) => {
  return products.map((product) => {
    const productReviews = reviews.filter(
      (review: Review) => review.productId === product.id
    );

    return {
      ...product,
      reviews: productReviews,
    };
  });
};

export const productData = mapReviewsToProducts(productDummyData, reviewData);

const calculateAverageRatings = (
  productData: ReturnType<typeof mapReviewsToProducts>
) => {
  return productData.map((product) => {
    const totalRatings = product.reviews.reduce((total, currentValue) => {
      return total + currentValue.rating;
    }, 0);

    const averageRating =
      product.reviews.length > 0 ? totalRatings / product.reviews.length : 0;

    const roundedAverage = Math.round(averageRating * 10) / 10;

    return {
      ...product,
      averageRating: roundedAverage,
    };
  });
};

export const productAverageRatings = calculateAverageRatings(productData);
