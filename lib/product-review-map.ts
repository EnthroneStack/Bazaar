// import { productDummyData, reviewData } from "@/assets/assets";
// import { StaticImageData } from "next/image";

// type ProductsType = typeof productDummyData;
// type ReviewsType = typeof reviewData;

// interface Review {
//   productId: string | number;
//   rating: number;
//   comment?: string;
//   user?: { name: string; avatar: string | StaticImageData };
//   createdAt?: string;
// }

// const mapReviewsToProducts = (products: ProductsType, reviews: ReviewsType) => {
//   return products.map((product) => {
//     const productReviews = reviews.filter(
//       (review: Review) => review.productId === product.id
//     );

//     return {
//       ...product,
//       reviews: productReviews,
//     };
//   });
// };

// export const productData = mapReviewsToProducts(productDummyData, reviewData);

// const calculateAverageRatings = (
//   productData: ReturnType<typeof mapReviewsToProducts>
// ) => {
//   return productData.map((product) => {
//     const totalRatings = product.reviews.reduce((total, currentValue) => {
//       return total + currentValue.rating;
//     }, 0);

//     const averageRating =
//       product.reviews.length > 0 ? totalRatings / product.reviews.length : 0;

//     const roundedAverage = Math.round(averageRating * 10) / 10;

//     return {
//       ...product,
//       averageRating: roundedAverage,
//     };
//   });
// };

// export const productAverageRatings = calculateAverageRatings(productData);

import { productDummyData, reviewData } from "@/assets/assets";
import { StaticImageData } from "next/image";

// Define proper interfaces based on your actual data structure
interface Review {
  id: string;
  productId: string;
  rating: number;
  comment: string;
  user: {
    name: string;
    avatar: string | StaticImageData;
  };
  createdAt: string;
}

interface StoreUser {
  id: string;
  name: string;
  email: string;
  image: string | StaticImageData;
}

interface Store {
  id: string;
  userId: string;
  name: string;
  description: string;
  username: string;
  address: string;
  status: string;
  isActive: boolean;
  logo: string | StaticImageData;
  email: string;
  contact: string;
  createdAt: string;
  updatedAt: string;
  user: StoreUser;
}

interface Product {
  id: string;
  name: string;
  description: string;
  mrp: number;
  price: number;
  images: Array<string | StaticImageData>;
  category: string;
  storeId: string;
  inStock: boolean;
  store: Store;
  createdAt: string;
  updatedAt: string;
}

interface ProductWithReviews extends Product {
  reviews: Review[];
}

interface ProductWithAverageRating extends ProductWithReviews {
  averageRating: number;
}

const mapReviewsToProducts = (
  products: Product[],
  reviews: Review[]
): ProductWithReviews[] => {
  return products.map((product) => {
    const productReviews = reviews.filter(
      (review) => review.productId === product.id
    );

    return {
      ...product,
      reviews: productReviews,
    };
  });
};

export const productData = mapReviewsToProducts(productDummyData, reviewData);

const calculateAverageRatings = (
  productData: ProductWithReviews[]
): ProductWithAverageRating[] => {
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
