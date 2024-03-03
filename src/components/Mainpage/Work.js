import Image from 'next/image';
import { Bot } from 'lucide-react';
import PickMealsImage from '../../../public/images/mainpage/pick-meals-image.png';
import ChooseMealsImage from "../../../public/images/mainpage/choose-image.png";
import DeliveryMealsImage from "../../../public/images/mainpage/delivery-image.png";

const Work = () => {
  const workInfoData = [
    {
      image: PickMealsImage,
      title: "Feature 1",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
    },
    {
      image: ChooseMealsImage,
      title: "Feature",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
    },
    {
      image: DeliveryMealsImage,
      title: "Feature",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
    },
    {
      image: DeliveryMealsImage,
      title: "Feature",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
    },
    {
      image: DeliveryMealsImage,
      title: "Feature",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
    },
    {
      image: DeliveryMealsImage,
      title: "Feature",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
    },
    {
      image: DeliveryMealsImage,
      title: "Feature",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
    },
  ];

  return (
    
    <div className="work-section-wrapper" style={{ fontFamily: "kufi", color: "", fontWeight: "bold" }}>
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        {/* <p className="primary-text">
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
          elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
        </p> */}
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <Image src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
