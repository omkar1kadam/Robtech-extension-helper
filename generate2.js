import puppeteer from "puppeteer-core";
import fs from "fs";
import handlebars from "handlebars";

const reportData = {
  branchName: "hariomss",
  location: "18.66323129695778, 73.91047393912186",

  employees: [
    { username: "Omkar", email: "omkar@gmail.com" },
    { username: "omkar2", email: "omkar2@gmail.com" }
  ]
};

async function generatePDF(data){

  const templateHtml = fs.readFileSync("template2.html", "utf8");

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