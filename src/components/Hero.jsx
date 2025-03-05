import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="flex flex-col gap-8 min-h-screen bg-[linear-gradient(to_top,rgb(30,35,42),transparent),url('https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat bg-top pt-12 justify-start items-center">
      <h1 className="font-Snippet text-5xl text-lightGreen uppercase tracking-wider text-center px-10">
        Explore the lands beyond
      </h1>
      <Link to={"/posts/create"}>
        <button className="px-4 py-2 rounded-2xl border border-darkGreen hover:border-orange hover:text-orange text-lg  text-darkGreen font-extralight uppercase tracking-widest">
          create post
        </button>
      </Link>
    </div>
  );
};

export default Hero;
