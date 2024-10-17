import { Country } from './types';

export const getAccessToken = async (): Promise<string | null> => {
  const apiKey = 's1g8dwdunjcpqyELJMu0WsanpfXnCBcdzfWNOugvW68=';
  
  try {
    const response = await fetch(
      `https://sandbox-api.softpoint.io/interface/v1/access_token?corporate_id=10`,
      {
        method: 'POST',
        headers: {
          'Api-Key': apiKey,
          Accept: '*/*',
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.access_token;
    } else {
      console.error('Failed to fetch access token:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error fetching access token:', error);
    return null;
  }
};

export const fetchCountries = async (): Promise<Country[]> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Failed to retrieve access token');

  try {
    const response = await fetch(
      'https://sandbox-api.softpoint.io/interface/v1/challenges/countries',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    return Object.keys(data).map((countryCode) => ({
      id: data[countryCode].id,
      name: data[countryCode].name,
      calling_code: data[countryCode].calling_code,
      phone_length: data[countryCode].phone_length,
      country_code: countryCode,
    }));
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

export const submitPhoneNumber = async (phone: string, countryId: string) => {
  const token = await getAccessToken();
  if (!token) throw new Error('Failed to retrieve access token');

  const cleanedPhone = phone.replace(/\D/g, ''); 

  try {
    const response = await fetch(
      `https://sandbox-api.softpoint.io/interface/v1/challenges/two_factor_auth?phone_number=${cleanedPhone}&country_id=${countryId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    console.log('Response from Two Factor Auth API:', data);
    return data;
  } catch (error) {
    console.error('Error submitting two-factor auth request:', error);
    throw error;
  }
};
