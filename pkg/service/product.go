package service

import (
	"context"
	"encoding/json"
	"fmt"
	"prac/pkg/repository"
	"prac/todo"
	"time"
)

type ProductService struct {
	repo         repository.Product
	cacheRepo    repository.CacheRepository
	cacheTTL     time.Duration
	listCacheTTL time.Duration
}

func NewProductService(repo repository.Product, cacheRepo repository.CacheRepository) *ProductService {
	return &ProductService{
		repo:         repo,
		cacheRepo:    cacheRepo,
		cacheTTL:     10 * time.Minute, // TTL user
		listCacheTTL: 5 * time.Minute,  // TTL list
	}
}

// cache keys
func (s *ProductService) productCacheKey(id uint) string {
	return fmt.Sprintf("product:%d", id)
}

func (s *ProductService) productsListCacheKey() string {
	return "products:list"
}

func (s *ProductService) CreateProduct(ctx context.Context, input todo.CreateProductInput, sellerID uint) (todo.Product, error) {
	product := todo.Product{
		Name:        input.Name,
		Description: input.Description,
		Price:       input.Price,
		Stock:       input.Stock,
		Category:    input.Category,
		SellerID:    sellerID,
	}

	createdProduct, err := s.repo.CreateProduct(ctx, product)
	if err != nil {
		return todo.Product{}, err
	}

	listKey := s.productsListCacheKey()
	_ = s.cacheRepo.Delete(ctx, listKey)

	return createdProduct, nil
}

func (s *ProductService) GetAllProducts(ctx context.Context) ([]todo.Product, error) {
	cacheKey := s.productsListCacheKey()

	// 1️⃣ пробуємо з кешу
	cachedData, err := s.cacheRepo.Get(ctx, cacheKey)
	if err == nil && cachedData != nil {
		var products []todo.Product
		if err := json.Unmarshal(cachedData, &products); err == nil {
			return products, nil
		}
	}

	// 2️⃣ якщо нема в кеші — беремо з БД
	products, err := s.repo.GetAllProducts(ctx)
	if err != nil {
		return nil, err
	}

	// 3️⃣ кладемо в кеш
	if len(products) > 0 {
		data, _ := json.Marshal(products)
		_ = s.cacheRepo.Set(ctx, cacheKey, data, s.listCacheTTL)
	}

	return products, nil
}

func (s *ProductService) GetProductByID(ctx context.Context, productID uint) (todo.Product, error) {
	cacheKey := s.productCacheKey(productID)

	cachedData, err := s.cacheRepo.Get(ctx, cacheKey)
	if err == nil && cachedData != nil {
		var product todo.Product
		if err := json.Unmarshal(cachedData, &product); err == nil {
			return product, nil
		}
	}

	product, err := s.repo.GetProductByID(ctx, productID)
	if err != nil {
		return todo.Product{}, err
	}

	data, _ := json.Marshal(product)
	_ = s.cacheRepo.Set(ctx, cacheKey, data, s.cacheTTL)

	return product, nil
}
func (s *ProductService) UpdateProduct(
	ctx context.Context,
	productID uint,
	input todo.UpdateProductInput,
	sellerID uint,
) (todo.Product, error) {

	product := todo.Product{
		Name:        input.Name,
		Description: input.Description,
		Price:       input.Price,
		Stock:       input.Stock,
		Category:    input.Category,
		SellerID:    sellerID,
	}

	updatedProduct, err := s.repo.UpdateProduct(ctx, productID, product)
	if err != nil {
		return todo.Product{}, err
	}

	// 🔥 інвалідовуємо кеш конкретного продукту
	productKey := s.productCacheKey(productID)
	_ = s.cacheRepo.Delete(ctx, productKey)

	// 🔥 інвалідовуємо список
	listKey := s.productsListCacheKey()
	_ = s.cacheRepo.Delete(ctx, listKey)

	return updatedProduct, nil
}
func (s *ProductService) DeleteProduct(ctx context.Context, id uint) error {
	if err := s.repo.DeleteProduct(ctx, id); err != nil {
		return err
	}

	// 🔥 чистимо кеш продукту
	productKey := s.productCacheKey(id)
	_ = s.cacheRepo.Delete(ctx, productKey)

	// 🔥 чистимо кеш списку
	listKey := s.productsListCacheKey()
	_ = s.cacheRepo.Delete(ctx, listKey)

	return nil
}
