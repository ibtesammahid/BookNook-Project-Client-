import DiscoverBooks from "@/components/DiscoverBooks";
import FAQ from "@/components/FAQ";
import NewArrivals from "@/components/NewArrivals";
import Slider from "@/components/Slider";

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
