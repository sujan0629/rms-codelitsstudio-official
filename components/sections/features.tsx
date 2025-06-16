import { features } from "@/config/landing";
import { HeaderSection } from "@/components/shared/header-section";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default function Features() {
  return (
    <section>
      <div className="pb-6 pt-28">
        <MaxWidthWrapper>
          <HeaderSection
            label="Features"
            title="Discover all features."
            subtitle="Explore a complete set of features to streamline operations, boost customer satisfaction, and grow your restaurant business effortlessly."
          />

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = Icons[feature.icon || "nextjs"];
              return (
                <div
                  key={feature.title}
                  className="group relative overflow-hidden rounded-2xl border bg-background p-5 md:p-8"
                >
                  {/* KEEP original hover effect */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 aspect-video -translate-y-1/2 rounded-full border bg-gradient-to-b from-purple-500/80 to-white opacity-25 blur-2xl duration-300 group-hover:-translate-y-1/4 dark:from-white dark:to-white dark:opacity-5 dark:group-hover:opacity-10"
                  />

                  <div className="relative flex flex-col">
                    {/* icon + title row */}
                    <div className="flex items-center gap-4">
                      <Icon className="size-6 text-primary" />
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                    </div>

                    {/* separator */}
                    <hr className="my-4 border-t border-muted" />

                    {/* description */}
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  );
}
