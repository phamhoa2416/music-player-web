"use client"

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface FavoriteButtonProps {
    songId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    songId
}) => {
    const router = useRouter();
    const { supabaseClient } = useSessionContext();

    const authModal = useAuthModal();
    const { user } = useUser();

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (!user?.id) {
            return;
        }

        const fetchData = async () => {
            const { data, error } = await supabaseClient
                .from("favorite_songs")
                .select("*")
                .eq("user_id", user.id)
                .eq("song_id", songId)
                .single();

            if (!error && data) {
                setIsFavorite(true);
            }
        };

        fetchData();
    }, [songId, supabaseClient, user?.id]);

    const Icon = isFavorite ? AiFillHeart : AiOutlineHeart;

    const handleFavorite = async () => {
        if (!user) {
            return authModal.onOpen();
        }

        if (isFavorite) {
            const { error } = await supabaseClient
                .from("favorite_songs")
                .delete()
                .eq("user_id", user.id)
                .eq("song_id", songId);

            if (error) {
                toast.error(error.message);
            } else {
                setIsFavorite(false);
            }
        } else {
            const { error } = await supabaseClient
                .from("favorite_songs")
                .insert({
                    user_id: user.id,
                    song_id: songId
                });

            if (error) {
                toast.error(error.message);
            } else {
                setIsFavorite(true);
            }
        }
        router.refresh();
    }    

    return ( 
        <button
            onClick={handleFavorite}
            className="hover:opacity-75 transition"
        >
            <Icon color={isFavorite ? "#cc6ce7" : "white"} size={25}/>
        </button>
    );
}
 
export default FavoriteButton;