import { Category } from '../types/Category';
import { Config } from '../constants/Config';

export const CategoryService = {
  getCategories: async (): Promise<Category[]> => {
    const response = await fetch(`${Config.BASE_URL}/categories`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `We couldn't load the categories right now.Please check your internet connection and try again.`);
    }

    return await response.json();
  },

  getCategoryFields: async (categorySlug: string): Promise<any> => {
    const response = await fetch(
      `${Config.BASE_URL}/categoryFields?categorySlugs=${categorySlug}&includeChildCategories=true&splitByCategoryIDs=true&flatChoices=true&groupChoicesBySection=true&flat=true`,
      {
        headers: {
          'accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to load specific details for this category. Please try again.');
    }

    return await response.json();
  },
};
