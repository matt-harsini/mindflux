import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "Secure",
    description:
      "Leveraging JWT best practices to prevent hackers from gaining sensitive info.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Create and delete logs",
    description: "View logs from years ago to reminisce your feelings.",
    icon: LockClosedIcon,
  },
  {
    name: "Visualize your data",
    description:
      "Utilizing D3.js to it's fullest potential, display your data through intervals of months or weeks to gain a greater understanding of yourself.",
    icon: ServerIcon,
  },
];

export default function Features() {
  return (
    <div className="overflow-hidden bg-base-100 py-24 sm:py-32 max-w-7xl mx-auto">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid items-center max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-accent">
                Track your mood
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Visualize your data with an interactive calendar and charts
              </p>
              <p className="mt-6 text-lg leading-8 text-white">
                View trends over the past week, month, and year to analyze how
                you felt and why you felt that way.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-white">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-accent"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline text-white/80">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="mx-auto max-w-max">
            <img
              src="./Calendar.png"
              alt="Product screenshot"
              className="w-[30rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[37rem] md:-ml-4 lg:-ml-0 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
