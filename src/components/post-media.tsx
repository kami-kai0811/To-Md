"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { postMedia } from "@/config/post-media";

export function PostMedia() {
  return (
    <div className="flex items-center">
      <nav className="relative z-10">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="cursor-pointer">
                投稿メディア
              </NavigationMenuTrigger>
              <NavigationMenuContent className="">
                {postMedia.map((navItem, index) => {
                  return (
                    <NavigationMenuLink
                      key={index}
                      href={navItem.href}
                      className={"px-16 font-bold"}
                    >
                      {navItem.name}
                    </NavigationMenuLink>
                  );
                })}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </div>
  );
}
