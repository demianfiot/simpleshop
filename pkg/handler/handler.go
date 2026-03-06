package handler

import (
	_ "prac/docs"
	"prac/pkg/service"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// gin-swagger middleware
// swagger embed files

type Handler struct {
	services service.Service
}

func NewHandler(services service.Service) *Handler {
	return &Handler{services: services}
}

func (h *Handler) InitRoutes() *gin.Engine {
	router := gin.New()

	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))
	//cors -
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000", "http://127.0.0.1:3000", "http://192.168.0.196:3000"},
		AllowMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders: []string{
			"Origin",
			"Content-Type",
			"Authorization",
			"Accept",
			"X-Requested-With",
			"Access-Control-Allow-Headers",
			"Access-Control-Allow-Origin",
		},
		ExposeHeaders:    []string{"Content-Length", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":    "OK",
			"service":   "backend",
			"timestamp": time.Now(),
		})
	})

	api := router.Group("/api")
	{
		// ---------- AUTH ----------
		auth := api.Group("/auth")
		{
			auth.POST("/signup", h.SignUp)
			auth.POST("/signin", h.SignIn)
		}
		// ---------- PUBLIC PRODUCTS ----------
		products := api.Group("/products")
		{
			products.GET("", h.GetAllProducts)
			products.GET("/:id", h.GetProductByID)
		}

		// ---------- PROTECTED ROUTES ----------
		protected := api.Group("", h.userIdentity)
		{
			// ----- PROFILE -----
			profile := protected.Group("/profile")
			{
				profile.GET("", h.GetProfile)
				profile.PATCH("", h.UpdateProfile)
			}

			// ----- USERS (admin only) -----
			users := protected.Group("/users")
			{
				users.POST("", h.requireRole("admin"), h.CreateUser)
				users.GET("", h.requireRole("admin"), h.GetAllUsers)
				users.GET("/:id", h.requireRole("admin"), h.GetUserByID)
				users.PATCH("/:id", h.requireRole("admin"), h.UpdateUser)
				users.DELETE("/:id", h.requireRole("admin"), h.DeleteUser)
			}

			// ----- PRODUCTS (seller + admin) -----
			productsProtected := protected.Group("/products")
			{
				productsProtected.POST("", h.requireRole("seller", "admin"), h.CreateProduct)
				productsProtected.PATCH("/:id", h.requireRole("seller", "admin"), h.UpdateProduct)
				productsProtected.DELETE("/:id", h.requireRole("seller", "admin"), h.DeleteProduct)
			}

			// ----- ORDERS -----
			orders := protected.Group("/orders")
			{
				orders.POST("", h.CreateOrder)
				orders.GET("", h.GetUserOrders)
				orders.GET("/:id", h.GetOrderByID)
				orders.GET("/all", h.requireRole("admin"), h.GetAllOrders)
				orders.PATCH("/:id", h.requireRole("admin"), h.UpdateOrderStatus)
			}
		}
	}
	return router
}

/* auth := router.Group("/auth")
	{
		auth.POST("/signup", h.SignUp)
		auth.POST("/signin", h.SignIn)
	}

	api := router.Group("/api")

	//  products public read
	products := api.Group("/products")
	{
		products.GET("", h.GetAllProducts)
		products.GET("/:id", h.GetProductByID)
	}

	// w auth

	protected := api.Group("", h.userIdentity)
	{

		//  profile
		profile := protected.Group("/profile")
		{
			profile.GET("", h.GetProfile)
			profile.PATCH("", h.UpdateProfile)
		}

		//  users (admin only)
		users := protected.Group("/users", h.requireRole("admin"))
		{
			users.POST("", h.CreateUser)
			users.GET("", h.GetAllUsers)
			users.GET("/:id", h.GetUserByID)
			users.PATCH("/:id", h.UpdateUser)
			users.DELETE("/:id", h.DeleteUser)
		}

		// products (seller + admin) - create, update, delete
		productsProtected := protected.Group("/products")
		{
			productsProtected.POST("", h.requireRole("seller", "admin"), h.CreateProduct)
			productsProtected.PATCH("/:id", h.requireRole("seller", "admin"), h.UpdateProduct)
			productsProtected.DELETE("/:id", h.requireRole("seller", "admin"), h.DeleteProduct)
		}

		// orders
		orders := protected.Group("/orders")
		{
			orders.POST("", h.CreateOrder)
			orders.GET("", h.GetUserOrders)
			orders.GET("/:id", h.GetOrderByID)
			orders.GET("/all", h.requireRole("admin"), h.GetAllOrders)
			orders.PATCH("/:id", h.requireRole("admin"), h.UpdateOrderStatus)
		}
	}

	return router
} */
