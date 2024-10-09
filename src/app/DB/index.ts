import config from '../config';
import { USER_ROLE } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

const superUser = {
  name: {
    firstName: 'Sadik',
    lastName: 'Ahmmed',
  },
  email: 'workwithsadik@gmail.com',
  password: config.super_admin_password,
  avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
  role: 'admin',
  status: 'in-progress',
  isDeleted: false,
};
const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isAdminExits = await User.findOne({ role: USER_ROLE.admin });

  if (!isAdminExits) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
