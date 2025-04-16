'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createDevice, updateDevice, deleteDevice } from '@/utils/api';

// Action to create a new device
export async function createDeviceAction(formData) {
  const device = {
    id: parseInt(formData.get('id')),
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
  const id = formData.get('id');
  
  const device = {
    id: parseInt(id),
    device_name: formData.get('device_name'),
    price: parseFloat(formData.get('price')),
    release_date: formData.get('release_date'),
    rating: parseFloat(formData.get('rating'))
  };
  
  await updateDevice(id, device);
  
  // Revalidate the necessary paths
  revalidatePath('/collection');
  revalidatePath(`/collection/${id}`);
  revalidatePath('/admin');
  revalidatePath(`/admin/edit/${id}`);
  
  // Redirect back to the admin page
  redirect('/admin');
}

// Action to delete a device
export async function deleteDeviceAction(formData) {
  const id = formData.get('id');
  
  await deleteDevice(id);
  
  // Revalidate the necessary paths
  revalidatePath('/collection');
  revalidatePath(`/collection/${id}`);
  revalidatePath('/admin');
  
  // Revalidate and stay on the current page
  revalidatePath('/admin');
}