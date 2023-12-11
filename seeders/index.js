const bcrypt = require('bcrypt');
const authConstant = require('../constants/authConstant');
const userDb = require('../data-access/userDb');
const roleDb = require('../data-access/roleDb');
const projectRouteDb = require('../data-access/projectRouteDb');
const routeRoleDb = require('../data-access/routeRoleDb');
const userRoleDb = require('../data-access/userRoleDb');
const sequenceDb = require('../data-access/sequenceDb');
const replaceAll = require('../utils/replaceAll');

async function seedUser () {
  try {
    let userToBeInserted = {};
    userToBeInserted = {
      'password':'YBkCHmxtLyEA2Ix',
      'isDeleted':false,
      'username':'Clark92',
      'email':'Garrett_Spencer@gmail.com',
      'isActive':true,
      'userType':authConstant.USER_TYPES.User
    };
    userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
    let user = await userDb.updateOne( { 'username':'Clark92' }, userToBeInserted,  {
      upsert: true,
      new: true
    });
    userToBeInserted = {
      'password':'PWdE2ALFB6nVfpF',
      'isDeleted':false,
      'username':'Keshawn_Friesen',
      'email':'Ines.Rodriguez@hotmail.com',
      'isActive':true,
      'userType':authConstant.USER_TYPES.Admin
    };
    userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
    let admin = await userDb.updateOne( { 'username':'Keshawn_Friesen' }, userToBeInserted,  {
      upsert: true,
      new: true
    });
    console.info('Users seeded 🍺');
  } catch (error){
    console.log('User seeder failed due to ', error.message);
  }
}
async function seedRole () {
  try {
    const roles = [ 'Admin', 'System_User', 'User' ];
    const insertedRoles = await roleDb.findMany({ code: { '$in': roles.map(role => role.toUpperCase()) } });
    const rolesToInsert = [];
    roles.forEach(role => {
      if (!insertedRoles.find(insertedRole => insertedRole.code === role.toUpperCase())) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await roleDb.create(rolesToInsert);
      if (result) console.log('Role seeded 🍺');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date 🍺');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

async function seedProjectRoutes (routes) {
  try {
    if (routes && routes.length) {
      let routeName = '';
      const dbRoutes = await projectRouteDb.findMany({});
      let routeArr = [];
      let routeObj = {};
      routes.forEach(route => {
        routeName = `${replaceAll((route.path).toLowerCase(), '/', '_')}`;
        route.methods.forEach(method => {
          routeObj = dbRoutes.find(dbRoute => dbRoute.route_name === routeName && dbRoute.method === method);
          if (!routeObj) {
            routeArr.push({
              'uri': route.path.toLowerCase(),
              'method': method,
              'route_name': routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await projectRouteDb.create(routeArr);
        if (result) console.info('ProjectRoute model seeded 🍺');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

async function seedRouteRole () {
  try {
    const routeRoles = [ 
      {
        route: '/admin/product/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/product/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/product/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/product/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/product/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/product/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/product/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/product/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/product/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/product/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/product/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/product/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/product/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/product/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/product/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/product/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/product/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/product/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/product/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/product/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/product/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/product/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/product/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/product/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/cart/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/cart/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cart/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/cart/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cart/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/cart/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cart/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/cart/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/cart/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/cart/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cart/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/cart/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/cart/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/cart/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cart/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/cart/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/cart/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/cart/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cart/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/cart/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cart/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/cart/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/cart/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/cart/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/cartitem/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/cartitem/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/cartitem/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/cartitem/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/cartitem/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/cartitem/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cartitem/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/cartitem/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/cartitem/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/cartitem/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cartitem/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/cartitem/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cartitem/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/cartitem/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cartitem/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/cartitem/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cartitem/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/cartitem/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cartitem/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/cartitem/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cartitem/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/cartitem/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/cartitem/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/cartitem/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/customer/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/customer/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/customer/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/customer/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/customer/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/customer/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/customer/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/customer/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/customer/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/customer/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/customer/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/customer/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/customer/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/customer/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/customer/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/customer/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/customer/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/customer/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/customer/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/customer/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/customer/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/customer/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/customer/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/customer/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/order/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/order/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/order/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/order/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/order/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/order/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/order/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/order/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/order/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/order/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/order/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/order/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/order/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/order/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/order/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/order/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/order/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/order/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/order/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/orderitem/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/orderitem/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/orderitem/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/orderitem/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/orderitem/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/orderitem/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/orderitem/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/orderitem/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/orderitem/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/orderitem/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/orderitem/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/orderitem/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/orderitem/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/orderitem/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/orderitem/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/orderitem/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/orderitem/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/orderitem/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/orderitem/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/orderitem/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/orderitem/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/admin/orderitem/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/orderitem/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/orderitem/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/role/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/userrole/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/product/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/product/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/product/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/product/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/product/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/product/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/product/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/product/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/product/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/product/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/product/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/product/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/product/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/product/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/product/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/product/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/product/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/product/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/product/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/product/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/product/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/product/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/product/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/product/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cart/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/cart/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cart/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/cart/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cart/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/cart/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cart/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/cart/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/cart/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/cart/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cart/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cart/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cart/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cart/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cart/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cart/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cart/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cart/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cart/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cart/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cart/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/cart/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/cart/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cart/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cartitem/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cartitem/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cartitem/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cartitem/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cartitem/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/cartitem/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cartitem/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/cartitem/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/cartitem/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cartitem/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cartitem/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cartitem/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cartitem/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cartitem/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cartitem/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cartitem/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cartitem/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cartitem/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cartitem/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cartitem/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cartitem/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/cartitem/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/cartitem/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cartitem/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/customer/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/customer/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/customer/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/customer/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/customer/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/customer/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/customer/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/customer/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/customer/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/customer/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/customer/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/customer/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/customer/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/customer/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/customer/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/order/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/order/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/order/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/order/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/order/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/order/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/order/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/order/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/order/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/order/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/order/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/order/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/order/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/order/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/order/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/order/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/order/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/order/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/order/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/order/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/order/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/order/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/order/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/order/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/orderitem/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/orderitem/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/orderitem/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/orderitem/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = [ 'Admin', 'System_User', 'User' ];
      const insertedProjectRoute = await projectRouteDb.findMany({
        uri: { '$in': routes },
        method: { '$in': routeMethods },
        'isActive': true,
        'isDeleted': false
      });
      const insertedRoles = await roleDb.findMany({
        code: { '$in': roles.map(role => role.toUpperCase()) },
        'isActive': true,
        'isDeleted': false
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map(routeRole => {
        projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};

      await Promise.all(
        createRouteRoles.map(async routeRole => {
          routeRoleObj = await routeRoleDb.findOne({
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await routeRoleDb.create(routeRolesToBeInserted);
        if (result) console.log('RouteRole seeded 🍺');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

async function seedUserRole () {
  try {
    const userRoles = [{
      'username':'Clark92',
      'password':'YBkCHmxtLyEA2Ix'
    },{
      'username':'Keshawn_Friesen',
      'password':'PWdE2ALFB6nVfpF'
    }];
    const defaultRoles = await roleDb.findMany();
    const insertedUsers = await userDb.findMany( { username: { '$in': userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && user.isActive && !user.isDeleted);
      if (user) {
        if (user.userType === authConstant.USER_TYPES.Admin){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'ADMIN')._id
          });
        } else if (user.userType === authConstant.USER_TYPES.User){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'USER')._id
          });
        } else {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'SYSTEM_USER')._id
          });
        }  
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async userRole => {
          userRoleObj = await userRoleDb.findOne({
            userId: userRole.userId,
            roleId: userRole.roleId
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await userRoleDb.create(userRolesToBeInserted);
        if (result) console.log('UserRole seeded 🍺');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('UserRole seeder failed due to ', error.message);
  }
}
async function seedSequence (){
  try {
    const allSequenceData = [
      {
        attribute: 'orderId',
        prefix: 'ORD',
        startingPoint: '1',
        modelName: 'order'
      }
    ];
    let dbSequences = await sequenceDb.findMany({});

    const newSequences = [];
    let idsToBeRemoved = [];
    let existInAllSequenceData = {};
    let existSeq = {};

    dbSequences.forEach(function (dbSeqData) {
      existInAllSequenceData = allSequenceData.find(sequence =>  sequence.modelName === dbSeqData.modelName && sequence.attribute === dbSeqData.attribute);
        
      if (!existInAllSequenceData){
        idsToBeRemoved.push(dbSeqData.id);
      }
    });

    if (idsToBeRemoved && idsToBeRemoved.length > 0){
      await sequenceDb.deleteMany({ _id : { $in :idsToBeRemoved } });
    }

    dbSequences = await sequenceDb.findMany({});

    allSequenceData.forEach( function (seqData) {
      existSeq = dbSequences.find(dbSequence => dbSequence.modelName === seqData.modelName && dbSequence.attribute === seqData.attribute);
        
      if (!existSeq){
        newSequences.push(seqData);
      } else {
        sequenceDb.updateOne({ _id: existSeq.id },{
          prefix :seqData.prefix,
          suffix: seqData.suffix,
          startingPoint : seqData.startingPoint 
        });
      }
    });

    if (newSequences && newSequences.length > 0){
      await sequenceDb.create(newSequences);
    }
    console.log('series seeded successfully');
  } catch (error){
    console.log('series seeder failed due to ', error.message);
  }
}

const seedData = async (allRegisterRoutes) => {
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();
  await seedSequence();
};
module.exports = seedData;
