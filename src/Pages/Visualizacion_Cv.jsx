import React, { useState, useEffect } from 'react';

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { saveAs } from 'file-saver';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button, Spinner } from "@nextui-org/react";
import { jsPDF } from "jspdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

async function createPdf() {
    const doc = new jsPDF();

    // Obtén los datos de myData desde el localStorage
    const data = JSON.parse(localStorage.getItem('myData'));

    doc.setFillColor(48, 162, 193);
    doc.rect(10, 10, 20, 20, 'F');

    // Toma la primera letra de data.name y data.last_name
    const initials = data.name.charAt(0) + data.last_name.charAt(0);

    // Dibuja las iniciales
    doc.setFontSize(23);
    doc.setTextColor(255, 255, 255);
    doc.text(initials, 9 + 5 + 2, 26);

    doc.setFontSize(14);
    doc.setTextColor(48, 162, 193);
    doc.text(`${data.application_position}`, 32, 15);

    doc.setFontSize(22);
    doc.setTextColor(48, 162, 193);
    doc.text(`${data.name} ${data.last_name}`, 20 + 10 + 2, 26);

    // Restablece el tamaño y el color del texto
    doc.setFontSize(13);
    doc.setTextColor(0, 100, 100);

    // Calcula la longitud del apellido y ajusta la posición x de los textos en consecuencia
    const lastNameLength = doc.getStringUnitWidth(data.last_name) * doc.internal.getFontSize();

    doc.text(`Telefono: ${data.phone}`, 30 + lastNameLength, 20);
    doc.text(`Email: ${data.email}`, 30 + lastNameLength, 25);
    doc.text(`LinkGit: ${data.linkGit}`, 30 + lastNameLength, 30);

    doc.setFontSize(15);
    doc.setTextColor(48, 162, 193);
    doc.text('Perfil Profesional', 10, 40);

    // Dibuja una línea debajo del título
    doc.setDrawColor(0);
    doc.setLineWidth(0.3);
    doc.line(10, 42, 200, 42);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    // Divide el texto en líneas que se ajusten al ancho disponible
    const splitAboutResponse = doc.splitTextToSize(data.about_response, 190); // Ajusta el segundo parámetro según el ancho disponible

    // Dibuja cada línea en una nueva posición en el eje y
    let yPosition = 50;
    splitAboutResponse.forEach(line => {
        doc.text(line, 10, yPosition, { align: 'justify' });
        yPosition += 7; // Ajusta este valor según el espacio que quieras entre las líneas
    });

    // Agrega un espacio después de about_response
    yPosition += 4;

    doc.setFontSize(15);
    doc.setTextColor(48, 162, 193);
    doc.text('Habilidades', 10, yPosition);

    // Dibuja una línea debajo del título
    doc.setDrawColor(0);
    doc.setLineWidth(0.3);
    doc.line(10, yPosition + 2, 200, yPosition + 2);


    // habilidades texto
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);

    let column1X = 10;
    let column2X = 105;
    let yPositionSoft = yPosition + 10;
    let yPositionHard = yPosition + 10;

    // Itera sobre las habilidades 'soft'
    data.soft.forEach((item, index) => {
        doc.text('• ' + item, column1X, yPositionSoft, { align: 'justify', maxWidth: 90 });
        yPositionSoft += 10;
    });

    // Itera sobre las habilidades 'hard'
    data.hard.forEach((item, index) => {
        doc.text('• ' + item, column2X, yPositionHard, { align: 'justify', maxWidth: 90 });
        yPositionHard += 10;
    });

    // Calcula la posición inicial de 'Experiencia Laboral' basándote en la posición final de data.soft y data.hard
    let yPositionExperience = Math.max(yPositionSoft, yPositionHard) + 1;

    doc.setFontSize(15);
    doc.setTextColor(48, 162, 193);
    doc.text('Experiencia Laboral', 10, yPositionExperience);

    // Dibuja una línea debajo del título
    doc.setDrawColor(0);
    doc.setLineWidth(0.3);
    doc.line(10, yPositionExperience + 2, 200, yPositionExperience + 2);

    // Experiencia Laboral texto
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    let yPosition2 = yPositionExperience + 10;
    data.Experience.forEach((item, index) => {
        doc.text(`${item.nameEmpresa} - ${item.posicionEmp} | ${item.feInicial} - ${item.feFinal}`, 10, yPosition2);
        const splitDescription = doc.splitTextToSize(item.descripcionLaboral, 180); // Ajusta el segundo parámetro según el ancho disponible
        doc.text(splitDescription, 10, yPosition2 + 6, { align: 'justify', maxWidth: 190 });
        yPosition2 += 5 * (splitDescription.length + 1); // Ajusta la posición en el eje y para la siguiente descripción
    });

    // Agrega un espacio después de Experiencia Laboral
    yPosition2 += 3;

    doc.setFontSize(15);
    doc.setTextColor(48, 162, 193);
    doc.text('Educación', 12, yPosition2);

    // Dibuja una línea debajo del título
    doc.setDrawColor(0);
    doc.setLineWidth(0.3);
    doc.line(10, yPosition2 + 2, 200, yPosition2 + 2);

    // educaion texto
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    let yPosition3 = yPosition2 + 3; // Inicia yPosition3 después del título de Educación
    data.Educacion.forEach((item, index) => {
        doc.text(`• ${item.tipoEducacion} - ${item.nameEdu} | ${item.fecha_inicial} - ${item.fecha_final}`, 10, yPosition3 + 5);
        const splitCarrera = doc.splitTextToSize(item.grado, 180); // Ajusta el segundo parámetro según el ancho disponible
        doc.text('Grado:' + splitCarrera, 10, yPosition3 + 11, { align: 'justify', maxWidth: 190 });
        yPosition3 += 7 * (splitCarrera.length + 1); // Ajusta la posición en el eje y para la siguiente descripción
    });



    // Convierte el documento PDF a un blob
    const blob = await doc.output('blob');

    // Convierte el blob a una URL
    const url = URL.createObjectURL(blob);

    return url;
}


const VisualizacionCv = () => {

    const [pdfUrl, setPdfUrl] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [numPages, setNumPages] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const generatePdf = async () => {
            const url = await createPdf(); // Llama a createPdf sin argumentos
            setPdfUrl(url);

            // Limpia la URL del blob cuando el componente se desmonta
            return () => URL.revokeObjectURL(url);
        };

        // Verifica si los datos ya están cargados
        const data = JSON.parse(localStorage.getItem('myData'));
        if (data) {
            generatePdf().then(() => setIsLoading(false)); // Establece isLoading en false después de que el PDF esté listo
        }
    }, []);

    const handleDownload = async () => {
        const data = JSON.parse(localStorage.getItem('myData'));
        const name = data.name;
        const lastName = data.last_name;

        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `${name} ${lastName}_CV.pdf`; // Aquí puedes especificar el nombre del archivo
        link.click();
    }

    const handlePrevPage = () => {
        setCurrentPage(oldPage => Math.max(oldPage - 1, 1));
    };

    const handleNextPage = () => {
        if (currentPage < numPages) {
            setCurrentPage(oldPage => oldPage + 1);
        }
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <>
                <p className='text-2xl md:justify-center md:text-center mt-10'>Visualización del CV ATS</p>

                <Button className='text-COLOR-CV-F2F4F3 md:ml-[50rem] mt-10' color="success" onClick={handleDownload}>
                    Descargar PDF
                </Button>

                <div>
                    {isLoading ? (
                        <Spinner label="Se esta procesando el pdf, por favor espere un momento" color="success" labelColor="success" />
                    ) : (
                        pdfUrl && (
                            <div style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }} className='mt-10'>
                                <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                                    <Page pageNumber={currentPage} />
                                </Document>
                            </div>
                        )
                    )}
                </div>

                <div className="flex justify-center space-x-4 mt-4">
                    <Button onClick={handlePrevPage} color="primary">
                        Página anterior
                    </Button>
                    <Button onClick={handleNextPage} color="primary">
                        Siguiente página
                    </Button>
                </div>

                <br />
                <br />
            </>
        </div>
    );
};

export default VisualizacionCv;