import { useState } from "react";
import { ArrowLeft, Search, Heart, MessageCircle, Grid3X3, List, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

// Mock data for community catalogs
const mockCatalogs = [
  {
    id: 1,
    title: "Fresh Organic Tomatoes",
    description: "Locally grown organic tomatoes, perfect for cooking. Rich in flavor and nutrients.",
    image: "/placeholder.svg",
    seller: "Priya Sharma",
    location: "Village Market",
    likes: 24,
    comments: 5,
    price: "₹40/kg",
    category: "Vegetables"
  },
  {
    id: 2,
    title: "Handmade Clay Pots",
    description: "Traditional clay pots made by local artisans. Perfect for cooking and storage.",
    image: "/placeholder.svg",
    seller: "Ramesh Kumar",
    location: "Pottery Village",
    likes: 18,
    comments: 3,
    price: "₹150 each",
    category: "Handicrafts"
  },
  {
    id: 3,
    title: "Fresh Cow Milk",
    description: "Pure, fresh cow milk from our dairy farm. Daily delivery available.",
    image: "/placeholder.svg",
    seller: "Lakshmi Devi",
    location: "Dairy Farm",
    likes: 32,
    comments: 8,
    price: "₹55/liter",
    category: "Dairy"
  },
  {
    id: 4,
    title: "Homemade Pickles",
    description: "Authentic homemade pickles made with traditional recipes and fresh ingredients.",
    image: "/placeholder.svg",
    seller: "Sunita Rao",
    location: "Home Kitchen",
    likes: 19,
    comments: 4,
    price: "₹200/jar",
    category: "Food"
  },
  {
    id: 5,
    title: "Organic Honey",
    description: "Pure organic honey from our bee farm. No artificial additives.",
    image: "/placeholder.svg",
    seller: "Mohan Bee Farm",
    location: "Hill Station",
    likes: 27,
    comments: 6,
    price: "₹350/500g",
    category: "Food"
  },
  {
    id: 6,
    title: "Handwoven Baskets",
    description: "Beautiful handwoven baskets made from natural materials. Various sizes available.",
    image: "/placeholder.svg",
    seller: "Craft Collective",
    location: "Artisan Center",
    likes: 15,
    comments: 2,
    price: "₹120 onwards",
    category: "Handicrafts"
  }
];

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Vegetables", "Handicrafts", "Dairy", "Food"];

  const filteredCatalogs = mockCatalogs.filter(catalog => {
    const matchesSearch = catalog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         catalog.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || catalog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link to="/">
            <Button variant="ghost" size="icon" className="mr-3">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-earth-brown">Explore Community Products</h1>
            <p className="text-muted-foreground">Discover amazing products from your neighbors</p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white shadow-card mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="pl-10 rounded-xl border-2 focus:border-primary"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-input bg-background focus:border-primary outline-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-muted rounded-xl p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-lg"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-lg"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            Found {filteredCatalogs.length} product{filteredCatalogs.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Products Grid/List */}
        <div className={`${
          viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
        }`}>
          {filteredCatalogs.map((catalog) => (
            <Card key={catalog.id} className="bg-white shadow-card hover:shadow-warm transition-all duration-300 group">
              <CardContent className={`${viewMode === "grid" ? "p-4" : "p-4 flex items-center space-x-4"}`}>
                {/* Product Image */}
                <div className={`${
                  viewMode === "grid" ? "aspect-square mb-4" : "w-24 h-24 flex-shrink-0"
                } rounded-xl overflow-hidden bg-muted`}>
                  <img
                    src={catalog.image}
                    alt={catalog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className={`${viewMode === "grid" ? "" : "flex-1"} space-y-2`}>
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-earth-brown group-hover:text-primary transition-colors line-clamp-2">
                      {catalog.title}
                    </h3>
                    <span className="text-primary font-bold text-sm whitespace-nowrap ml-2">
                      {catalog.price}
                    </span>
                  </div>

                  <p className={`text-muted-foreground text-sm ${
                    viewMode === "grid" ? "line-clamp-2" : "line-clamp-1"
                  }`}>
                    {catalog.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div>
                      <p className="font-medium">{catalog.seller}</p>
                      <p>{catalog.location}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span>{catalog.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-3 w-3" />
                        <span>{catalog.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCatalogs.length === 0 && (
          <Card className="bg-white shadow-card">
            <CardContent className="p-12 text-center">
              <div className="bg-gradient-primary rounded-full p-6 w-fit mx-auto mb-4 opacity-20">
                <Search className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-earth-brown mb-2">No Products Found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or filters
              </p>
              <Link to="/">
                <Button variant="hero">
                  Create Your First Catalog
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Explore;