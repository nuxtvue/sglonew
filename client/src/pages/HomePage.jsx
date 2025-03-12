import MapReg from "@/components/blog/MapReg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <div className="mx-8">
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent className="h-[350px] shadow-xl">
            <CarouselItem>
              <img src="https://s.rbk.ru/v1_companies_s3/media/trademarks/d878fc11-8c0d-47a7-b1f8-229d030f575e.jpg" />
            </CarouselItem>
            <CarouselItem>2</CarouselItem>
            <CarouselItem>3</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div>
        <h1 className="text-center text-xl">Карта районов</h1>
        <MapReg />
      </div>
    </div>
  );
};

export default HomePage;
