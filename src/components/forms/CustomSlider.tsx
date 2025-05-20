/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";
// import Image from "next/image";
// import React from "react";

const CustomSlider = ({ images }: { images?: any }) => {
  // const [sliderRef] = useKeenSlider(
  //   {
  //     loop: false,
  //   },
  //   [
  //     (slider) => {
  //       let timeout;
  //       let mouseOver = false;
  //       function clearNextTimeout() {
  //         clearTimeout(timeout);
  //       }
  //       function nextTimeout() {
  //         clearTimeout(timeout);
  //         if (mouseOver) return;
  //         timeout = setTimeout(() => {
  //           slider.next();
  //         }, 2000);
  //       }
  //       slider.on("created", () => {
  //         slider.container.addEventListener("mouseover", () => {
  //           mouseOver = true;
  //           clearNextTimeout();
  //         });
  //         slider.container.addEventListener("mouseout", () => {
  //           mouseOver = false;
  //           nextTimeout();
  //         });
  //         nextTimeout();
  //       });
  //       slider.on("dragStarted", clearNextTimeout);
  //       slider.on("animationEnded", nextTimeout);
  //       slider.on("updated", nextTimeout);
  //     },
  //   ]
  // );
  return (
    // <div ref={sliderRef} className=" keen-slider container mx-auto">
    //   {images?.map((image, idx) => (
    //     <div key={idx} className={`keen-slider__slide number-slide${idx + 1}`}>
    //       <Image
    //         className="mx-auto  h-[300px] md:h-[300px] lg:h-[300px] px-3 rounded-3xl"
    //         src={image}
    //         alt=""
    //       />
    //     </div>
    //   ))}
    // </div>
    <div></div>
  );
};

export default CustomSlider;
