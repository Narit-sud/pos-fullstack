import { VariantProductClass } from "../class";

export function validateVariants(variants: VariantProductClass[]) {
    if (variants.length > 1) {
        // if variants is multiple
        // check empty name
        const isNameEmpty = variants.find(
            (prod) => prod.name === "" || prod.name === undefined,
        );
        if (isNameEmpty) throw new Error("Variant name empty");
    } else {
        // if variant is single
    }
}
