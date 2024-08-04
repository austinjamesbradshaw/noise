import { X } from "lucide-react";
import { useContext, useState } from "react";
import ReactPlayer from "react-player";
import { PlayerContext } from "~/App";
import { Slider } from "~/components/ui/slider";

export default function SoundControl({ label, emoji, id }) {
  const { isPlaying, activeSounds, setActiveSounds } =
    useContext(PlayerContext);

  const [volume, setVolume] = useState([0]);

  const handleDeactivateSound = (id) => {
    setActiveSounds([
      ...activeSounds.filter((activeSound) => activeSound.id !== id),
    ]);
  };

  const handleWheel = (event) => {
    if (event.deltaY > 0) {
      if (volume[0] - 0.01 < 0) {
        setVolume([0]);
        return;
      }
      setVolume([volume[0] - 0.01]); // Scrolling down
    } else {
      if (volume[0] + 0.01 > 1) {
        setVolume([1]);
        return;
      }
      setVolume([volume[0] + 0.01]); // Scrolling up
    }
  };

  return (
    <div
      onWheel={handleWheel}
      className="flex flex-col relative items-center gap-4 h-full p-4 rounded"
    >
      <div
        className="group relative *:transition-all cursor-pointer"
        onClick={() => handleDeactivateSound(id)}
      >
        <p className="group-hover:opacity-0">{emoji}</p>
        <X className="h-4 w-4 mt-1 absolute top-0 left-0 opacity-0 group-hover:opacity-100" />
      </div>
      <Slider
        value={volume}
        orientation="vertical"
        max={1}
        step={0.01}
        onValueChange={setVolume}
      />
      <ReactPlayer
        key={id}
        config={{ file: { forceAudio: true } }}
        stopOnUnmount={true}
        loop={true}
        width={0}
        height={0}
        playing={isPlaying}
        volume={volume[0]}
        url={`/sounds/${id}/main-${id}.mp4`}
      />
    </div>
  );
}
