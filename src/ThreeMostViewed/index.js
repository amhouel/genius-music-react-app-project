import React from "react";
import "./style.css";

function ThreeMostViewed(props) {

    const getThreeMostViewed = () => {
        let pageViewsList = [];
        for (let i = 0; i < props.songList.length; i++) {
            if (props.songList[i].result.stats.pageviews) {
                pageViewsList.push([props.songList[i].result.stats.pageviews, props.songList[i].result.title]);
            }
        }
        pageViewsList.sort((a, b) => b[0] - a[0]);
        let most3Viewed = pageViewsList.slice(0, 3);
        return most3Viewed;
    }

    return (
        <div className="most-viewed-songs-wrapper">
            {props.songList.length > 0 && (
                <div>
                    <h2 className="most-viewed-songs">The 3 Most Viewed Songs</h2>
                    <ul className="most-viewed-songs-list">
                        {getThreeMostViewed().map((song, index) => {
                            return (
                                <li className="most-viewed-song" key={index}>{song[1]}</li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default ThreeMostViewed;