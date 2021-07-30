
exports.up = function(knex) {
  return knex.schema.createTable('game_category',function(table) {
      table.increments('id');
      table.string('category',200).notNullable().unique()
      table.string('slug',255).notNullable().unique()
      table.string('image',255)
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('game_category')
};
