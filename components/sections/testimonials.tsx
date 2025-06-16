import Image from "next/image";

import { testimonials } from "@/config/landing";
import { HeaderSection } from "@/components/shared/header-section";

export default function Testimonials() {
  return (
    <section>
      <div className="container flex flex-col py-32 max-w-6xl gap-10 sm:gap-y-16">
        <HeaderSection
          label="Testimonials"
          title="What our clients are sharing."
          subtitle="Discover the glowing feedback from our delighted customers
            worldwide."
        />

        <div className="gap-5 column-1 lg:columns-3 md:columns-2 space-y-5">
          {testimonials.map((item) => (
            <div className="break-inside-avoid" key={item.name}>
              <div className="bg-muted/25 rounded-xl border relative">
                <div className="flex flex-col px-4 py-5 sm:p-6">
                  <div>
              <div className="flex mb-4 items-center gap-3 relative">
  <span className="inline-flex rounded-full items-center justify-center overflow-hidden border relative shrink-0 size-16">
    <Image
      src={item.image}
      alt={item.name}
      width={50}
      height={50}
      className="rounded-full object-cover"
    />
  </span>
                      <div>
                        <p className="text-sm text-foreground font-semibold">
                          {item.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.job}
                        </p>
                      </div>
                    </div>
                    <q className="text-muted-foreground">{item.review}</q>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
