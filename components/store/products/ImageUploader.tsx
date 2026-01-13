// "use client";

// import { useState, useRef, useEffect } from "react";
// import {
//   Upload,
//   X,
//   Star,
//   ChevronLeft,
//   ChevronRight,
//   GripHorizontal,
// } from "lucide-react";
// import { motion, Reorder } from "framer-motion";
// import { cn } from "@/lib/utils";
// import { toast } from "sonner";

// interface ImageItem {
//   url: string;
//   fileId: string;
//   file?: File;
// }

// interface Props {
//   images: ImageItem[];
//   onImagesChange: (images: ImageItem[]) => void;
//   maxImages?: number;
// }

// export default function ImageUploader({
//   images,
//   onImagesChange,
//   maxImages = 8,
// }: Props) {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const thumbnailContainerRef = useRef<HTMLDivElement>(null);
//   const [previewIndex, setPreviewIndex] = useState<number>(0);
//   const [dragging, setDragging] = useState(false);
//   const [isTouchDragging, setIsTouchDragging] = useState(false);
//   const [touchStartX, setTouchStartX] = useState(0);
//   const [thumbnailScrollLeft, setThumbnailScrollLeft] = useState(0);
//   const [isReordering, setIsReordering] = useState(false);

//   useEffect(() => {
//     const container = thumbnailContainerRef.current;
//     if (!container || images.length === 0 || isReordering) return;

//     const thumbnailWidth = 88;
//     const scrollPos =
//       previewIndex * thumbnailWidth -
//       container.clientWidth / 2 +
//       thumbnailWidth / 2;
//     container.scrollTo({ left: scrollPos, behavior: "smooth" });
//   }, [previewIndex, images.length, isReordering]);

//   const handleUpload = (files: FileList) => {
//     const fileList = Array.from(files);

//     if (images.length + fileList.length > maxImages) {
//       toast.error(`Maximum ${maxImages} images allowed`);
//       return;
//     }

//     const newImages: ImageItem[] = [];
//     fileList.forEach((file) => {
//       if (!file.type.startsWith("image/")) {
//         toast.error(`${file.name} is not an image`);
//         return;
//       }
//       if (file.size > 10 * 1024 * 1024) {
//         toast.error(`${file.name} exceeds 10MB`);
//         return;
//       }
//       newImages.push({
//         url: URL.createObjectURL(file),
//         fileId: crypto.randomUUID(),
//       });
//     });

//     if (newImages.length) {
//       const updated = [...images, ...newImages];
//       onImagesChange(updated);
//       setPreviewIndex(images.length);
//       toast.success(
//         `Added ${newImages.length} image${newImages.length > 1 ? "s" : ""}`
//       );
//     }
//   };

//   const removeImage = (index: number) => {
//     if (images.length === 1) {
//       onImagesChange([]);
//       setPreviewIndex(0);
//       toast.info("Image removed");
//       return;
//     }

//     const newImages = images.filter((_, i) => i !== index);
//     onImagesChange(newImages);

//     if (previewIndex === index) {
//       setPreviewIndex(Math.max(0, index - 1));
//     } else if (previewIndex > index) {
//       setPreviewIndex(previewIndex - 1);
//     }
//     toast.info("Image removed");
//   };

//   const setAsMain = (index: number) => {
//     if (index === 0) return;
//     const newImages = [...images];
//     const [mainImage] = newImages.splice(index, 1);
//     newImages.unshift(mainImage);
//     onImagesChange(newImages);
//     setPreviewIndex(0);
//     toast.success("Set as main image");
//   };

//   const nextImage = () => setPreviewIndex((prev) => (prev + 1) % images.length);
//   const prevImage = () =>
//     setPreviewIndex((prev) => (prev - 1 + images.length) % images.length);

//   const handleTouchStart = (e: React.TouchEvent) => {
//     if (isReordering) return;
//     setTouchStartX(e.touches[0].clientX);
//     setIsTouchDragging(true);
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     if (!isTouchDragging || isReordering) return;

//     const touchX = e.touches[0].clientX;
//     const diff = touchStartX - touchX;

//     if (Math.abs(diff) > 10) {
//       // Swipe threshold
//       const container = thumbnailContainerRef.current;
//       if (container) {
//         const scrollLeft = container.scrollLeft;
//         container.scrollLeft = scrollLeft + diff;
//         setTouchStartX(touchX);
//       }
//     }
//   };

//   const handleTouchEnd = () => {
//     setIsTouchDragging(false);
//   };

//   const handleMouseDown = (e: React.MouseEvent) => {
//     if (isReordering) return;
//     const container = thumbnailContainerRef.current;
//     if (!container) return;

//     setIsTouchDragging(true);
//     setThumbnailScrollLeft(container.scrollLeft);
//     const startX = e.pageX - container.offsetLeft;

//     const handleMouseMove = (e: MouseEvent) => {
//       if (!isTouchDragging || isReordering) return;
//       const x = e.pageX - container.offsetLeft;
//       const walk = (x - startX) * 2;
//       container.scrollLeft = thumbnailScrollLeft - walk;
//     };

//     const handleMouseUp = () => {
//       setIsTouchDragging(false);
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };

//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//   };

//   return (
//     <div className="space-y-4">
//       {/* Upload Bar */}
//       <div
//         onClick={() => inputRef.current?.click()}
//         onDrop={(e) => {
//           e.preventDefault();
//           handleUpload(e.dataTransfer.files);
//           setDragging(false);
//         }}
//         onDragOver={(e) => {
//           e.preventDefault();
//           setDragging(true);
//         }}
//         onDragLeave={() => setDragging(false)}
//         className={cn(
//           "flex items-center justify-between rounded-lg border-2 px-4 py-3 cursor-pointer transition-all duration-200",
//           dragging
//             ? "border-primary bg-primary/5 border-solid"
//             : "border-dashed border-gray-300 hover:border-primary hover:bg-gray-50"
//         )}
//       >
//         <div className="flex items-center gap-3">
//           <div className="p-2 bg-primary/10 rounded-lg">
//             <Upload className="h-5 w-5 text-primary" />
//           </div>
//           <div>
//             <p className="font-medium">Upload product images</p>
//             <p className="text-sm text-gray-500">
//               Drag & drop or click to browse • {images.length}/{maxImages}
//             </p>
//           </div>
//         </div>
//         <span className="text-primary font-semibold">Browse</span>

//         <input
//           ref={inputRef}
//           type="file"
//           accept="image/*"
//           multiple
//           hidden
//           onChange={(e) => {
//             if (e.target.files) handleUpload(e.target.files);
//             e.target.value = "";
//           }}
//         />
//       </div>

//       {images.length > 0 && (
//         <div className="space-y-4">
//           <div className="relative bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center min-h-[300px] max-h-[500px]">
//             <motion.img
//               key={images[previewIndex]?.fileId}
//               src={images[previewIndex]?.url}
//               alt={`Preview ${previewIndex + 1}`}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.2 }}
//               className="max-w-full max-h-full object-contain"
//               style={{ maxHeight: "500px" }}
//             />

//             {images.length > 1 && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
//                 >
//                   <ChevronLeft className="h-5 w-5" />
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
//                 >
//                   <ChevronRight className="h-5 w-5" />
//                 </button>
//                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//                   {images.map((img, i) => (
//                     <button
//                       key={img.fileId}
//                       onClick={() => setPreviewIndex(i)}
//                       className={cn(
//                         "w-2 h-2 rounded-full transition-all",
//                         i === previewIndex ? "bg-white" : "bg-white/50"
//                       )}
//                     />
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>

//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <p className="text-sm font-medium">
//                 Drag to reorder • Click to preview
//               </p>
//               {images[0]?.fileId !== images[previewIndex]?.fileId && (
//                 <button
//                   onClick={() => setAsMain(previewIndex)}
//                   className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
//                 >
//                   <Star className="h-4 w-4" />
//                   Set as main
//                 </button>
//               )}
//             </div>

//             <div className="relative">
//               {images.length > 4 && (
//                 <div className="absolute -top-6 right-0 text-xs text-gray-500 flex items-center gap-1">
//                   <GripHorizontal className="h-3 w-3" />
//                   <span className="hidden sm:inline">
//                     Hold & drag to scroll
//                   </span>
//                 </div>
//               )}

//               <div
//                 ref={thumbnailContainerRef}
//                 className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide touch-pan-x"
//                 onTouchStart={handleTouchStart}
//                 onTouchMove={handleTouchMove}
//                 onTouchEnd={handleTouchEnd}
//                 onMouseDown={handleMouseDown}
//                 style={{
//                   cursor: isTouchDragging ? "grabbing" : "grab",
//                   overscrollBehaviorX: "contain",
//                   overscrollBehaviorY: "none",
//                   touchAction: "pan-x pinch-zoom",
//                 }}
//               >
//                 <Reorder.Group<ImageItem>
//                   axis="x"
//                   values={images}
//                   onReorder={onImagesChange}
//                   className="flex gap-2"
//                   onDragStart={() => setIsReordering(true)}
//                   onDragEnd={() => setIsReordering(false)}
//                 >
//                   {images.map((img, index) => (
//                     <Reorder.Item
//                       key={img.fileId}
//                       value={img}
//                       className={cn(
//                         "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 select-none touch-none",
//                         index === 0
//                           ? "border-primary border-2"
//                           : index === previewIndex
//                           ? "border-gray-400"
//                           : "border-gray-200",
//                         isTouchDragging && "cursor-grabbing"
//                       )}
//                       dragSnapToOrigin={false}
//                       dragTransition={{
//                         bounceStiffness: 600,
//                         bounceDamping: 20,
//                       }}
//                       dragElastic={0.1}
//                       dragConstraints={{
//                         top: 0,
//                         bottom: 0,
//                         left: -50,
//                         right: 50,
//                       }}
//                       whileDrag={{
//                         scale: 1.05,
//                         zIndex: 50,
//                         boxShadow:
//                           "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
//                       }}
//                       style={{
//                         position: "relative",
//                       }}
//                       onClick={(e) => {
//                         if (!isTouchDragging && !isReordering) {
//                           setPreviewIndex(index);
//                         }
//                       }}
//                     >
//                       <img
//                         src={img.url}
//                         className="w-full h-full object-cover pointer-events-none"
//                         draggable="false"
//                         alt={`Thumbnail ${index + 1}`}
//                       />

//                       {index === 0 && (
//                         <div className="absolute top-1 left-1 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded pointer-events-none">
//                           Main
//                         </div>
//                       )}

//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           removeImage(index);
//                         }}
//                         className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 z-10"
//                         style={{
//                           pointerEvents: isReordering ? "none" : "auto",
//                         }}
//                       >
//                         <X className="h-3 w-3" />
//                       </button>
//                     </Reorder.Item>
//                   ))}
//                 </Reorder.Group>

//                 {images.length < maxImages && (
//                   <button
//                     onClick={() => inputRef.current?.click()}
//                     className="flex-shrink-0 w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary flex flex-col items-center justify-center transition-colors"
//                     style={{ pointerEvents: isReordering ? "none" : "auto" }}
//                   >
//                     <Upload className="h-5 w-5 text-gray-400" />
//                     <span className="text-xs mt-1 text-gray-500">Add</span>
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {images.length === 0 && (
//         <div className="text-center py-8 text-gray-500 text-sm space-y-1">
//           <p>
//             💡 <strong>Pro tip:</strong> First image is the main product display
//           </p>
//           <p>
//             • Show multiple angles • Use high-quality images • Max 10MB each
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

/* =======================
   TYPES
   ======================= */
export interface ImageItem {
  fileId: string;
  file: File;
  url: string; // ObjectURL preview
}

interface Props {
  images: ImageItem[];
  onImagesChange: (images: ImageItem[]) => void;
  maxImages?: number;
}

/* =======================
   COMPONENT
   ======================= */
export default function ImageUploader({
  images,
  onImagesChange,
  maxImages = 8,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const [previewIndex, setPreviewIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [isTouchDragging, setIsTouchDragging] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [thumbnailScrollLeft, setThumbnailScrollLeft] = useState(0);
  const [isReordering, setIsReordering] = useState(false);

  /* =======================
     CLEANUP OBJECT URLS
     ======================= */
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, [images]);

  /* =======================
     AUTO SCROLL THUMBNAILS
     ======================= */
  useEffect(() => {
    const container = thumbnailContainerRef.current;
    if (!container || images.length === 0 || isReordering) return;

    const thumbnailWidth = 88;
    const scrollPos =
      previewIndex * thumbnailWidth -
      container.clientWidth / 2 +
      thumbnailWidth / 2;

    container.scrollTo({ left: scrollPos, behavior: "smooth" });
  }, [previewIndex, images.length, isReordering]);

  /* =======================
     IMAGE SELECTION (NO UPLOAD)
     ======================= */
  const handleUpload = (files: FileList) => {
    const selected = Array.from(files);

    if (images.length + selected.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    const validImages: ImageItem[] = [];

    for (const file of selected) {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image`);
        continue;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 10MB`);
        continue;
      }

      validImages.push({
        fileId: crypto.randomUUID(),
        file,
        url: URL.createObjectURL(file),
      });
    }

    if (!validImages.length) return;

    onImagesChange([...images, ...validImages]);
    setPreviewIndex(images.length);
  };

  /* =======================
     IMAGE ACTIONS
     ======================= */
  const removeImage = (index: number) => {
    URL.revokeObjectURL(images[index].url);

    const updated = images.filter((_, i) => i !== index);
    onImagesChange(updated);

    if (previewIndex >= index) {
      setPreviewIndex(Math.max(0, previewIndex - 1));
    }

    toast.info("Image removed");
  };

  const nextImage = () => {
    if (!images.length) return;
    setPreviewIndex((p) => (p + 1) % images.length);
  };

  const prevImage = () => {
    if (!images.length) return;
    setPreviewIndex((p) => (p - 1 + images.length) % images.length);
  };

  /* =======================
     TOUCH / MOUSE SCROLL
     ======================= */
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isReordering) return;
    setTouchStartX(e.touches[0].clientX);
    setIsTouchDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouchDragging || isReordering) return;

    const diff = touchStartX - e.touches[0].clientX;
    if (Math.abs(diff) > 10) {
      thumbnailContainerRef.current!.scrollLeft += diff;
      setTouchStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => setIsTouchDragging(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isReordering) return;

    const container = thumbnailContainerRef.current;
    if (!container) return;

    setIsTouchDragging(true);
    setThumbnailScrollLeft(container.scrollLeft);

    const startX = e.pageX - container.offsetLeft;

    const onMove = (e: MouseEvent) => {
      if (!isTouchDragging || isReordering) return;
      const x = e.pageX - container.offsetLeft;
      container.scrollLeft = thumbnailScrollLeft - (x - startX) * 2;
    };

    const onUp = () => {
      setIsTouchDragging(false);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  /* =======================
     RENDER
     ======================= */
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
          "flex items-center justify-between rounded-lg border-2 px-4 py-3 cursor-pointer transition-all",
          dragging
            ? "border-primary bg-primary/5"
            : "border-dashed border-muted-foreground/40 hover:border-primary hover:bg-muted"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Upload className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">Upload product images</p>
            <p className="text-sm text-muted-foreground">
              Drag & drop or click • {images.length}/{maxImages}
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

      {/* Preview */}
      {images.length > 0 && (
        <>
          <div className="relative bg-muted rounded-xl min-h-[300px] flex items-center justify-center">
            <motion.img
              key={images[previewIndex].fileId}
              src={images[previewIndex].url}
              className="max-h-[500px] object-contain"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full"
                >
                  <ChevronRight />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          <div
            ref={thumbnailContainerRef}
            className="flex gap-2 overflow-x-auto pb-2"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
          >
            <Reorder.Group
              axis="x"
              values={images}
              onReorder={(imgs) => {
                onImagesChange(imgs);
                setPreviewIndex(0);
              }}
              className="flex gap-2"
              onDragStart={() => setIsReordering(true)}
              onDragEnd={() => setIsReordering(false)}
            >
              {images.map((img, index) => (
                <Reorder.Item
                  key={img.fileId}
                  value={img}
                  className={cn(
                    "relative w-20 h-20 rounded-lg overflow-hidden border-2",
                    index === 0
                      ? "border-primary"
                      : index === previewIndex
                      ? "border-muted-foreground"
                      : "border-border"
                  )}
                  onClick={() => setPreviewIndex(index)}
                >
                  <img
                    src={img.url}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                    className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </button>

                  {index === 0 && (
                    <div className="absolute top-1 left-1 bg-primary text-primary-foreground text-[10px] px-1 rounded">
                      Main
                    </div>
                  )}
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        </>
      )}
    </div>
  );
}
