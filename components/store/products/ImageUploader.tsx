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

import { useRef, useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { Reorder } from "framer-motion";
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
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex >= images.length) {
      setActiveIndex(0);
    }
  }, [images, activeIndex]);

  const upload = (files: FileList) => {
    const list = Array.from(files);

    if (images.length + list.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    const urls = list
      .filter((f) => f.type.startsWith("image/") && f.size <= 10 * 1024 * 1024)
      .map((f) => URL.createObjectURL(f));

    if (!urls.length) return;

    onImagesChange([...images, ...urls]);
    toast.success("Image added");
  };

  const remove = (index: number) => {
    const next = images.filter((_, i) => i !== index);
    onImagesChange(next);
    if (activeIndex === index) setActiveIndex(0);
  };

  return (
    <div className="space-y-3">
      {/* Upload bar */}
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={(e) => {
          e.preventDefault();
          upload(e.dataTransfer.files);
        }}
        onDragOver={(e) => e.preventDefault()}
        className="flex items-center justify-between rounded-lg border border-dashed px-3 py-2 text-sm cursor-pointer hover:border-primary"
      >
        <span className="flex items-center gap-2 text-muted-foreground">
          <Upload className="h-4 w-4" />
          {images.length}/{maxImages} images
        </span>
        <span className="text-primary font-medium">Browse</span>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => {
            if (e.target.files) upload(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {/* Preview */}
      {images.length > 0 && (
        <div className="rounded-lg border bg-muted aspect-video overflow-hidden">
          <img
            src={images[activeIndex]}
            className="h-full w-full object-contain"
            alt="Preview"
          />
        </div>
      )}

      {/* Thumbnails (horizontal + reorder) */}
      {images.length > 0 && (
        <Reorder.Group
          axis="x"
          values={images}
          onReorder={(newOrder) => {
            onImagesChange(newOrder);
            setActiveIndex(Math.min(activeIndex, newOrder.length - 1));
          }}
          className="flex gap-2 overflow-x-auto pb-1"
        >
          {images.map((img, index) => (
            <Reorder.Item
              key={img}
              value={img}
              whileDrag={{ scale: 1.05 }}
              className={cn(
                "relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden border cursor-pointer",
                index === activeIndex ? "border-primary" : "border-border"
              )}
              onClick={() => setActiveIndex(index)}
            >
              <img src={img} className="h-full w-full object-cover" alt="" />

              {/* Delete icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  remove(index);
                }}
                className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1"
              >
                <X className="h-3 w-3" />
              </button>
            </Reorder.Item>
          ))}

          {/* Add more */}
          {images.length < maxImages && (
            <button
              onClick={() => inputRef.current?.click()}
              className="h-20 w-20 flex-shrink-0 rounded-md border border-dashed flex items-center justify-center"
            >
              <Upload className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </Reorder.Group>
      )}
    </div>
  );
}
