"use client";
import { cn } from "@/utils/cn";

interface ButtonProps {
    label?: string;
}

const Button = ({label}: ButtonProps) => {
    const goldGradientStyle = {
    backgroundImage:
      "linear-gradient(160deg, #e7aa51 0%, #ffe499 30%, #8d5a1b 60%, #e7aa51 80%, #ac7031 100%)",
  };
  return (
    <button
            style={goldGradientStyle}
            className={cn(
                "px-6 py-3 cursor-pointer",
                "rounded-full text-black", 
                "font-bold text-xl",
                "flex items-center gap-1",
                "shimmer-effect",
                "shadow-lg shadow-yellow-500/50",
                "transition duration-300 hover:scale-[1.02] transform"
            )}
        >
            {label}
            <span className="ml-1 text-xl leading-none">›</span>
        </button>
  )
}

export default Button