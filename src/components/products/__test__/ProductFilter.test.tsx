import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import ProductFilter from "../ProductFilter"; // Importando con el nombre original
import { ProductService } from "../../../services/product.service";
import { Category } from "../../../types/category.type";
import { routes } from "../../../routes/routes";

jest.mock("../../../services/product.service");

const mockCategories: Category[] = [
  { slug: "beauty", name: "Beauty", url: "https://dummyjson.com/products/category/beauty" },
  { slug: "fragrances", name: "Fragrances", url: "https://dummyjson.com/products/category/fragrances" },
  { slug: "furniture", name: "Furniture", url: "https://dummyjson.com/products/category/furniture" },
  { slug: "groceries", name: "Groceries", url: "https://dummyjson.com/products/category/groceries" },
];

describe("ProductFilter", () => {
  beforeEach(() => {
    (ProductService.prototype.fetchCategories as jest.Mock).mockResolvedValue(mockCategories);
  });

  it("should render categories", async () => {
    render(<ProductFilter onCategorySelect={jest.fn()} />);

    await waitFor(() => {
      const categoryButtons = screen.getAllByTestId("category-button");
      expect(categoryButtons).toHaveLength(mockCategories.length + 1); // +1 for "All" button
    });
  });

  it("should call onCategorySelect when a category is selected", async () => {
    const onCategorySelect = jest.fn();
    render(<ProductFilter onCategorySelect={onCategorySelect} />);

    const categoryButton = await screen.findByText("Beauty");
    fireEvent.click(categoryButton);

    expect(onCategorySelect).toHaveBeenCalledWith("beauty");
  });

  it("should call onCategorySelect with empty string when 'All' is selected", async () => {
    const onCategorySelect = jest.fn();
    render(<ProductFilter onCategorySelect={onCategorySelect} />);

    const allButton = await screen.findByText("All");
    fireEvent.click(allButton);

    expect(onCategorySelect).toHaveBeenCalledWith(routes.Principal);
  });
});