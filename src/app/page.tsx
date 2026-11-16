import DiscoverBooks from "@/components/DiscoverBooks";
import FAQ from "@/components/FAQ";
import NewArrivals from "@/components/NewArrivals";
import Slider from "@/components/Slider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  // `absolute` bypasses the root template so the home page can never end up
  // with a bare or double-prefixed title (root layout is the leaf layout here).
  title: { absolute: "BookNook | Home" },
};

export default function Home() {
  return (
    <>
      <Slider />
      <NewArrivals />
      <DiscoverBooks />
      <FAQ />
    </>
  );
}
