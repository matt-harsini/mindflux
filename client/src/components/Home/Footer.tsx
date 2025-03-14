/* eslint-disable @typescript-eslint/no-explicit-any */
const navigation = {
  main: [
    {
      name: "Linkedin",
      href: "https://www.linkedin.com/in/matthew-kim-667392206",
    },
    { name: "GitHub", href: "https://github.com/matt-harsini" },
    { name: "Portfolio", href: "https://matthew-dev.vercel.app" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-base-100">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav
          className="-mb-6 flex flex-col sm:flex-row items-center justify-center gap-x-12"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <a
                href={item.href}
                className="text-sm leading-6 text-white hover:text-"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>

        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; 2023 Matthew Kim, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
