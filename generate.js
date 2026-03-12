import puppeteer from "puppeteer-core";
import fs from "fs";
import handlebars from "handlebars";

const reportData = {
  customerName: "ABC Pvt Ltd",
  projectCode: "RBT-204",
  location: "Pune",
  contactPerson: "Rohit",
  contactDetails: "9876543210",

  days: [
    {
      date: "12-03-2026",
      day: "Monday",
      inTime: "09:00",
      outTime: "17:00",
      totalHours: "8",
      description: "Robot calibration and testing"
    },
    {
      date: "13-03-2026",
      day: "Tuesday",
      inTime: "10:00",
      outTime: "18:00",
      totalHours: "8",
      description: "Program modification"
    }
  ]
};

async function generatePDF(data){

  const templateHtml = fs.readFileSync("template.html", "utf8");

  const template = handlebars.compile(templateHtml);

  const html = template(data);

  const browser = await puppeteer.launch({
      executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
      headless: true
  });

  const page = await browser.newPage();

  await page.setContent(html,{
      waitUntil: "networkidle0"
  });

  await page.pdf({
      path: "report.pdf",
      format: "A4",
      printBackground: true,
      margin:{
        top:"0mm",
        bottom:"0mm",
        left:"0mm",
        right:"0mm"
      },
      scale:1
  });

  await browser.close();
}

generatePDF(reportData);