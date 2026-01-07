"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

const SUGGESTED_TAGS = [
  "Featured",
  "New Arrival",
  "Best Seller",
  "Clearance",
  "Limited Edition",
  "Seasonal",
  "Premium",
  "Eco-Friendly",
];

export default function TagInput({ tags, onTagsChange }: TagInputProps) {
  const [tagInput, setTagInput] = useState("");

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      onTagsChange([...tags, trimmedTag]);
    }
    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="tags" className="text-sm font-medium">
          Add Tags
        </Label>
        <div className="flex gap-2">
          <Input
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type tag and press Enter or comma"
            className="flex-1 text-sm sm:text-base"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => addTag(tagInput)}
            className="whitespace-nowrap"
          >
            Add Tag
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          Press Enter or comma to add a tag
        </p>
      </div>

      {tags.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Selected Tags</Label>
          <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg min-h-12">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 hover:bg-gray-200 rounded-full"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label className="text-sm font-medium">Suggested Tags</Label>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_TAGS.map((tag) => (
            <Badge
              key={tag}
              variant={tags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => {
                if (tags.includes(tag)) {
                  removeTag(tag);
                } else {
                  addTag(tag);
                }
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
