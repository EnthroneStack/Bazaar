export type ProductFilterState = {
  search: string;
  categoryId: string | null;
  status: "all" | "published" | "draft" | "out-of-stock";
};
