import React, { useState, useEffect } from 'react';

const ResturantTab = ({name, phone, address, website, coordinates}) => {
    const [resturauntMapUrl, setResturauntMapUrl] = useState('')
    console.log(coordinates)
    const latitude = coordinates[0]
    const longtitude = coordinates[1]

    // const bingMapApiRequest = async () => {
    //     const res = await fetch(`http://dev.virtualearth.net/REST/v1/Imagery/Map/Road/${latitude}, ${longtitude}/16?mapSize=300,300&pp=${latitude}, ${longtitude};47&mapLayer=Basemap,Buildings&key=${BEARER_TOKEN}`)
    //     console.log(res)
    //     const data = await res.url
    //     setResturauntMapUrl(data)
    //     console.log (data)
            
    // }

    useEffect(() => {
        // try {
        //     bingMapApiRequest()
        // } catch (e) {
        //     console.log(e)
        // }
    }, [])



    return (
        <div class="resturaunt-tab-container">
     
     
             <img src={resturauntMapUrl} />
             <div className="resturaunt-info">
                
                <h2>{name} <i class='bx bx-restaurant'></i></h2>
                <h4>{phone} <i class='bx bxs-phone-call' ></i></h4>
                <h4>{address} <i class='bx bxs-map'></i></h4>
                <h4><a href={website} >Website <i class='bx bxs-navigation' ></i></a></h4>
             </div>

             <div>
                 <div>Ratings!</div>

                 <div>Write a review!</div>
                 <button className="">Post a review</button>
             </div>

        </div>
    )
}

export default ResturantTab
