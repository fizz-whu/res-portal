function MenuManagement() {
  const menuItems = [
    {
      id: 1,
      name: 'Margherita Pizza',
      price: '$12.99',
      available: true,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk2Tp4SP01mg8tI3nC6x917NGv7csDEvSvAiO4V7Mesh9HYpfpuQ7ewWbkbO5jYEqFiKholkOSn2EWDGZS2VLzA58Bmyu3b02WZvEoH_If72ugTSxf54SX-JIG7_OPAodY4qVz3dFNeq-N0vn6htS9mSzeLZnxAsnkjFn1CBbshXIsXyTNy4h_-9nlZqeaz8JMw29QraLxam2dy-XrvcaSAzFgssFxu7v45w-361XFDpEahgUOzKC6yHspD5frhF4mUCU4sXeO'
    },
    {
      id: 2,
      name: 'Caesar Salad',
      price: '$8.50',
      available: true,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnUrYbi-IvnOnnrZSoYTtVXiqQJgmQmR3dd7LiWFCQ1Oetmgai5halyNYPcENRaBeTPadSJDQ2Uq_JDBabnXm3GoM2mtZYKfL4lKN2ww-RLlzRQ8lHIzOTtAA9ruj794x9YK7pIfMV4nkvt67GSpCP175ugy3l0tvXb3waYT7smXjEU7stS9WwRZoRGc_LY1244Z-gVbraZHdB83Q0CIIMiJ0obC40BcceNs4PtKutI10VROookeOY5Fn6vH5JgWguVFtMEPGa'
    },
    {
      id: 3,
      name: 'Classic Burger',
      price: '$10.75',
      available: true,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjPNXnrZLsl0QRUPXRqcSuT8P16XYPBFkuLZyObP_Xeqi3Tgr0NhGlHDZWkWsyvLgLqn27etfrPntNZ7vYng7W1RwNgM0jHa3gNSV3kwXcIr1eNRvkjplXf37dlkrqAjcyuRAQK8wJLoTlFlRClnP10pYmNyXocAMBkYqp29blMWauSKss7m6YoIwLeTIWAfsTqV4f-XTCqeClyw44LORzoWta0WFZctidpQttuFJa5Oo-mQlPlfnxeSxYX9bPD_AlTQqbxKzI'
    },
    {
      id: 4,
      name: 'Spaghetti Carbonara',
      price: '$14.50',
      available: false,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPciQoWlfsKWG8hYVzCR-_F8Qq-8H8yCKjGHGymtoYmZfthpDr2NaAY2hzSG6kgkQNNbnuvFW_5U3_-ToU7RKwpsAlvhSomIk2xrzDvDsrAZjnn-yYtwJq9dpJGEJhHofR8h0HnKiRMpWyfJPXFst0ScrrHkqSlcIjH8DFHNDdoTQzIPUTciTl2uR2W85qP8mGD6pl5f3ZkQVSHv6cCbohqrQssbIRlgoePi_wEJZOdqpJk7UFXRiCyInCXVWXbcxI13fo-eE9'
    },
    {
      id: 5,
      name: 'Chocolate Brownie',
      price: '$6.25',
      available: true,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1zJVAComLew5r4rp3qYW-qzevQCK2eyV1GKRcZ6HTmKDPNj90DtWXmkUDV4CVM5ZQdq5MG_fwOikRD7Ivf2UIy9RkjF5K2hQo5UNIPeX2yflzS-gM6C7xVi_EyUDExmBsM-A2PJFCV_HLaIYhLbJuqQccynskB58WtjZ0vn3baQXaYEpmPrKf1Dbp40ZAGPY4yUHdSEDc2O57yjxjBryvQzvCONv4BWscmqNNJVKAstZzHF0Xet0HnrxtcC21M6JrEYFK7U5Q'
    }
  ]

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border-light dark:border-border-dark px-6 py-3 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="size-8 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z" fill="currentColor"></path>
              <path clipRule="evenodd" d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </div>
          <h1 className="text-xl font-bold">DineAI</h1>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <a className="text-subtext-light dark:text-subtext-dark hover:text-primary dark:hover:text-primary transition-colors" href="#">Dashboard</a>
          <a className="text-subtext-light dark:text-subtext-dark hover:text-primary dark:hover:text-primary transition-colors" href="#">Orders</a>
          <a className="text-primary font-bold" href="#">Menu</a>
          <a className="text-subtext-light dark:text-subtext-dark hover:text-primary dark:hover:text-primary transition-colors" href="#">Settings</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center rounded-full size-10 bg-background-light dark:bg-content-dark hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
            <span className="material-symbols-outlined text-subtext-light dark:text-subtext-dark">help</span>
          </button>
          <div className="size-10 rounded-full bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC9epBeKYwMVgIRhPgEXGmhad0xWd3uXOY1EfgopY4nAza_82_NdweDbI2Zi_Db-7bhmj7L0ikqaO2_Em4JX2Ya9aCxsu6UloYyOed63gwG7kTdZq-U6SKybrYuv6vkK8kJD4WqwIS-jfPqJqyb4FC9ZQdPhLqYF9ql4b50bfGJGFkuyH_qalzweiwrPOBJyVO_zwtgMYQIWnPrJe4u_5N93hgzLFKA3ikf3CFugic75GgBrM4Dp4smgXPMl0WAaRrJsm7KjqJj")'}}></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-text-light dark:text-text-dark">Menu Management</h2>
              <p className="text-subtext-light dark:text-subtext-dark mt-1">Manage your restaurant's menu items, including prices and availability.</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button className="flex items-center gap-2 rounded bg-primary text-white px-4 py-2 text-sm font-bold hover:bg-primary/80 transition-all duration-300">
                <span className="material-symbols-outlined text-lg">add</span>
                Add Menu Item
              </button>
              <button className="flex items-center gap-2 rounded bg-content-light dark:bg-content-dark border border-border-light dark:border-border-dark px-4 py-2 text-sm font-bold text-text-light dark:text-text-dark hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300">
                <span className="material-symbols-outlined text-lg">upload_file</span>
                Upload Menu
              </button>
            </div>
          </div>

          {/* Menu Items Table */}
          <div className="bg-content-light dark:bg-content-dark rounded-lg shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-background-light dark:bg-background-dark/50 border-b border-border-light dark:border-border-dark">
                  <tr>
                    <th className="p-4 font-medium w-16" scope="col">Image</th>
                    <th className="p-4 font-medium min-w-[250px]" scope="col">Item Name</th>
                    <th className="p-4 font-medium" scope="col">Price</th>
                    <th className="p-4 font-medium" scope="col">Availability</th>
                    <th className="p-4 font-medium text-right" scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map((item) => (
                    <tr key={item.id} className="border-b border-border-light dark:border-border-dark last:border-b-0 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors duration-300">
                      <td className="p-4">
                        <div className="size-12 rounded bg-cover bg-center" style={{backgroundImage: `url("${item.image}")`}}></div>
                      </td>
                      <td className="p-4 font-medium text-text-light dark:text-text-dark">{item.name}</td>
                      <td className="p-4 text-subtext-light dark:text-subtext-dark">{item.price}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.available
                            ? 'bg-primary/20 text-primary'
                            : 'bg-red-500/20 text-red-500'
                        }`}>
                          {item.available ? 'Available' : 'Unavailable'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <button className="flex items-center justify-center rounded-full size-8 hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors">
                            <span className="material-symbols-outlined text-lg text-subtext-light dark:text-subtext-dark">edit</span>
                          </button>
                          <button className="flex items-center justify-center rounded-full size-8 hover:bg-red-500/20 dark:hover:bg-red-500/30 transition-colors">
                            <span className="material-symbols-outlined text-lg text-subtext-light dark:text-subtext-dark">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upload Menu Section */}
          <div className="mt-8">
            <div className="bg-content-light dark:bg-content-dark p-6 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
              <h3 className="text-lg font-bold mb-4">Upload New Menu</h3>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium text-subtext-light dark:text-subtext-dark">Extracting items...</p>
                  <p className="text-sm font-bold text-primary">60%</p>
                </div>
                <div className="w-full bg-background-light dark:bg-background-dark rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{width: '60%'}}></div>
                </div>
              </div>
              <div className="aspect-video w-full rounded-lg bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBUBEZj-WTPNhHHY6alTnKCWFO6l1leO7gR8brUNTbDQ2cBA5KjdcW_IXVK_X6BlDbmCL3r1fKr_ZSGhfFgKXckO6dLqf7BvWp0UnprFiP3z2FrjGXU-sqG8bdiB6GioC51Y2IrLpH_K40bIsqxJmrKhR23arJPEbXA0TaDkFuricjieAyDquTOKoG7rxZdrrXhaXGba76wjhkYax7Db8202sxzEuPjyp0G_1zo3dTp42OciT5lAN0VnwTAh5CjuXnBeGFxTCPM")'}}></div>
              <p className="text-xs text-subtext-light dark:text-subtext-dark mt-2">Preview of extracted menu items. Review and confirm to add them to your menu.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MenuManagement
