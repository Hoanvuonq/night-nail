import Link from "next/link";

export const SocialIcon = ({ href, children, bg, size = "w-8 h-8" }: any) => (
  <Link
    href={href}
    className={`${size} ${bg} rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg`}
  >
    {children}
  </Link>
);