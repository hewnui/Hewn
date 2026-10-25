import type { ReactNode } from "react";
import type { CardProps } from "./card.types";
import {
  cardBodyClassName,
  cardClassName,
  cardFooterClassName,
  cardHeaderClassName,
} from "./card.styles";

function CardRoot({ children, className, ...props }: CardProps) {
  return (
    <div data-kp-surface className={cardClassName(className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string | undefined;
}) {
  return <div className={cardHeaderClassName(className)}>{children}</div>;
}

export function CardBody({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string | undefined;
}) {
  return <div className={cardBodyClassName(className)}>{children}</div>;
}

export function CardFooter({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string | undefined;
}) {
  return <div className={cardFooterClassName(className)}>{children}</div>;
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
