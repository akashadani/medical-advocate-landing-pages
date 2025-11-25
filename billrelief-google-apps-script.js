/**
 * Google Apps Script for BillRelief Email Lead Capture
 *
 * SETUP INSTRUCTIONS:
 *
 * 1. Go to https://script.google.com/
 *
 * 2. Click "New Project"
 *
 * 3. Copy and paste this entire script
 *
 * 4. Save (Ctrl+S or Cmd+S) and name it "BillRelief Lead Capture"
 *
 * 5. Deploy as web app:
 *    - Click "Deploy" > "New deployment"
 *    - Click gear icon > Select "Web app"
 *    - Description: "BillRelief Lead Capture"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 *    - Click "Deploy"
 *    - Copy the Web App URL
 *
 * 6. Update the GOOGLE_SCRIPT_URL in all HTML files with your new Web App URL
 *
 * 7. The "BillRelief" sheet will be auto-created in your existing spreadsheet on first submission
 *
 * Sheet columns: Timestamp, Email, Source
 */

// Your existing spreadsheet ID
const SPREADSHEET_ID = "19g0Bf1QgAnZeFkfxXV0ELrUJjvs3zg4EvIGAmdZOTtY";
const SHEET_NAME = "BillRelief";

function doPost(e) {
  try {
    // Get the spreadsheet by ID
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);

    // Get or create the BillRelief sheet
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.appendRow(["Timestamp", "Email", "Source"]);
    }

    // Parse the POST data (handle both JSON and FormData)
    let email, source;

    if (e.postData && e.postData.type === "application/json") {
      // Handle JSON data
      const data = JSON.parse(e.postData.contents);
      email = data.email;
      source = data.source || "unknown";
    } else {
      // Handle form data
      email = e.parameter.email;
      source = e.parameter.source || "unknown";
    }

    // Validate email
    if (!email || !email.trim()) {
      return createResponse(false, "Email is required");
    }

    // Check if email already exists in column B
    const existingEmails = sheet.getRange("B:B").getValues().flat();
    if (existingEmails.includes(email)) {
      return createResponse(false, "Email already registered");
    }

    // Add new row: Timestamp, Email, Source
    sheet.appendRow([new Date(), email, source]);

    // Return success response
    return createResponse(true, "Successfully subscribed!");

  } catch (error) {
    return createResponse(false, "Error: " + error.toString());
  }
}

// Handle preflight requests (REQUIRED for CORS)
function doOptions(e) {
  const output = ContentService.createTextOutput("");
  output.setHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  return output;
}

// Helper function to create JSON response with CORS headers
function createResponse(success, message) {
  const output = ContentService.createTextOutput(
    JSON.stringify({
      success: success,
      message: message,
    })
  ).setMimeType(ContentService.MimeType.JSON);

  output.setHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  return output;
}
