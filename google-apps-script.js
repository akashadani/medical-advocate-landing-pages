/**
 * Google Apps Script for Multi-Project Email Lead Capture
 * Supports Gujarati SEO, Simuwash, Declutr, Catholic Dating, and Class Action projects
 *
 * SETUP FOR CLASS ACTION:
 *
 * 1. Open your existing Google Sheet: https://docs.google.com/spreadsheets/d/19g0Bf1QgAnZeFkfxXV0ELrUJjvs3zg4EvIGAmdZOTtY
 *
 * 2. Go to Extensions > Apps Script and UPDATE the doPost function with this code
 *
 * 3. Save (Ctrl+S or Cmd+S)
 *
 * 4. Deploy the new version:
 *    - Click "Deploy" > "Manage deployments"
 *    - Click pencil icon (Edit)
 *    - Select "New version"
 *    - Click "Deploy"
 *
 * 5. The "ClassAction" sheet will be auto-created on first submission
 *
 * 6. Sheet columns: Timestamp, Email, Source
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function doPost(e) {
  try {
    // Get the spreadsheet by ID
    const spreadsheet = SpreadsheetApp.openById(
      "19g0Bf1QgAnZeFkfxXV0ELrUJjvs3zg4EvIGAmdZOTtY",
    )

    // Parse the POST data (handle both JSON and FormData)
    let email, source, project, name, age, gender, city, state

    if (e.postData && e.postData.type === "application/json") {
      // Handle JSON data
      const data = JSON.parse(e.postData.contents)
      email = data.email
      source = data.source || "website"
      project = data.project || "gujarati-seo"
      name = data.name || ""
      age = data.age || ""
      gender = data.gender || ""
      city = data.city || ""
      state = data.state || ""
    } else {
      // Handle form data
      email = e.parameter.email
      source = e.parameter.source || "website"
      project = e.parameter.project || "gujarati-seo"
      name = e.parameter.name || ""
      age = e.parameter.age || ""
      gender = e.parameter.gender || ""
      city = e.parameter.city || ""
      state = e.parameter.state || ""
    }

    // Determine which sheet to use based on project
    let sheet
    if (project === "simuwash") {
      sheet = spreadsheet.getSheetByName("Simuwash")
      if (!sheet) {
        sheet = spreadsheet.insertSheet("Simuwash")
        sheet.appendRow(["Timestamp", "Email", "Source"])
      }
      // Add row with just timestamp, email, source for Simuwash
      sheet.appendRow([new Date(), email, source])
    } else if (project === "declutr") {
      sheet = spreadsheet.getSheetByName("Declutr")
      if (!sheet) {
        sheet = spreadsheet.insertSheet("Declutr")
        sheet.appendRow(["Timestamp", "Email", "Source"])
      }
      // Add row with just timestamp, email, source for Declutr
      sheet.appendRow([new Date(), email, source])
    } else if (project === "catholic-dating") {
      sheet = spreadsheet.getSheetByName("CatholicDating")
      if (!sheet) {
        sheet = spreadsheet.insertSheet("CatholicDating")
        sheet.appendRow(["Timestamp", "Name", "Age", "Gender", "City", "State", "Email", "Source"])
      }
      // Check if email already exists in column G (Email column for Catholic Dating)
      const existingEmails = sheet.getRange("G:G").getValues().flat()
      if (existingEmails.includes(email)) {
        const output = ContentService.createTextOutput(
          JSON.stringify({
            success: false,
            message: "Email already registered",
          }),
        ).setMimeType(ContentService.MimeType.JSON)

        output.setHeaders({
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        })

        return output
      }
      // Add row with full profile data for Catholic Dating
      sheet.appendRow([new Date(), name, age, gender, city, state, email, source])
    } else if (project === "class-action") {
      sheet = spreadsheet.getSheetByName("ClassAction")
      if (!sheet) {
        sheet = spreadsheet.insertSheet("ClassAction")
        sheet.appendRow(["Timestamp", "Email", "Source"])
      }
      // Check if email already exists in column B
      const existingEmails = sheet.getRange("B:B").getValues().flat()
      if (existingEmails.includes(email)) {
        const output = ContentService.createTextOutput(
          JSON.stringify({
            success: false,
            message: "Email already registered",
          }),
        ).setMimeType(ContentService.MimeType.JSON)

        output.setHeaders({
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        })

        return output
      }
      // Add row with timestamp, email, source for Class Action
      sheet.appendRow([new Date(), email, source])
    } else {
      // Default to the first sheet (gujarati-seo)
      sheet = spreadsheet.getSheets()[0]
      // Check if email already exists in column B
      const existingEmails = sheet.getRange("B:B").getValues().flat()
      if (existingEmails.includes(email)) {
        const output = ContentService.createTextOutput(
          JSON.stringify({
            success: false,
            message: "Email already registered",
          }),
        ).setMimeType(ContentService.MimeType.JSON)

        output.setHeaders({
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        })

        return output
      }
      sheet.appendRow([new Date(), email, source])
    }

    // Return success response
    const output = ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Submitted successfully",
      }),
    ).setMimeType(ContentService.MimeType.JSON)

    output.setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
    })

    return output
  } catch (error) {
    const output = ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: "Error: " + error.toString(),
      }),
    ).setMimeType(ContentService.MimeType.JSON)

    output.setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
    })

    return output
  }
}

// Handle preflight requests (REQUIRED for CORS)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function doOptions(e) {
  const output = ContentService.createTextOutput("")
  output.setHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  })
  return output
}
