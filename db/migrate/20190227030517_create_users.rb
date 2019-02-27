class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email, null: false
      t.string :session_token, null: false
      t.string :password_digest, null: false
      t.integer :buying_power

      t.timestamps
    end
    add_index :users, :email, unique: true
  end
end
