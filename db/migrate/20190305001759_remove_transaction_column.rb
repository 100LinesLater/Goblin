class RemoveTransactionColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :transactions, :transaction_date
    add_column :transactions, :transaction_date, :string, null: false
  end
end
