import { pool } from "@/_lib/db";
import { ApiResponse } from "@/class/ApiResponse";

export async function GET() {
    const client = await pool.connect();
    const sql = `
        SELECT
            pv.index AS "index",
            pv.uuid AS "uuid",
            pv.product_main_uuid AS "mainProduct",
            pv.name AS "name",
            pv.price AS "price",
            pv.cost AS "cost",
            pv.detail AS "detail",
            pv.created_at AS "createdAt",
            pv.updated_at AS "updatedAt"
        FROM
            product_variant pv
        ORDER BY
            pv.index;
`;
    try {
        const query = await client.query(sql);
        if (!query.rowCount) {
            return Response.json(
                new ApiResponse(false, "Get product variants data failed"),
            );
        }

        return Response.json(
            new ApiResponse(
                true,
                "Get product variants data success",
                query.rows,
            ),
        );
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

export async function POST(req: Request) {
    const body = await req.json();
    return Response.json(body);
}
