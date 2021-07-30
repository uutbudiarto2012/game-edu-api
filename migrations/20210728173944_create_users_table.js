exports.up = function(knex) {
  return knex.schema.createTable('users',function(table){
      table.increments('user_id');
      table.string('email',128).unique().notNullable();
      table.string('username',128).unique().notNullable();
      table.string('password ',255).notNullable();
      table.integer('level ',3).defaultTo(1);
      table.integer('status ',1).defaultTo(1);
      table.string('display_name',128);
      table.string('avatar',225).defaultTo('public/images/default_avatar.png');
      table.string('phone_number',16);
      table.string('country',128);
      table.string('city',128);
      table.timestamps(true,true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
