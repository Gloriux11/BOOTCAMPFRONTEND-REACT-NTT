import { useEffect, useState } from "react";
import { Category } from "../../types/category.type";
import { ProductService } from "../../services/product.service";
import { routes } from "../../routes/routes";

interface ProductFilterProps {
  onCategorySelect: (category: string) => void;
}

const ProductFilter = ({ onCategorySelect }: ProductFilterProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const productService = new ProductService();

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await productService.fetchCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  return (
    <aside>
      <div className="category-btn">
        <button>
          Categorías <span id="category-count"></span>
        </button>
      </div>
      <div id="categories" className="categories">
        <ul id="category-list" className="category-list">
          <li key="all">
            <button
              className={`category-btn ${
                selectedCategory === "" ? "selected" : ""
              }`}
              onClick={() => handleCategorySelect(routes.Principal)}
            >
              All
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.slug}>
              <button
                className={`category-btn ${
                  selectedCategory === category.slug ? "selected" : ""
                }`}
                onClick={() => handleCategorySelect(category.slug)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default ProductFilter;
