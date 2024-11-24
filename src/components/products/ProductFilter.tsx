import { useEffect, useState } from "react";
import { Category } from "../../types/category.type";
import { ProductService } from "../../services/product.service";

interface ProductFilterProps {
  onCategorySelect: (category: string) => void;
}

export const ProductFilter = ({ onCategorySelect }: ProductFilterProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const productService = new ProductService();

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await productService.fetchCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
  });

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
              className="category-btn"
              onClick={() => onCategorySelect("")}
            >
              All
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.slug}>
              <button
                className="category-btn"
                onClick={() => onCategorySelect(category.slug)}
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
