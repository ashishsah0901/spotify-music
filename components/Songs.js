import { useRecoilValue } from "recoil";
import { playlistState } from "../atom/playlistAtem";
import Song from "./Song";

const Songs = () => {
  const playlist = useRecoilValue(playlistState);
  return (
    <div className="px-8 dlex flex-col space-y-1 pb-20 text-white">
      {playlist?.tracks.items.map((track, i) => (
        <Song key={track.track.id} track={track.track} order={i} />
      ))}
    </div>
  );
};

export default Songs;
