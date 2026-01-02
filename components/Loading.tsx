"use client";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6 animate-in fade-in">
        {/* Brand Loader */}
        <div className="relative h-2 w-40 overflow-hidden rounded-full bg-primary/20">
          <div className="absolute left-0 top-0 h-full w-1/2 rounded-full bg-primary animate-loading-bar" />
        </div>

        {/* Dots */}
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary animate-bounce delay-0" />
          <span className="h-2 w-2 rounded-full bg-primary animate-bounce delay-150" />
          <span className="h-2 w-2 rounded-full bg-primary animate-bounce delay-300" />
        </div>

        {/* Text */}
        <p className="text-sm font-medium text-muted-foreground tracking-wide">
          Loading…
        </p>
      </div>
    </div>
  );
}
