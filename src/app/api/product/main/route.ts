import { pool } from "@/_lib/db";
import { ApiResponse } from "@/class/ApiResponse";

export async function GET() {
    const sql = `
        SELECT
            pm.index AS "index",
            pm.uuid AS "uuid",
            pm.name AS "name",
            pm.product_category_uuid AS "category",
            pm.detail AS "detail",
            count(pv.uuid) AS "variantCount",
            pm.TYPE AS "type",
            pm.created_at AS "createdAt",
            pm.updated_at AS "updatedAt"
        FROM
            product_main pm
        LEFT JOIN product_variant pv ON pm.uuid = pv.product_main_uuid
        WHERE
            pm.status = 'active'
            GROUP BY pm.uuid
        ORDER BY
            pm.index;
`;
    try {
        const query = await pool.query(sql);
        if (!query.rowCount) {
            return Response.json(
                new ApiResponse(false, "Product main data not found"),
                { status: 404 },
            );
        }
        return Response.json(
            new ApiResponse(true, "Get product main data success", query.rows),
            { status: 200 },
        );
    } catch (error) {
        if (error instanceof Error) {
            return (
                Response.json(new ApiResponse(false, error.message)),
                { status: 400 }
            );
        } else {
            return (
                Response.json(
                    new ApiResponse(
                        false,
                        "Unexpected Error",
                        undefined,
                        error,
                    ),
                ),
                { status: 500 }
            );
        }
    }
}
