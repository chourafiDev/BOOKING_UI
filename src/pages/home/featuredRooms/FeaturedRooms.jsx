import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef } from "react";
import { toast } from "react-toastify";

import {
  reset,
  getFeaturedRooms,
} from "../../../redux/features/room/roomSlice";
import FeaturedRoom from "./FeaturedRoom";
import VerticatCardLoader from "../../../components/loader/VerticatCardLoader";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const FeaturedRooms = () => {
  const dispatch = useDispatch();

  const { featuredRooms, isSuccess, isError, isLoading } = useSelector(
    (state) => state.room
  );

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }

    dispatch(getFeaturedRooms());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError]);

  // handle next and prev swiper
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <div className="container mx-auto mt-32">
      <div className="text-center my-12">
        <h2 className="text-dark font-bold mb-5 font-lora">Featured Rooms</h2>
        <p className="text-dark/70 px-4">
          Check the listings of the best rooms on "Booking" and see availability
          to book that room.
        </p>
      </div>

      <div className="lg:px-20 px-1">
        <div className="flex gap-3 items-center justify-end mb-4">
          <button
            onClick={handlePrev}
            className="w-9 h-9 flex cursor-pointer bg-blue hover:border-brand justify-center items-center rounded-full text-white"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="w-9 h-9 flex cursor-pointer bg-blue hover:border-brand justify-center items-center rounded-full text-white"
          >
            <FiChevronRight size={20} />
          </button>
        </div>

        {!isLoading ? (
          <Swiper
            ref={sliderRef}
            spaceBetween={6}
            loop
            className="mySwiper"
            breakpoints={{
              1024: {
                width: 1024,
                slidesPerView: 3,
              },
              640: {
                width: 640,
                slidesPerView: 1,
              },
              768: {
                width: 768,
                slidesPerView: 2,
              },
            }}
            // onBeforeInit={(swiper) => {
            //   swiper.params.navigation.prevEl = prevRef.current;
            //   swiper.params.navigation.nextEl = nextRef.current;
            //   swiper.navigation.update();
            // }}
          >
            {featuredRooms.map((room) => (
              <SwiperSlide key={room._id}>
                <FeaturedRoom room={room} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
            <VerticatCardLoader />
            <VerticatCardLoader />
            <VerticatCardLoader />
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedRooms;
