function cleanISODateString(isoDate) {
  // Remove any characters after the 'Z' if present
  const cleanedDate = isoDate?.split('Z')[0];
  return cleanedDate;
}

export function formatISODateToYYYYMMDD(isoDate) {
  // Clean the ISO date string
  const cleanedDate = cleanISODateString(isoDate);

  // Create a Date object from the cleaned ISO string
  const date = new Date(cleanedDate);

  // Extract the year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');

  // Format as yyyy-MM-dd
  return `${year}-${month}-${day}`;
}

export function formatISODateToDDMMYYYY(isoDate) {
  // Clean the ISO date string
  const cleanedDate = cleanISODateString(isoDate);

  // Create a Date object from the cleaned ISO string
  const date = new Date(cleanedDate);

  // Extract the year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');

  // Format as yyyy-MM-dd
  return `${day}-${month}-${year}`;
}

export function convertYYYYMMDDToISOWithCurrentTime(dateString) {
  // Split the input string into year, month, and day
  const [year, month, day] = dateString.split('-').map(Number);

  // Get the current time
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Create a Date object using the provided date and the current time
  // Note: Month is 0-based in JavaScript Date (0 = January)
  const date = new Date(year, month - 1, day, hours, minutes, seconds);

  // Return the ISO string
  return date.toISOString();
}
