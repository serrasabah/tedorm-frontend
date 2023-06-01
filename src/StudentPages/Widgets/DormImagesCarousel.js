import React from 'react';
import { Carousel } from "react-carousel-minimal";


const DormImagesCarousel = () => {
  
  // Yurt resimlerini statik olarak çekmek için kullanılacak kodlar:
  const images = [
    { id: 1, image: '/images/dorm1.jpg' },
    { id: 2, image: '/images/dorm2.jpg' },
    { id: 3, image: '/images/dorm3.jpg' },
    { id: 4, image: '/images/dorm4.jpg' },
    { id: 5, image: '/images/dorm5.jpg' },
  ];

  // Yurt resimlerini API ile çekmek için kullanılacak kodlar:
  /** 
    const [images, setImages] = useState([]);

    useEffect(() => {
      const fetchDormImages = async () => {
        const dormImages = await getYurtImages();
        setImages(dormImages);
      };

      fetchDormImages();
    }, []);
  */

  return (
    <div>
        <Carousel
            data={images}
            time={3000}
            width="850px"
            height="550px"
            radius="20px"
            slideNumber={false}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={false}
            thumbnailWidth="100px"
            style={{
              textAlign: "center",
              maxWidth: "850px",
              maxHeight: "550px",
              margin: "0px auto",
            }}
          />
    </div>
  );
};

export default DormImagesCarousel;
