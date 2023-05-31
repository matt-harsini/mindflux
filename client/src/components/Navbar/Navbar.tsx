import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar bg-base-300 lg:gap-2 py-0 mb-10">
      <h1 className="hidden xl:font-bold xl:text-xl xl:text-accent xl:ml-4 xl:block lg:absolute left-2">
        mindflux
      </h1>
      <div className="flex flex-1 lg:max-w-[1024px] lg:mx-auto lg:justify-center">
        <NavLink to="/dashboard" className="flex-1">
          <button className="btn w-full bg-base-300 border-none lg:btn-wide text-accent-content h-[90px] rounded-none capitalize">
            <div className="block lg:hidden">
              <span className="text-xl text-primary-content fa-solid fa-house" />
            </div>
            <span className="hidden lg:block text-lg">Home</span>
          </button>
        </NavLink>
        <NavLink to="/dashboard/calendar" className="flex-1">
          <button className="btn w-full bg-base-300 border-none lg:btn-wide text-accent-content h-[90px] rounded-none capitalize">
            <div className="block lg:hidden">
              <span className="text-xl text-primary-content fa-solid fa-calendar-lines" />
            </div>
            <span className="hidden lg:block text-lg">Calendar</span>
          </button>
        </NavLink>
        <NavLink to="/dashboard/log" className="flex-1">
          <button className="btn w-full bg-base-300 border-none lg:btn-wide text-accent-content h-[90px] rounded-none capitalize">
            <div className="block lg:hidden">
              <span className="text-xl text-primary-content fa-solid fa-feather-pointed" />
            </div>
            <span className="hidden lg:block text-lg">Log</span>
          </button>
        </NavLink>
        <NavLink to="/dashboard/settings" className="flex-1">
          <button className="btn w-full bg-base-300 border-none lg:btn-wide text-accent-content h-[90px] rounded-none capitalize">
            <div className="block lg:hidden">
              <span className="text-xl text-primary-content fa-solid fa-gear" />
            </div>
            <span className="hidden lg:block text-lg">settings</span>
          </button>
        </NavLink>
      </div>
    </nav>
  );
}
