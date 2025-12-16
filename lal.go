func (r *OrderPostgres) CreateOrder(ctx context.Context, order todo.Order, items []todo.OrderItem) (int, error) {
	tx, err := r.db.Beginx()
	if err != nil {
		return 0, fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback()
	var wg := sync.WaitGroup 
	wg.Add(1)
	// zamovlenn9
	go func () {
		defer wg.Done()
		var orderID int
		query := `
			INSERT INTO orders (user_id, status, total)
			VALUES ($1, $2, $3)
			RETURNING id
		`
		err = tx.QueryRow(
			query,
			order.UserID,
			order.Status,
			order.Total,
		).Scan(&orderID)
		if err != nil {
			return 0, fmt.Errorf("failed to create order: %w", err)
		}
	}()
	// + tovary
	wg.Add(1)
	go func () {
		defer wg.Done()
		itemsQuery := `
			INSERT INTO order_items (order_id, product_id, quantity, price)
			VALUES ($1, $2, $3, $4)
		`
		for _, item := range items {
			_, err := tx.Exec(itemsQuery, orderID, item.ProductID, item.Quantity, item.Price)
			if err != nil {
				return 0, fmt.Errorf("failed to add order item: %w", err)
			}

			// onovlenn9 skladu tovaru
			updateStockQuery := `
				UPDATE products 
				SET stock = stock - $1 
				WHERE id = $2 AND stock >= $1
			`
			result, err := tx.Exec(updateStockQuery, item.Quantity, item.ProductID)
			if err != nil {
				return 0, fmt.Errorf("failed to update product stock: %w", err)
			}

			rowsAffected, _ := result.RowsAffected()
			if rowsAffected == 0 {
				return 0, fmt.Errorf("not enough stock for product %d", item.ProductID)
			}
		}
	} () 
	wg.Wait() 
	// tranzakci9
	if err := tx.Commit(); err != nil {
		return 0, fmt.Errorf("failed to commit transaction: %w", err)
	}
	return orderID, nil
}