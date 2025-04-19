'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createDevice, updateDevice, deleteDevice } from '../../utils/api';

// Action to create a new device
export async function createDeviceAction(formData) {
  const device = {
    id: String(formData.get('id')), // Ensure ID is a string
    device_name: formData.get('device_name'),
    price: parseFloat(formData.get('price')),
    release_date: formData.get('release_date'),
    rating: parseFloat(formData.get('rating'))
  };
  
  await createDevice(device);
  
  // Revalidate the necessary paths
  revalidatePath('/collection');
  revalidatePath('/admin');
  
  // Redirect back to the admin page
  redirect('/admin');
}

// Action to update an existing device
export async function updateDeviceAction(formData) {
  try {
    const id = formData.get('original_id') || formData.get('id');
    
    const device = {
      id: formData.get('id'),
      device_name: formData.get('device_name'),
      price: parseFloat(formData.get('price')),
      release_date: formData.get('release_date'),
      rating: parseFloat(formData.get('rating'))
    };
    
    console.log('Updating device with ID:', id);
    console.log('New device data:', device);
    
    const response = await fetch(`http://localhost:4000/devices/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(device),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Update failed:', response.status, errorText);
      throw new Error(`Failed to update device: ${response.status}`);
    }
    
    // Revalidate paths
    revalidatePath('/collection');
    revalidatePath(`/collection/${device.id}`);
    revalidatePath('/admin');
    revalidatePath(`/admin/edit/${device.id}`);
    
    // Redirect back to admin
    redirect('/admin');
  } catch (error) {
    console.error('Error updating device:', error);
    throw error;
  }
}

// Action to delete a device
export async function deleteDeviceAction(formData) {
  try {
    const id = formData.get('id');
    
    // Log the device ID for debugging
    console.log('Attempting to delete device with ID:', id);
    
    const response = await fetch(`http://localhost:4000/devices/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error('Delete failed with status:', response.status);
      throw new Error(`Failed to delete device: ${response.statusText}`);
    }
    
    // Revalidate paths
    revalidatePath('/collection');
    revalidatePath('/admin');
    
  } catch (error) {
    console.error('Delete device error:', error);
    throw new Error('Failed to delete device');
  }
}