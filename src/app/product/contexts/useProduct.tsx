"use client";
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import {
    createFullProductService,
    deleteProductService,
    loadMainProducts,
    loadVariantProducts,
} from "../service";
import {
    FullProductClass,
    MainProductClass,
    VariantProductClass,
} from "../class";

type Props = {
    children: ReactNode;
};

type ProductContextType = {
    mainProducts: MainProductClass[];
    variantProducts: VariantProductClass[];
    createNewProduct: (fullProduct: FullProductClass) => Promise<void>;
    deleteProduct: (mainProductUUID: string) => Promise<void>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: Props) {
    const [mainProducts, setMainProducts] = useState<MainProductClass[]>([]);
    const [variantProducts, setVariantProducts] = useState<
        VariantProductClass[]
    >([]);

    const initialize = async () => {
        const main = await loadMainProducts();
        setMainProducts(main);
        const variant = await loadVariantProducts();
        setVariantProducts(variant);
    };

    const createNewProduct = async (
        fullProduct: FullProductClass,
    ): Promise<void> => {
        try {
            await createFullProductService(fullProduct);
            setMainProducts((prev) => [...prev, fullProduct]);
            setVariantProducts((prev) => [...prev, ...fullProduct.variants]);
        } catch (error) {
            alert(JSON.stringify(error));
        }
    };

    const deleteProduct = async (mainProductUUID: string): Promise<void> => {
        try {
            await deleteProductService(mainProductUUID);
            setMainProducts((prev) =>
                prev.filter((prod) => prod.uuid !== mainProductUUID),
            );
            setVariantProducts((prev) =>
                prev.filter((prod) => prod.mainProduct !== mainProductUUID),
            );
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        initialize();
    }, []);
    return (
        <ProductContext.Provider
            value={{
                mainProducts,
                variantProducts,
                createNewProduct,
                deleteProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export function useProduct() {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error(
            "Product context must be used within product context provider tag",
        );
    }
    return context;
}
