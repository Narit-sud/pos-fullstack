import { pool } from "@/_lib/db";
import { FullProductType } from "./types";
import { ApiResponse } from "@/class/ApiResponse";

export async function POST(req: Request) {
    const body: FullProductType = await req.json();

    const createMainSql = `
        INSERT
        INTO
            product_main
            ("uuid", "name", product_category_uuid, detail, "type")
        VALUES
            ($1, $2, $3, $4, $5);`;

    const createVariantSql = `
        INSERT
        INTO
            product_variant
            ("uuid", "name", product_main_uuid, detail, price, "cost")
        VALUES
            ($1, $2, $3, $4, $5, $6);
`;
    const client = await pool.connect();

    try {
        await client.query("BEGIN");
        // create main product
        await client.query(createMainSql, [
            body.uuid,
            body.name,
            body.category,
            body.detail,
            body.type,
        ]);
        // create variant products
        await Promise.all(
            body.variants.map((variant) => {
                client.query(createVariantSql, [
                    variant.uuid,
                    variant.name,
                    variant.mainProduct,
                    variant.detail,
                    variant.price,
                    variant.cost,
                ]);
            }),
        );
        // commit creation
        await client.query("COMMIT");
        return Response.json(
            new ApiResponse(
                true,
                "Create new main and variants product success",
            ),
            { status: 201 },
        );
    } catch (error) {
        // if error, roll back creation
        await client.query("ROLLBACK");
        //TODO: handle error for constraint_unique_*something*
        //if (error.something){
        //return Response.json(new ApiResponse(false,"*something* already existed"))
        //}else if (error.something2){
        //return Response.json(new ApiResponse(false,"*something2* already existed"))
        //}else{
        //
        //}
        return Response.json(new ApiResponse(false, "Unexpected Error", error));
    } finally {
        client.release();
    }
}
