const express = require("express");
const PDFDocument = require("pdfkit");
const jdData = require("/jdContent");

const app = express();
const PORT = 3000;

app.get("/generate-jd", (req, res) => {
    const doc = new PDFDocument({ margin: 50 });

    // Set response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        "attachment; filename=Job_Description.pdf"
    );

    // ✅ CORRECT: Pipe BEFORE writing content
    doc.pipe(res);

    // Title
    doc.fontSize(20).text("Recruitment & Job Description", {
        align: "center"
    });

    doc.moveDown(1.5);

    // Job data
    jdData.forEach(job => {
        doc.fontSize(16).text(job.role, { underline: true });
        doc.moveDown(0.5);

        doc.fontSize(13).text("Job Responsibilities:");
        job.responsibilities.forEach(item => {
            doc.text(`• ${item}`);
        });

        doc.moveDown(0.5);
        doc.text("Qualifications:");
        job.qualifications.forEach(item => {
            doc.text(`• ${item}`);
        });

        doc.moveDown(0.5);
        doc.text("Required Skills:");
        job.skills.forEach(item => {
            doc.text(`• ${item}`);
        });

        doc.moveDown(1.2);
    });

    // ✅ CORRECT: End document at last
    doc.end();
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
