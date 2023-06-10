import { useRef } from "react";
import VideoJS from "./components/VideoJS";

export default function App() {
  const playerRefs = useRef([]);
  const streamIp = "192.168.0.109"

  const videos = [
    {
      src: `http://${streamIp}:8083/stream/qoocam/channel/360-stadium-1/hlsll/live/index.m3u8`,
      type: "application/x-mpegURL",
      name: "360-stadium-1",
    },
    {
      src: `http://${streamIp}:8083/stream/qoocam/channel/360-stadium-2/hlsll/live/index.m3u8`,
      type: "application/x-mpegURL",
      name: "360-stadium-2",
    },
    {
      src: `http://${streamIp}:8083/stream/qoocam/channel/360-stadium-3/hlsll/live/index.m3u8`,
      type: "application/x-mpegURL",
      name: "360-stadium-3",
    },
    {
      src: `http://${streamIp}:8083/stream/qoocam/channel/360-stadium-4/hlsll/live/index.m3u8`,
      type: "application/x-mpegURL",
      name: "360-stadium-4",
    },
    {
      src: `http://${streamIp}:8083/stream/qoocam/channel/360-warmup-1/hlsll/live/index.m3u8`,
      type: "application/x-mpegURL",
      name: "360-warmup-1",
    },
    // Add more videos as needed
    // {
    //   src: "URL",
    //   type: "MIME_TYPE",
    //   name: "Video 2",
    // },
  ];

  const handlePlayerReady = (player, index) => {
    playerRefs.current[index] = player;
    player.on("waiting", () => {});
    player.on("dispose", () => {});
  };

  var imaOptions = {
    forceNonLinearFullSlot: true,
    // adTagUrl: "AD_TAG_URL",
  };

  return (
    <>
      <h3>U23 VR Player</h3>
      {videos.map((video, index) => (
        <div key={index} style={{ width: "50%", height: "auto" }}>
          <p>{video.name}</p>
          <VideoJS
            options={{
              autoplay: false,
              controls: true,
              responsive: true,
              fluid: true,
              preload: "auto",
              poster:
                "https://assets.european-athletics.com/a2110543-0768-4ff0-a2dd-46db7ee696a9?key=q75maxwidth600",
              sources: [video],
              techOrder: ["hls", "html5"],
              width: "100%",
              height: "auto",
            }}
            imaOptions={imaOptions}
            onReady={(player) => handlePlayerReady(player, index)}
          />
        </div>
      ))}
    </>
  );
}
