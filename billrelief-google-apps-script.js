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
      sheet.appendRow(["Timestamp", "Email", "Source", "Plan"]);
    }

    // Parse the POST data (handle both JSON and FormData)
    let email, source, plan;

    if (e.postData && e.postData.type === "application/json") {
      // Handle JSON data
      const data = JSON.parse(e.postData.contents);
      email = data.email;
      source = data.source || "unknown";
      plan = data.plan || "";
    } else {
      // Handle form data
      email = e.parameter.email;
      source = e.parameter.source || "unknown";
      plan = e.parameter.plan || "";
    }

    // Validate email
    if (!email || !email.trim()) {
      return createResponse(false, "Email is required");
    }

    // Check if email already exists in column B
    const allData = sheet.getDataRange().getValues();
    let existingRowIndex = -1;

    for (let i = 1; i < allData.length; i++) {
      if (allData[i][1] === email) {
        existingRowIndex = i + 1; // +1 because sheets are 1-indexed
        break;
      }
    }

    if (existingRowIndex > 0 && plan) {
      // Email exists and we have a plan - update the plan column (column D = 4)
      sheet.getRange(existingRowIndex, 4).setValue(plan);
      return createResponse(true, "Plan updated successfully!");
    } else if (existingRowIndex > 0) {
      // Email exists but no plan provided - duplicate email
      return createResponse(false, "Email already registered");
    } else {
      // New email - add new row: Timestamp, Email, Source, Plan
      sheet.appendRow([new Date(), email, source, plan]);
      return createResponse(true, "Successfully subscribed!");
    }

  } catch (error) {
    return createResponse(false, "Error: " + error.toString());
  }
}

// Handle preflight requests (REQUIRED for CORS)
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}

// Helper function to create JSON response
function createResponse(success, message) {
  return ContentService.createTextOutput(
    JSON.stringify({
      success: success,
      message: message,
    })
  ).setMimeType(ContentService.MimeType.JSON);
}
