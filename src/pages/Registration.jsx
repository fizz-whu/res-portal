import { useState } from 'react'

function Registration() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement registration logic
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-gentle p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground-light dark:text-foreground-dark">Register Your Restaurant</h1>
            <p className="text-placeholder-light dark:text-placeholder-dark mt-2">Join our platform and connect with more customers.</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-foreground-light dark:text-foreground-dark mb-1" htmlFor="restaurant-name">Restaurant Name</label>
              <input className="w-full px-4 py-3 bg-input-light dark:bg-input-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary placeholder-placeholder-light dark:placeholder-placeholder-dark" id="restaurant-name" placeholder="e.g., The Gourmet Place" type="text"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground-light dark:text-foreground-dark mb-1" htmlFor="address">Address</label>
              <input className="w-full px-4 py-3 bg-input-light dark:bg-input-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary placeholder-placeholder-light dark:placeholder-placeholder-dark" id="address" placeholder="123 Main Street, Anytown" type="text"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground-light dark:text-foreground-dark mb-1" htmlFor="phone-number">Phone Number</label>
              <input className="w-full px-4 py-3 bg-input-light dark:bg-input-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary placeholder-placeholder-light dark:placeholder-placeholder-dark" id="phone-number" placeholder="(123) 456-7890" type="tel"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground-light dark:text-foreground-dark mb-1" htmlFor="cuisine-type">Cuisine Type</label>
              <select className="w-full px-4 py-3 bg-input-light dark:bg-input-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary" id="cuisine-type">
                <option>Select Cuisine Type</option>
                <option>American</option>
                <option>Chinese</option>
                <option>Indian</option>
                <option>Italian</option>
                <option>Japanese</option>
                <option>Mediterranean</option>
                <option>Mexican</option>
                <option>Middle Eastern</option>
                <option>Thai</option>
                <option>Vegan / Vegetarian</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground-light dark:text-foreground-dark mb-1" htmlFor="email">Contact Email</label>
              <input className="w-full px-4 py-3 bg-input-light dark:bg-input-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary placeholder-placeholder-light dark:placeholder-placeholder-dark" id="email" placeholder="contact@gourmetplace.com" type="email"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground-light dark:text-foreground-dark mb-1" htmlFor="password">Password</label>
              <input className="w-full px-4 py-3 bg-input-light dark:bg-input-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary placeholder-placeholder-light dark:placeholder-placeholder-dark" id="password" placeholder="Create a strong password" type="password"/>
            </div>
            <div>
              <button className="w-full text-white font-bold py-3 px-4 rounded-lg bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 dark:focus:ring-offset-background-dark" type="submit">
                Register
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className={`text-sm text-green-600 dark:text-green-500 ${showSuccess ? '' : 'hidden'}`} id="success-message">Registration successful! Redirecting...</p>
            <p className={`text-sm text-red-600 dark:text-red-500 ${showError ? '' : 'hidden'}`} id="error-message">An error occurred. Please check your details.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registration
