import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "../App.css";
import Fade from "react-reveal/Fade";
import { NavLink } from "react-router-dom";
import { Button, Image } from "@nextui-org/react";
import banner from "../assets/banner.svg";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center mx-5">
      <section
        className="md:mt-10 mb-20 flex flex-col md:flex-row justify-center gap-10"
        style={{ width: "100%" }}
      >
        <Fade left cascade>
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-start h-96">
            <h1 className="text-4xl md:text-6xl font-bold text-COLOR-CV-292F36">
              Crea tu currículum <br /> en nuestra plataforma
            </h1>

            <p className="mt-5 text-1xl text-COLOR-CV-595959">
              ¡Forja tu futuro con facilidad! Crea tu currículum en nuestra
              plataforma y destaca en el <br /> camino hacia el éxito.
            </p>

            <div className="text-center md:text-left">
              <NavLink to="/form">
                <Button className="bg-COLOR-CV-F64740 shadow-lg text-COLOR-CV-F2F4F3 w-48 h-12 text-2xl mt-8">
                  Crear CV
                </Button>
              </NavLink>
            </div>
          </div>
        </Fade>
        <Fade right cascade>
          <div className="md:mt-0">
            <Image src={banner} className="w-full md:w-[32rem]" />
          </div>
        </Fade>
      </section>

      <section className="md:mb-20 bg-COLOR-CV-F2F4F3 flex flex-col md:flex-row justify-center w-100 items-center md:gap-24 md:w-100 md:h-35">
        <div className="card">
          <div className="circle bg-COLOR-CV-F64740">
            <h2>01</h2>
          </div>
          <div className="content">
            <p className="text-1xl text-COLOR-CV-595959">
              <strong>Optimización profesional:</strong> <br /> Nuestra
              inteligencia artificial analiza la información proporcionada por
              el usuario y la utiliza para mejorar y optimizar su currículum,
              asegurando que destaque sus fortalezas y habilidades de manera
              efectiva.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="circle bg-COLOR-CV-F7B801">
            <h2>02</h2>
          </div>
          <div className="content">
            <p className="text-1xl text-COLOR-CV-595959">
              <strong>Personalización precisa:</strong> <br /> Mediante
              algoritmos avanzados, nuestra plataforma personaliza el currículum
              de cada usuario según las tendencias y requisitos actuales del
              mercado laboral, aumentando las posibilidades de captar la
              atención de la empresa.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="circle bg-COLOR-CV-292F36">
            <h2>03</h2>
          </div>
          <div className="content">
            <p className="text-1xl text-COLOR-CV-595959">
              <strong>Ahorro de tiempo y esfuerzo:</strong> <br /> Al dejar que
              la inteligencia artificial se encargue de mejorar el currículum,
              los usuarios ahorran tiempo y esfuerzo en el proceso de revisión y
              edición, pudiendo enfocarse en otras áreas importantes de su
              búsqueda de empleo.
            </p>
          </div>
        </div>
      </section>

      <section
        className="mb-20 md:flex md:justify-center md:items-center w-100"
        style={{ height: "32 rem" }}
      >
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src="https://i.ibb.co/26cFGS4/18e20f2e-db44-40c3-ad2a-795d444d56fe.png" />
            <p className="text-COLOR-CV-595959 mx-5 md:mx-12 ml-6 md:text-2xl text-lg text-start">
              Juan se encontraba a la deriva en un mar de competidores, llevando
              consigo sus hard skills y soft skills como la carga de su barco.
              Sin embargo, su CV, como una vela rasgada, le impedía avanzar con
              eficacia hacia su destino deseado en el puerto del empleo. Día
              tras día, enviaba su CV a diferentes empresas, esperando una
              respuesta que nunca llegaba. La desilusión crecía como una sombra
              en su corazón, oscureciendo su esperanza y entusiasmo.
            </p>
          </SwiperSlide>

          <SwiperSlide>
            <img src="https://i.ibb.co/2N3dP1x/5f885c22-ab95-4184-96e6-956d32a4c0a3.png" />
            <p className="text-COLOR-CV-595959 mx-5 md:mx-12 md:text-2xl text-lg text-start">
              Pero un día, Juan encontró nuestro astillero en la web, donde las
              embarcaciones como la suya se reparan y optimizan. Allí, con la
              ayuda de inteligencia artificial, transformamos su CV deslucido en
              una obra maestra de profesionalismo, cambiando sus velas rasgadas
              por otras nuevas y robustas. De repente, su teléfono comenzó a
              sonar, y las invitaciones a entrevistas llenaron su calendario,
              como puertos que lo invitaban a atracar, reconociendo el valor
              potencial de su carga.
            </p>
          </SwiperSlide>

          <SwiperSlide>
            <img src="https://i.ibb.co/njRqpB0/af86c337-97e7-4d90-b39c-7b0cd19fe98a.png" />
            <p className="text-COLOR-CV-595959 mx-5 md:mx-12 md:text-2xl text-lg text-start">
              Ahora, Juan está listo para navegar hacia nuevos horizontes
              laborales con su CV mejorado gracias a nuestra ayuda. Pero la
              decisión final en cada lugar al que llegue dependerá del valor
              potencial de su carga. ¡Haz clic para generar tu CV y comienza tu
              viaje hacia el éxito laboral!
            </p>
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  );
};

export default Home;
