import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="flex flex-col gap-8 min-h-3/4 bg-[#FEFDF8] pt-12 justify-center items-center">
      <h1 className="font-Snippet text-5xl text-lightGreen uppercase tracking-wider text-center px-10">
        Explore the lands beyond
      </h1>
      <Link to={"/posts/create"}>
        <button className="btn bg-darkGreen hover:bg-orange border-none text-lg font-Paytone text-lightBeige font-extralight lowercase tracking-widest">
          create post
        </button>
      </Link>
      <img
        src="https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
    </div>
  );
};

export default Hero;
