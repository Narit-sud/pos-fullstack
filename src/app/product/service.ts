import { json } from "stream/consumers";
import { MainProductType, VariantProductType } from "../api/product/types";
import {
    CategoryClass,
    FullProductClass,
    MainProductClass,
    VariantProductClass,
} from "./class";

export async function loadMainProducts(): Promise<MainProductClass[]> {
    try {
        const res = await fetch("/api/product/main");
        const { data } = await res.json();
        const arrayOfMains = data.map(
            (item: MainProductClass) =>
                new MainProductClass(
                    item.index,
                    item.uuid,
                    item.name,
                    item.category,
                    item.detail,
                    item.variantCount,
                    item.type,
                    item.createdAt,
                    item.updatedAt,
                ),
        );

        return arrayOfMains;
    } catch (error) {
        throw error;
    }
}

export async function loadVariantProducts(): Promise<VariantProductClass[]> {
    try {
        const res = await fetch("api/product/variant");
        const { data } = await res.json();
        const arrayOfVariants = data.map(
            (item: VariantProductClass) =>
                new VariantProductClass(
                    item.mainProduct,
                    item.index,
                    item.uuid,
                    item.name,
                    item.cost,
                    item.price,
                    item.detail,
                    item.createdAt,
                    item.updatedAt,
                ),
        );
        return arrayOfVariants;
    } catch (error) {
        throw error;
    }
}

export async function loadCategories(): Promise<CategoryClass[]> {
    try {
        const res = await fetch("api/product/category");
        const { data } = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function createFullProductService(
    fullProduct: FullProductClass,
): Promise<void> {
    try {
        const res = await fetch("api/product", {
            method: "POST",
            body: JSON.stringify(fullProduct),
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        console.log(data);
        return;
    } catch (error) {
        throw error;
    }
}

export async function deleteProductService(
    mainProductUUID: string,
): Promise<void> {
    try {
        const res = await fetch(`api/product/${mainProductUUID}`, {
            method: "DELETE",
        });
        const data = await res.json();
        console.log(data);
        return;
    } catch (error) {
        throw error;
    }
}
