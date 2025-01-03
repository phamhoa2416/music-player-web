"use client"

import FavoriteButton from "@/components/FavoriteButton"
import MediaItem from "@/components/MediaItem"
import useOnPlay from "@/hooks/useOnPlay"
import { useUser } from "@/hooks/useUser"
import { Song } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface FavoriteContentProps {
    songs: Song[]
}
const FavoriteContent: React.FC<FavoriteContentProps> = ({
    songs
}) => {
    const router = useRouter();
    const { isLoading, user } = useUser();

    const onPlay = useOnPlay(songs);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/")
        }    
    }, [isLoading, user, router]);

    if (songs.length === 0) {
        return (
            <div className="
                flex
                flex-col
                gap-y-2
                w-full
                px-6
                mt-4 
                text-neutral-400
            "> 
                Không có bài hát yêu thích nào
            </div>
        )
    }

    return ( 
        <div className="flex flex-col gap-y-2 w-full p-6">
            {songs.map((song) => (
                <div
                    key={song.id}
                    className="flex items-center gap-x-4 w-full"
                >
                    <div className="flex-1">
                        <MediaItem 
                            onClick={(id: string) => onPlay(id)}
                            song={song}
                        />
                    </div>    
                    <FavoriteButton songId={song.id}/>
                </div>
            ))}
        </div>
     );
}
 
export default FavoriteContent;