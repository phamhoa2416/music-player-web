import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className, 
    children,
    disabled,
    type = "button",
    ...props
}, ref) => {
    return (
        <button type={type} 
                className={twMerge(`w-full rounded-full bg-purple-500 border border-transparent px-4 py-3 disabled:cursor-not-allowed
                                                disable: opacity-50 text-black font-bold hover:opacity-75 transition whitespace-nowrap`, className)}
                disabled={disabled}
                ref={ref}
                {...props}
        >
            {children}
        </button>
    )
})

Button.displayName = "Button"

export default Button;