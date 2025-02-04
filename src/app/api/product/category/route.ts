import { pool } from "@/_lib/db";
import { ApiResponse } from "@/class/ApiResponse";

export async function GET(): Promise<Response> {
    const sql = `
        SELECT 
            index,
            uuid,
            name,
            detail
        FROM
            product_category
        WHERE
            status = 'active'
        ORDER BY
            index;
`;
    try {
        const query = await pool.query(sql);
        if (query.rowCount === 0) {
            return Response.json(
                new ApiResponse(false, "Category data not found"),
                { status: 404 },
            );
        }

        return Response.json(
            new ApiResponse(true, "Get category data success", query.rows),
        );
    } catch (error) {
        return Response.json(
            new ApiResponse(false, "An Error Occurred", error),
        );
    }
}
