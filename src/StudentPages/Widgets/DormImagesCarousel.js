import React from 'react';
import { Carousel } from "react-carousel-minimal";


const DormImagesCarousel = () => {
  
  // Yurt resimlerini statik olarak çekmek için kullanılacak kodlar:
  const images = [
    { id: 1, image: 'dorm1.jpg' },
    { id: 2, image: 'dorm2.jpg' },
    { id: 3, image: 'dorm3.jpg' },
    { id: 4, image: 'dorm4.jpg' },
    { id: 5, image: 'dorm5.jpg' },
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
            height="500px"
            radius="30px"
            slideNumber={false}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={true}
            thumbnailWidth="100px"
            style={{
              textAlign: "center",
              maxWidth: "850px",
              maxHeight: "500px",
              margin: "40px auto",
            }}
          />
    </div>
  );
};

export default DormImagesCarousel;
