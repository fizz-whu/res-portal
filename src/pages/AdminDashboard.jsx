import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_ENDPOINTS } from '../config/api'

function AdminDashboard() {
  const navigate = useNavigate()
  const [restaurants, setRestaurants] = useState([])
  const [statistics, setStatistics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [menuItems, setMenuItems] = useState([])
  const [menuLoading, setMenuLoading] = useState(false)

  useEffect(() => {
    // Check if admin is logged in
    const isAdmin = localStorage.getItem('isAdmin')
    if (!isAdmin) {
      navigate('/admin/login')
      return
    }

    // Fetch all restaurants
    fetchRestaurants()
  }, [navigate])

  const fetchRestaurants = async () => {
    try {
      setLoading(true)
      const response = await fetch(API_ENDPOINTS.ADMIN_LIST_RESTAURANTS)
      const data = await response.json()

      if (response.ok) {
        setRestaurants(data.restaurants || [])
        setStatistics(data.statistics || {})
      } else {
        console.error('Failed to fetch restaurants:', data)
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMenu = async (restaurantId) => {
    try {
      setMenuLoading(true)
      const response = await fetch(API_ENDPOINTS.ADMIN_GET_MENU(restaurantId))
      const data = await response.json()

      if (response.ok) {
        setMenuItems(data.menuItems || [])
      } else {
        console.error('Failed to fetch menu:', data)
        setMenuItems([])
      }
    } catch (error) {
      console.error('Error fetching menu:', error)
      setMenuItems([])
    } finally {
      setMenuLoading(false)
    }
  }

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant)
    fetchMenu(restaurant.RestaurantID)
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    navigate('/admin/login')
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="bg-card-light dark:bg-card-dark/50 backdrop-blur-sm sticky top-0 z-10 border-b border-border-light dark:border-border-dark shadow-soft">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <svg className="text-primary h-8 w-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z" fill="currentColor"></path>
              <path clipRule="evenodd" d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
            <h1 className="text-xl font-bold text-foreground-light dark:text-foreground-dark">DineAI Admin</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-sm font-semibold hover:bg-red-500/20 dark:hover:bg-red-500/30 transition-colors"
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground-light dark:text-foreground-dark">Restaurant Management</h2>
          <p className="mt-2 text-subtle-light dark:text-subtle-dark">View and manage all registered restaurants</p>
        </div>

        {/* Statistics */}
        {statistics && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-soft p-6">
              <p className="text-sm font-medium text-subtle-light dark:text-subtle-dark">Total Restaurants</p>
              <p className="text-3xl font-bold text-primary mt-2">{statistics.totalRestaurants || 0}</p>
            </div>
            <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-soft p-6">
              <p className="text-sm font-medium text-subtle-light dark:text-subtle-dark">Active Restaurants</p>
              <p className="text-3xl font-bold text-green-500 mt-2">{statistics.activeRestaurants || 0}</p>
            </div>
            <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-soft p-6">
              <p className="text-sm font-medium text-subtle-light dark:text-subtle-dark">Cuisine Types</p>
              <p className="text-3xl font-bold text-blue-500 mt-2">{statistics.cuisineTypes?.length || 0}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-subtle-light dark:text-subtle-dark">Loading restaurants...</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Restaurants List */}
            <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-soft p-6">
              <h3 className="text-xl font-bold text-foreground-light dark:text-foreground-dark mb-6">All Restaurants</h3>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {restaurants.length === 0 ? (
                  <p className="text-subtle-light dark:text-subtle-dark text-center py-8">No restaurants found</p>
                ) : (
                  restaurants.map((restaurant) => (
                    <div
                      key={restaurant.RestaurantID}
                      onClick={() => handleRestaurantClick(restaurant)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedRestaurant?.RestaurantID === restaurant.RestaurantID
                          ? 'border-primary bg-primary/5 dark:bg-primary/10'
                          : 'border-border-light dark:border-border-dark hover:border-primary/50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-foreground-light dark:text-foreground-dark">
                          {restaurant.RestaurantName}
                        </h4>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          restaurant.Status === 'Active'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
                        }`}>
                          {restaurant.Status}
                        </span>
                      </div>
                      <p className="text-sm text-subtle-light dark:text-subtle-dark mb-1">
                        <span className="font-semibold">ID:</span> {restaurant.RestaurantID}
                      </p>
                      <p className="text-sm text-subtle-light dark:text-subtle-dark mb-1">
                        <span className="font-semibold">Cuisine:</span> {restaurant.CuisineType}
                      </p>
                      <p className="text-sm text-subtle-light dark:text-subtle-dark mb-1">
                        <span className="font-semibold">Phone:</span> {restaurant.PhoneNumber}
                      </p>
                      <p className="text-sm text-subtle-light dark:text-subtle-dark">
                        <span className="font-semibold">Email:</span> {restaurant.Email}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Restaurant Details & Menu */}
            <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-soft p-6">
              {!selectedRestaurant ? (
                <div className="text-center py-12">
                  <p className="text-subtle-light dark:text-subtle-dark">Select a restaurant to view details and menu</p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-foreground-light dark:text-foreground-dark mb-6">
                    {selectedRestaurant.RestaurantName}
                  </h3>

                  {/* Restaurant Details */}
                  <div className="mb-6 p-4 bg-background-light dark:bg-background-dark rounded-lg">
                    <h4 className="font-semibold text-foreground-light dark:text-foreground-dark mb-3">Details</h4>
                    <div className="space-y-2 text-sm">
                      <p className="text-subtle-light dark:text-subtle-dark">
                        <span className="font-semibold">Restaurant ID:</span> {selectedRestaurant.RestaurantID}
                      </p>
                      <p className="text-subtle-light dark:text-subtle-dark">
                        <span className="font-semibold">Address:</span> {selectedRestaurant.Address}
                      </p>
                      <p className="text-subtle-light dark:text-subtle-dark">
                        <span className="font-semibold">Phone:</span> {selectedRestaurant.PhoneNumber}
                      </p>
                      <p className="text-subtle-light dark:text-subtle-dark">
                        <span className="font-semibold">Email:</span> {selectedRestaurant.Email}
                      </p>
                      <p className="text-subtle-light dark:text-subtle-dark">
                        <span className="font-semibold">Cuisine:</span> {selectedRestaurant.CuisineType}
                      </p>
                      <p className="text-subtle-light dark:text-subtle-dark">
                        <span className="font-semibold">Created:</span>{' '}
                        {new Date(selectedRestaurant.CreatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div>
                    <h4 className="font-semibold text-foreground-light dark:text-foreground-dark mb-3">Menu Items</h4>
                    {menuLoading ? (
                      <p className="text-subtle-light dark:text-subtle-dark text-center py-8">Loading menu...</p>
                    ) : menuItems.length === 0 ? (
                      <p className="text-subtle-light dark:text-subtle-dark text-center py-8">No menu items found</p>
                    ) : (
                      <div className="space-y-3 max-h-[400px] overflow-y-auto">
                        {menuItems.map((item, index) => (
                          <div
                            key={index}
                            className="p-3 bg-background-light dark:bg-background-dark rounded-lg border border-border-light dark:border-border-dark"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <p className="font-semibold text-foreground-light dark:text-foreground-dark">
                                  {item.DishName || item.ItemName || 'Unnamed Item'}
                                </p>
                                <p className="text-sm text-subtle-light dark:text-subtle-dark mt-1">
                                  {item.Category || item.DishCategory || 'Uncategorized'}
                                </p>
                              </div>
                              <p className="font-bold text-primary ml-4">
                                ${parseFloat(item.Price || item.UnitPrice || 0).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard
