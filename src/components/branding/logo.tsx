import { FC } from "react";
import { HeartHandshake } from "lucide-react"
import { cn } from "@/lib/utils";

type LogoModel = {
    className?: string;
}

export const Logo: FC<LogoModel> = model => {
    return <div className={cn("flex items-center gap-3 text-white text-lg font-semibold", model.className)}>
        <HeartHandshake className="w-8 h-8"/>
        <p>eLoyalty</p>
    </div>
};

export const LogoIcon: FC<LogoModel> = model => (
    <HeartHandshake className={cn("w-8 h-8 text-black", model.className)}/>
)