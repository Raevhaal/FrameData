const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'FrameDataTable.tsx');
const placeholder = 'Website last deployed';

// Compute local date-time and UTC offset for timestamp
const now = new Date();
const dateTimeString = now.toLocaleString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
});
const offsetMinutes = now.getTimezoneOffset();
const offsetSign = offsetMinutes <= 0 ? '+' : '-';
const absOffset = Math.abs(offsetMinutes);
const offsetHours = Math.floor(absOffset / 60);
const offsetMinutesRemainder = absOffset % 60;
const offsetHoursStr = String(offsetHours).padStart(2, '0');
const offsetMinutesStr = String(offsetMinutesRemainder).padStart(2, '0');
const offsetString = `${offsetSign}${offsetHoursStr}:${offsetMinutesStr}`;
const timestamp = `${dateTimeString} UTC${offsetString}`;

const newText = `Website last deployed: ${timestamp}`; // Define the full text to insert

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Regex to find the placeholder, optionally followed by ": <timestamp>"
    const regex = new RegExp(`${placeholder}(:.*)?`);

    if (content.match(regex)) {
        // Replace the entire match (placeholder + optional old timestamp) with the new text
        content = content.replace(regex, newText);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated timestamp in ${filePath}`);
    } else {
        // If the pattern isn't found at all (neither placeholder nor placeholder + timestamp)
        console.warn(`Pattern matching "${placeholder}(:.*)?" not found in ${filePath}. Cannot update timestamp.`);
    }
} catch (error) {
    console.error(`Error updating timestamp in ${filePath}:`, error);
    process.exit(1); // Exit with error code if update fails
} 