"use client";

import { Box, Button, FormControl, TextField } from "@mui/material";
import { VariantProductClass } from "../class";

type Props = {
    variants: VariantProductClass[];
    handleRemoveVariantButton: (variantUUID: string) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export function VariantProductForm({
    variants,
    handleRemoveVariantButton,
    handleChange,
}: Props) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <FormControl
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid black",
                    borderRadius: 1,
                    my: 1,
                    p: 1,
                    gap: 1,
                }}
            >
                {variants.map((prod) => {
                    return (
                        <Box
                            key={prod.uuid}
                            sx={{
                                display: "flex",
                                flexDirection:
                                    variants.length > 1 ? "row" : "column",
                                gap: 1,
                            }}
                        >
                            {variants.length > 1 && (
                                <TextField
                                    type="text"
                                    name="name"
                                    id={prod.uuid}
                                    label="Option name"
                                    value={prod.name}
                                    onChange={handleChange}
                                />
                            )}
                            <TextField
                                type="number"
                                id={prod.uuid}
                                name="price"
                                label="Price"
                                value={prod.price}
                                onChange={handleChange}
                            />
                            <TextField
                                type="number"
                                id={prod.uuid}
                                name="cost"
                                label="Cost"
                                value={prod.cost}
                                onChange={handleChange}
                            />
                            {variants.length > 1 && (
                                <>
                                    <TextField
                                        type="text"
                                        id={prod.uuid}
                                        name="detail"
                                        label="Option detail"
                                        value={prod.detail}
                                        onChange={handleChange}
                                    />
                                    <Button
                                        variant="outlined"
                                        onClick={() =>
                                            handleRemoveVariantButton(prod.uuid)
                                        }
                                    >
                                        Remove
                                    </Button>
                                </>
                            )}
                        </Box>
                    );
                })}
            </FormControl>
        </Box>
    );
}
