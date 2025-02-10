



// import { useEffect, useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";
// import "videojs-contrib-dash";

// const Video = () => {
//     const [progress, setProgress] = useState(0);
//     const [expanded, setExpanded] = useState({});
//     const [courseData, setCourseData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [currentVideo, setCurrentVideo] = useState(null);
//     const playerRef = useRef(null);
//     const videoJsPlayer = useRef(null); // Store Video.js player instance

//     const toggleExpand = (sectionId) => {
//         setExpanded((prevExpanded) => ({
//             ...prevExpanded,
//             [sectionId]: !prevExpanded[sectionId],
//         }));
//     };

//     const handleVideoChange = (videoUrl) => {
//         if (videoJsPlayer.current) {
//             videoJsPlayer.current.src({
//                 src: videoUrl,
//                 type: "application/dash+xml",
//             });
//             videoJsPlayer.current.play(); // Ensure the new video starts playing
//         } else {
//             setCurrentVideo(videoUrl);
//         }
//     };

//     useEffect(() => {
//         if (currentVideo && playerRef.current) {
//             if (videoJsPlayer.current) {
//                 videoJsPlayer.current.dispose(); // Destroy existing player
//             }

//             videoJsPlayer.current = videojs(playerRef.current, {
//                 techOrder: ["html5"],
//                 controls: true,
//                 autoplay: true,
//                 sources: [{ src: currentVideo, type: "application/dash+xml" }],
//             });

//             videoJsPlayer.current.on("timeupdate", () => {
//                 const currentTime = videoJsPlayer.current.currentTime();
//                 const duration = videoJsPlayer.current.duration();
//                 const progressPercent = (currentTime / duration) * 100;
//                 setProgress(progressPercent);
//             });

//             return () => {
//                 if (videoJsPlayer.current) {
//                     videoJsPlayer.current.dispose();
//                 }
//             };
//         }
//     }, [currentVideo]);

//     useEffect(() => {
//         fetch("https://online-tutorial.sndpbag4you.com/api/single-course/C-Programming")
//             .then((response) => response.json())
//             .then((data) => {
//                 setCourseData(data.courses_videos.topics || []);
//                 setLoading(false);
//                 if (data.courses_videos.topics.length > 0) {
//                     const firstCategory = data.courses_videos.topics[0];
//                     const firstVideo = firstCategory.subcategories[0]?.videos[0];
//                     if (firstVideo) {
//                         setCurrentVideo(firstVideo?.url);
//                     }
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error fetching data:", error);
//                 setCourseData([]);
//                 setLoading(false);
//             });
//     }, []);

//     return (
//         <div className="bg-[#010313] text-white p-4">
//             <div className="grid grid-cols-12 gap-4">
//                 <div className="col-span-12 md:col-span-8">
//                     <h2 className="text-lg font-bold">0-1 Welcome To The PHP Course</h2>
//                     <div className="bg-black w-full h-64 rounded-lg">
//                         <video
//                             ref={playerRef}
//                             className="video-js vjs-default-skin w-full h-full"
//                             controls
//                         ></video>
//                     </div>
//                     <div className="flex items-center mt-2">
//                         <button className="text-gray-400 hover:text-white mx-2">👍</button>
//                         <button className="text-gray-400 hover:text-white mx-2">👎</button>
//                     </div>
//                     <div className="mt-3 flex space-x-2">
//                         <button  className="border-2 border-green-400 text-green-400 px-3 py-1 rounded-md hover:bg-green-400 hover:text-black">
//                             Previous
//                         </button>
//                         <button className="bg-green-500 text-black px-3 py-1 rounded-md hover:bg-green-400">
//                             Next
//                         </button>
//                     </div>
//                 </div>

//                 <div className="col-span-12 md:col-span-4">
//                     <div className="flex items-center text-sm">
//                         <span>Running Module: {progress.toFixed(2)}%</span>
//                         <div className="w-full h-2 bg-gray-600 rounded-full ml-2">
//                             <div
//                                 className="bg-blue-500 h-2 rounded-full"
//                                 style={{ width: `${progress}%` }}
//                             ></div>
//                         </div>
//                         <span className="ml-2">1/1</span>
//                     </div>
//                     <input
//                         type="text"
//                         placeholder="Search"
//                         className="w-full p-2 bg-gray-800 rounded-md mt-2"
//                     />

//                     <div className="mt-4">
//                         {loading ? (
//                             <p>Loading...</p>
//                         ) : (
//                             courseData.map((category) => (
//                                 <div key={category.id} className="bg-[#160929] p-2 rounded-lg mb-2">
//                                     <div
//                                         className="cursor-pointer text-lg"
//                                         onClick={() => toggleExpand(category.id)}
//                                     >
//                                         {category.name}
//                                     </div>
//                                     {expanded[category.id] &&
//                                         category.subcategories.map((sub) => (
//                                             <div key={sub.id} className="bg-[#2d0f3f] p-2 rounded-lg mt-2">
//                                                 <div
//                                                     className="cursor-pointer"
//                                                     onClick={() => toggleExpand(sub.id)}
//                                                 >
//                                                     {sub.name}
//                                                 </div>
//                                                 {expanded[sub.id] &&
//                                                     sub.videos.map((video) => (
//                                                         <div key={video.id} className="bg-[#3d124f] p-2 rounded-lg mt-2">
//                                                             <Link
//                                                                 onClick={(e) => {
//                                                                     e.preventDefault();
//                                                                     handleVideoChange(video?.url);
//                                                                 }}
//                                                                 className="text-blue-400 underline"
//                                                             >
//                                                                 {video.title}
//                                                             </Link>
//                                                             <p className="text-xs">⏳ {video.duration} min</p>
//                                                         </div>
//                                                     ))}
//                                             </div>
//                                         ))}
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Video;


import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-dash";

const Video = () => {
    const [progress, setProgress] = useState(0);
    const [expanded, setExpanded] = useState({});
    const [courseData, setCourseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const playerRef = useRef(null);
    const videoJsPlayer = useRef(null);

    const toggleExpand = (sectionId) => {
        setExpanded((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
    };

    const handleVideoChange = (videoUrl, index) => {
        if (videoJsPlayer.current) {
            videoJsPlayer.current.src({ src: videoUrl, type: "application/dash+xml" });
            videoJsPlayer.current.play();
        } else {
            setCurrentVideo(videoUrl);
        }
        setCurrentIndex(index);
    };

    const goToNextVideo = () => {
        const allVideos = courseData.flatMap(cat => cat.subcategories.flatMap(sub => sub.videos));
        if (currentIndex < allVideos.length - 1) {
            handleVideoChange(allVideos[currentIndex + 1].url, currentIndex + 1);
        }
    };

    const goToPreviousVideo = () => {
        const allVideos = courseData.flatMap(cat => cat.subcategories.flatMap(sub => sub.videos));
        if (currentIndex > 0) {
            handleVideoChange(allVideos[currentIndex - 1].url, currentIndex - 1);
        }
    };

    useEffect(() => {
        if (currentVideo && playerRef.current) {
            if (videoJsPlayer.current) {
                videoJsPlayer.current.dispose();
            }
            videoJsPlayer.current = videojs(playerRef.current, {
                techOrder: ["html5"],
                controls: true,
                autoplay: true,
                sources: [{ src: currentVideo, type: "application/dash+xml" }],
            });

            videoJsPlayer.current.on("timeupdate", () => {
                const currentTime = videoJsPlayer.current.currentTime();
                const duration = videoJsPlayer.current.duration();
                setProgress((currentTime / duration) * 100);
            });
        }
    }, [currentVideo]);

    useEffect(() => {
        fetch("https://online-tutorial.sndpbag4you.com/api/single-course/C-Programming")
            .then((response) => response.json())
            .then((data) => {
                setCourseData(data.courses_videos.topics || []);
                setLoading(false);
                if (data.courses_videos.topics.length > 0) {
                    const firstVideo = data.courses_videos.topics[0].subcategories[0]?.videos[0];
                    if (firstVideo) {
                        setCurrentVideo(firstVideo.url);
                    }
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="bg-[#010313] text-white p-4">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-8">
                    <h2 className="text-lg font-bold">Video Player</h2>
                    <div className="bg-black w-full h-64 rounded-lg">
                        <video ref={playerRef} className="video-js vjs-default-skin w-full h-full" controls></video>
                    </div>
                    <div className="mt-3 flex space-x-2">
                        <button onClick={goToPreviousVideo} className="border-2 border-green-400 text-green-400 px-3 py-1 rounded-md hover:bg-green-400 hover:text-black">Previous</button>
                        <button onClick={goToNextVideo} className="bg-green-500 text-black px-3 py-1 rounded-md hover:bg-green-400">Next</button>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-4">
                    <div className="flex items-center text-sm">
                        <span>Progress: {progress.toFixed(2)}%</span>
                        <div className="w-full h-2 bg-gray-600 rounded-full ml-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                    <div className="mt-4">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            courseData.map((category) => (
                                <div key={category.id} className="bg-[#160929] p-2 rounded-lg mb-2">
                                    <div className="cursor-pointer text-lg" onClick={() => toggleExpand(category.id)}>{category.name}</div>
                                    {expanded[category.id] && category.subcategories.map((sub) => (
                                        <div key={sub.id} className="bg-[#2d0f3f] p-2 rounded-lg mt-2">
                                            <div className="cursor-pointer" onClick={() => toggleExpand(sub.id)}>{sub.name}</div>
                                            {expanded[sub.id] && sub.videos.map((video, index) => (
                                                <div key={video.id} className="bg-[#3d124f] p-2 rounded-lg mt-2">
                                                    <Link onClick={(e) => { e.preventDefault(); handleVideoChange(video.url, index); }} className="text-blue-400 underline">{video.title}</Link>
                                                    <p className="text-xs">⏳ {video.duration} min</p>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Video;
