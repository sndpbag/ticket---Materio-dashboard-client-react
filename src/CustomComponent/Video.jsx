



import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-dash";

const Video = () => {
    const [progress, setProgress] = useState(0);
    const [expanded, setExpanded] = useState({
        course: false,
        categories: {},
        subcategories: {},
    });
    const [courseData, setCourseData] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [currentTitle, setCurrentTitle] = useState("Select a Video"); // ✅ Dynamic Video Title
    const [currentIndex, setCurrentIndex] = useState(0);
    const playerRef = useRef(null);
    const videoJsPlayer = useRef(null);

    const toggleExpand = (type, id) => {
        setExpanded((prev) => {
            if (type === "course") {
                return { ...prev, course: !prev.course };
            }
            if (type === "category") {
                return { ...prev, categories: { ...prev.categories, [id]: !prev.categories[id] } };
            }
            if (type === "subcategory") {
                return { ...prev, subcategories: { ...prev.subcategories, [id]: !prev.subcategories[id] } };
            }
            return prev;
        });
    };

    const handleVideoChange = (videoUrl, title, index) => {
        if (videoJsPlayer.current) {
            videoJsPlayer.current.src({ src: videoUrl, type: "application/dash+xml" });
            videoJsPlayer.current.play();
        } else {
            setCurrentVideo(videoUrl);
        }
        setCurrentTitle(title); // ✅ Update video title dynamically
        setCurrentIndex(index);
    };

    const getAllVideos = () => {
        if (!courseData.topics) return [];
        return courseData.topics.flatMap(topic =>
            topic.subcategories.flatMap(sub => sub.videos)
        );
    };

    const goToNextVideo = () => {
        const allVideos = getAllVideos();
        if (currentIndex < allVideos.length - 1) {
            handleVideoChange(allVideos[currentIndex + 1].url, allVideos[currentIndex + 1].title, currentIndex + 1);
        }
    };

    const goToPreviousVideo = () => {
        const allVideos = getAllVideos();
        if (currentIndex > 0) {
            handleVideoChange(allVideos[currentIndex - 1].url, allVideos[currentIndex - 1].title, currentIndex - 1);
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
                responsive: true,
                fluid: true,
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
                setCourseData(data.courses_videos || {});
                setLoading(false);
                if (data.courses_videos?.topics?.length > 0) {
                    const firstVideo = data.courses_videos.topics[0].subcategories[0]?.videos[0];
                    if (firstVideo) {
                        setCurrentVideo(firstVideo.url);
                        setCurrentTitle(firstVideo.title); // ✅ Set the first video title dynamically
                    }
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="bg-[#010313] text-white p-4 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Video Player Section */}
                <div className="md:col-span-9">
                    <h2 className="text-2xl font-bold mb-3">{currentTitle}</h2> {/* ✅ Dynamic Title */}
                    <div className="relative w-full">
                        <video ref={playerRef} className="video-js vjs-default-skin w-full h-[500px] rounded-lg shadow-lg" controls></video>
                    </div>
                    <div className="mt-3 flex justify-between">
                        <button
                            onClick={goToPreviousVideo}
                            className={`border-2 border-green-400 text-green-400 px-4 py-2 rounded-md 
                                hover:bg-green-400 hover:text-black transition ${
                                    currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            disabled={currentIndex === 0}
                        >
                            ⬅ Previous
                        </button>
                        <button
                            onClick={goToNextVideo}
                            className={`bg-green-500 text-black px-4 py-2 rounded-md hover:bg-green-400 transition
                                ${
                                    currentIndex === getAllVideos().length - 1 ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            disabled={currentIndex === getAllVideos().length - 1}
                        >
                            Next ➡
                        </button>
                    </div>
                </div>

                {/* Course Content Section */}
                <div className="md:col-span-3 w-full">
                    <h3 className="text-lg font-semibold mb-2">Course Progress: {progress.toFixed(2)}%</h3>
                    <div className="w-full h-2 bg-gray-600 rounded-full">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>

                    <div className="mt-4">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="bg-[#160929] p-4 rounded-lg shadow-md">
                                <h3
                                    className="cursor-pointer text-lg font-semibold"
                                    onClick={() => toggleExpand("course")}
                                >
                                    {courseData.name}
                                </h3>
                                {expanded.course && (
                                    <div className="mt-2">
                                        {courseData.topics.map((category) => (
                                            <div key={category.id} className="bg-[#2d0f3f] p-3 rounded-lg mb-2">
                                                <h4
                                                    className="cursor-pointer font-semibold"
                                                    onClick={() => toggleExpand("category", category.id)}
                                                >
                                                    {category.name}
                                                </h4>
                                                {expanded.categories[category.id] &&
                                                    category.subcategories.map((sub) => (
                                                        <div key={sub.id} className="bg-[#3d124f] p-2 rounded-lg mt-2">
                                                            <h5
                                                                className="cursor-pointer"
                                                                onClick={() => toggleExpand("subcategory", sub.id)}
                                                            >
                                                                {sub.name}
                                                            </h5>
                                                            {expanded.subcategories[sub.id] &&
                                                                sub.videos.map((video, index) => (
                                                                    <div key={video.id} className="p-2">
                                                                        <Link
                                                                            onClick={(e) => { e.preventDefault(); handleVideoChange(video.url, video.title, index); }}
                                                                            className="text-blue-400 underline"
                                                                        >
                                                                            📌 {video.title}
                                                                        </Link>
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    ))}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Video;

