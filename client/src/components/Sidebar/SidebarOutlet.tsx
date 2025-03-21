import { Fragment, useState, Suspense } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { NavLink, Outlet } from "react-router-dom";
import { Loading } from "..";
import { useAuthContext } from "../../hooks/useAuthContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: ChartPieIcon, current: false },
  {
    name: "Calendar",
    href: "/dashboard/calendar",
    icon: CalendarIcon,
    current: false,
  },
  {
    name: "Log",
    href: "/dashboard/log",
    icon: DocumentDuplicateIcon,
    current: false,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Cog6ToothIcon,
    current: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SidebarOutlet() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { dispatch: authDispatch } = useAuthContext();
  const handleLogout = () => {
    localStorage.removeItem("token");
    authDispatch({
      type: "LOGOUT",
    });
  };

  return (
    <div className="mx-auto">
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-base-200 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-end relative">
                      <span className="text-3xl text-accent text-center w-full">
                        mindflux
                      </span>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <NavLink
                                  end
                                  to={item.href}
                                  onClick={() => setSidebarOpen(false)}
                                  className={({ isActive }) =>
                                    `group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                                      isActive
                                        ? "bg-primary text-white"
                                        : "text-indigo-200 hover:text-white hover:bg-primary"
                                    }`
                                  }
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-white"
                                        : "text-indigo-200 group-hover:text-white",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                      <button
                        onClick={handleLogout}
                        className="btn btn-accent w-full self-center"
                      >
                        log out
                      </button>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-base-200 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-end relative">
              <span className="text-3xl text-accent text-center w-full">
                mindflux
              </span>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <NavLink
                          end
                          to={item.href}
                          className={({ isActive }) =>
                            `group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                              isActive
                                ? "bg-primary text-white"
                                : "text-indigo-200 hover:text-white hover:bg-primary"
                            }`
                          }
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-white"
                                : "text-indigo-200 group-hover:text-white",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
              <button
                onClick={handleLogout}
                className="btn btn-accent w-full self-center"
              >
                log out
              </button>
            </nav>
          </div>
        </div>
        <div className="lg:pl-72 h-screen">
          <div className="mb-5 bg-base-200 lg:bg-transparent sticky lg:absolute top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon
                className="h-6 w-6 text-primary-content"
                aria-hidden="true"
              />
            </button>
            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />
          </div>

          <main className="mx-auto h-[calc(100vh-(64px+1.25rem))]">
            <div className="px-4 sm:px-6 lg:px-8 h-full">
              <Suspense fallback={<Loading height="h-screen" />}>
                <Outlet />
              </Suspense>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
