import { useNavigate } from "react-router-dom";   
import { useState } from "react";

const fishConfig = [
    { top: "18%", duration: "14s", delay: "-2s", scale: "1" },
    { top: "32%", duration: "18s", delay: "-6s", scale: "1.2" },
    { top: "46%", duration: "16s", delay: "-10s", scale: "0.9" },
    { top: "58%", duration: "20s", delay: "-12s", scale: "1.3" },
    { top: "72%", duration: "15s", delay: "-4s", scale: "0.8" },
];

const HomePage = () => {
    //const [score, setScore] = useState(0);
    const [hiddenFish, setHiddenFish] = useState(new Set());
    
    const handleFishCaught = (idx) => { 
        // incremenet score
        //setScore(s => s + 1);
        // hide fish
        setHiddenFish(prev => new Set([...prev, idx]));
        // respawn fish after delay
         setTimeout(() => {
            setHiddenFish(prev => {
                const next = new Set(prev);
                next.delete(idx);
                return next;
            });
        }, 12000); // 12 second delay before respawn
    }

    const navigate = useNavigate();
    return (
        <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-sky-200 via-sky-300 to-sky-500 text-white">
            <div 
                className="absolute inset-0 z-1 pointer-events-none"
                style={{ 
                    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/ocean.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(6px)'
                }}
            />
            {/* <NavBar /> */}
            <div className="absolute inset-0 pointer-events-none z-20" aria-hidden="true">
                {/* Replace svg fish with actual fish that are uploaded */}
                {fishConfig.map((fish, idx) => {
                    const isHidden = hiddenFish.has(idx);
                    return (
                        <img
                            key={idx}
                            src="/assets/fish.png"
                            alt="fish"
                            className="fish pointer-events-auto"
                            style={{
                                top: fish.top,
                                "--swim-duration": fish.duration,
                                "--fish-scale": fish.scale,
                                animationDelay: fish.delay,
                                filter: "invert(0%)",
                                opacity: isHidden ? 0 : 1,
                                pointerEvents: isHidden ? 'none' : 'auto',
                                transition: 'opacity 0.3s'
                            }}
                            onClick={() => !isHidden && handleFishCaught(idx)}
                        />
                    );
                })}
            </div>

            <main className="relative flex h-[50%] items-center justify-center px-6">
                <div className="max-w-2xl text-center drop-shadow-lg mt-[10rem]">
                    <p className="text-sm uppercase tracking-[0.3em] text-sky-50/90">Gotta catch em' all</p>
                    <span className="mt-4 text-5xl font-semibold leading-tight text-white">
                        <span class="wave-text">
        <span>H</span><span>o</span><span>o</span><span>k</span>
    </span>
    <span class="wave-text">
        <span>p</span><span>o</span><span>i</span><span>n</span><span>t</span>
    </span>
                    </span>
                    <div className="mt-12 flex justify-center">
                        {/* Conditional for login/logout */}
                        <button className="rounded-full bg-white/90 px-20 py-3 text-sky-700 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg z-0"
                        onClick={() => navigate('/spots')}>
                            Login
                        </button>
                    </div>
                </div>
            </main>
            <footer>
               {/* <div className="absolute bottom-4 pr-8 w-full text-right text-lg text-white/80">
             {score} Fish Caught 
                </div>*/}
            </footer>
        </div>
    );
};

export default HomePage;