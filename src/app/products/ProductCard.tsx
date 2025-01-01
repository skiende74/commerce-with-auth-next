"use client";
import Image from "next/image";
import { ReactNode } from "react";

type Props = {
  title: string;
  image: string;
  description?: string;
};

const ProductCard = ({
  title,
  image,
  description,
  children,
  onClick,
}: Props & { children?: ReactNode; onClick?: () => void }) => {
  return (
    <li
      className="card card-compact w-90 bg-base-100 shadow-xl"
      onClick={onClick ?? (() => {})}
    >
      <figure className="relative h-60">
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
          }}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {children}
    </li>
  );
};

export default ProductCard;
