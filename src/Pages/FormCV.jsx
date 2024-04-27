import React, { useRef, useState } from "react";
import "../App.css";
import { FaCirclePlus } from "react-icons/fa6";
import {
  Select,
  SelectItem,
  Textarea,
  Button,
  Input,
  Chip,
} from "@nextui-org/react";
// import { universityCareers } from "../objects/Carrear.js";
import { hardSkill, softSkill } from "../objects/Skills.js";
import { tipoSchool } from "../objects/TypeSchool.js";
import { Nivel } from "../objects/Nivel.js";
import { year } from "../objects/Years.js";
import Robot from "../Components/Robot.jsx";

const FormCV = () => {
  //arreglo para la experiencia laboral
  const initialExperienciaLaboral = [
    {
      descripcionLaboral: "",
      feFinal: "",
      feInicial: "",
      nameEmpresa: "",
      posicionEmp: "",
    },
  ];

  //arreglo para la educacion
  const initialEducation = [
    { 
      tipoEducacion: "",
      nameEdu: "",
      grado: "",
      fecha_inicial: "",
      fecha_final: "",
    },
  ];

  //arreglo para los cursos
  const initialCurso = [
    {
      nombreCurso: "",
      nivel: "",
    },
  ];

  const selectRef = useRef(null);
  const [inputText, setInputText] = useState("");

  const [section, setSection] = useState(1);

  const [numEducations, setNumEducations] = useState(1);
  const [activeEducation, setActiveEducation] = useState(0);

  const [numCurso, setnumCurso] = useState(1);
  const [activeCurso, setactiveCurso] = useState(0);

  const [numExperiencia, setNumExperiencia] = useState(1);
  const [activeExperiencia, setActiveExperiencia] = useState(0);

  const [experienciaLaboral, setExperienciaLaboral] = useState(
    initialExperienciaLaboral
  );
  const [education, setEducation] = useState(initialEducation);

  const [cursos, setcursos] = useState(initialCurso);

  let globalSelectedHard = [];
  let globalSelectedSoft = [];
  const [disableBotonSoft, setdisableBotonSoft] = useState(true);
  const [disableBotonNext, setdisableBotonNext] = useState(true);

  //objeto general declarado para el formulario
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    application_position: "",
    email: "",
    phone: "",
    linkGit: "",
    hard: globalSelectedHard,
    soft: globalSelectedSoft,
    Experience: [...experienciaLaboral],
    Educacion: [...education],
    curso:[...cursos],
  });

  const handleShowSelectedHard = () => {
    globalSelectedHard = Array.from(selectRef.current.selectedOptions).map(
      (option) => option.text
    );
    console.log(globalSelectedHard);
    setFormData((prevState) => ({
      ...prevState,
      hard: globalSelectedHard,
    }));
    setdisableBotonSoft(false);
  };

  const handleShowSelectedSoft = () => {
    globalSelectedSoft = Array.from(selectRef.current.selectedOptions).map(
      (option) => option.text
    );
    console.log(globalSelectedSoft);
    setFormData((prevState) => ({
      ...prevState,
      soft: globalSelectedSoft,
    }));
    setdisableBotonNext(false);
  };

  //funcion para tomar los valores de los inputs de (formData)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Si el campo es el teléfono, intenta convertir el valor a un número
    const newValue = name === 'phone' ? parseInt(value, 10) : value;
  
    setInputText(newValue); // Actualiza el valor mostrado en el input (opcional)
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  

  //funcion de pasar al siguiente contenedor de la "Experiencia Laboral"
  const handleAddExperiencia = () => {
    setNumExperiencia(numExperiencia + 1);
    setActiveExperiencia(numExperiencia); // Activar el nuevo formulario agregado

    setExperienciaLaboral([
      ...experienciaLaboral,
      {
        descripcionLaboral: "",
        feFinal: "",
        feInicial: "",
        nameEmpresa: "",
        posicionEmp: "",
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
    setFormData({ ...formData, Experience: experienciaLaboral });
    setInputText("");
    setSection(section + 1); // Avanzar a la siguiente sección
  };

  const handleAddEducation = () => {
    setNumEducations(numEducations + 1);
    setActiveEducation(numEducations); // Activar el nuevo formulario agregado

    setEducation([
      ...education,
      {
        tipoEducacion: "",
        nameEdu: "",
        grado: "",
        fecha_inicial: "",
        fecha_final: "",
      },
    ]);
  };

  const handleAddCursos = () => {
    setnumCurso(numCurso + 1);
    setactiveCurso(numCurso); // Activar el nuevo formulario agregado

    setcursos([
      ...cursos,
      {
        nombreCurso: "",
        nivel: "",
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
    setFormData({ ...formData, Educacion: education });
    setInputText("");
    setSection(section + 1); // Avanzar a la siguiente sección
  };

  //funcion para tomar los valores de los inputs y selects de "cursos"
  const handleInputChangeCurso = (e, index, field) => {
    const value = e.target.value;
    setInputText(value);
    const updatedCurso = [...cursos];
    updatedCurso[index][field] = value;
    setEducation(updatedCurso);
  };

  const handleUpdateCurso = () => {
    setFormData({ ...formData, curso: cursos });
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


  const enviarDatosAPI = async () => {

    try {
      const response = await fetch('https://astillero-cv.onrender.com/prueba', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Error al enviar los datos a la API');
      }
  
      const data = await response.json();
      console.log('Respuesta de la API:', data);
      // Aquí puedes realizar acciones adicionales con la respuesta de la API, si es necesario
    } catch (error) {
      console.error('Error para enviar los datos a la API:', error.message);
      // Aquí puedes manejar el error de manera adecuada según tu aplicación
    }
  };



  const testFomr = () => {
    const data = JSON.stringify(formData)
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
            <Robot inputText={inputText} />

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
              id="last_name"
              type="text"
              label="Apellidos completos..."
              className="md:w-999 mb-5"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
            />
             <Input
              type="text"
              label="Carrea profesional..."
              className="md:w-999 mb-5"
              name="application_position"
              value={formData.application_position}
              onChange={handleInputChange}
            />
            {/* <Select
              label="Nombre de profesion"
              placeholder="Selecciona una profesion.."
              onChange={handleInputChange}
              className="md:w-999 "
              name="application_position"
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
            </Select> */}

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

            <Robot inputText={inputText} />

            <Input
              type="number"
              label="telefono..."
              name="phone"
              className="md:w-999 mt-10 mb-5"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <Input
              id="email"
              type="email"
              label="Correo electronico..."
              name="email"
              className="md:w-999 mb-5"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Input
              id="linkGit"
              type="text"
              label="Linkedin o Github..."
              name="linkGit"
              className="md:w-999"
              value={formData.linkGit}
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

            <Robot inputText={inputText} />

            <div className="flex w-100 justify-end">
              <button
                type="button"
                className="flex md:justify-center items-center gap-3 text-COLOR-CV-F64740"
                onClick={handleAddEducation}
              >
                <FaCirclePlus /> <span>Agregar Educacion</span>
              </button>
            </div>

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
                  value={education[index].tipoEducacion}
                  onChange={(e) =>
                    handleInputChangeEducation(e, index, "tipoEducacion")
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
                  id={`nameEdu${index}`}
                  type="text"
                  label="Nombre del Inst o Uni..."
                  className="md:w-999 mb-5"
                  value={education[index].nameEdu}
                  onChange={(e) =>
                    handleInputChangeEducation(e, index, "nameEdu")
                  }
                />
                <div className="flex w-100 justify-center items-center gap-3">
                  <Select
                    ref={selectRef}
                    label="Fecha inicial"
                    placeholder="Fecha de inicio.."
                    className="md:w-490 mb-5"
                    value={education[index].fecha_inicial}
                    onChange={(e) =>
                      handleInputChangeEducation(e, index, "fecha_inicial")
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
                    value={education[index].fecha_final}
                    onChange={(e) =>
                      handleInputChangeEducation(e, index, "fecha_final")
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

                <Input
                  id={`grado${index}`}
                  type="text"
                  label="Grado..."
                  className="md:w-999 mb-5"
                  value={education[index].grado}
                  onChange={(e) =>
                    handleInputChangeEducation(e, index, "grado")
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
                onClick={handleUpdateEducation}
              >
                siguiente
              </Button>
            </div>
          </section>
        )}

        {/* seccion de los cursos del usuario */}
        {section === 4 && (
          <section className="flex flex-col justify-center items-center my-24 mx-5">
            <h2 className="md:text-3xl text-center text-2xl font-bold text-COLOR-CV-292F36">
              ¡Queremos conocerte mejor! Cuéntanos un poco sobre ti: tus
              intereses y lo que te hace único.
            </h2>

            <Robot inputText={inputText} />

            <div className="flex w-100 justify-end">
              <button
                type="button"
                className="flex md:justify-center items-center gap-3 text-COLOR-CV-F64740"
                onClick={handleAddCursos}
              >
                <FaCirclePlus /> <span>Agregar Curso</span>
              </button>
            </div>

            {[...Array(numCurso)].map((_, index) => (
              <div
                key={index}
                className="w-100 md:w-auto mt-10"
                style={{
                  display: index === activeCurso ? "block" : "none",
                }}
              >
                <Input
                  type="text"
                  label={`Nombre del curso ${index + 1}`}
                  className="md:w-999 mb-5"
                  value={cursos[index].nombreCurso}
                  onChange={(e) =>
                    handleInputChangeCurso(e, index, "nombreCurso")
                  }
                />
                <Select
                  label="Nivel"
                  placeholder="Selecciona el tipo.."
                  className="md:w-999  mb-5"
                  value={cursos[index].nivel}
                  onChange={(e) =>
                    handleInputChangeCurso(e, index, "nivel")
                  }
                  scrollShadowProps={{
                    isEnabled: false,
                  }}
                >
                  {Nivel.map((tipo) => (
                    <SelectItem
                      className="text-COLOR-CV-292F36"
                      key={tipo.value}
                      value={tipo.value}
                    >
                      {tipo.value}
                    </SelectItem>
                  ))}
                </Select>
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
                onClick={handleUpdateCurso}
              >
                siguiente
              </Button>
            </div>
          </section>
        )}

        {/* seccion de la experiencia laboral del usuario */}
        {section === 5 && (
          <section className="flex flex-col justify-center items-center my-24 mx-5">
            <h2 className="md:text-3xl text-center text-2xl font-bold text-COLOR-CV-292F36">
              ¡Queremos conocerte mejor! Cuéntanos un poco sobre ti: tus
              intereses y lo que te hace único.
            </h2>

            <Robot inputText={inputText} />

            <div className="flex w-100 justify-end">
              <button
                type="button"
                className="flex md:justify-center items-center gap-3 text-COLOR-CV-F64740"
                onClick={handleAddExperiencia}
              >
                <FaCirclePlus /> <span>Agregar Experiencia</span>
              </button>
            </div>
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
                  id="nameEmpresa"
                  type="text"
                  label={`Nombre de la Empresa ${index + 1}`}
                  className="md:w-999 mb-5 mt-10"
                  value={experienciaLaboral[index].nameEmpresa}
                  onChange={(e) =>
                    handleInputChangeExpLb(e, index, "nameEmpresa")
                  }
                />
                <Input
                  ref={selectRef}
                  id="posicionEmp"
                  type="text"
                  label="Posicion..."
                  className="md:w-999 mb-5"
                  value={experienciaLaboral[index].posicionEmp}
                  onChange={(e) =>
                    handleInputChangeExpLb(e, index, "posicionEmp")
                  }
                />

                <div className="flex w-100 justify-center items-center gap-3">
                  <Select
                    ref={selectRef}
                    label="Fecha inicial"
                    placeholder="Fecha de inicio.."
                    className="md:w-490 mb-5"
                    value={experienciaLaboral[index].feInicial}
                    onChange={(e) =>
                      handleInputChangeExpLb(e, index, "feInicial")
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
                    value={experienciaLaboral[index].feFinal}
                    onChange={(e) =>
                      handleInputChangeExpLb(e, index, "feFinal")
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
                  value={experienciaLaboral[index].descripcionLaboral}
                  onChange={(e) =>
                    handleInputChangeExpLb(e, index, "descripcionLaboral")
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
              {/* <Button
                onClick={handleUpdateExperienciaLaboral}
                className="bg-COLOR-CV-595959 shadow-lg text-COLOR-CV-F2F4F3 w-56 text-1xl mt-8"
              >
                No cuento con experiencia
              </Button> */}
            </div>
          </section>
        )}

        {/* seccion de las hard y soft Skills del usuario */}
        {section === 6 && (
          <section className="flex flex-col justify-center items-center my-24 mx-5">
            <h2 className="md:text-3xl text-center text-2xl font-bold text-COLOR-CV-292F36">
              ¡Queremos conocerte mejor! Cuéntanos un poco sobre ti: tus
              intereses y lo que te hace único.
            </h2>

            <Robot inputText={inputText} />

            <div className="flex w-100 justify-center items-center gap-3">
              <Select
                ref={selectRef}
                items={hardSkill}
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
                isDisabled={disableBotonSoft}
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
                isDisabled={disableBotonNext}
                className="bg-COLOR-CV-F64740 shadow-lg text-COLOR-CV-F2F4F3 w-32 text-1xl mt-8"
                onClick={enviarDatosAPI}
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
