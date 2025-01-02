"use client"
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
    song: Song;
    onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({
    song,
    onClick
}) => {
    const imageUrl = useLoadImage(song);

    const handleClick = () => {
        if (onClick) {
            return onClick(song.id);
        }
    } 

    return ( 
        <div 
            onClick={handleClick} 
            className="
                flex 
                item
                gap-x-3 
                cursor-pointer 
                hover:bg-neutral-800/50 
                w-full
                transition 
                p-2 
                rounded-md"
        >
            <div className="
                relative
                rounded-md
                min-h-[48px]
                min-w-[48px]
                overflow-hidden
            ">
                <Image 
                    fill
                    src={imageUrl || '/images/liked.png'}
                    alt="Media item"
                    className="object-cover"
                />
            </div>
            <div className="
                flex
                flex-col
                gap-y-1
                overflow-hidden
            ">
                <p className="text-white truncate">
                    {song.title}
                </p>
                <p className="text-neutral-400 text-sm truncate">
                    {song.artist}
                </p>
            </div>
        </div>
    );
}
 
export default MediaItem;