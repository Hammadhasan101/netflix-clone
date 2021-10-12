import axios from './axios';
import React, {useState,useEffect} from 'react'
import 'swiper/swiper-bundle.css';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import { Swiper, SwiperSlide } from 'swiper/react';
import SliderItemContent from './SliderItemContent';

import "swiper/components/navigation"


import SwiperCore, {Navigation} from 'swiper';


SwiperCore.use([Navigation]);

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) {
    const [movies,setMovies] = useState([]);
    const [trailerUrl,setTrailerUrl] = useState("");

    // const [st,setSt] = useState(0);
    // const [en,setEn] = useState(7);
    // const [extra,setExtra] = useState(0);

    const [myMovies1,setMymovies1] = useState([]);
    const [myMovies2,setMymovies2] = useState([]);
    const [myMovies3,setMymovies3] = useState([]);


    // const [slide,setSlide] = useState(0);

    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            let start = 0;
            let end = 7;
            let extra = 0;

            let set1 = request.data.results.slice(start,end);
            setMymovies1(set1);
            
            start = end + 1;
            end = end + 8;
            let set2 = request.data.results.slice(start,end);
            setMymovies2(set2);
            
            start = end + 1;
            end = end + 8;

            if(end > 20){
                extra = end - 20;
                end = 20;
            }

            let set3 = request.data.results.slice(start,end);
            if(end >= 20){
                start = 0;
                end = extra;
                let startagain = request.data.results.slice(start,end);
                set3 = [...set3,...startagain];
            }
            setMymovies3(set3);
            return request;
        }
        fetchData();

    },[fetchUrl]); 

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        }
    };

    const handleClick = (movie) => {
        if(trailerUrl){
            setTrailerUrl("");
        }
        else{
            movieTrailer(movie?.name || "")
            .then((url) => {
                // console.log(url);
                const urlParams = new URLSearchParams(new URL(url).search);  //get every thing after ? in url
                setTrailerUrl(urlParams.get('v'));
                console.log(trailerUrl);

            }).catch((error) => console.log(error));
        }
    }


    // <Swiper 
    // slidesPerView={3} 
    // spaceBetween={30} 
    // slidesPerGroup={3} 
    // loop={true} 
    // loopFillGroupWithBlank={true} 
    // navigation={true} className="mySwiper">


    return (
    <div className="row">
     <h2>{title}</h2>
     <Swiper 
        loop = "true"
        navigation={true}
    //   spaceBetween={100}
    //   slidesPerView={3}
    // onSlideChange={()=>ifSlideChange()}
    //   onSlideChange={() => ifSlideChange()}
    //   onSwiper={(swiper) => console.log(swiper)}
      className="mySwiper"
     >
     <SwiperSlide>
         <SliderItemContent 
            data={myMovies1} 
            videoOpen={handleClick} 
            isLargeRow={isLargeRow}
         />
    </SwiperSlide>
    <SwiperSlide>
        <SliderItemContent 
            data={myMovies2} 
            videoOpen={handleClick} 
            isLargeRow={isLargeRow}
        />
    </SwiperSlide>
    <SwiperSlide>
        <SliderItemContent 
            data={myMovies3} 
            videoOpen={handleClick} 
            isLargeRow={isLargeRow}
        />
        </SwiperSlide>
    </Swiper>
    {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
    );
}

export default Row
