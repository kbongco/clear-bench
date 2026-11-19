import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-10 text-center">
        <p className="text-sm font-semibold text-blue-600">404 error</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">Page not found</h1>
        <p className="mt-3 max-w-md text-gray-600">
          The page you are looking for does not exist or is currently in development.
        </p>

        <p className="mt-8 text-sm font-semibold text-gray-700">Here are some useful links:</p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Home
          </Link>
          <Link
            to="/whats-next"
            className="rounded border border-blue-600 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-50"
          >
            What's next
          </Link>
        </div>
      </div>
    </>
  );
}
