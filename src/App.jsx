import React, { useState, useEffect, createContext, useContext } from ‘react’;
import { ShoppingCart, Heart, Search, Menu, X, User, ChevronDown, Star, Truck, Shield, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Plus, Minus, Filter, ArrowRight, Check } from ‘lucide-react’;

// Context for global state management
const AppContext = createContext();

const useApp = () => {
const context = useContext(AppContext);
if (!context) throw new Error(‘useApp must be used within AppProvider’);
return context;
};

// Mock Database - In production, this would be MongoDB/MySQL
const MOCK_PRODUCTS = [
{
id: 1,
name: "Banarasi Silk Saree",
category: "silk",
price: 8999,
originalPrice: 12999,
images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800", "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800"],
description: "Exquisite Banarasi silk saree with intricate golden zari work. Perfect for weddings and special occasions.",
fabric: "Pure Silk",
color: "Maroon",
stock: 15,
rating: 4.8,
reviews: 124,
featured: true
},
{
id: 2,
name: "Bridal Red Saree",
category: "bridal",
price: 15999,
originalPrice: 20999,
images: ["https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800", "https://images.unsplash.com/photo-1583391733981-9c0c8b0b7b7b?w=800"],
description: "Stunning bridal saree with heavy embroidery and stone work. Make your special day unforgettable.",
fabric: "Georgette with Silk",
color: "Red",
stock: 8,
rating: 4.9,
reviews: 89,
featured: true
},
{
id: 3,
name: "Casual Cotton Saree",
category: "casual",
price: 1499,
originalPrice: 2499,
images: ["https://images.unsplash.com/photo-1598258636081-44d89b6d4c3d?w=800"],
description: "Comfortable cotton saree for daily wear. Breathable fabric perfect for all-day comfort.",
fabric: "Pure Cotton",
color: "Blue",
stock: 25,
rating: 4.5,
reviews: 210,
featured: false
},
{
id: 4,
name: "Designer Georgette Saree",
category: "designer",
price: 6999,
originalPrice: 9999,
images: ["https://images.unsplash.com/photo-1610030469751-64387df5c114?w=800"],
description: "Contemporary designer saree with modern prints and elegant drape.",
fabric: "Georgette",
color: "Green",
stock: 12,
rating: 4.7,
reviews: 156,
featured: true
},
{
id: 5,
name: "Festive Gold Saree",
category: "festive",
price: 5499,
originalPrice: 7999,
images: ["https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800"],
description: "Beautiful festive saree with golden border and traditional motifs.",
fabric: "Art Silk",
color: "Gold",
stock: 18,
rating: 4.6,
reviews: 98,
featured: false
},
{
id: 6,
name: "Chanderi Silk Saree",
category: "silk",
price: 4999,
originalPrice: 6999,
images: ["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800"],
description: "Lightweight Chanderi silk saree with delicate handwoven patterns.",
fabric: "Chanderi Silk",
color: "Peach",
stock: 20,
rating: 4.7,
reviews: 143,
featured: false
}
];

const CATEGORIES = [
{ id: ‘all’, name: ‘All Sarees’, icon: ‘👗’ },
{ id: ‘bridal’, name: ‘Bridal’, icon: ‘💍’ },
{ id: ‘silk’, name: ‘Silk Sarees’, icon: ‘✨’ },
{ id: ‘casual’, name: ‘Casual Wear’, icon: ‘🌸’ },
{ id: ‘designer’, name: ‘Designer’, icon: ‘🎨’ },
{ id: ‘festive’, name: ‘Festive’, icon: ‘🎉’ }
];

// Main App Component
const RiddhiCollection = () => {
const [user, setUser] = useState(null);
const [cart, setCart] = useState([]);
const [wishlist, setWishlist] = useState([]);
const [currentPage, setCurrentPage] = useState(‘home’);
const [selectedProduct, setSelectedProduct] = useState(null);
const [isAdmin, setIsAdmin] = useState(false);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [searchQuery, setSearchQuery] = useState(’’);
const [filters, setFilters] = useState({ category: ‘all’, sortBy: ‘featured’ });

const addToCart = (product, quantity = 1) => {
setCart(prev => {
const existing = prev.find(item => item.id === product.id);
if (existing) {
return prev.map(item =>
item.id === product.id
? { …item, quantity: item.quantity + quantity }
: item
);
}
return […prev, { …product, quantity }];
});
};

const removeFromCart = (productId) => {
setCart(prev => prev.filter(item => item.id !== productId));
};

const updateCartQuantity = (productId, quantity) => {
if (quantity <= 0) {
removeFromCart(productId);
return;
}
setCart(prev => prev.map(item =>
item.id === productId ? { …item, quantity } : item
));
};

const toggleWishlist = (product) => {
setWishlist(prev => {
const exists = prev.find(item => item.id === product.id);
if (exists) {
return prev.filter(item => item.id !== product.id);
}
return […prev, product];
});
};

const isInWishlist = (productId) => {
return wishlist.some(item => item.id === productId);
};

const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

const contextValue = {
user, setUser,
cart, addToCart, removeFromCart, updateCartQuantity, cartTotal, cartItemCount,
wishlist, toggleWishlist, isInWishlist,
currentPage, setCurrentPage,
selectedProduct, setSelectedProduct,
isAdmin, setIsAdmin,
searchQuery, setSearchQuery,
filters, setFilters,
mobileMenuOpen, setMobileMenuOpen
};

return (
<AppContext.Provider value={contextValue}>
<div className="min-h-screen bg-white">
<Header />
<main>
{currentPage === ‘home’ && <HomePage />}
{currentPage === ‘products’ && <ProductsPage />}
{currentPage === ‘product-detail’ && <ProductDetailPage />}
{currentPage === ‘cart’ && <CartPage />}
{currentPage === ‘checkout’ && <CheckoutPage />}
{currentPage === ‘login’ && <LoginPage />}
{currentPage === ‘admin’ && <AdminDashboard />}
{currentPage === ‘about’ && <AboutPage />}
{currentPage === ‘contact’ && <ContactPage />}
</main>
<Footer />
</div>
</AppContext.Provider>
);
};

// Header Component
const Header = () => {
const { user, cartItemCount, wishlist, currentPage, setCurrentPage, mobileMenuOpen, setMobileMenuOpen, searchQuery, setSearchQuery } = useApp();
const [showSearch, setShowSearch] = useState(false);

return (
<header className="sticky top-0 z-50 bg-white shadow-md">
{/* Top Bar */}
<div className="bg-gradient-to-r from-amber-700 to-rose-900 text-white py-2">
<div className="container mx-auto px-4 flex justify-between items-center text-sm">
<div className="flex items-center gap-4">
<span className="flex items-center gap-1"><Phone size={14} /> +91 98765 43210</span>
<span className="hidden md:flex items-center gap-1"><Mail size={14} /> info@riddhicollection.com</span>
</div>
<div className="flex items-center gap-3">
<span className="hidden sm:inline">Free Shipping on Orders Above ₹999</span>
</div>
</div>
</div>

```
  {/* Main Header */}
  <div className="container mx-auto px-4 py-4">
    <div className="flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
        <div className="text-3xl font-serif font-bold bg-gradient-to-r from-amber-700 to-rose-900 bg-clip-text text-transparent">
          Riddhi Collection
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-8">
        <a onClick={() => setCurrentPage('home')} className={`cursor-pointer hover:text-rose-900 transition ${currentPage === 'home' ? 'text-rose-900 font-semibold' : ''}`}>Home</a>
        <a onClick={() => setCurrentPage('products')} className={`cursor-pointer hover:text-rose-900 transition ${currentPage === 'products' ? 'text-rose-900 font-semibold' : ''}`}>Shop</a>
        <a onClick={() => setCurrentPage('about')} className={`cursor-pointer hover:text-rose-900 transition ${currentPage === 'about' ? 'text-rose-900 font-semibold' : ''}`}>About</a>
        <a onClick={() => setCurrentPage('contact')} className={`cursor-pointer hover:text-rose-900 transition ${currentPage === 'contact' ? 'text-rose-900 font-semibold' : ''}`}>Contact</a>
      </nav>

      {/* Action Icons */}
      <div className="flex items-center gap-4">
        <button onClick={() => setShowSearch(!showSearch)} className="hover:text-rose-900 transition">
          <Search size={22} />
        </button>
        <button onClick={() => setCurrentPage('login')} className="hover:text-rose-900 transition">
          <User size={22} />
        </button>
        <button className="hover:text-rose-900 transition relative">
          <Heart size={22} />
          {wishlist.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-rose-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </button>
        <button onClick={() => setCurrentPage('cart')} className="hover:text-rose-900 transition relative">
          <ShoppingCart size={22} />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-rose-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>

    {/* Search Bar */}
    {showSearch && (
      <div className="mt-4">
        <input
          type="text"
          placeholder="Search for sarees..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900"
        />
      </div>
    )}
  </div>

  {/* Mobile Menu */}
  {mobileMenuOpen && (
    <div className="lg:hidden bg-white border-t">
      <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
        <a onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="cursor-pointer hover:text-rose-900">Home</a>
        <a onClick={() => { setCurrentPage('products'); setMobileMenuOpen(false); }} className="cursor-pointer hover:text-rose-900">Shop</a>
        <a onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }} className="cursor-pointer hover:text-rose-900">About</a>
        <a onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }} className="cursor-pointer hover:text-rose-900">Contact</a>
      </nav>
    </div>
  )}
</header>
```

);
};

// Home Page
const HomePage = () => {
const { setCurrentPage, setSelectedProduct, setFilters } = useApp();
const [currentSlide, setCurrentSlide] = useState(0);

const banners = [
{ title: "Bridal Collection 2025", subtitle: "Exclusive Designer Sarees", image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1200" },
{ title: "Pure Silk Elegance", subtitle: "Handwoven Masterpieces", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200" },
{ title: "Festive Special", subtitle: "Traditional Charm", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200" }
];

useEffect(() => {
const timer = setInterval(() => {
setCurrentSlide((prev) => (prev + 1) % banners.length);
}, 5000);
return () => clearInterval(timer);
}, []);

const featuredProducts = MOCK_PRODUCTS.filter(p => p.featured);

return (
<div>
{/* Hero Carousel */}
<div className="relative h-[500px] overflow-hidden">
{banners.map((banner, idx) => (
<div
key={idx}
className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
>
<img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
<div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
<div className="text-center text-white">
<h1 className="text-5xl font-serif font-bold mb-4">{banner.title}</h1>
<p className="text-2xl mb-8">{banner.subtitle}</p>
<button onClick={() => setCurrentPage(‘products’)} className="bg-gradient-to-r from-amber-700 to-rose-900 text-white px-8 py-3 rounded-lg hover:shadow-lg transition">
Shop Now
</button>
</div>
</div>
</div>
))}

```
    {/* Carousel Indicators */}
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
      {banners.map((_, idx) => (
        <button
          key={idx}
          onClick={() => setCurrentSlide(idx)}
          className={`w-3 h-3 rounded-full ${idx === currentSlide ? 'bg-white' : 'bg-white/50'}`}
        />
      ))}
    </div>
  </div>

  {/* Categories */}
  <section className="py-16 bg-gradient-to-b from-rose-50 to-white">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-serif font-bold text-center mb-12">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {CATEGORIES.map(category => (
          <div
            key={category.id}
            onClick={() => { setFilters({ category: category.id, sortBy: 'featured' }); setCurrentPage('products'); }}
            className="bg-white rounded-lg p-6 text-center cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-3">{category.icon}</div>
            <h3 className="font-semibold">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Featured Products */}
  <section className="py-16">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-4xl font-serif font-bold">Featured Collection</h2>
        <button onClick={() => setCurrentPage('products')} className="text-rose-900 flex items-center gap-2 hover:gap-3 transition-all">
          View All <ArrowRight size={20} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </section>

  {/* Features */}
  <section className="py-16 bg-gradient-to-b from-rose-50 to-white">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <Truck size={48} className="mx-auto mb-4 text-rose-900" />
          <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
          <p className="text-gray-600">On orders above ₹999</p>
        </div>
        <div className="text-center">
          <Shield size={48} className="mx-auto mb-4 text-rose-900" />
          <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
          <p className="text-gray-600">100% secure transactions</p>
        </div>
        <div className="text-center">
          <Phone size={48} className="mx-auto mb-4 text-rose-900" />
          <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
          <p className="text-gray-600">Dedicated customer service</p>
        </div>
      </div>
    </div>
  </section>
</div>
```

);
};

// Product Card Component
const ProductCard = ({ product }) => {
const { addToCart, toggleWishlist, isInWishlist, setCurrentPage, setSelectedProduct } = useApp();
const [imageIndex, setImageIndex] = useState(0);

const handleProductClick = () => {
setSelectedProduct(product);
setCurrentPage(‘product-detail’);
};

return (
<div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
<div className="relative overflow-hidden cursor-pointer" onClick={handleProductClick}>
<img
src={product.images[imageIndex]}
alt={product.name}
className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
onMouseEnter={() => product.images[1] && setImageIndex(1)}
onMouseLeave={() => setImageIndex(0)}
/>
{product.originalPrice > product.price && (
<div className="absolute top-4 left-4 bg-rose-900 text-white px-3 py-1 rounded-full text-sm font-bold">
{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
</div>
)}
<button
onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
className={`absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:scale-110 transition ${isInWishlist(product.id) ? 'text-rose-900' : 'text-gray-400'}`}
>
<Heart size={20} fill={isInWishlist(product.id) ? ‘currentColor’ : ‘none’} />
</button>
</div>
<div className="p-4">
<h3 className="font-bold text-lg mb-2 cursor-pointer hover:text-rose-900" onClick={handleProductClick}>{product.name}</h3>
<div className="flex items-center gap-2 mb-2">
<div className="flex items-center">
<Star size={16} className="text-amber-500 fill-amber-500" />
<span className="ml-1 text-sm">{product.rating}</span>
</div>
<span className="text-gray-400 text-sm">({product.reviews})</span>
</div>
<div className="flex items-center gap-2 mb-4">
<span className="text-2xl font-bold text-rose-900">₹{product.price.toLocaleString()}</span>
{product.originalPrice > product.price && (
<span className="text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
)}
</div>
<button
onClick={() => addToCart(product)}
className="w-full bg-gradient-to-r from-amber-700 to-rose-900 text-white py-2 rounded-lg hover:shadow-lg transition"
>
Add to Cart
</button>
</div>
</div>
);
};

// Products Page
const ProductsPage = () => {
const { filters, setFilters, searchQuery } = useApp();
const [showFilters, setShowFilters] = useState(false);

let filteredProducts = MOCK_PRODUCTS;

if (filters.category !== ‘all’) {
filteredProducts = filteredProducts.filter(p => p.category === filters.category);
}

if (searchQuery) {
filteredProducts = filteredProducts.filter(p =>
p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
p.description.toLowerCase().includes(searchQuery.toLowerCase())
);
}

if (filters.sortBy === ‘price-low’) {
filteredProducts = […filteredProducts].sort((a, b) => a.price - b.price);
} else if (filters.sortBy === ‘price-high’) {
filteredProducts = […filteredProducts].sort((a, b) => b.price - a.price);
} else if (filters.sortBy === ‘rating’) {
filteredProducts = […filteredProducts].sort((a, b) => b.rating - a.rating);
}

return (
<div className="py-8">
<div className="container mx-auto px-4">
<div className="flex justify-between items-center mb-8">
<h1 className="text-4xl font-serif font-bold">Our Collection</h1>
<button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 border px-4 py-2 rounded-lg">
<Filter size={20} /> Filters
</button>
</div>

```
    <div className="flex gap-8">
      {/* Sidebar Filters */}
      <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 space-y-6`}>
        <div>
          <h3 className="font-bold text-lg mb-4">Categories</h3>
          <div className="space-y-2">
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => setFilters({ ...filters, category: category.id })}
                className={`w-full text-left px-4 py-2 rounded-lg transition ${filters.category === category.id ? 'bg-rose-900 text-white' : 'hover:bg-rose-50'}`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Sort By</h3>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1">
        <div className="mb-4 text-gray-600">
          Showing {filteredProducts.length} products
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  </div>
</div>
```

);
};

// Product Detail Page
const ProductDetailPage = () => {
const { selectedProduct, addToCart, toggleWishlist, isInWishlist } = useApp();
const [selectedImage, setSelectedImage] = useState(0);
const [quantity, setQuantity] = useState(1);

if (!selectedProduct) return <div className="py-20 text-center">Product not found</div>;

return (
<div className="py-8">
<div className="container mx-auto px-4">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
{/* Images */}
<div>
<div className="mb-4 rounded-lg overflow-hidden">
<img
src={selectedProduct.images[selectedImage]}
alt={selectedProduct.name}
className="w-full h-[600px] object-cover"
/>
</div>
<div className="flex gap-4">
{selectedProduct.images.map((img, idx) => (
<img
key={idx}
src={img}
alt={`${selectedProduct.name} ${idx + 1}`}
onClick={() => setSelectedImage(idx)}
className={`w-24 h-24 object-cover rounded-lg cursor-pointer ${selectedImage === idx ? 'ring-2 ring-rose-900' : 'opacity-60'}`}
/>
))}
</div>
</div>

```
      {/* Details */}
      <div>
        <h1 className="text-4xl font-serif font-bold mb-4">{selectedProduct.name}</h1>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className={`${i < Math.floor(selectedProduct.rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-gray-600">({selectedProduct.reviews} reviews)</span>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <span className="text-4xl font-bold text-rose-900">₹{selectedProduct.price.toLocaleString()}</span>
          {selectedProduct.originalPrice > selectedProduct.price && (
            <span className="text-2xl text-gray-400 line-through">₹{selectedProduct.originalPrice.toLocaleString()}</span>
          )}
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed">{selectedProduct.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Fabric</div>
            <div className="font-semibold">{selectedProduct.fabric}</div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Color</div>
            <div className="font-semibold">{selectedProduct.color}</div>
          </div>
        </div>

        <div className="mb-6">
          <span className={`inline-block px-4 py-2 rounded-full ${selectedProduct.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {selectedProduct.stock > 0 ? `In Stock (${selectedProduct.stock} available)` : 'Out of Stock'}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-3 hover:bg-gray-100"
            >
              <Minus size={20} />
            </button>
            <span className="px-6 py-3 border-x">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
              className="px-4 py-3 hover:bg-gray-100"
            >
              <Plus size={20} />
            </button>
          </div>

          <button
            onClick={() => addToCart(selectedProduct, quantity)}
            disabled={selectedProduct.stock === 0}
            className="flex-1 bg-gradient-to-r from-amber-700 to-rose-900 text-white py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>

          <button
            onClick={() => toggleWishlist(selectedProduct)}
            className={`p-3 border rounded-lg hover:bg-gray-100 transition ${isInWishlist(selectedProduct.id) ? 'text-rose-900 border-rose-900' : ''}`}
          >
            <Heart size={24} fill={isInWishlist(selectedProduct.id) ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="border-t pt-6 space-y-4">
          <div className="flex items-center gap-3">
            <Truck size={24} className="text-rose-900" />
            <div>
              <div className="font-semibold">Free Delivery</div>
              <div className="text-sm text-gray-600">On orders above ₹999</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield size={24} className="text-rose-900" />
            <div>
              <div className="font-semibold">Secure Transaction</div>
              <div className="text-sm text-gray-600">100% safe payment</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

);
};

// Cart Page
const CartPage = () => {
const { cart, updateCartQuantity, removeFromCart, cartTotal, setCurrentPage } = useApp();

if (cart.length === 0) {
return (
<div className="py-20">
<div className="container mx-auto px-4 text-center">
<ShoppingCart size={80} className="mx-auto mb-4 text-gray-300" />
<h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
<p className="text-gray-600 mb-8">Add some beautiful sarees to your cart!</p>
<button
onClick={() => setCurrentPage(‘products’)}
className="bg-gradient-to-r from-amber-700 to-rose-900 text-white px-8 py-3 rounded-lg hover:shadow-lg transition"
>
Continue Shopping
</button>
</div>
</div>
);
}

const shipping = cartTotal > 999 ? 0 : 99;
const tax = Math.round(cartTotal * 0.18);
const total = cartTotal + shipping + tax;

return (
<div className="py-8">
<div className="container mx-auto px-4">
<h1 className="text-4xl font-serif font-bold mb-8">Shopping Cart</h1>

```
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        {cart.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex gap-4">
            <img src={item.images[0]} alt={item.name} className="w-32 h-32 object-cover rounded-lg" />
            
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{item.fabric} • {item.color}</p>
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-rose-900">₹{item.price.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col justify-between items-end">
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-400 hover:text-red-600 transition"
              >
                <X size={20} />
              </button>

              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 border-x">{item.quantity}</span>
                <button
                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div>
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          
          <div className="space-y-3 mb-4 pb-4 border-b">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">₹{cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (18%)</span>
              <span className="font-semibold">₹{tax.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex justify-between text-xl font-bold mb-6">
            <span>Total</span>
            <span className="text-rose-900">₹{total.toLocaleString()}</span>
          </div>

          <button
            onClick={() => setCurrentPage('checkout')}
            className="w-full bg-gradient-to-r from-amber-700 to-rose-900 text-white py-3 rounded-lg hover:shadow-lg transition mb-4"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={() => setCurrentPage('products')}
            className="w-full border-2 border-rose-900 text-rose-900 py-3 rounded-lg hover:bg-rose-50 transition"
          >
            Continue Shopping
          </button>

          {cartTotal < 999 && (
            <div className="mt-4 p-3 bg-amber-50 text-amber-800 text-sm rounded-lg">
              Add ₹{(999 - cartTotal).toLocaleString()} more for FREE shipping!
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
```

);
};

// Checkout Page
const CheckoutPage = () => {
const { cart, cartTotal, setCurrentPage } = useApp();
const [formData, setFormData] = useState({
name: ‘’,
email: ‘’,
phone: ‘’,
address: ‘’,
city: ‘’,
state: ‘’,
pincode: ‘’,
paymentMethod: ‘card’
});
const [orderPlaced, setOrderPlaced] = useState(false);

const shipping = cartTotal > 999 ? 0 : 99;
const tax = Math.round(cartTotal * 0.18);
const total = cartTotal + shipping + tax;

const handleSubmit = (e) => {
e.preventDefault();
setOrderPlaced(true);
setTimeout(() => {
setCurrentPage(‘home’);
}, 3000);
};

if (orderPlaced) {
return (
<div className="py-20">
<div className="container mx-auto px-4 text-center">
<div className="bg-green-100 text-green-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
<Check size={48} />
</div>
<h2 className="text-4xl font-bold mb-4">Order Placed Successfully!</h2>
<p className="text-gray-600 mb-8">Thank you for shopping with Riddhi Collection</p>
<p className="text-gray-600">Redirecting to home…</p>
</div>
</div>
);
}

return (
<div className="py-8">
<div className="container mx-auto px-4">
<h1 className="text-4xl font-serif font-bold mb-8">Checkout</h1>

```
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Checkout Form */}
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900"
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900 md:col-span-2"
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Shipping Address</h3>
            <div className="space-y-4">
              <textarea
                placeholder="Street Address"
                required
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                rows="3"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900"
                />
                <input
                  type="text"
                  placeholder="State"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900"
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  required
                  value={formData.pincode}
                  onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Payment Method</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  className="w-4 h-4 text-rose-900"
                />
                <span className="font-semibold">Credit/Debit Card</span>
              </label>
              <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  className="w-4 h-4 text-rose-900"
                />
                <span className="font-semibold">UPI</span>
              </label>
              <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  className="w-4 h-4 text-rose-900"
                />
                <span className="font-semibold">Cash on Delivery</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-700 to-rose-900 text-white py-4 rounded-lg text-lg font-bold hover:shadow-lg transition"
          >
            Place Order
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div>
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          
          <div className="space-y-3 mb-4 pb-4 border-b">
            {cart.map(item => (
              <div key={item.id} className="flex gap-3">
                <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold text-sm">{item.name}</div>
                  <div className="text-gray-600 text-sm">Qty: {item.quantity}</div>
                </div>
                <div className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</div>
              </div>
            ))}
          </div>

          <div className="space-y-3 mb-4 pb-4 border-b">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">₹{cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (18%)</span>
              <span className="font-semibold">₹{tax.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span className="text-rose-900">₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

);
};

// Login Page
const LoginPage = () => {
const { setUser, setCurrentPage, setIsAdmin } = useApp();
const [isLogin, setIsLogin] = useState(true);
const [formData, setFormData] = useState({ email: ‘’, password: ‘’, name: ‘’ });

const handleSubmit = (e) => {
e.preventDefault();

```
// Demo login - check for admin
if (formData.email === 'admin@riddhi.com' && formData.password === 'admin123') {
  setUser({ name: 'Admin', email: formData.email });
  setIsAdmin(true);
  setCurrentPage('admin');
} else {
  setUser({ name: formData.name || 'User', email: formData.email });
  setCurrentPage('home');
}
```

};

return (
<div className="py-12 bg-gradient-to-b from-rose-50 to-white">
<div className="container mx-auto px-4">
<div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8">
<h2 className="text-3xl font-serif font-bold text-center mb-8">
{isLogin ? ‘Welcome Back’ : ‘Create Account’}
</h2>

```
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900"
          />
        )}
        
        <input
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900"
        />
        
        <input
          type="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-amber-700 to-rose-900 text-white py-3 rounded-lg hover:shadow-lg transition"
        >
          {isLogin ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-rose-900 hover:underline"
        >
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
        </button>
      </div>

      <div className="mt-6 p-4 bg-amber-50 rounded-lg text-sm">
        <div className="font-semibold mb-2">Demo Credentials:</div>
        <div>Admin: admin@riddhi.com / admin123</div>
        <div>User: any email / any password</div>
      </div>
    </div>
  </div>
</div>
```

);
};

// Admin Dashboard
const AdminDashboard = () => {
const [activeTab, setActiveTab] = useState(‘dashboard’);
const [products, setProducts] = useState(MOCK_PRODUCTS);
const [newProduct, setNewProduct] = useState({
name: ‘’, category: ‘silk’, price: ‘’, originalPrice: ‘’, fabric: ‘’, color: ‘’, stock: ‘’, description: ‘’
});

const totalRevenue = products.reduce((sum, p) => sum + (p.price * (p.reviews || 10)), 0);
const totalOrders = products.reduce((sum, p) => sum + p.reviews, 0);

const handleAddProduct = (e) => {
e.preventDefault();
const product = {
…newProduct,
id: products.length + 1,
price: parseFloat(newProduct.price),
originalPrice: parseFloat(newProduct.originalPrice),
stock: parseInt(newProduct.stock),
images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800"],
rating: 4.5,
reviews: 0,
featured: false
};
setProducts([…products, product]);
setNewProduct({ name: ‘’, category: ‘silk’, price: ‘’, originalPrice: ‘’, fabric: ‘’, color: ‘’, stock: ‘’, description: ‘’ });
setActiveTab(‘products’);
};

return (
<div className="py-8 bg-gray-50 min-h-screen">
<div className="container mx-auto px-4">
<h1 className="text-4xl font-serif font-bold mb-8">Admin Dashboard</h1>

```
    {/* Tabs */}
    <div className="bg-white rounded-lg shadow-md mb-8">
      <div className="flex border-b overflow-x-auto">
        {['dashboard', 'products', 'add-product', 'orders'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 font-semibold whitespace-nowrap ${activeTab === tab ? 'border-b-2 border-rose-900 text-rose-900' : 'text-gray-600'}`}
          >
            {tab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </button>
        ))}
      </div>

      <div className="p-6">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                <div className="text-3xl font-bold mb-2">₹{totalRevenue.toLocaleString()}</div>
                <div className="text-blue-100">Total Revenue</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg">
                <div className="text-3xl font-bold mb-2">{totalOrders}</div>
                <div className="text-green-100">Total Orders</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg">
                <div className="text-3xl font-bold mb-2">{products.length}</div>
                <div className="text-purple-100">Total Products</div>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
            <div className="bg-white border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">Order ID</th>
                    <th className="px-6 py-3 text-left">Customer</th>
                    <th className="px-6 py-3 text-left">Product</th>
                    <th className="px-6 py-3 text-left">Amount</th>
                    <th className="px-6 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 5).map((product, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-6 py-4">#ORD{1000 + idx}</td>
                      <td className="px-6 py-4">Customer {idx + 1}</td>
                      <td className="px-6 py-4">{product.name}</td>
                      <td className="px-6 py-4">₹{product.price.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          Delivered
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <h3 className="text-xl font-bold mb-4">Manage Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <div key={product.id} className="border rounded-lg overflow-hidden">
                  <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h4 className="font-bold mb-2">{product.name}</h4>
                    <div className="text-rose-900 font-bold mb-2">₹{product.price.toLocaleString()}</div>
                    <div className="text-sm text-gray-600 mb-3">Stock: {product.stock}</div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-sm">
                        Edit
                      </button>
                      <button className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition text-sm">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Product Tab */}
        {activeTab === 'add-product' && (
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold mb-4">Add New Product</h3>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                required
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900"
              />

              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900"
              >
                {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Price"
                  required
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900"
                />
                <input
                  type="number"
                  placeholder="Original Price"
                  required
                  value={newProduct.originalPrice}
                  onChange={(e) => setNewProduct({...newProduct, originalPrice: e.target.value})}
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Fabric Type"
                  required
                  value={newProduct.fabric}
                  onChange={(e) => setNewProduct({...newProduct, fabric: e.target.value})}
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900"
                />
                <input
                  type="text"
                  placeholder="Color"
                  required
                  value={newProduct.color}
                  onChange={(e) => setNewProduct({...newProduct, color: e.target.value})}
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900"
                />
              </div>

              <input
                type="number"
                placeholder="Stock Quantity"
                required
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900"
              />

              <textarea
                placeholder="Product Description"
                required
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                rows="4"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900"
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-700 to-rose-900 text-white py-3 rounded-lg hover:shadow-lg transition"
              >
                Add Product
              </button>
            </form>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
            <div className="bg-white border rounded-lg overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">Order ID</th>
                    <th className="px-6 py-3 text-left">Customer</th>
                    <th className="px-6 py-3 text-left">Product</th>
                    <th className="px-6 py-3 text-left">Amount</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-6 py-4">#ORD{1000 + idx}</td>
                      <td className="px-6 py-4">Customer {idx + 1}</td>
                      <td className="px-6 py-4">{product.name}</td>
                      <td className="px-6 py-4">₹{product.price.toLocaleString()}</td>
                      <td className="px-6 py-4">Nov {7 - idx}, 2025</td>
                      <td className="px-6 py-4">
                        <select className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm border-none">
                          <option>Delivered</option>
                          <option>Shipped</option>
                          <option>Processing</option>
                          <option>Pending</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-800">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</div>
```

);
};

// About Page
const AboutPage = () => {
return (
<div className="py-12">
<div className="container mx-auto px-4">
<div className="max-w-4xl mx-auto">
<h1 className="text-5xl font-serif font-bold text-center mb-6">About Riddhi Collection</h1>
<p className="text-center text-gray-600 text-lg mb-12">Celebrating Tradition, Embracing Elegance</p>

```
      <div className="prose prose-lg max-w-none">
        <img 
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200" 
          alt="About Us" 
          className="w-full h-96 object-cover rounded-lg mb-8"
        />

        <h2 className="text-3xl font-serif font-bold mb-4">Our Story</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Riddhi Collection was born from a passion for preserving and celebrating India's rich textile heritage. 
          For over a decade, we have been curating the finest sarees and traditional wear, bringing together 
          timeless craftsmanship and contemporary elegance.
        </p>

        <h2 className="text-3xl font-serif font-bold mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          We believe every woman deserves to feel beautiful, confident, and connected to her roots. Our mission 
          is to provide exquisite traditional wear that honors heritage while embracing modern sensibilities. 
          Each saree in our collection is carefully selected for its quality, craftsmanship, and ability to 
          make you feel extraordinary.
        </p>

        <h2 className="text-3xl font-serif font-bold mb-4">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-rose-50 p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-2">Authentic Quality</h3>
            <p className="text-gray-700">Every piece is sourced from master weavers and verified for authenticity.</p>
          </div>
          <div className="bg-rose-50 p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-2">Curated Selection</h3>
            <p className="text-gray-700">Handpicked designs that blend tradition with contemporary fashion.</p>
          </div>
          <div className="bg-rose-50 p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-2">Customer First</h3>
            <p className="text-gray-700">Dedicated support team to help you find the perfect saree.</p>
          </div>
          <div className="bg-rose-50 p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-2">Sustainable Fashion</h3>
            <p className="text-gray-700">Supporting local artisans and promoting ethical fashion practices.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

);
};

// Contact Page
const ContactPage = () => {
const [formData, setFormData] = useState({ name: ‘’, email: ‘’, subject: ‘’, message: ‘’ });
const [submitted, setSubmitted] = useState(false);

const handleSubmit = (e) => {
e.preventDefault();
setSubmitted(true);
setTimeout(() => {
setSubmitted(false);
setFormData({ name: ‘’, email: ‘’, subject: ‘’, message: ‘’ });
}, 3000);
};

return (
<div className="py-12">
<div className="container mx-auto px-4">
<h1 className="text-5xl font-serif font-bold text-center mb-6">Contact Us</h1>
<p className="text-center text-gray-600 text-lg mb-12">We’d love to hear from you</p>

```
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
      {/* Contact Form */}
      <div className="bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
        
        {submitted ? (
          <div className="text-center py-12">
            <div className="bg-green-100 text-green-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
            <p className="text-gray-600">We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900"
            />
            
            <input
              type="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900"
            />
            
            <input
              type="text"
              placeholder="Subject"
              required
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900"
            />
            
            <textarea
              placeholder="Your Message"
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows="5"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-900"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-700 to-rose-900 text-white py-3 rounded-lg hover:shadow-lg transition"
            >
              Send Message
            </button>
          </form>
        )}
      </div>

      {/* Contact Information */}
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="text-rose-900 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold mb-1">Address</h3>
                <p className="text-gray-600">123, Fashion Street, Saree Market<br />Mumbai, Maharashtra 400001</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-rose-900 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold mb-1">Phone</h3>
                <p className="text-gray-600">+91 98765 43210<br />+91 98765 43211</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-rose-900 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold mb-1">Email</h3>
                <p className="text-gray-600">info@riddhicollection.com<br />support@riddhicollection.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose-50 to-amber-50 p-8 rounded-lg">
          <h3 className="font-bold text-xl mb-4">Business Hours</h3>
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Monday - Saturday</span>
              <span className="font-semibold">10:00 AM - 8:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Sunday</span>
              <span className="font-semibold">11:00 AM - 6:00 PM</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="w-12 h-12 bg-rose-900 text-white rounded-full flex items-center justify-center hover:bg-rose-800 transition">
              <Facebook size={24} />
            </a>
            <a href="#" className="w-12 h-12 bg-rose-900 text-white rounded-full flex items-center justify-center hover:bg-rose-800 transition">
              <Instagram size={24} />
            </a>
            <a href="#" className="w-12 h-12 bg-rose-900 text-white rounded-full flex items-center justify-center hover:bg-rose-800 transition">
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

);
};

// Footer Component
const Footer = () => {
const { setCurrentPage } = useApp();
const [email, setEmail] = useState(’’);
const [subscribed, setSubscribed] = useState(false);

const handleSubscribe = (e) => {
e.preventDefault();
setSubscribed(true);
setEmail(’’);
setTimeout(() => setSubscribed(false), 3000);
};

return (
<footer className="bg-gradient-to-b from-gray-900 to-black text-white py-12">
<div className="container mx-auto px-4">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
{/* Brand */}
<div>
<h3 className="text-2xl font-serif font-bold mb-4 bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">
Riddhi Collection
</h3>
<p className="text-gray-400 mb-4">
Your destination for authentic and elegant traditional wear.
</p>
<div className="flex gap-3">
<a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
<Facebook size={20} />
</a>
<a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
<Instagram size={20} />
</a>
<a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
<Twitter size={20} />
</a>
</div>
</div>

```
      {/* Quick Links */}
      <div>
        <h4 className="font-bold mb-4">Quick Links</h4>
        <ul className="space-y-2">
          <li><a onClick={() => setCurrentPage('home')} className="text-gray-400 hover:text-white cursor-pointer transition">Home</a></li>
          <li><a onClick={() => setCurrentPage('products')} className="text-gray-400 hover:text-white cursor-pointer transition">Shop</a></li>
          <li><a onClick={() => setCurrentPage('about')} className="text-gray-400 hover:text-white cursor-pointer transition">About Us</a></li>
          <li><a onClick={() => setCurrentPage('contact')} className="text-gray-400 hover:text-white cursor-pointer transition">Contact</a></li>
        </ul>
      </div>

      {/* Customer Service */}
      <div>
        <h4 className="font-bold mb-4">Customer Service</h4>
        <ul className="space-y-2">
          <li><a href="#" className="text-gray-400 hover:text-white transition">Track Order</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition">Return Policy</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition">FAQ</a></li>
        </ul>
      </div>

      {/* Newsletter */}
      <div>
        <h4 className="font-bold mb-4">Newsletter</h4>
        <p className="text-gray-400 mb-4">Subscribe for exclusive offers and updates</p>
        {subscribed ? (
          <div className="bg-green-500/20 text-green-400 px-4 py-3 rounded-lg">
            Successfully subscribed!
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-amber-600 to-rose-700 px-6 py-2 rounded-lg hover:shadow-lg transition"
            >
              <ArrowRight size={20} />
            </button>
          </form>
        )}
      </div>
    </div>

    <div className="border-t border-white/10 pt-8 text-center text-gray-400">
      <p>&copy; 2025 Riddhi Collection. All rights reserved. | Designed with ❤️ for tradition</p>
    </div>
  </div>
</footer>
```

);
};

export default RiddhiCollection;
