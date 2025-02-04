import { v4 as genUUID } from "uuid";
export class VariantProductClass {
    index: number;
    uuid: string;
    name: string;
    cost: number;
    price: number;
    detail: string;
    mainProduct: string;
    createdAt: string;
    updatedAt: string;

    constructor(
        mainProduct: string, // what product this variant linked to?
        index: number = 0,
        uuid: string = genUUID(),
        name: string = "",
        cost: number = 0,
        price: number = 0,
        detail: string = "",
        createdAt: string = "NOW()",
        updatedAt: string = "NOW()",
    ) {
        this.index = index;
        this.uuid = uuid;
        this.name = name;
        this.cost = cost;
        this.price = price;
        this.detail = detail;
        this.mainProduct = mainProduct;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export class MainProductClass {
    index: number;
    uuid: string;
    name: string;
    category: string;
    detail: string;
    variantCount: number;
    type: string;
    createdAt: string;
    updatedAt: string;

    constructor(
        index: number = 0,
        uuid: string = genUUID(),
        name: string = "",
        category: string = "828de594-d923-4614-851b-3beec9788f19",
        detail: string = "",
        variantCount: number = 1,
        type: string = "single",
        createdAt: string = "NOW()",
        updatedAt: string = "NOW()",
    ) {
        this.index = index;
        this.uuid = uuid;
        this.name = name;
        this.category = category;
        this.detail = detail;
        this.variantCount = variantCount;
        this.type = type;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export class FullProductClass extends MainProductClass {
    variants: VariantProductClass[];
    constructor(
        mainProduct: MainProductClass,
        variantProducts: VariantProductClass[],
    ) {
        super(
            mainProduct.index,
            mainProduct.uuid,
            mainProduct.name,
            mainProduct.category,
            mainProduct.detail,
            mainProduct.variantCount,
            mainProduct.type,
            mainProduct.createdAt,
            mainProduct.updatedAt,
        );
        this.variants = variantProducts;
    }
}

export class CategoryClass {
    index: number;
    uuid: string;
    name: string;
    detail: string;
    constructor(
        index: number = 0,
        uuid: string = genUUID(),
        name: string = "",
        detail: string = "",
    ) {
        this.index = index;
        this.uuid = uuid;
        this.name = name;
        this.detail = detail;
    }
}
