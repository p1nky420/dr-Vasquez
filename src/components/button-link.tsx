import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
};

const styles = {
  primary:
    "border-gold/80 bg-gold text-graphite shadow-[0_0_40px_rgba(184,155,94,0.18)] hover:-translate-y-0.5 hover:bg-ivory",
  secondary:
    "border-ivory/20 bg-ivory/6 text-ivory hover:-translate-y-0.5 hover:border-gold/60 hover:bg-ivory/10",
  ghost:
    "border-transparent bg-transparent text-steel hover:text-ivory hover:border-gold/30",
};

export function ButtonLink({
  children,
  href,
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  const classes = `inline-flex min-h-12 items-center justify-center rounded-sm border px-5 py-3 text-sm font-semibold tracking-[0.04em] transition duration-300 ${styles[variant]} ${className}`;

  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a className={classes} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href} {...props}>
      {children}
    </Link>
  );
}
