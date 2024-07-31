import Header from "./Header";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function HeroPage() {
  useEffect(() => {
    AOS.init({
      duration: 3000,
    });
  }, []);

  return (
    <div className="container mx-auto">
      <Header />
      <div className="flex mt-24">
        <div className="w-[50%]">
          <div className="my-10 w-[80%] mx-auto space-y-2">
            <h1 className="text-left text-5xl font-semibold">
              Beasiswa Pelatihan untuk Perempuan Indonesian
            </h1>
            <p className="text-sm font-base w-[80%]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Distinctio maxime beatae nobis! Sapiente laborum vitae incidunt
              quam, pariatur, quia repudiandae reiciendis voluptatum alias iusto
              eos molestiae adipisci omnis, et velit.
            </p>
            <div className="flex justify-start pt-5 space-x-5">
              <button className="px-5 py-1 bg-yellow-400 rounded py-4 text-black font-medium">
                Get Started
              </button>
              <button className="px-5 py-1 border border-yellow-400 rounded text-black font-medium">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className="w-[50%]">
          <div className="grid grid-cols-12 h-full w-full gap-5">
            <div
              data-aos="flip-left"
              className="col-span-4 bg row-span-2 rounded-3xl bg-black"
            ></div>
            <div
              data-aos="flip-left"
              className="col-span-4 bg1 row-span-1 rounded-3xl bg-green-600"
            ></div>
            <div
              data-aos="flip-left"
              className="col-span-4 bg5 row-span-2 rounded-3xl bg-red-400"
            ></div>
            <div
              data-aos="flip-left"
              className="col-span-4 bg2 row-span-2 rounded-3xl bg-orange-600"
            ></div>
            <div
              data-aos="flip-left"
              className="col-span-4 bg3 row-span-1 rounded-3xl bg-yellow-600"
            ></div>
            <div
              data-aos="flip-left"
              className="col-span-4 bg4 row-span-1 rounded-3xl bg-orange-200"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
