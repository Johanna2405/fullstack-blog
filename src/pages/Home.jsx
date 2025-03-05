import Hero from "../components/Hero";
import Subscription from "../components/Subscription";
import MainSection from "../components/MainSection";

const Home = () => {
  return (
    <div>
      <Hero />
      <MainSection />
      <section>
        <Subscription />
      </section>
    </div>
  );
};

export default Home;
