
export const ADMIN_EMAILS = [
  'shree@unifiedplatforms.com',
  'analytics@unifiedplatforms.com'
];

export const isAdmin = (email: string | null | undefined): boolean => {
  if (!email) return false;
  return ADMIN_EMAILS.some(adminEmail => adminEmail.toLowerCase() === email.toLowerCase());
};
