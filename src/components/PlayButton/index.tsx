import { Pause, Play } from "lucide-react";
import { useContext } from "react";
import { PlayerContext } from "~/App";
import { Button } from "~/components/ui/button";

export default function PlayButton() {
  const { isPlaying, setIsPlaying } = useContext(PlayerContext);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Button onClick={handlePlayPause} size="icon">
      {!isPlaying && <Play className="h-4 w-4" />}
      {isPlaying && <Pause className="h-4 w-4" />}
    </Button>
  );
}
