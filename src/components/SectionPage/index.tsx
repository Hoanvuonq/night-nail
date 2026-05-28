"use client";
import { cn } from "@/utils/cn";
import { ReactNode, forwardRef } from "react";

export interface SectionPageProps extends React.HTMLAttributes<HTMLElement> {
    children: ReactNode;
    className?: string;
    id?: string;
}

export const SectionPage = forwardRef<HTMLElement, SectionPageProps>(
    ({ children, className, id, ...props }, ref) => {
        return (
            <section ref={ref} id={id} className={cn("max-w-7xl mx-auto px-6 md:px-12 lg:px-18 md:py-10 py-8", className)} {...props}>
                {children}
            </section>
        );
    }
);

SectionPage.displayName = "SectionPage";