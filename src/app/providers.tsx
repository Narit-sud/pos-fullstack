"use client";
import { ReactNode } from "react";
import { ProductProvider } from "./product/contexts/useProduct";
import { CategoryProvider } from "./product/contexts/useCategory";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ProductProvider>
            <CategoryProvider>{children}</CategoryProvider>
        </ProductProvider>
    );
}
