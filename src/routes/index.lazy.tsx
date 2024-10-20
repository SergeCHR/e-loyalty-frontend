import HeroSection from "@/components/layout/hero-section";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: MainPage,
});

export function MainPage() {
  return <HeroSection/>
}
