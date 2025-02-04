"use client";

import { FullProductType } from "@/app/api/product/types";
import {
    FullProductClass,
    MainProductClass,
    VariantProductClass,
} from "../class";
import {
    Box,
    Button,
    FormControl,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { VariantProductForm } from "./VariantProductForm";
import CategorySelect from "./CategorySelect";
import { validateVariants } from "../utils/validateVariants";
import { useProduct } from "../contexts/useProduct";

type Props = {
    fullProduct: FullProductType | undefined;
    onClose: () => void;
};

export function MainProductForm({ fullProduct, onClose }: Props) {
    const { createNewProduct, deleteProduct } = useProduct();
    const [existedMain, setExistedMain] = useState<MainProductClass>();
    const [existedVariants, setExistedVariants] = useState<
        VariantProductClass[]
    >([]);
    const [newMain, setNewMain] = useState<MainProductClass>();
    const [newVariants, setNewVariants] = useState<VariantProductClass[]>([]);
    const [thisMainProduct, setThisMainProduct] = useState<MainProductClass>();
    const [thisVariantProducts, setThisVariantProducts] = useState<
        VariantProductClass[]
    >([]);

    const initialize = () => {
        if (!fullProduct) {
            const newMain = new MainProductClass();
            const newVariant = [new VariantProductClass(newMain.uuid)];
            setThisMainProduct(newMain);
            setThisVariantProducts(newVariant);
        } else {
            const {
                index,
                uuid,
                name,
                category,
                variants,
                detail,
                type,
                createdAt,
                updatedAt,
            } = fullProduct;
            setThisMainProduct(
                new MainProductClass(
                    index,
                    uuid,
                    name,
                    category,
                    detail,
                    variants.length,
                    type,
                    createdAt,
                    updatedAt,
                ),
            );
            setThisVariantProducts(
                variants.map(
                    (prod) => new VariantProductClass(prod.mainProduct),
                ),
            );
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, name, value } = e.target;
        if (id === "main") {
            setThisMainProduct(
                (prev) => ({ ...prev, [name]: value }) as MainProductClass,
            );
        } else {
            if (name === "price" || name === "cost") {
                setThisVariantProducts((prev) =>
                    prev?.map((item) =>
                        item.uuid === id
                            ? { ...item, [name]: Number(value) }
                            : item,
                    ),
                );
            } else {
                setThisVariantProducts((prev) =>
                    prev?.map((item) =>
                        item.uuid === id ? { ...item, [name]: value } : item,
                    ),
                );
            }
        }
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { value } = e.target;
        setThisMainProduct(
            (prev) => ({ ...prev, category: value }) as MainProductClass,
        );
    };

    const handleAddButton = () => {
        setThisVariantProducts((prev) => [
            ...(prev || []),
            new VariantProductClass(thisMainProduct?.uuid as string),
        ]);
        setThisMainProduct(
            (prev) =>
                ({
                    ...prev,
                    variantCount: Number(thisVariantProducts.length + 1),
                }) as MainProductClass,
        );
    };

    const handleRemoveMainButton = async () => {
        try {
            if (thisMainProduct) {
                await deleteProduct(thisMainProduct.uuid);
                onClose();
            }
        } catch (error) {
            alert("Delete this product failed");
        }
    };

    const handleSaveButton = async () => {
        // if there is no product provided at first.
        if (!fullProduct) {
            // create new
            const fullProduct = new FullProductClass(
                thisMainProduct as MainProductClass,
                thisVariantProducts,
            );
            createNewProduct(fullProduct);
            onClose();
        } else {
            // update existed
            try {
                if (thisVariantProducts) validateVariants(thisVariantProducts);
            } catch (error) {
                if (error instanceof Error) alert(error.message);
            }
        }
    };

    const handleRemoveVariantButton = (variantUUID: string) => {
        setThisVariantProducts(
            thisVariantProducts?.filter((prod) => prod.uuid !== variantUUID),
        );
        setThisMainProduct(
            (prev) =>
                ({
                    ...prev,
                    variantCount: Number(thisVariantProducts.length - 1),
                }) as MainProductClass,
        );
    };

    useEffect(() => {
        initialize();
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                px: 5,
            }}
        >
            <FormControl>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 1,
                    }}
                >
                    <TextField
                        id="main"
                        name="name"
                        label="Name"
                        value={thisMainProduct?.name}
                        onChange={handleChange}
                    />
                    <CategorySelect
                        value={thisMainProduct?.category || ""}
                        onChange={handleSelectChange}
                    />
                    <TextField
                        id="main"
                        name="detail"
                        label="Detail"
                        value={thisMainProduct?.detail}
                        onChange={handleChange}
                    />
                    <TextField
                        id="main"
                        name="variantCount"
                        label="options"
                        value={thisMainProduct?.variantCount}
                        onChange={handleChange}
                        disabled
                    />
                    <Button
                        type="button"
                        variant="outlined"
                        onClick={handleAddButton}
                    >
                        Add Option
                    </Button>
                </Box>
            </FormControl>
            <VariantProductForm
                variants={thisVariantProducts || []}
                handleRemoveVariantButton={handleRemoveVariantButton}
                handleChange={handleChange}
            />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    justifyContent: "center",
                }}
            >
                <Button variant="contained" onClick={handleSaveButton}>
                    Save
                </Button>
                <Button variant="outlined" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="text" onClick={handleRemoveMainButton}>
                    Remove
                </Button>
            </Box>
            <div>this is main</div>
            {JSON.stringify(thisMainProduct)}
            <div>this is variant</div>
            {JSON.stringify(thisVariantProducts)}
        </Box>
    );
}
