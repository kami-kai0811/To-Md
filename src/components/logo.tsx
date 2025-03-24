import { siteConfig } from "@/config/site";
import { fontOswald } from "@/fonts";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className: string }) {
  return (
    <h1 className={cn(fontOswald.className, `inline ${className}`)}>
      {siteConfig.name}
    </h1>
  );
}
