"use client"

import uniqid from "uniqid"
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal"
import Input from "./Input";
import Button from "./Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false)
    const uploadModal = useUploadModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            artist: '',
            title: '',
            song: null,
            image: null
        }
    })

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);
            
            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if (!imageFile || !songFile || !user) {
                toast.error("Vui lòng điền đầy đủ thông tin");
                return;
            }

            const uniqueId = uniqid();

            const {
                data: songData,
                error: songError,

            } = await supabaseClient.storage.from('songs').upload(`song-${values.title}-${uniqueId}`, songFile, {
                cacheControl: '3600',
                upsert: false
            });

            if (songError) {
                setIsLoading(false);
                return toast.error("Tải bài hát không thành công");
            }

            const {
                data: imageData,
                error: imageError,
            } = await supabaseClient.storage.from('images').upload(`image-${values.title}-${uniqueId}`, imageFile, {
                cacheControl: '3600',
                upsert: false
            });

            if (imageError) {
                setIsLoading(false);
                return toast.error("Tải hình ảnh không thành công");
            }

            const {
                error: supabaseError,
            } = await supabaseClient.from('songs').insert({
                user_id: user.id,
                title: values.title,
                artist: values.artist,
                image_path: imageData.path,
                song_path: songData.path,
            });

            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success("Đăng tải bài hát thành công");
            reset()
            uploadModal.onClose();
        } catch {
            toast.error("Tải bài hát không thành công")
        } finally {
            setIsLoading(false);
        }
    }

    return ( 
        <Modal
            title="Đăng tải bài hát mới"
            description="Thêm thông tin bài hát"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-3" 
            >
                <p className="pb-1"> Tên bài hát </p>
                <Input
                    id = "title" 
                    disabled={isLoading}
                    {...register('title', { required: true})}
                    placeholder="Tên bài hát"
                />
                <p> Tên nghệ sĩ </p>
                <Input
                    id = "artist" 
                    disabled={isLoading}
                    {...register('artist', { required: true})}
                    placeholder="Tên nghệ sĩ"
                />
                <div>
                    <div className="pb-1">
                        Select a song file
                    </div>
                        <Input
                        id ="song"
                        type="file" 
                        disabled={isLoading}
                        accept=".mp3,.wav"
                        {...register('song', { required: true})}
                        />
                </div>
                <div>
                    <div className="pb-1">
                        Select an image
                    </div>
                        <Input
                        id ="image"
                        type="file" 
                        disabled={isLoading}
                        accept="image/*"
                        {...register('image', { required: true})}
                        />
                </div>
                <Button disabled={isLoading} type="submit" className="">
                    <div className="text-white flex flex-col">
                        Thêm bài hát
                    </div>
                </Button>
            </form>   
        </Modal>
     );
}
 
export default UploadModal;