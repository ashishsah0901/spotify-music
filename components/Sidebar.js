import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { playlistIdState } from "../atom/playlistAtem";
import useSpotify from "../hooks/useSpotify";

const Sidebar = () => {
  const [playlists, setPlaylists] = useState([]);
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const setPlaylistId = useSetRecoilState(playlistIdState);
  const sidebarButton = (Icon, title) => (
    <button className="flex items-center space-x-2 hover:text-white">
      <Icon className="h-5 w-5" />
      <p>{title}</p>
    </button>
  );
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);
  return (
    <div className="text-gray-500 p-5 lg:text-sm text-xs border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
      <div className="space-y-4">
        {sidebarButton(HomeIcon, "Home")}
        {sidebarButton(SearchIcon, "Search")}
        {sidebarButton(LibraryIcon, "Your Library")}
        <hr className="border-t-[0.1px] border-gray-900" />
        {sidebarButton(PlusCircleIcon, "Create Playlist")}
        {sidebarButton(HeartIcon, "Like Songs")}
        {sidebarButton(RssIcon, "Your Episodes")}
        <hr className="border-t-[0.1px] border-gray-900" />
        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            onClick={() => setPlaylistId(playlist.id)}
            className="cursor-pointer hover:text-white"
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
