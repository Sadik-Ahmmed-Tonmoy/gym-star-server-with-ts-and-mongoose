export const USER_ROLE = {
  admin: 'admin',
  trainer: 'trainer',
  trainee: 'trainee',
} as const;

export const UserStatus = ['in-progress', 'blocked'] as const;

export const userSearchableFields = ['name.firstName', 'name.lastName', 'email'] ;
