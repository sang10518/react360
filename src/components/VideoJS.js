import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "videojs-vr";
import "videojs-contrib-ads";
import "videojs-contrib-hls";
import "videojs-ima";
import "video.js/dist/video-js.css";
import "videojs-ima/src/css/videojs.ima.css";
// import 'videojs-http-streaming';

export const VideoJS = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options, onReady, imaOptions } = props;

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      var player;
      if (!videoElement) return;

      player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      }));

      player.vr({ projection: "360", gyroscopic: "true" });
      player.ima(imaOptions);
    } else {
      player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
      player.vr({ projection: "360" });
      player.ima(imaOptions);
    }

    // add CORS headers to the HLS manifest request
    // player.on('beforeRequest', function (options) {
    //   options.headers = options.headers || {};
    //   options.headers['Access-Control-Allow-Origin'] = '*';
    //   options.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
    // });

  }, [options, videoRef]);

  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <>
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered"
          playsInline
          crossOrigin="anonymous"
        />
      </div>
    </>
  );
};

export default VideoJS;
