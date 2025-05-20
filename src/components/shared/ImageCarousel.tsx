"use client";

import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface ImageCarouselProps {
  images: string[];
  title: string;
}

const ImageCarousel = ({ images, title }: ImageCarouselProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-lg w-full" ref={emblaRef}>
        <div className="flex w-full">
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 relative aspect-[16/11] w-full"
            >
              <Image
                src={image}
                alt={`${title} ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover/card:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              selectedIndex === index
                ? "bg-white"
                : "bg-white/50 hover:bg-white/75"
            )}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
