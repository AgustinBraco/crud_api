export const isInvalidUser = user => {
  if (typeof user !== 'object' || user === null)
    return true;

  const needs = ['email', 'password'];
  const has = Object.keys(user);

  if (needs.length !== has.length || !needs.every(prop => has.includes(prop)))
    return true;

  for (const prop of needs)
    if (typeof user[prop] !== 'string' || user[prop].trim() === '') return true;

  return false;
};

export const isInvalidProduct = product => {
  if (typeof product !== 'object' || product === null)
    return true;

  const needs = ['name', 'price', 'stock'];
  const has = Object.keys(product);

  if (needs.length !== has.length || !needs.every(prop => has.includes(prop)))
    return true;

  for (const prop of needs)
    if (typeof product[prop] !== 'string' || product[prop].trim() === '') return true;

  return false;
};