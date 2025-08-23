export const fetchData = async () => {
  const response = await fetch(
    'https://restcountries.com/v3.1/all?fields=name'
  );
  if (!response.ok) throw new Error('Error loaging data');
  return await response.json();
};
