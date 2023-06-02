export default function Settings() {
  return (
    <main className="flex flex-col max-w-[1320px] mx-auto gap-10 px-6 mb-4">
      <h3 className="mx-auto lg:mx-0 text-primary-content text-4xl font-bold">
        Settings
      </h3>
      <form className="flex flex-col gap-3">
        <div className="lg:max-w-[70%] flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label className="text-primary-content" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              className="input bg-base-200 input-bordered text-primary-content"
              type="text"
            />
          </div>
        </div>
        <div className="divider" />
        <div className="lg:max-w-[70%] flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label className="text-primary-content" htmlFor="first-name">
              First Name
            </label>
            <input
              id="first-name"
              className="input bg-base-200 input-bordered text-primary-content"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-primary-content" htmlFor="last-name">
              Last Name
            </label>
            <input
              id="last-name"
              className="input bg-base-200 input-bordered text-primary-content"
              type="text"
            />
          </div>
        </div>
        <div className="divider" />
        <div className="lg:max-w-[70%] flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label className="text-primary-content" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="input bg-base-200 input-bordered text-primary-content"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-primary-content" htmlFor="phone-number">
              Phone Number
            </label>
            <input
              id="phone-number"
              className="input bg-base-200 input-bordered text-primary-content"
              type="text"
            />
          </div>
        </div>
      </form>
      <button type="button" className="btn btn-secondary self-center">
        log out
      </button>
    </main>
  );
}
