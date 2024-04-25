import React, { useState, useEffect, useMemo } from 'react';

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { saveAs } from 'file-saver';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from "@nextui-org/react";
import data from '../Controller/cv.json';
import { jsPDF } from "jspdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function createPdf() {
    const doc = new jsPDF();

    doc.setFillColor(48, 162, 193);
    doc.rect(10, 10, 20, 20, 'F');

    // Divide el nombre en palabras
    const nameParts = data.nombre.split(' ');

    if (nameParts.length >= 3) {
        // Toma la primera letra del segundo y tercer nombre
        const initials = nameParts[0].charAt(0) + nameParts[1].charAt(0);

        // Dibuja las iniciales
        doc.setFontSize(23);
        doc.setTextColor(255, 255, 255);
        doc.text(initials, 9 + 8 + 2, 26);
    }

    doc.setFontSize(14);
    doc.setTextColor(48, 162, 193);
    doc.text(`${data.Postulacion}`, 32, 15);

    doc.setFontSize(22);
    doc.setTextColor(48, 162, 193);
    doc.text(`${data.nombre}`, 20 + 10 + 2, 26);

    // Restablece el tamaño y el color del texto
    doc.setFontSize(13);
    doc.setTextColor(0, 100, 100);
    doc.text(`Telefono: ${data.telefono}`, 140, 20);
    doc.text(`Email: ${data.email}`, 140, 25);

    doc.setFontSize(15);
    doc.setTextColor(48, 162, 193);
    doc.text('Perfil Profesional', 10, 40);

    // Dibuja una línea debajo del título
    doc.setDrawColor(0);
    doc.setLineWidth(0.3);
    doc.line(10, 42, 200, 42);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`${data.perfil}`, 10, 50, { align: 'justify', maxWidth: 190 });

    doc.setFontSize(15);
    doc.setTextColor(48, 162, 193);
    doc.text('Habilidades', 10, 80);

    // Dibuja una línea debajo del título
    doc.setDrawColor(0);
    doc.setLineWidth(0.3);
    doc.line(10, 82, 200, 82);


    // habilidades texto
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);

    let yPosition = 90;
    let column1X = 10;
    let column2X = 105;

    data.habilidades.forEach((item, index) => {
        let columnX = index % 2 === 0 ? column1X : column2X;
        doc.text('• ' + item.habilidad, columnX, yPosition, { align: 'justify', maxWidth: 90 });
        if (index % 2 !== 0) yPosition += 17;
    });

    doc.setFontSize(15);
    doc.setTextColor(48, 162, 193);
    doc.text('Experiencia Laboral', 10, 145);

    // Dibuja una línea debajo del título
    doc.setDrawColor(0);
    doc.setLineWidth(0.3);
    doc.line(10, 147, 200, 147);

    // Experiencia Laboral texto
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    let yPosition2 = 155;
    data.experiencia.forEach((item, index) => {
        doc.text(`${item.nombre} - ${item.cargo} | ${item.fecha}`, 10, yPosition2);
        const splitDescription = doc.splitTextToSize(item.descripcion, 180); // Ajusta el segundo parámetro según el ancho disponible
        doc.text(splitDescription, 10, yPosition2 + 6, { align: 'justify', maxWidth: 190 });
        yPosition2 += 6 * (splitDescription.length + 1); // Ajusta la posición en el eje y para la siguiente descripción
    });

    doc.setFontSize(15);
    doc.setTextColor(48, 162, 193);
    doc.text('Educación', 10, 246);

    // Dibuja una línea debajo del título
    doc.setDrawColor(0);
    doc.setLineWidth(0.3);
    doc.line(10, 248, 200, 248);

    // educaion texto
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    let yPosition3 = 155;
    data.cursos.forEach((item, index) => {
        doc.text(`• ${item.Instituto} | ${item.fecha}`, 10, yPosition2 + 5);
        const splitCarrera = doc.splitTextToSize(item.carrera, 180); // Ajusta el segundo parámetro según el ancho disponible
        doc.text(splitCarrera, 10, yPosition2 + 11, { align: 'justify', maxWidth: 190 });
        yPosition2 += 7 * (splitCarrera.length + 1); // Ajusta la posición en el eje y para la siguiente descripción
    });



    // Convierte el documento PDF a un blob
    const blob = doc.output('blob');

    // Convierte el blob a una URL
    const url = URL.createObjectURL(blob);

    return url;
}


const VisualizacionCv = () => {

    const [pdfUrl, setPdfUrl] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [numPages, setNumPages] = useState(null);

    useEffect(() => {
        const url = createPdf();
        setPdfUrl(url);

        // Limpia la URL del blob cuando el componente se desmonta
        return () => URL.revokeObjectURL(url);
    }, []);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = data.nombre + '.pdf';
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
            <p className='text-2xl md:justify-center md:text-center mt-10'>Visualización del CV ATS</p>

            <Button className='text-COLOR-CV-F2F4F3 md:ml-[50rem] mt-10' color="success" onClick={handleDownload}>
                Descargar PDF
            </Button>

            <div style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }} className='mt-10'>
                {pdfUrl && (
                    <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={currentPage} />
                    </Document>
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

        </div>
    );
};

export default VisualizacionCv;