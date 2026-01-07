// "use client";

// import { useRef, useState } from "react";
// import { Upload, X, Star } from "lucide-react";
// import { motion, Reorder } from "framer-motion";
// import { cn } from "@/lib/utils";
// import { toast } from "sonner";

// interface Props {
//   images: string[];
//   onImagesChange: (images: string[]) => void;
//   maxImages?: number;
// }

// export default function CompactImageUploader({
//   images,
//   onImagesChange,
//   maxImages = 8,
// }: Props) {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [preview, setPreview] = useState<string | null>(null);

//   const upload = (files: FileList) => {
//     const list = Array.from(files);

//     if (images.length + list.length > maxImages) {
//       toast.error(`Max ${maxImages} images allowed`);
//       return;
//     }

//     const urls = list
//       .filter((f) => f.type.startsWith("image/") && f.size <= 10 * 1024 * 1024)
//       .map((f) => URL.createObjectURL(f));

//     if (!urls.length) return;

//     onImagesChange([...images, ...urls]);
//     toast.success("Image added");
//   };

//   const setMain = (index: number) => {
//     if (index === 0) return;
//     const next = [...images];
//     const [picked] = next.splice(index, 1);
//     next.unshift(picked);
//     onImagesChange(next);
//   };

//   const remove = (index: number) => {
//     onImagesChange(images.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="space-y-3">
//       {/* Upload Bar */}
//       <div
//         onClick={() => inputRef.current?.click()}
//         onDrop={(e) => {
//           e.preventDefault();
//           upload(e.dataTransfer.files);
//         }}
//         onDragOver={(e) => e.preventDefault()}
//         className="flex items-center justify-between rounded-lg border border-dashed px-3 py-2 text-sm cursor-pointer hover:border-primary"
//       >
//         <span className="flex items-center gap-2 text-muted-foreground">
//           <Upload className="h-4 w-4" />
//           {images.length}/{maxImages} images
//         </span>
//         <span className="text-primary font-medium">Browse</span>

//         <input
//           ref={inputRef}
//           type="file"
//           accept="image/*"
//           multiple
//           hidden
//           onChange={(e) => {
//             if (e.target.files) upload(e.target.files);
//             e.target.value = "";
//           }}
//         />
//       </div>

//       {/* Thumbnails (Instagram-style reorder) */}
//       {images.length > 0 && (
//         <Reorder.Group
//           axis="x"
//           values={images}
//           onReorder={onImagesChange}
//           className="grid grid-cols-4 gap-2 sm:grid-cols-6"
//         >
//           {images.map((img, index) => (
//             <Reorder.Item
//               key={img}
//               value={img}
//               className={cn(
//                 "relative aspect-square rounded-md overflow-hidden border bg-muted",
//                 index === 0 && "border-primary"
//               )}
//               whileDrag={{ scale: 1.05 }}
//             >
//               <img
//                 src={img}
//                 className="h-full w-full object-cover"
//                 onClick={() => setPreview(img)}
//               />

//               {/* Main Badge */}
//               {index === 0 && (
//                 <span className="absolute top-1 left-1 text-[10px] bg-primary text-white px-1 rounded">
//                   Main
//                 </span>
//               )}

//               {/* Actions */}
//               <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center gap-2">
//                 <button
//                   onClick={() => setMain(index)}
//                   className="bg-white rounded-full p-1"
//                 >
//                   <Star className="h-4 w-4" />
//                 </button>
//                 <button
//                   onClick={() => remove(index)}
//                   className="bg-white rounded-full p-1"
//                 >
//                   <X className="h-4 w-4" />
//                 </button>
//               </div>
//             </Reorder.Item>
//           ))}

//           {/* Add More */}
//           {images.length < maxImages && (
//             <button
//               onClick={() => inputRef.current?.click()}
//               className="aspect-square rounded-md border border-dashed flex items-center justify-center"
//             >
//               <Upload className="h-4 w-4 text-muted-foreground" />
//             </button>
//           )}
//         </Reorder.Group>
//       )}

//       {/* Inline Preview (Mobile-first) */}
//       {preview && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
//           onClick={() => setPreview(null)}
//         >
//           <motion.img
//             src={preview}
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
//           />
//           <button
//             className="absolute top-4 right-4 bg-white rounded-full p-2"
//             onClick={() => setPreview(null)}
//           >
//             <X className="h-4 w-4" />
//           </button>
//         </motion.div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Props {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

export default function CompactImageUploader({
  images,
  onImagesChange,
  maxImages = 8,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewIndex, setPreviewIndex] = useState<number>(0);
  const [dragging, setDragging] = useState(false);

  const handleUpload = (files: FileList) => {
    const fileList = Array.from(files);

    if (images.length + fileList.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    const newUrls: string[] = [];
    fileList.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image`);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 10MB`);
        return;
      }
      newUrls.push(URL.createObjectURL(file));
    });

    if (newUrls.length) {
      const updated = [...images, ...newUrls];
      onImagesChange(updated);
      setPreviewIndex(images.length); // Preview first new image
      toast.success(
        `Added ${newUrls.length} image${newUrls.length > 1 ? "s" : ""}`
      );
    }
  };

  const removeImage = (index: number) => {
    if (images.length === 1) {
      onImagesChange([]);
      setPreviewIndex(0);
      toast.info("Image removed");
      return;
    }

    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);

    if (previewIndex === index) {
      setPreviewIndex(Math.max(0, index - 1));
    } else if (previewIndex > index) {
      setPreviewIndex(previewIndex - 1);
    }
    toast.info("Image removed");
  };

  const setAsMain = (index: number) => {
    if (index === 0) return;
    const newImages = [...images];
    const [mainImage] = newImages.splice(index, 1);
    newImages.unshift(mainImage);
    onImagesChange(newImages);
    setPreviewIndex(0);
    toast.success("Set as main image");
  };

  const nextImage = () => setPreviewIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setPreviewIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="space-y-4">
      {/* Upload Bar */}
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={(e) => {
          e.preventDefault();
          handleUpload(e.dataTransfer.files);
          setDragging(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        className={cn(
          "flex items-center justify-between rounded-lg border-2 px-4 py-3 cursor-pointer transition-all duration-200",
          dragging
            ? "border-primary bg-primary/5 border-solid"
            : "border-dashed border-gray-300 hover:border-primary hover:bg-gray-50"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Upload className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">Upload product images</p>
            <p className="text-sm text-gray-500">
              Drag & drop or click to browse • {images.length}/{maxImages}
            </p>
          </div>
        </div>
        <span className="text-primary font-semibold">Browse</span>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => {
            if (e.target.files) handleUpload(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {/* Preview & Gallery Section */}
      {images.length > 0 && (
        <div className="space-y-4">
          {/* Main Preview */}
          <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
            <img
              src={images[previewIndex]}
              alt={`Preview ${previewIndex + 1}`}
              className="w-full h-full object-contain"
            />

            {/* Preview Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPreviewIndex(i)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        i === previewIndex ? "bg-white" : "bg-white/50"
                      )}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Thumbnail Strip with Drag & Drop */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                Drag to reorder • Click to preview
              </p>
              {images[0] !== images[previewIndex] && (
                <button
                  onClick={() => setAsMain(previewIndex)}
                  className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
                >
                  <Star className="h-4 w-4" />
                  Set as main
                </button>
              )}
            </div>

            <Reorder.Group
              axis="x"
              values={images}
              onReorder={onImagesChange}
              className="flex gap-2 overflow-x-auto pb-2"
            >
              {images.map((img, index) => (
                <Reorder.Item
                  key={img}
                  value={img}
                  className={cn(
                    "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 cursor-move",
                    index === 0
                      ? "border-primary border-2"
                      : index === previewIndex
                      ? "border-gray-400"
                      : "border-gray-200"
                  )}
                  whileDrag={{ scale: 1.05, zIndex: 10 }}
                  onClick={() => setPreviewIndex(index)}
                >
                  <img src={img} className="w-full h-full object-cover" />

                  {/* Main Badge */}
                  {index === 0 && (
                    <div className="absolute top-1 left-1 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded">
                      Main
                    </div>
                  )}

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                    className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        </div>
      )}

      {/* Quick Tips */}
      {images.length === 0 && (
        <div className="text-center py-8 text-gray-500 text-sm space-y-1">
          <p>
            💡 <strong>Pro tip:</strong> First image is the main product display
          </p>
          <p>
            • Show multiple angles • Use high-quality images • Max 10MB each
          </p>
        </div>
      )}
    </div>
  );
}
