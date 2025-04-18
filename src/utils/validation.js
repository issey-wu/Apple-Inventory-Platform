export function validateDevice(device) {
  const errors = [];
  
  // Validate ID (must be a number)
  const id = parseInt(device.id);
  if (isNaN(id) || id <= 0) {
    errors.push("ID must be a positive number.");
  }
  
  // Validate device_name (3-30 characters)
  if (!device.device_name || device.device_name.length < 3 || device.device_name.length > 30) {
    errors.push("Device name must be between 3 and 30 characters.");
  }
  
  // Validate price (positive number less than 10,000)
  const price = parseFloat(device.price);
  if (isNaN(price) || price <= 0 || price >= 10000) {
    errors.push("Price must be a number between $0 - $10,000");
  }
  
  // Validate rating (between 1 and 5)
  const rating = parseFloat(device.rating);
  if (isNaN(rating) || rating < 1 || rating > 5) {
    errors.push("Rating must be a number between 1 and 5");
  }
  
  return errors;
}