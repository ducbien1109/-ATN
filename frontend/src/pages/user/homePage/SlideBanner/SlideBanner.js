import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { toast } from "react-toastify";
import { Carousel } from "react-responsive-carousel";

import defaultBanner from "./images/default-banner.png";
import { API, MESSAGE } from "@Const";

const SlideBanner = () => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(API.PUBLIC.GET_ALL_BANNERS_ENDPOINT, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setBanners(data);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
    }
  };

  useEffect(() => {
    fetchData().then((r) => {});
  }, []);

  const handleSlideClick = (index) => {
    if (banners[index] && banners[index].link) {
      navigate(banners[index].link);
    }
  };

  return (
    <div>
      <div className="waviy">
        <span style={{ "--i": 1 }}>D</span>
        <span style={{ "--i": 2 }}>A</span>
        <span style={{ "--i": 3 }}>N</span>
        <span style={{ "--i": 4 }}>A</span>
        <span style={{ "--i": 5 }}>N</span>
        <span style={{ "--i": 6, marginRight: "20px" }}>G</span>
        <span style={{ "--i": 7 }}>U</span>
        <span style={{ "--i": 8 }}>N</span>
        <span style={{ "--i": 9 }}>I</span>
        <span style={{ "--i": 10 }}>V</span>
        <span style={{ "--i": 11 }}>E</span>
        <span style={{ "--i": 12 }}>R</span>
        <span style={{ "--i": 13 }}>S</span>
        <span style={{ "--i": 14 }}>I</span>
        <span style={{ "--i": 15 }}>T</span>
        <span style={{ "--i": 16, marginRight: "20px" }}>Y</span>
        <span style={{ "--i": 17 }}>O</span>
        <span style={{ "--i": 18, marginRight: "20px" }}>F</span>
        <span style={{ "--i": 19 }}>A</span>
        <span style={{ "--i": 20 }}>R</span>
        <span style={{ "--i": 21 }}>C</span>
        <span style={{ "--i": 22 }}>H</span>
        <span style={{ "--i": 23 }}>I</span>
        <span style={{ "--i": 24 }}>T</span>

        <span style={{ "--i": 25 }}>E</span>
        <span style={{ "--i": 26 }}>C</span>
        <span style={{ "--i": 27 }}>T</span>
        <span style={{ "--i": 28 }}>U</span>
        <span style={{ "--i": 29 }}>R</span>
        <span style={{ "--i": 30 }}>E</span>
      </div>

      <section className="section-home container-fluid p-0">
        <section className="slide-banner w-100 d-flex justify-content-center">
          {banners && banners.length > 0 ? (
            <div
              style={{
                border: "1px solid #E5E5E5",
                width: "600px",
                height: "300px",
              }}
            >
              <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showThumbs={false}
              >
                {banners.map((banner, index) => (
                  <div key={index}>
                    {banner.bannerLinkTo === null ||
                    banner.bannerLinkTo === "" ? (
                      <div>
                        <img
                          src={banner.imagePath}
                          alt={`banner ${index + 1}`}
                          style={{
                            width: "600px",
                            height: "300px",
                            objectFit: "contain",
                            backgroundColor: "#fff",
                          }}
                        />
                      </div>
                    ) : (
                      <a href={banner.bannerLinkTo}>
                        <div className="pointer-cursor">
                          <img
                            src={banner.imagePath}
                            alt={`banner ${index + 1}`}
                            style={{
                              width: "600px",
                              height: "300px",
                              objectFit: "contain",
                              backgroundColor: "#fff",
                            }}
                          />
                        </div>
                      </a>
                    )}
                  </div>
                ))}
              </Carousel>
            </div>
          ) : (
            <div style={{ border: "1px solid #E5E5E5" }}>
              <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showThumbs={false}
              >
                <img
                  src={defaultBanner}
                  alt={`default-banner`}
                  style={{
                    width: "600px",
                    height: "300px",
                    objectFit: "contain",
                    backgroundColor: "#fff",
                  }}
                />
              </Carousel>
            </div>
          )}
        </section>
      </section>
    </div>
  );
};

export default SlideBanner;
