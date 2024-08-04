import { AudioWaveform, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { createContext, useEffect, useState } from "react";
import { Separator } from "~/components/ui/separator";
import SoundControl from "~/components/SoundControl";
import PlayButton from "~/components/PlayButton";

const sounds = [
  {
    label: "Frogs",
    id: "frogs",
    emoji: "🐸",
  },
  {
    label: "Rain",
    id: "rain",
    emoji: "🌧️",
  },
  {
    label: "Thunder",
    id: "thunder",
    emoji: "🌩️",
  },
  {
    label: "Waves",
    id: "waves",
    emoji: "🌊",
  },
  {
    label: "Wind",
    id: "wind",
    emoji: "💨",
  },
  {
    label: "Crickets",
    id: "crickets",
    emoji: "🦗",
  },
  {
    label: "Cicadas",
    id: "cicadas",
    emoji: "🪲",
  },
  {
    label: "Waterfall",
    id: "waterfall",
    emoji: "🏞️",
  },
  {
    label: "Birds",
    id: "birds",
    emoji: "🐦",
  },
  {
    label: "Fire",
    id: "fire",
    emoji: "🔥",
  },
  {
    label: "Rain Trees",
    id: "raintrees",
    emoji: "🌳",
  },
  {
    label: "Rain Cabin",
    id: "raincabin",
    emoji: "🛖",
  },
  {
    label: "Rain Tin Roof",
    id: "raintinroof",
    emoji: "🐮",
  },
  {
    label: "People",
    id: "people",
    emoji: "🗣️",
  },
];

export const PlayerContext = createContext(null);

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSounds, setActiveSounds] = useState([]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === "Space") setIsPlaying(!isPlaying);
    }

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaying]);

  const handleActivateSound = (id) => {
    setActiveSounds([...activeSounds, sounds.find((sound) => sound.id === id)]);
  };

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        activeSounds,
        setActiveSounds,
      }}
    >
      <main className="h-dvh py-8 flex flex-col container overflow-hidden">
        <div className="flex items-center gap-2 mb-8">
          <AudioWaveform />
          <h1 className="text-3xl font-bold leading-none">noise</h1>
        </div>
        <section className="flex flex-row overflow-auto h-full gap-8">
          <div className="flex flex-col">
            <h2 className="font-bold mb-1">Add Sounds</h2>
            <p className="text-muted text-sm mb-4">
              Click a sound to add it to the mix
            </p>
            <div className="flex overflow-auto pr-6 h-full items-start flex-col gap-2">
              {sounds
                .filter(
                  (inactiveSound) =>
                    !activeSounds.find(
                      (activeSound) => activeSound.id === inactiveSound.id
                    )
                )
                .map((sound) => (
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    key={sound.id}
                    onClick={() => handleActivateSound(sound.id)}
                  >
                    <Plus className="h-4 w-4" /> {sound.emoji} {sound.label}
                  </Button>
                ))}
            </div>
          </div>
          <Separator orientation="vertical" />
          <div className="flex w-3/4 mx-auto flex-col gap-8 items-center">
            <div className="flex w-full justify-between">
              <PlayButton />
              <div>.</div>
              {/* <AudioVisualizer audioElements={audioElements} /> */}
            </div>
            <div className="flex gap-2 h-full w-full justify-start">
              {activeSounds.map((sound) => (
                <SoundControl key={sound.id} {...sound} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </PlayerContext.Provider>
  );
}

export default App;
