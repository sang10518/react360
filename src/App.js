import { useRef } from "react";
import VideoJS from "./components/VideoJS";

export default function App() {
  const playerRef = useRef(null);


  const options = {
    autoplay: false,
    controls: true,
    responseive: true,
    fluid: true,
    preload: "auto",
    poster:
      "https://assets.european-athletics.com/a2110543-0768-4ff0-a2dd-46db7ee696a9?key=q75maxwidth600",
    sources: [
      {
        // src:"http://localhost:10518",
        // src:"rtsp://192.168.7.186:8554",
        // src: "vlc_8k.mp4",
        // src: "https://d8d913s460fub.cloudfront.net/krpanocloud/video/airpano/video-1920x960a-fs.mp4",
        // type: "video/mp4",
        src:"http://localhost:8083/stream/pattern/channel/0/hls/live/index.m3u8",
        type:"application/x-mpegURL"
        // src:"https://cdn3.wowza.com/1/Q1RCdGlMMFUxTzYw/NG1CVVZT/hls/live/playlist.m3u8",
        // type:"application/x-mpegURL"
      },
    ],
    techOrder: ["hls", "html5"],
    // html5: {
    //   hls: {
    //     withCredentials: true, // enable sending of cookies in cross-origin requests
    //     overrideNative: true // force use of VHS plugin for HLS playback
    //   }
    // }
 
    
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    player.on("waiting", () => {});

    player.on("dispose", () => {});
  };

  // Add an event listener for the DeviceOrientationEvent
  window.addEventListener('deviceorientation', function(event) {
    // Extract the rotation and tilt angles from the event
    var alpha = event.alpha; // rotation around z-axis
    var beta = event.beta;   // rotation around x-axis
    var gamma = event.gamma; // rotation around y-axis

    // Calculate the new camera position based on the rotation and tilt angles
    var x = Math.sin(alpha * Math.PI / 180) * Math.cos(beta * Math.PI / 180);
    var y = Math.sin(beta * Math.PI / 180);
    var z = -Math.cos(alpha * Math.PI / 180) * Math.cos(beta * Math.PI / 180);
    var position = new THREE.Vector3(x, y, z);

    // Set the camera position to the new position
    player.camera.position.copy(position);
  }); 

  var imaOptions = {
    forceNonLinearFullSlot: true,
    // adTagUrl:
    //   "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpreonly&ciu_szs=300x250%2C728x90&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator=",
  };

  return (
    <>
      <h3>Sample Player</h3>
      <VideoJS
        options={options}
        imaOptions={imaOptions}
        onReady={handlePlayerReady}
      />
    </>
  );
}
