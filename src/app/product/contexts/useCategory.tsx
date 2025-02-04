"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { CategoryClass } from "../class";
import { loadCategories } from "../service";

type CategoryContextType = { categories: CategoryClass[] };

type Props = {
    children: ReactNode;
};

const CategoryContext = createContext<CategoryContextType | undefined>(
    undefined,
);

export function CategoryProvider({ children }: Props) {
    const [categories, setCategories] = useState<CategoryClass[]>([]);
    const initialize = async () => {
        try {
            const cats = await loadCategories();
            setCategories(cats);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        initialize();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories }}>
            {children}
        </CategoryContext.Provider>
    );
}

export function useCategory() {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error(
            "Category Context must be used within category context provider tag",
        );
    }
    return context;
}
