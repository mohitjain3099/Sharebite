import { Constants } from './APIServiceConstants';

export const apiServicePatchEventData = async (id: string, updateData: any) => {
  try {
    const response = await fetch(`${Constants.API_URL}/patchEventData/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('An error occurred while making the PATCH request:', error);
    throw error; // re-throw the error so it can be caught and handled elsewhere if needed
  }
};