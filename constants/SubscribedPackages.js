// Global constant to store subscribed packages
let subscribedPackages = [];

export const addSubscribedPackage = (packageData) => {
  subscribedPackages.push(packageData);
  console.log('Added subscribed package:', packageData);
  console.log('All subscribed packages:', subscribedPackages);
};

export const getSubscribedPackages = () => {
  return subscribedPackages;
};

export const getLatestSubscribedPackage = () => {
  return subscribedPackages.length > 0 ? subscribedPackages[subscribedPackages.length - 1] : null;
};

export const clearSubscribedPackages = () => {
  subscribedPackages = [];
};

export default {
  addSubscribedPackage,
  getSubscribedPackages,
  getLatestSubscribedPackage,
  clearSubscribedPackages
};

