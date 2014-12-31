class CreateWords < ActiveRecord::Migration
  def change
    create_table :words do |t|
      t.string :spelling
      t.text :meaning
    end
  end
end
