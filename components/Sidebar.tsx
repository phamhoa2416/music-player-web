"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { MdOutlineQueueMusic } from "react-icons/md";
import { FiMessageCircle } from "react-icons/fi";
import Library from "./Library";
import { Song } from "@/types";

interface SidebarProps {
    children: React.ReactNode;
    songs: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({
    children,
    songs
}) => {
    const pathName = usePathname();
    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: "Trang chủ",
            active: pathName === "/",
            href: "/"
        },
        {
            icon: BiSearch,
            label: "Tìm kiếm",
            active: pathName === "/search",
            href: "/search"
        },
        {
            icon: MdOutlineQueueMusic,
            label: "Thư viện",
            active: pathName === "/library",
            href: "/library"
        },
        {
            icon: FiMessageCircle,
            label: "Trò chuyện",
            active: pathName === "/chat",
            href: "/chat"
        }
    ], [pathName]);

    return (
        <div className="flex h-full">
            <div className="h-full w-[300px] hidden md:flex flex-col gap-y-2 bg-black p-2">
                <Box>
                    <div className="flex flex-col gap-y-4 px-5 py-4">
                        {routes.map((item) => (
                            <SidebarItem 
                                key={item.label}
                                {...item}
                            />
                        ))}
                    </div>
                </Box>
                <Box className="overflow-y-auto h-full">
                    <Library songs={songs} />
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    );
}

export default Sidebar;