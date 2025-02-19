import basketImg from "../assets/Group 237756.png";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { getData } from "../services/api";
import CounterOfDiscount from "./CounterOfDiscount";

const PopularProductsPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [visibleProd, setVisibility] = useState(4);

  useEffect(() => {
    getData()
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  const loadMoreProd = () => {
    setVisibility((prevCount) => prevCount + 8);
  };

  return (
    <>
      <div className=" h-fit mx-auto mt-[70px]">
        <h1 className="text-[30px] font-semibold">Популярное</h1>
        <div className="w-full h-fit flex flex-wrap mx-auto justify-between">
          {products.slice(0, visibleProd).map((product, key) => (
            <div
              key={key}
              onClick={() => handleClick(product.id)}
              className="w-[245px] ml-[20px] h-[450px] mt-[30px] overflow-hidden cursor-pointer hover:shadow-xl rounded-md transition"
            >
              <div className="w-[240px] p-3 h-[280px] rounded-xl overflow-hidden">
                {product.media.length >= 2 ? (
                  <Swiper
                    modules={[Autoplay]}
                    spaceBetween={50}
                    slidesPerView={1}
                    autoplay={{
                      delay: 4000,
                      disableOnInteraction: false,
                    }}
                    loop={true}
                  >
                    {product.media.map((item, key) => (
                      <SwiperSlide key={key} className="w-full h-[500px]">
                        <img
                          src={item}
                          alt=""
                          className="w-[240px] h-[240px]"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <img
                    src={product.media[0]}
                    className="w-[240px] hover:scale-105 h-[240px] ease-in-out duration-300"
                    alt=""
                  />
                )}
              </div>

              <div className="w-5/6 ml-[10px] mt-[10px] h-[130px] overflow-hidden">
                <p className="text-[14px] font-medium">{product.title}</p>
                <p className="text-[12px] text-gray-500">{product.rating}</p>
              </div>
              <div className="w-[225px] mx-auto h-[50px] -mt-[30px] justify-between flex items-center">
                <span>
                  <p>
                    <CounterOfDiscount
                      price={product.price}
                      percent={product.salePercentage}
                      customStyles='line-through text-[12px] text-gray-500'
                    />
                  </p>
                  <p className="text-[14px]">{product.price}</p>
                </span>
                <img
                  src={basketImg}
                  className="w-[30px] h-[30px] cursor-pointer"
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={loadMoreProd}
          className="w-[700px] h-[60px] mt-[50px] hover:bg-slate-300 cursor-pointer transition-colors font-semibold bg-slate-200 rounded-lg block mx-auto mb-[50px]"
        >
          Показать ещё 8
        </button>
      </div>
    </>
  );
};

export default PopularProductsPage;
