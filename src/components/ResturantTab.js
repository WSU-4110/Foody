import React, { useState, useEffect, useLayoutEffect } from 'react';
import RestaurantReview from './RestaurantReview';
import RestaurantPage from './RestaurantPage';
import { useHistory } from 'react-router';

const ResturantTab = ({name, phone, address, website, coordinates}) => {
    const [resturauntMapUrl, setResturauntMapUrl] = useState('')
    const [showPostReview, setShowPostReview] = useState(false)
    const [restaurantId, setRestaurantId] = useState(0)
    const history = useHistory();
    
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


  // used to refresh restaurantId state variable and use it immediately
  useEffect(() => {
    if (restaurantId > 0) {
      console.log("Post review clicked. Restaurant name: " + name + "; restaurant id: " + restaurantId);
    }
  }, [name, restaurantId]);

  const handlePostReview = (e) => {
    e.preventDefault();

    setShowPostReview(!showPostReview);

    let restaurantInfo = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
      },
      body: JSON.stringify({
          url: '/restaurant/process',
          restaurantName: name,
          restaurantPhone: phone,
          restaurantAddress: address,
          restaurantWebsite: website,
      }),
    }

    let response = processRestaurant(restaurantInfo);
    handleResponse(response);
  }

    const processRestaurant = async (restaurantInfo) => {
        const res = await fetch(
          'http://localhost:80/api/index.php',
          restaurantInfo
        );
        let data = await res.json();

        return data;
    }

    const handleResponse = async (data) => {
      let response = await data;
      if (response['response'] === 'Restaurant saved' || response['response'] === 'Restaurant found') {
        let restaurantInfo = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            url: '/restaurant/id',
            restaurantName: name,
            restaurantAddress: address,
          }),
        }

        data = getRestaurantId(restaurantInfo);

        response = await data;
        setRestaurantId(response['response']);
        console.log("state variable: " + restaurantId);
        console.log("response: " + response['response']);
      }
    }

    const getRestaurantId = async (restaurantInfo) => {
      const res = await fetch(
        'http://localhost:80/api/index.php',
        restaurantInfo
      );

      const data = await res.json();

      return data;
    }

    const onRestaurantTabClicked = () => {
      history.push({
        pathname: "/components/RestaurantPage.js",
        state: {
          restaurantName: name,
          restaurantPhone: phone,
          restaurantAddress: address,
          restaurantWebsite: website,
          restaurantCoords: coordinates
        }
      });
    };


    return (
        <div class="resturaunt-tab-container" onDoubleClick={() => onRestaurantTabClicked()}>


             <img src={resturauntMapUrl} />
             <div className="resturaunt-info">

                <h2>{name} <i class='bx bx-restaurant'></i></h2>
                <h4>{phone} <i class='bx bxs-phone-call' ></i></h4>
                <h4>{address} <i class='bx bxs-map'></i></h4>
                <h4><a href={website} >Website <i class='bx bxs-navigation' ></i></a></h4>
             </div>

             <div>
                 <div>Ratings!</div>

                <button className="" onClick={handlePostReview}> {!showPostReview ? 'Post a review' : 'Cancel'}</button>
              
                {showPostReview && <RestaurantReview
                    restaurantId={restaurantId} />}
             </div>
        

         

        </div>
    )
}

export default ResturantTab
