import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/_lib/db";
import { ApiResponse } from "@/class/ApiResponse";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { uuid: string } },
) {
    const { uuid } = params;
    console.log(uuid);

    const updateMainSql = `update product_main set status = 'delete' where uuid = $1`;
    const updateVariantsSql = `update product_variant set status = 'delete' where product_main_uuid = $1`;
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        await client.query(updateMainSql, [uuid]);
        await client.query(updateVariantsSql, [uuid]);
        await client.query("COMMIT");
        return NextResponse.json(
            new ApiResponse(
                true,
                `Delete main and variant products binded with uuid ${uuid} success`,
            ),
            { status: 200 },
        );
    } catch (error) {
        await client.query("ROLLBACK");
        return NextResponse.json(
            new ApiResponse(
                false,
                `Delete main and variant products binded with uuid ${uuid} failed`,
            ),
            { status: 500 },
        );
    } finally {
        client.release();
    }
}
