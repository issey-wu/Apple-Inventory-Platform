// API Utility Functions
const API_URL = "http://localhost:4000";

// Get all devices
export async function getAllDevices() {
  const res = await fetch(`${API_URL}/devices`, { cache: 'no-store' });
  
  if (!res.ok) {
    throw new Error('Failed to fetch devices');
  }
  
  return res.json();
}

// Get a single device by ID
export async function getDeviceById(id) {
  const res = await fetch(`${API_URL}/devices/${id}`, { cache: 'no-store' });
  
  if (!res.ok) {
    return null;
  }
  
  return res.json();
}

// Create a new device
export async function createDevice(device) {
  const res = await fetch(`${API_URL}/devices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(device),
  });
  
  if (!res.ok) {
    throw new Error('Failed to create device');
  }
  
  return res.json();
}

// Update an existing device
export async function updateDevice(id, device) {
  const res = await fetch(`${API_URL}/devices/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(device),
  });
  
  if (!res.ok) {
    throw new Error('Failed to update device');
  }
  
  return res.json();
}

// Delete a device
export async function deleteDevice(id) {
  const res = await fetch(`${API_URL}/devices/${id}`, {
    method: 'DELETE',
  });
  
  if (!res.ok) {
    throw new Error('Failed to delete device');
  }
  
  return res.json();
}