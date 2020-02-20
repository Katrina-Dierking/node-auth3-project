exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {id: 1, username: 'Katrina', password: 'yes', department: 'backend'},
        {id: 2, username: 'Justin', password: 'yes', department: 'staff' },
        {id: 3, username: 'Taran', password: 'yes', department: 'staff' },
        {id: 4, username: 'Gina', password: 'yes', department: 'staff' },
        {id: 5, username: 'CoffeeMilk', password: 'yes', department: 'staff' }
       ]);
    });
};
