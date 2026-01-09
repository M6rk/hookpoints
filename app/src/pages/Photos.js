import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const fishDex = [
  { name: "Rainbow Trout", img: "/assets/trout.png", seen: 12, caught: 5 },
  { name: "Bluefin Tuna", img: "", seen: 4, caught: 1 },
  { name: "Clownfish", img: "", seen: 9, caught: 3 },
  { name: "Sockeye Salmon", img: "", seen: 7, caught: 2 },
  { name: "Great White Shark", img: "", seen: 2, caught: 0 },
  { name: "Giant Trevally", img: "", seen: 5, caught: 1 },
  { name: "Mahi Mahi", img: "", seen: 6, caught: 2 },
  { name: "Lionfish", img: "", seen: 8, caught: 4 },
  { name: "Barracuda", img: "", seen: 3, caught: 1 },
  { name: "Emperor Angelfish", img: "", seen: 10, caught: 5 },
];

const Photos = () => {
  const [selected, setSelected] = useState(0);
  const fish = fishDex[selected];
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundColor: "#f5f5f5",
        backgroundImage:
          "linear-gradient(#d9d9d9 3px, transparent 1px), linear-gradient(90deg, #d9d9d9 3px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    >
      {/* Sticky Home button (top-right, outside main) */}
      <div className="fixed top-4 right-4 z-30">
        <button
          onClick={() => navigate("/")}
          aria-label="Go to Home"
          className="inline-flex items-center p-2 transition hover:opacity-75"
        >
          <svg
            viewBox="0 0 32 32"
            width="28"
            height="28"
            fill="none"
            stroke="#585850"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M27,29H5V17H3.235c-1.138,0-1.669-1.419-0.812-2.168L14.131,3.745c1.048-0.993,2.689-0.993,3.737,0l11.707,11.087 C30.433,15.58,29.902,17,28.763,17H27V29z" />
            <path d="M20,29h-8v-6c0-2.209,1.791-4,4-4h0c2.209,0,4,1.791,4,4V29z" />
          </svg>
        </button>
      </div>

      {/* <NavBar transparent={false} /> */}

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-10">
        {/* Left: photo | Right: counters + list */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* Left column: image with full-width top banner */}
          <div className="lg:col-span-3">
            <div className="mb-4">
              <div className="rounded-md bg-white/90 backdrop-blur text-center py-2 border-l-8 border-r-8 border-[#E83030]">
                <span
                  className="text-[#585850] font-bold text-2xl"
                  // style={{ fontFamily: "'Pixelify Sans', sans-serif" }}
                >
                  {fish.name}
                </span>
              </div>
            </div>
            <div
              className="relative"
              style={{
                backgroundImage: "url('/assets/pokeballbg.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
              }}
            >
              <span className="justify-center items-center flex mt-4">
                <span>
                  <img
                    src={fish.img}
                    alt={fish.name}
                    className="w-full object-cover lg:h-96 h-60"
                  />
                </span>
              </span>
            </div>
               {/* Caught/Seen box */}
            <div className="rounded-2xl bg-white/85 backdrop-blur p-5 text-sky-900 border-l-8 border-r-8 border-[#E83030] mt-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#585850]">
                    Caught
                  </p>
                  <p className="text-3xl font-extrabold text-[#585850]">
                    {fish.caught}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#585850]">
                    Seen
                  </p>
                  <p className="text-3xl font-extrabold text-[#585850]">
                    {fish.seen}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <aside className="lg:col-span-3 space-y-4">
      

            {/* fish list */}
            <div className="rounded-2xl bg-white/90 backdrop-blur border border-white/50 p-3">
              <h2 className="px-2 pb-2 text-sm font-semibold text-[#585850]">
                Fishdex
              </h2>
              <div className="lg:max-h-[35rem] max-h-[12.5rem] overflow-y-auto">
                {fishDex.map((fishItem, index) => {
                  const isActive = index === selected;
                  const buttonClasses = isActive
                    ? "w-full flex items-center justify-between gap-3 px-3 py-3 text-left transition border-2 rounded-md border-[#E83030] text-[#585850]"
                    : "w-full flex items-center justify-between gap-3 px-3 py-3 text-left transition hover:bg-[#e1dfdf] text-[#585850]";

                  return (
                    <button
                      key={fishItem.name}
                      onClick={() => setSelected(index)}
                      className={buttonClasses}
                      aria-current={isActive ? "true" : "false"}
                    >
                      <span className="text-xs font-mono text-slate-500">
                        #{String(index + 1).padStart(3, "0")}
                      </span>
                      <span
                        className="flex-1 font-medium"
                      >
                        {fishItem.name}
                      </span>
                      {isActive ? (
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-200 rounded px-1.5 py-0.5">
                          Selected
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </section>
      </main>

      {/* Grass overlay at bottom */}
      {/* <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-repeat-x bg-bottom"
        style={{
          backgroundImage: "url('/assets/pokegrassbg.png')",
          backgroundSize: "500px auto",
        }}
        aria-hidden="true"
      /> */}
    </div>
  );
};

export default Photos;