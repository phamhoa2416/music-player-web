"use client"

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext()
    const { onClose, isOpen} = useAuthModal();

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose]);

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    return ( 
        <Modal
            title="Welcome back"
            description="Login to your account"
            isOpen={isOpen}
            onChange={onChange}    
        >
            <Auth
            theme="dark"
            supabaseClient={supabaseClient} 
            appearance={{
                theme: ThemeSupa,
                variables: {
                    default: {
                        colors: {
                            brand: '#404040',
                            brandAccent: '#9c41b5'
                        }
                    }
                }
            }}
            localization={{
                variables: {
                    sign_in: {
                        email_label: "Email hoặc tên người dùng",
                        password_label: "Mật khẩu",
                        email_input_placeholder: "Email hoặc tên người dùng",
                        password_input_placeholder: "Mật khẩu",
                        button_label: "Đăng nhập",
                        social_provider_text: "Tiếp tục bằng {{provider}}",
                        link_text: "Đã có tài khoản? Đăng nhập ngay",
                    },
                    sign_up: {
                        email_label: "Địa chỉ email",
                        password_label: "Mật khẩu",
                        email_input_placeholder: "name@domain.com",
                        password_input_placeholder: "Mật khẩu",
                        button_label: "Tạo tài khoản",
                        social_provider_text: "Tiếp tục bằng {{provider}}",
                        link_text: "Bạn chưa có tài khoản? Đăng ký ngay",
                    },
                    forgotten_password: {
                        link_text: "Quên mật khẩu của bạn?", 
                        email_label: "Địa chỉ email",
                        email_input_placeholder: "Nhập địa chỉ email của bạn",
                        button_label: "Gửi yêu cầu đặt lại mật khẩu",
                    }
                }
            }}
            providers={['google', 'facebook', 'apple', 'spotify']} />
        </Modal>
    );
}
 
export default AuthModal;