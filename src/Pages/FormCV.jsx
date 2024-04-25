import React, { useRef, useState } from "react";
import "../App.css";
import robot from "../assets/robot.png";
import { Zoom } from "react-reveal";
import { FaCirclePlus } from "react-icons/fa6";
import {
  Select,
  SelectItem,
  Textarea,
  Button,
  Input,
  Chip,
} from "@nextui-org/react";
import { universityCareers } from "../objects/Carrear.js";
import { hardSkill, softSkill } from "../objects/Skills.js";
import { tipoSchool } from "../objects/TypeSchool.js";
import { year } from "../objects/Years.js";

const FormCV = () => {
  //arreglo para la experiencia laboral
  const initialExperienciaLaboral = [
    {
      descLaboral: "",
      fechaFinExplb: "",
      fechaInicioExplb: "",
      nameCompany: "",
      posicion: "",
    },
  ];

  //arreglo para la educacion
  const initialEducation = [
    {
      typeEduc: "",
      nameEduc: "",
      grado: "",
      ciclo: "",
      fechaInicioEduc: "",
      fechaFinEduc: "",
    },
  ];

  const selectRef = useRef(null);
  const [inputText, setInputText] = useState("");

  const [section, setSection] = useState(1);

  const [numEducations, setNumEducations] = useState(1);
  const [activeEducation, setActiveEducation] = useState(0);

  const [numExperiencia, setNumExperiencia] = useState(1);
  const [activeExperiencia, setActiveExperiencia] = useState(0);

  const [experienciaLaboral, setExperienciaLaboral] = useState(
    initialExperienciaLaboral
  );
  const [education, setEducation] = useState(initialEducation);

  let globalSelectedHard = [];
  let globalSelectedSoft = [];

  //objeto general declarado para el formulario
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    profession: "",
    correo: "",
    telefono: "",
    linkdorGit: "",
    hardSkill: globalSelectedHard,
    softSkill: globalSelectedSoft,
    aboutMe: "",
    ExperienciaLaboral: [...experienciaLaboral],
    Education: [...education],
  });

  const handleShowSelectedHard = () => {
    globalSelectedHard = Array.from(selectRef.current.selectedOptions).map(
      (option) => option.text
    );
    console.log(globalSelectedHard);
    setFormData((prevState) => ({
      ...prevState,
      hardSkill: globalSelectedHard,
    }));
  };

  const handleShowSelectedSoft = () => {
    globalSelectedSoft = Array.from(selectRef.current.selectedOptions).map(
      (option) => option.text
    );
    console.log(globalSelectedSoft);
    setFormData((prevState) => ({
      ...prevState,
      softSkill: globalSelectedSoft,
    }));
  };

  //funcion para tomar los valores de los inputs de (formData)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputText(value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //funcion de pasar al siguiente contenedor de la "Experiencia Laboral"
  const handleAddExperiencia = () => {
    setNumExperiencia(numExperiencia + 1);
    setActiveExperiencia(numExperiencia); // Activar el nuevo formulario agregado

    setExperienciaLaboral([
      ...experienciaLaboral,
      {
        descLaboral: "",
        fechaFinExplb: "",
        fechaInicioExplb: "",
        nameCompany: "",
        posicion: "",
      },
    ]);
  };

  //funcion para tomar los valores de los inputs y selects de "experienciaLaboral"
  const handleInputChangeExpLb = (e, index, field) => {
    const value = e.target.value;
    setInputText(value);
    const updatedExperiencia = [...experienciaLaboral];
    updatedExperiencia[index][field] = value;
    setExperienciaLaboral(updatedExperiencia);
  };

  //funcion para actualizar el atributo del objeto "Formdata" en la experienciaLaboral
  const handleUpdateExperienciaLaboral = () => {
    setFormData({ ...formData, ExperienciaLaboral: experienciaLaboral });
    setInputText("");
    setSection(section + 1); // Avanzar a la siguiente sección
  };

  const handleAddEducation = () => {
    setNumEducations(numEducations + 1);
    setActiveEducation(numEducations); // Activar el nuevo formulario agregado

    setEducation([
      ...education,
      {
        typeEduc: "",
        nameEduc: "",
        grado: "",
        ciclo: "",
        fechaInicioEduc: "",
        fechaFinEduc: "",
      },
    ]);
  };

  //funcion para tomar los valores de los inputs y selects de "experienciaLaboral"
  const handleInputChangeEducation = (e, index, field) => {
    const value = e.target.value;
    setInputText(value);
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  const handleUpdateEducation = () => {
    setFormData({ ...formData, Education: education });
    setInputText("");
    setSection(section + 1); // Avanzar a la siguiente sección
  };

  //funcion para cambiar de seccion
  const handleNextSection = () => {
    setInputText("");
    setSection(section + 1); // Avanzar a la siguiente sección
  };

   //funcion para retroceder la seccion
   const handleBackSection = () => {
    setSection(section - 1); // Retroceder a la anterior sección
  };

  const testFomr = () => {
    const data = JSON.stringify(formData);
    const data2 = JSON.parse(data);
    console.log(data2);
  };

  return (
    <>
      <form className="flex flex-col justify-center items-center">
        {/* seccion de los nombres y carrera del usuario */}
        {section === 1 && (
          <section className="flex flex-col justify-center items-center my-24 mx-5">
            <h2 className="md:text-3xl text-center text-2xl font-bold text-COLOR-CV-292F36">
              Para ayudarte, indica tu nombre completo, te estoy mirando
            </h2>
            <Zoom top cascade>
              <div className="sectio-robot">
                <div className="robot-img">
                  <img src={robot} className="w-72" />
                </div>

                <div className="eyes-container">
                  <div className="eye left-eye">
                    <div
                      className="pupil"
                      style={{
                        transform: `translateX(${inputText.length * 0.4}px)`,
                        top:
                          inputText.length >= 17
                            ? "45%"
                            : inputText.length >= 1
                            ? "45%"
                            : "0%", // Posición inicial en el centro, luego baja a 45% cuando se escribe
                        left:
                          inputText.length >= 20
                            ? "-90%"
                            : inputText.length >= 17
                            ? "-70%"
                            : inputText.length >= 1
                            ? "-75%"
                            : "0%", // Posición inicial en el centro, luego baja a -70% cuando se escribe
                      }}
                    ></div>
                  </div>
                  <div className="eye right-eye">
                    <div
                      className="pupil"
                      style={{
                        transform: `translateX(${inputText.length * 0.4}px)`,
                        top:
                          inputText.length >= 17
                            ? "45%"
                            : inputText.length >= 1
                            ? "45%"
                            : "0%", // Posición inicial en el centro, luego baja a 45% cuando se escribe
                        left:
                          inputText.length >= 20
                            ? "-90%"
                            : inputText.length >= 17
                            ? "-70%"
                            : inputText.length >= 1
                            ? "-75%"
                            : "0%", // Posición inicial en el centro, luego baja a -70% cuando se escribe
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </Zoom>

            <Input
              id="name"
              type="text"
              label="Nombre completo..."
              className="md:w-999 mt-10 mb-5"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <Input
              id="lastname"
              type="text"
              label="Apellidos completos..."
              className="md:w-999 mb-5"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
            />
            <Select
              label="Nombre de profesion"
              placeholder="Selecciona una profesion.."
              onChange={handleInputChange}
              className="md:w-999 "
              name="profession"
              scrollShadowProps={{
                isEnabled: false,
              }}
            >
              {universityCareers.map((carrer) => (
                <SelectItem
                  className="text-COLOR-CV-292F36"
                  key={carrer.value}
                  value={carrer.value}
                >
                  {carrer.value}
                </SelectItem>
              ))}
            </Select>

            <Button
              className="bg-COLOR-CV-F64740 shadow-lg text-COLOR-CV-F2F4F3 w-32 text-1xl mt-8"
              onClick={handleNextSection} // Avanzar a la siguiente sección
            >
              siguiente
            </Button>
          </section>
        )}

        {/* seccion de los contactos del usuario */}
        {section === 2 && (
          <section className="flex flex-col justify-center items-center my-24 mx-5">
            <h2 className="md:text-3xl text-center text-2xl font-bold text-COLOR-CV-292F36">
              Ahora cuentanos un poco acerca de tu experiencia profesional
            </h2>
            <Zoom top cascade>
              <div className="sectio-robot">
                <div className="robot-img">
                  <img src={robot} className="w-72" />
                </div>

                <div className="eyes-container">
                  <div className="eye left-eye">
                    <div
                      className="pupil"
                      style={{
                        transform: `translateX(${inputText.length * 0.4}px)`,
                        top:
                          inputText.length >= 17
                            ? "45%"
                            : inputText.length >= 1
                            ? "45%"
                            : "0%", // Posición inicial en el centro, luego baja a 45% cuando se escribe
                        left:
                          inputText.length >= 20
                            ? "-90%"
                            : inputText.length >= 17
                            ? "-70%"
                            : inputText.length >= 1
                            ? "-75%"
                            : "0%", // Posición inicial en el centro, luego baja a -70% cuando se escribe
                      }}
                    ></div>
                  </div>
                  <div className="eye right-eye">
                    <div
                      className="pupil"
                      style={{
                        transform: `translateX(${inputText.length * 0.4}px)`,
                        top:
                          inputText.length >= 17
                            ? "45%"
                            : inputText.length >= 1
                            ? "45%"
                            : "0%", // Posición inicial en el centro, luego baja a 45% cuando se escribe
                        left:
                          inputText.length >= 20
                            ? "-90%"
                            : inputText.length >= 17
                            ? "-70%"
                            : inputText.length >= 1
                            ? "-75%"
                            : "0%", // Posición inicial en el centro, luego baja a -70% cuando se escribe
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </Zoom>
            <Input
              id="telefono"
              type="text"
              label="telefono..."
              name="telefono"
              className="md:w-999 mt-10 mb-5"
              value={formData.telefono}
              onChange={handleInputChange}
            />
            <Input
              id="correo"
              type="email"
              label="Correo electronico..."
              name="correo"
              className="md:w-999 mb-5"
              value={formData.correo}
              onChange={handleInputChange}
            />
            <Input
              id="linkdorGit"
              type="text"
              label="Linkedin o Github..."
              name="linkdorGit"
              className="md:w-999"
              value={formData.linkdorGit}
              onChange={handleInputChange}
            />

            <div className="flex gap-5">
              <Button
                className="bg-COLOR-CV-F64740 shadow-lg text-COLOR-CV-F2F4F3 w-32 text-1xl mt-8"
                onClick={handleBackSection} // Retroceder a la anterior sección
              >
                anterior
              </Button>
              <Button
                className="bg-COLOR-CV-F64740 shadow-lg text-COLOR-CV-F2F4F3 w-32 text-1xl mt-8"
                onClick={handleNextSection} // Avanz  ar a la siguiente sección
              >
                siguiente
              </Button>
            </div>
          </section>
        )}

        {/* seccion de la educacion del usuario */}
        {section === 3 && (
          <section className="flex flex-col justify-center items-center my-24 mx-5">
            <h2 className="md:text-3xl text-center text-2xl font-bold text-COLOR-CV-292F36">
              ¡Queremos conocerte mejor! Cuéntanos un poco sobre ti: tus
              intereses y lo que te hace único.
            </h2>
            <Zoom top cascade>
              <div className="sectio-robot">
                <div className="robot-img">
                  <img src={robot} className="w-72" />
                </div>

                <div className="eyes-container">
                  <div className="eye left-eye">
                    <div
                      className="pupil"
                      style={{
                        transform: `translateX(${inputText.length * 0.4}px)`,
                        top:
                          inputText.length >= 17
                            ? "45%"
                            : inputText.length >= 1
                            ? "45%"
                            : "0%", // Posición inicial en el centro, luego baja a 45% cuando se escribe
                        left:
                          inputText.length >= 20
                            ? "-90%"
                            : inputText.length >= 17
                            ? "-70%"
                            : inputText.length >= 1
                            ? "-75%"
                            : "0%", // Posición inicial en el centro, luego baja a -70% cuando se escribe
                      }}
                    ></div>
                  </div>
                  <div className="eye right-eye">
                    <div
                      className="pupil"
                      style={{
                        transform: `translateX(${inputText.length * 0.4}px)`,
                        top:
                          inputText.length >= 17
                            ? "45%"
                            : inputText.length >= 1
                            ? "45%"
                            : "0%", // Posición inicial en el centro, luego baja a 45% cuando se escribe
                        left:
                          inputText.length >= 20
                            ? "-90%"
                            : inputText.length >= 17
                            ? "-70%"
                            : inputText.length >= 1
                            ? "-75%"
                            : "0%", // Posición inicial en el centro, luego baja a -70% cuando se escribe
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </Zoom>

            <button
              type="button"
              className="flex md:justify-center items-center gap-3 text-COLOR-CV-F64740 md:relative relative left-32 md:left-96"
              onClick={handleAddEducation}
            >
              <FaCirclePlus /> <span>Agregar Educacion</span>
            </button>

            {[...Array(numEducations)].map((_, index) => (
              <div
                key={index}
                className="w-100 md:w-auto"
                style={{
                  display: index === activeEducation ? "block" : "none",
                }}
              >
                <Select
                  label={`Tipo de educacion ${index + 1}`}
                  placeholder="Selecciona el tipo.."
                  className="md:w-999 mt-10 mb-5"
                  value={education[index].typeEduc}
                  onChange={(e) =>
                    handleInputChangeEducation(e, index, "typeEduc")
                  }
                  scrollShadowProps={{
                    isEnabled: false,
                  }}
                >
                  {tipoSchool.map((tipo) => (
                    <SelectItem
                      className="text-COLOR-CV-292F36"
                      key={tipo.value}
                      value={tipo.value}
                    >
                      {tipo.value}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  id={`nameEduc${index}`}
                  type="text"
                  label="Nombre del Inst o Uni..."
                  className="md:w-999 mb-5"
                  value={education[index].nameEduc}
                  onChange={(e) =>
                    handleInputChangeEducation(e, index, "nameEduc")
                  }
                />
                <div className="flex w-100 justify-center items-center gap-3">
                  <Select
                    ref={selectRef}
                    label="Fecha inicial"
                    placeholder="Fecha de inicio.."
                    className="md:w-490 mb-5"
                    value={education[index].fechaInicioEduc}
                    onChange={(e) =>
                      handleInputChangeEducation(e, index, "fechaInicioEduc")
                    }
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                  >
                    {year.map((yr) => (
                      <SelectItem
                        className="text-COLOR-CV-292F36"
                        key={yr.value}
                        value={yr.value}
                      >
                        {yr.value}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    ref={selectRef}
                    label="Fecha final"
                    placeholder="Fecha de fin.."
                    className="md:w-490 mb-5"
                    value={education[index].fechaFinEduc}
                    onChange={(e) =>
                      handleInputChangeEducation(e, index, "fechaFinEduc")
                    }
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                  >
                    {year.map((yr) => (
                      <SelectItem
                        className="text-COLOR-CV-292F36"
                        key={yr.value}
                        value={yr.value}
                      >
                        {yr.value}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="flex justify-center w-100 items-center gap-3">
                  <Input
                    id={`grado${index}`}
                    type="text"
                    label="Grado..."
                    className="md:w-490 mb-5"
                    value={education[index].grado}
                    onChange={(e) =>
                      handleInputChangeEducation(e, index, "grado")
                    }
                  />
                  <Input
                    id={`ciclo${index}`}
                    type="text"
                    label="Ciclo..."
                    className="md:w-490 mb-5"
                    value={education[index].ciclo}
                    onChange={(e) =>
                      handleInputChangeEducation(e, index, "ciclo")
                    }
                  />
                </div>
              </div>
            ))}
            <div className="flex gap-5">
              <Button
                className="bg-COLOR-CV-F64740 shadow-lg text-COLOR-CV-F2F4F3 w-32 text-1xl mt-8"
                onClick={handleBackSection} // Retroceder a la anterior sección
              >
                anterior
              </Button>
              <Button
                className="bg-COLOR-CV-F64740 shadow-lg text-COLOR-CV-F2F4F3 w-32 text-1xl mt-8"
                onClick={handleUpdateEducation}
              >
                siguiente
              </Button>
            </div>
          </section>
        )}

        {/* seccion de la experiencia laboral del usuario */}
        {section === 4 && (
          <section className="flex flex-col justify-center items-center my-24 mx-5">
            <h2 className="md:text-3xl text-center text-2xl font-bold text-COLOR-CV-292F36">
              ¡Queremos conocerte mejor! Cuéntanos un poco sobre ti: tus
              intereses y lo que te hace único.
            </h2>
            <Zoom top cascade>
              <div className="sectio-robot">
                <div className="robot-img">
                  <img src={robot} className="w-72" />
                </div>

                <div className="eyes-container">
                  <div className="eye left-eye">
                    <div
                      className="pupil"
                      style={{
                        transform: `translateX(${inputText.length * 0.4}px)`,
                        top:
                          inputText.length >= 17
                            ? "45%"
                            : inputText.length >= 1
                            ? "45%"
                            : "0%", // Posición inicial en el centro, luego baja a 45% cuando se escribe
                        left:
                          inputText.length >= 20
                            ? "-90%"
                            : inputText.length >= 17
                            ? "-70%"
                            : inputText.length >= 1
                            ? "-75%"
                            : "0%", // Posición inicial en el centro, luego baja a -70% cuando se escribe
                      }}
                    ></div>
                  </div>
                  <div className="eye right-eye">
                    <div
                      className="pupil"
                      style={{
                        transform: `translateX(${inputText.length * 0.4}px)`,
                        top:
                          inputText.length >= 17
                            ? "45%"
                            : inputText.length >= 1
                            ? "45%"
                            : "0%", // Posición inicial en el centro, luego baja a 45% cuando se escribe
                        left:
                          inputText.length >= 20
                            ? "-90%"
                            : inputText.length >= 17
                            ? "-70%"
                            : inputText.length >= 1
                            ? "-75%"
                            : "0%", // Posición inicial en el centro, luego baja a -70% cuando se escribe
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </Zoom>
            <button
              type="button"
              className="flex md:justify-center items-center gap-3 text-COLOR-CV-F64740 md:relative relative left-32 md:left-96"
              onClick={handleAddExperiencia}
            >
              <FaCirclePlus /> <span>Agregar Experiencia</span>
            </button>
            {[...Array(numExperiencia)].map((_, index) => (
              <div
                key={index}
                className="w-100 md:w-auto"
                style={{
                  display: index === activeExperiencia ? "block" : "none",
                }}
              >
                <Input
                  ref={selectRef}
                  id="nameCompany"
                  type="text"
                  label={`Nombre de la Empresa ${index + 1}`}
                  className="md:w-999 mb-5 mt-10"
                  value={experienciaLaboral[index].nameCompany}
                  onChange={(e) =>
                    handleInputChangeExpLb(e, index, "nameCompany")
                  }
                />
                <Input
                  ref={selectRef}
                  id="posicion"
                  type="text"
                  label="Posicion..."
                  className="md:w-999 mb-5"
                  value={experienciaLaboral[index].posicion}
                  onChange={(e) => handleInputChangeExpLb(e, index, "posicion")}
                />

                <div className="flex w-100 justify-center items-center gap-3">
                  <Select
                    ref={selectRef}
                    label="Fecha inicial"
                    placeholder="Fecha de inicio.."
                    className="md:w-490 mb-5"
                    value={experienciaLaboral[index].fechaInicioExplb}
                    onChange={(e) =>
                      handleInputChangeExpLb(e, index, "fechaInicioExplb")
                    }
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                  >
                    {year.map((yr) => (
                      <SelectItem
                        className="text-COLOR-CV-292F36"
                        key={yr.value}
                        value={yr.value}
                      >
                        {yr.value}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    ref={selectRef}
                    label="Fecha final"
                    placeholder="Fecha de fin.."
                    className="md:w-490 mb-5"
                    value={experienciaLaboral[index].fechaFinExplb}
                    onChange={(e) =>
                      handleInputChangeExpLb(e, index, "fechaFinExplb")
                    }
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                  >
                    {year.map((yr) => (
                      <SelectItem
                        className="text-COLOR-CV-292F36"
                        key={yr.value}
                        value={yr.value}
                      >
                        {yr.value}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <Textarea
                  ref={selectRef}
                  placeholder="Escribe tu descripcion"
                  className="md:w-999 mb-5"
                  value={experienciaLaboral[index].descLaboral}
                  onChange={(e) =>
                    handleInputChangeExpLb(e, index, "descLaboral")
                  }
                />
              </div>
            ))}

            <div className="flex gap-5">
              <Button
                className="bg-COLOR-CV-F64740 shadow-lg text-COLOR-CV-F2F4F3 w-32 text-1xl mt-8"
                onClick={handleBackSection} // Retroceder a la anterior sección
              >
                anterior
              </Button>

              <Button
                className="bg-COLOR-CV-F64740 shadow-lg text-COLOR-CV-F2F4F3 w-32 text-1xl mt-8"
                onClick={handleUpdateExperienciaLaboral}
              >
                siguiente
              </Button>
              <Button
                onClick={handleUpdateExperienciaLaboral}
                className="bg-COLOR-CV-595959 shadow-lg text-COLOR-CV-F2F4F3 w-56 text-1xl mt-8"
              >
                No cuento con experiencia
              </Button>
            </div>
          </section>
        )}

        {/* seccion de las hard y soft Skills del usuario */}
        {section === 5 && (
          <section className="flex flex-col justify-center items-center my-24 mx-5">
            <h2 className="md:text-3xl text-center text-2xl font-bold text-COLOR-CV-292F36">
              ¡Queremos conocerte mejor! Cuéntanos un poco sobre ti: tus
              intereses y lo que te hace único.
            </h2>
            <Zoom top cascade>
              <div className="sectio-robot">
                <div className="robot-img">
                  <img src={robot} className="w-72" />
                </div>

                <div className="eyes-container">
                  <div className="eye left-eye">
                    <div
                      className="pupil"
                      style={{
                        transform: `translateX(${inputText.length * 0.4}px)`,
                        top:
                          inputText.length >= 17
                            ? "45%"
                            : inputText.length >= 1
                            ? "45%"
                            : "0%", // Posición inicial en el centro, luego baja a 45% cuando se escribe
                        left:
                          inputText.length >= 20
                            ? "-90%"
                            : inputText.length >= 17
                            ? "-70%"
                            : inputText.length >= 1
                            ? "-75%"
                            : "0%", // Posición inicial en el centro, luego baja a -70% cuando se escribe
                      }}
                    ></div>
                  </div>
                  <div className="eye right-eye">
                    <div
                      className="pupil"
                      style={{
                        transform: `translateX(${inputText.length * 0.4}px)`,
                        top:
                          inputText.length >= 17
                            ? "45%"
                            : inputText.length >= 1
                            ? "45%"
                            : "0%", // Posición inicial en el centro, luego baja a 45% cuando se escribe
                        left:
                          inputText.length >= 20
                            ? "-90%"
                            : inputText.length >= 17
                            ? "-70%"
                            : inputText.length >= 1
                            ? "-75%"
                            : "0%", // Posición inicial en el centro, luego baja a -70% cuando se escribe
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </Zoom>

            <div className="flex w-100 justify-center items-center gap-3">
              <Select
                ref={selectRef}
                items={hardSkill}
                label="Selecciona tus hardSkills"
                variant="bordered"
                isMultiline={true}
                selectionMode="multiple"
                placeholder="Selecionar hard"
                labelPlacement="outside"
                classNames={{
                  base: "md:w-999 mt-10 mb-5",
                  trigger: "min-h-12 py-2 bg-COLOR-CV-INPUT border-0",
                }}
                renderValue={(items) => {
                  return (
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <Chip key={item.key}>{item.data.name}</Chip>
                      ))}
                    </div>
                  );
                }}
              >
                {(hard) => (
                  <SelectItem key={hard.id} textValue={hard.name}>
                    <div className="flex gap-2 items-center">
                      <div className="flex flex-col">
                        <span className="text-small">{hard.name}</span>
                      </div>
                    </div>
                  </SelectItem>
                )}
              </Select>
              <Button
                className="bg-COLOR-CV-F7B801 shadow-lg text-COLOR-CV-F2F4F3 w-28 text-sm mt-11"
                onClick={handleShowSelectedHard}
              >
                agregar hard
              </Button>
            </div>

            <div className="flex w-100 justify-center items-center gap-3">
              <Select
                ref={selectRef}
                items={softSkill}
                label="Selecciona tus softSkills"
                variant="bordered"
                isMultiline={true}
                selectionMode="multiple"
                placeholder="Selecionar soft"
                labelPlacement="outside"
                classNames={{
                  base: "md:w-999 mb-5",
                  trigger: "min-h-12 py-2 bg-COLOR-CV-INPUT border-0",
                }}
                renderValue={(items) => {
                  return (
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <Chip key={item.key}>{item.data.name}</Chip>
                      ))}
                    </div>
                  );
                }}
              >
                {(soft) => (
                  <SelectItem key={soft.id} textValue={soft.name}>
                    <div className="flex gap-2 items-center">
                      <div className="flex flex-col">
                        <span className="text-small">{soft.name}</span>
                      </div>
                    </div>
                  </SelectItem>
                )}
              </Select>
              <Button
                className="bg-COLOR-CV-F7B801 shadow-lg text-COLOR-CV-F2F4F3 w-28 text-sm"
                onClick={handleShowSelectedSoft}
              >
                agregar soft
              </Button>
            </div>
            <div className="flex gap-5">
              <Button
                className="bg-COLOR-CV-F64740 shadow-lg text-COLOR-CV-F2F4F3 w-32 text-1xl mt-8"
                onClick={handleBackSection} // Retroceder a la anterior sección
              >
                anterior
              </Button>
              <Button
                className="bg-COLOR-CV-F64740 shadow-lg text-COLOR-CV-F2F4F3 w-32 text-1xl mt-8"
                onClick={handleNextSection}
              >
                siguiente
              </Button>
            </div>
          </section>
        )}

        {/* seccion de la descripcion del perfil profesional del usuario */}
        {section === 6 && (
          <section className="flex flex-col justify-center items-center my-24 mx-5">
            <h2 className="md:text-3xl text-center text-2xl font-bold text-COLOR-CV-292F36">
              Para ayudarte, indica tu nombre completo, te estoy mirando
            </h2>
            <Zoom top cascade>
              <div className="sectio-robot">
                <div className="robot-img">
                  <img src={robot} className="w-72" />
                </div>

                <div className="eyes-container">
                  <div className="eye left-eye">
                    <div
                      className="pupil"
                      style={{
                        transform: `translateX(${inputText.length * 0.4}px)`,
                        top:
                          inputText.length >= 17
                            ? "45%"
                            : inputText.length >= 1
                            ? "45%"
                            : "0%", // Posición inicial en el centro, luego baja a 45% cuando se escribe
                        left:
                          inputText.length >= 20
                            ? "-90%"
                            : inputText.length >= 17
                            ? "-70%"
                            : inputText.length >= 1
                            ? "-75%"
                            : "0%", // Posición inicial en el centro, luego baja a -70% cuando se escribe
                      }}
                    ></div>
                  </div>
                  <div className="eye right-eye">
                    <div
                      className="pupil"
                      style={{
                        transform: `translateX(${inputText.length * 0.4}px)`,
                        top:
                          inputText.length >= 17
                            ? "45%"
                            : inputText.length >= 1
                            ? "45%"
                            : "0%", // Posición inicial en el centro, luego baja a 45% cuando se escribe
                        left:
                          inputText.length >= 20
                            ? "-90%"
                            : inputText.length >= 17
                            ? "-70%"
                            : inputText.length >= 1
                            ? "-75%"
                            : "0%", // Posición inicial en el centro, luego baja a -70% cuando se escribe
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </Zoom>

            <Textarea
              placeholder="Perfil profesional"
              className="md:w-999 mt-10 mb-5"
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleInputChange}
            />
            <div className="flex gap-5">
              <Button
                className="bg-COLOR-CV-F64740 shadow-lg text-COLOR-CV-F2F4F3 w-32 text-1xl mt-8"
                onClick={handleBackSection} // Retroceder a la anterior sección
              >
                anterior
              </Button>
              <Button
                className="bg-COLOR-CV-F64740 shadow-lg text-COLOR-CV-F2F4F3 w-32 text-1xl mt-8"
                onClick={testFomr} // Avanzar a la siguiente sección
              >
                siguiente
              </Button>
            </div>
          </section>
        )}
      </form>
    </>
  );
};

export default FormCV;
