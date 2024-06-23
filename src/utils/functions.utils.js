export const isDataInvalid = data => {
  if (typeof data !== 'object' || data === null)
    return true;

  const needs = ['first_name', 'last_name', 'email', 'phone'];
  const has = Object.keys(data);

  if (needs.length !== has.length || !needs.every(prop => has.includes(prop)))
    return true;

  for (const prop of needs)
    if (typeof data[prop] !== 'string' || data[prop].trim() === '') return true;

  return false;
};
