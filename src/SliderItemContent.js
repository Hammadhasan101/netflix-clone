import React, {useState,useEffect} from 'react'


const base_url = "https://image.tmdb.org/t/p/original/";

function SliderItemContent({data,videoOpen,isLargeRow}) {
    
    const [start,setStart] = useState(0);
    const [end,setEnd] = useState(7);

    const [mydata,setMydata] = useState([]);

    return (
        <div className="row__posters">
                {data.map((movie, i) => {
                        return (
                            <img
                            key={movie.id}
                            onClick={()=>videoOpen(movie)}
                            className={`row__poster ${isLargeRow && "row_posterLarge"}`}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name}
                            />
                        );
                    }
                )}
            </div>
    )
}

export default SliderItemContent
