import { MainContentWrapper } from "@/components/wrappers/main-content-wrapper";
import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <div className="bg-noisy bg-primary w-screen h-screen">
      <MainContentWrapper>
        <div className="text-center">
          <h1 className="mb-4 text-9xl font-semibold text-white">404</h1>
          <h2 className="mb-4 text-4xl font-semibold text-white">
            You have discovered a secret place
          </h2>
          <p className="mb-4 text-lg text-gray-300">
            Unfortunately, this is only a 404 page. You may have mistyped the
            address, or the page has been moved to another URL.
          </p>
          <div className="animate-bounce">
            <svg
              className="mx-auto h-16 w-16 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </div>
          <p className="mt-4 text-xl text-gray-300">
            Let's get you back{" "}
            <Link to="/" className="text-white underline">
              home
            </Link>
            .
          </p>
        </div>
      </MainContentWrapper>
    </div>
  );
}
