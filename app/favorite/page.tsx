import getFavoriteSongs from "@/actions/getFavoriteSongs";
import Header from "@/components/Header";
import Image from "next/image";
import FavoriteContent from "./components/FavoriteContent";

export const revalidate = 0;

const Favorite = async() => {
    const songs = await getFavoriteSongs();

    return ( 
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <Header>
                <div className="mt-20">
                    <div className="
                        flex
                        flex-col
                        md:flex-row
                        items-center
                        gap-x-5
                    ">
                        <div className="
                            relative
                            h-32
                            w-32
                            lg:h-44
                            lg:w-44
                        ">
                            <Image 
                                fill
                                src="/images/liked.png"
                                alt="Collection"
                                className="object-cover"
                            />
                        </div>
                        <div className="
                            flex
                            flex-col
                            gap-y-2mt-4
                            md:mt-0
                        ">
                            <p className="hidden md:block font-semibold text-sm">
                                Playlist
                            </p>
                            <h1 className="text-white text-3xl sm:text-4xl lg:text-6xl font-bold">
                                Bài hát đã thích 
                            </h1>
                            <p className="text-neutral-300 text-sm mt-3 font-semibold md:block">
                                {songs.length} bài hát
                            </p>
                        </div>
                    </div>
                </div>
            </Header>
            <FavoriteContent songs={songs}/>
        </div>
     );
}
 
export default Favorite;