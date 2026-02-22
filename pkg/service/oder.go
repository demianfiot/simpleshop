package service

import (
	"context"
	"fmt"
	"log"
	"prac/pkg/repository"
	"prac/pkg/service/events"
	"prac/todo"
	"time"
)

type OrderService struct {
	repo        repository.Order
	productRepo repository.Product
	producer    events.Producer
}

func NewOrderService(repo repository.Order, productRepo repository.Product, producer events.Producer) *OrderService {
	return &OrderService{repo: repo, productRepo: productRepo, producer: producer}
}
func (s *OrderService) CreateOrder(
	ctx context.Context,
	userID uint,
	items []todo.CreateOrderItem,
) (int, error) {

	var orderItems []todo.OrderItem
	var total float64

	for _, item := range items {

		// товар з бд
		product, err := s.productRepo.GetProductByID(ctx, item.ProductID)
		if err != nil {
			return 0, fmt.Errorf("product %d not found: %w", item.ProductID, err)
		}

		// ціна тільки з бд
		price := product.Price

		total += price * float64(item.Quantity)

		orderItems = append(orderItems, todo.OrderItem{
			ProductID:   product.ID,
			Quantity:    item.Quantity,
			Price:       price,
			ProductName: product.Name,
		})
	}

	order := todo.Order{
		UserID: userID,
		Status: "pending",
		Total:  total,
	}

	// Викликаємо репозиторій (транзакція)
	orderID, err := s.repo.CreateOrder(ctx, order, orderItems)
	if err != nil {
		return 0, err
	}

	// Kafka publish ПІСЛЯ commit
	event := todo.OrderCreatedEvent{
		OrderID:   orderID,
		UserID:    userID,
		Total:     total,
		CreatedAt: time.Now(),
	}

	if err := s.producer.PublishOrderCreated(ctx, event); err != nil {
		log.Printf("failed to publish order created event: %v", err)
	}

	return orderID, nil
}

func (s *OrderService) GetUserOrders(ctx context.Context, userID uint) ([]todo.Order, error) {
	return s.repo.GetUserOrders(ctx, userID)
}

func (s *OrderService) GetAllOrders(ctx context.Context) ([]todo.Order, error) {
	return s.repo.GetAllOrders(ctx)
}

func (s *OrderService) GetOrderByID(ctx context.Context, orderID uint) (todo.Order, error) {
	return s.repo.GetOrderByID(ctx, orderID)
}

func (s *OrderService) UpdateOrderStatus(ctx context.Context, orderID uint, status string) error {
	return s.repo.UpdateOrderStatus(ctx, orderID, status)
}
